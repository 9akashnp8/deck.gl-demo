import { TripsLayer } from '@deck.gl/geo-layers';

type DataType = {
    waypoints: {
      coordinates: [longitude: number, latitude: number];
      timestamp: number;
    }[]
  };

// Guest House to Galleria
const mockData: DataType[] = [
    {
        waypoints: [
            {
                coordinates: [54.373189, 24.486090],
                timestamp: 1554772579000
            },
            {
                coordinates: [54.374487, 24.484689],
                timestamp: 1554772514345
            },
            {
                coordinates: [54.375581, 24.483576],
                timestamp: 1554772514154
            },
            {
                coordinates: [54.381053, 24.486778],
                timestamp: 1554772514678
            },
            {
                coordinates: [54.385468, 24.489894],
                timestamp: 1554772514678
            },
            {
                coordinates: [54.389976, 24.493072],
                timestamp: 1554772514678
            },
            {
                coordinates: [54.390780, 24.495262],
                timestamp: 1554772514678
            },
            {
                coordinates: [54.391115, 24.498469],
                timestamp: 1554772514678
            },
            {
                coordinates: [54.390408, 24.498771],
                timestamp: 1554772514678
            },

        ]
    }
]

const tripsLayer = new TripsLayer<DataType>({
    id: 'trips-layer',
    data: mockData,
    getPath: (d: DataType) => d.waypoints.map(p => p.coordinates),
    getTimestamps: (d: DataType) => d.waypoints.map(p => p.timestamp - 1554772579000),
    getColor: [253, 128, 93],
    currentTime: 500,
    trailLength: 1554772514678,
    capRounded: true,
    jointRounded: true,
    widthMinPixels: 8
})

export default tripsLayer