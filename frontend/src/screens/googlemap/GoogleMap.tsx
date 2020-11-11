import React from 'react'
import { compose, withProps } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px`, marginTop: '20px' }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: 10.386282, lng: 123.979088 }}
  >
    {
      /* props.isMarkerShown &&  */ <Marker
        position={{ lat: 10.386282, lng: 123.979088 }}
      />
    }
  </GoogleMap>
))

export default MyMapComponent
