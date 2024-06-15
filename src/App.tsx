import { MapViewState } from 'deck.gl'
import { Map, useControl } from 'react-map-gl'
import { MapboxOverlay } from '@deck.gl/mapbox'
import { DeckProps } from '@deck.gl/core';
import { PickingInfo } from 'deck.gl';

import type { Location, Flow } from './types';
import lineLayer from './layers/line-layer'
import iconLayer from './layers/icon-layer';
import { getLocationTrips } from './utils';
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

function DeckGLOverlay(props: DeckProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

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
            getTooltip={getTooltip}
          // onViewStateChange={({ viewState }) => applyViewConstraints(viewState)}
        />
      </Map>
    </>
  )
}

export default App
