import { MapViewState } from 'deck.gl'
import { Map, useControl } from 'react-map-gl'
import { MapboxOverlay } from '@deck.gl/mapbox'
import { DeckProps } from '@deck.gl/core';

import lineLayer from './layers/line-layer'
import iconLayer from './layers/icon-layer';
import './App.css'
import { useCallback } from 'react'

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

function DeckGLOverlay(props: DeckProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

function App({ bounds }: Props) {
  const layers = [
    iconLayer,
    lineLayer,
  ]
  const applyViewConstraints = useCallback((viewState: any) => ({
    ...viewState,
    // min(east, west, longitute)
    longitude: Math.min(bounds[1][0], Math.max(bounds[0][0]), viewState.longitude),
    // min(north, south, latitude)
    latitude: Math.min(bounds[1][1], Math.max(bounds[0][1]), viewState.latitude),
  }), [bounds])

  return (
    <>
      <Map
        style={{ height: '500px'}}
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={'mapbox://styles/mapbox/dark-v11'}
        mapboxAccessToken=''
      >
        <DeckGLOverlay
          layers={layers}
          // onViewStateChange={({ viewState }) => applyViewConstraints(viewState)}
        />
      </Map>
    </>
  )
}

export default App
