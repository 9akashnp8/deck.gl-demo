import { IconLayer } from "deck.gl";

import { getLocationTrips } from "../utils";

type DataType = {
    id: string;
    name: string;
    lat: number;
    lon: number;
}

export function calculateIconSize(id: string) {
    const [incoming, outgoing, internal] = getLocationTrips(id)
    return (incoming + outgoing + internal) / 3000
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
    pickable: true,
})

export default iconLayer