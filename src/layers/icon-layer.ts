import { IconLayer } from "deck.gl";

import flows from '../../public/data/flows.json'

type DataType = {
    id: string;
    name: string;
    lat: number;
    lon: number;
}

function calculateIconSize(id: string) {
    const internalTrips = flows
        .filter((flow) => {
            if (id == flow.dest || id == flow.origin) {
                if (flow.dest == flow.origin) {
                    return flow
                }
            }
        })
        .reduce((accumulator, currentValue) => (
            accumulator + currentValue.count
        ), 0)
    const incomingTrips = flows
        .filter((flow) => {
            if (id == flow.dest && id !== flow.origin) {
                return flow
            }
        })
        .reduce((accumulator, currentValue) => (
            accumulator + currentValue.count
        ), 0)
    const outgoingTrips = flows
        .filter((flow) => {
            if (id == flow.origin && id !== flow.dest) {
                return flow
            }
        })
        .reduce((accumulator, currentValue) => (
            accumulator + currentValue.count
        ), 0)
    return (incomingTrips + outgoingTrips + internalTrips) / 3000
}


const iconLayer = new IconLayer<DataType>({
    id: 'icon-layer',
    data: './data/locations.json',
    getColor: (_: DataType) =>  [255, 255, 255],
    getIcon: (_: DataType) => 'marker',
    getPosition: (d: DataType) => [d.lon, d.lat],
    getSize: (d: DataType) => calculateIconSize(d.id),
    iconAtlas: './deckgl-icon.png',
    iconMapping: './deckgl-icon.json',
    pickable: true
})

export default iconLayer