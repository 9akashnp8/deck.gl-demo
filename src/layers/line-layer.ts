import { LineLayer } from "deck.gl";

import locations from '../../public/data/locations.json'

type DataType = {
    origin: string;
    dest: string;
    count: number
};

function getSourcePosition(id: string) {
    const locationData = locations.filter((location) => {
        if (location.id == id) {
            return location
        }
    })
    return locationData[0]
}

const lineLayer = new LineLayer<DataType>({
  id: "line-layer",
  data: './data/flows.json',
  getSourcePosition: (d: DataType) => {
    const location = getSourcePosition(d.origin)
    return [location.lon, location.lat]
  },
  getTargetPosition: (d: DataType) => {
    const location = getSourcePosition(d.dest)
    return [location.lon, location.lat]
  },
  getWidth: (d: DataType) => d.count / 5,
  getColor: (d: DataType) => [Math.round(255 * (d.count / 3000)), Math.round(255 * (1 - (d.count / 3000))), 0],
  opacity: 0.5,
  widthUnits: "meters",
  pickable: true,
});

export default lineLayer;
