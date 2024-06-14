import { IconLayer } from "deck.gl";

type DataType = {
    name: string;
    entries: number;
    exits: number;
    coordinates: [longitude: number, latitude: number];
}

const mockData: DataType[] = [
    {
        "name":"Guesthouse",
        "entries": 3481,
        "exits": 3616,
        "coordinates":[54.373183, 24.486067]
    },
    {
        "name":"SCAD IFP Office",
        "entries": 3481,
        "exits": 3616,
        "coordinates":[54.389943, 24.501308]
    }
]

const iconLayer = new IconLayer<DataType>({
    id: 'icon-layer',
    data: mockData,
    getColor: (d: DataType) => [Math.sqrt(d.exits), 140, 0],
    getIcon: (d: DataType) => 'marker',
    getPosition: (d: DataType) => d.coordinates,
    getSize: 40,
    iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json',
    pickable: true
})

export default iconLayer