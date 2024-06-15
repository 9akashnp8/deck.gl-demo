import { useCallback } from 'react'
import { MapViewState } from 'deck.gl'
import { Map } from 'react-map-gl'

import CombinedLayerOverlay from './components/combine-layer-overlay';
import './App.css'

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 8.373183,
  latitude: 46.886067,
  zoom: 8
}

type Props = {
  bounds: [
    [west: number, south: number],
    [east: number, north: number],
  ]
}


function App({ bounds }: Props) {
  const applyViewConstraints = useCallback((viewState: any) => ({
    ...viewState,
    longitude: Math.min(bounds[1][0], Math.max(bounds[0][0]), viewState.longitude),
    latitude: Math.min(bounds[1][1], Math.max(bounds[0][1]), viewState.latitude),
  }), [bounds])

  return (
    <Map
    reuseMaps
    style={{ height: '95vh'}}
    initialViewState={INITIAL_VIEW_STATE}
    mapStyle={'mapbox://styles/mapbox/dark-v11'}
        mapboxAccessToken=''
    >
        <CombinedLayerOverlay />
    </Map>
  )
}

export default App
