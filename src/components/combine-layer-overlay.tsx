import { useState, useCallback } from "react"

import { useControl } from "react-map-gl"
import { MapboxOverlay } from "@deck.gl/mapbox"
import { LineLayer, IconLayer, DeckProps, PickingInfo } from "deck.gl"

import { getLocationTrips } from "../utils"
import type { Location, Flow } from "../types"
import flows from '../../public/data/flows.json'
import { getSourcePosition } from "../layers/line-layer"
import { calculateIconSize } from "../layers/icon-layer"
import locations from '../../public/data/locations.json'

function getTooltip({ object }: PickingInfo<Location | Flow>) {
    if (object && 'name' in object) {
        const [ incoming, outgoing, internal] = getLocationTrips(object.id)
        return {
            html: `<h4>${object.name}</h4><div>Incoming: ${incoming}</div><div>Outgoing: ${outgoing}</div><div>Internal: ${internal}</div>`,
        }
    } else if (object && 'origin' in object) {
        return {
            html: `<h4>${object.count}</h4>`
        }
    } else {
        return null
    }
}

function DeckGLOverlay(props: DeckProps) {
    const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
    overlay.setProps(props);
    return null;
}

export default function CombinedLayerOverlay() {
    const [flowsData, setFlowsData] = useState(flows)

    // Display traffic only from or to selected location
    const handleIconClick = useCallback((info: PickingInfo) => {
        const { id } = info.object
        if (id) {
            const filtered = flows.filter((flow) => {
                if (flow.dest == id || flow.origin == id) {
                    return flow
                }
            })
            setFlowsData(filtered)
        }
    }, [])

    const lineLayer = new LineLayer<Flow>({
        id: 'line-layer-2',
        data: flowsData,
        getSourcePosition: (d: Flow) => {
            const location = getSourcePosition(d.origin)
            return [location.lon, location.lat]
        },
        getTargetPosition: (d: Flow) => {
            const location = getSourcePosition(d.dest)
            return [location.lon, location.lat]
        },
        getWidth: (d: Flow) => d.count / 5,
        getColor: (d: Flow) => [Math.round(255 * (d.count / 3000)), Math.round(255 * (1 - (d.count / 3000))), 0],
        opacity: 0.5,
        widthUnits: "meters",
        pickable: true,
    })

    const iconLayer = new IconLayer({
        id: 'icon-layer-2',
        data: locations,
        getColor: (_: Location) => [255, 255, 255],
        getIcon: (_: Location) => 'marker',
        getPosition: (d: Location) => [d.lon, d.lat],
        getSize: (d: Location) => calculateIconSize(d.id),
        onClick(pickingInfo, event) {
            handleIconClick(pickingInfo)
        },
        iconAtlas: './deckgl-icon.png',
        iconMapping: './deckgl-icon.json',
        pickable: true,
    })

    return <DeckGLOverlay
        layers={[lineLayer, iconLayer]}
        getTooltip={getTooltip}
    />
}