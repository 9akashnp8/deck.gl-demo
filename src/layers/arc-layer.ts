import { ArcLayer } from "deck.gl";
import type { PickingInfo } from "deck.gl";
import { MjolnirEvent } from "mjolnir.js";

type DataType = {
  from: {
    name: string;
    coordinates: [longitude: number, latitude: number];
  };
  to: {
    name: string;
    coordinates: [longitude: number, latitude: number];
  };
  trips: number;
};

const mockData: DataType[] = [
  {
    from: {
      name: "Guest House",
      coordinates: [54.373183, 24.486067],
    },
    to: {
      name: "SCAD Office",
      coordinates: [54.389943, 24.501308],
    },
    trips: 120
  },
  {
    from: {
      name: "SCAD Office",
      coordinates: [54.389943, 24.501308],
    },
    to: {
      name: "Guest House",
      coordinates: [54.373183, 24.486067],
    },
    trips: 10
  },
  {
    from: {
      name: "Corniche",
      coordinates: [54.358542, 24.495664],
    },
    to: {
      name: "Guest House",
      coordinates: [54.373183, 24.486067],
    },
    trips: 500
  },
  {
    from: {
      name: "Al Reem Island",
      coordinates: [54.404888, 24.498960],
    },
    to: {
      name: "Corniche",
      coordinates: [54.358542, 24.495664],
    },
    trips: 250
  },
];

const arcLayer = new ArcLayer<DataType>({
  id: 'arc-layer',
  data: mockData,
  getSourcePosition: (d: DataType) => d.from.coordinates,
  getTargetPosition: (d: DataType) => d.to.coordinates,
  getSourceColor: (d: DataType) => [Math.sqrt(72633), 140, 0],
  getTargetColor: (d: DataType) => [Math.sqrt(74735), 140, 0],
  pickable: true,
  onHover: (info: PickingInfo, event: MjolnirEvent) => {
    // console.log('Arc Layer Hover', info, event)
  }
})

export default arcLayer