import { LineLayer } from "deck.gl";

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

const lineLayer = new LineLayer<DataType>({
  id: "line-layer",
  data: mockData,
  getSourcePosition: (d: DataType) => d.from.coordinates,
  getTargetPosition: (d: DataType) => d.to.coordinates,
  getWidth: (d: DataType) => d.trips / 5,
  getColor: (d: DataType) => [(d.trips / 255) * 10, 100, 0],
  opacity: 0.5,
  widthUnits: "meters",
  pickable: true,
});

export default lineLayer;
