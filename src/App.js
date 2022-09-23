import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import Sidebar from './components/Sidebar';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZGFuc2UiLCJhIjoiY2w4Ymx2dGVvMDBpajN2bG1wc3A5c2V4biJ9.Jhrbtvty0Crx_KFvjP0CGA'

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.951870);
  const [lat, setLat] = useState(40.730964);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/jordanse/cl8c3v9iu000t14mn4gvkpopd',
    center: [lng, lat],
    zoom: zoom
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
    

    /* When a click event occurs on a feature in the layer that contains all 
      sidewalk density info, open a popup at the
     location of the feature, with description HTML from its properties. */
    map.current.on('click', 'data-driven-circles', (e) => {
      console.log(`A click event has occurred`);

      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates[0]//.slice();
      const description = e.features[0].properties.description;

      /* Ensure that if the map is zoomed out such that multiple
       copies of the feature are visible, the popup appears
       over the copy being pointed to. */
      // console.log(e.lngLat);
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
   
      let pop = new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .setText('hey I popped up')
        .addTo(map.current);

      console.log(pop);
    });

    map.current.on('mouseenter', ['pharmacy_at_noon', 'data-driven-circles' ], (e) => {
      if (e.features.length) {
        map.current.getCanvas().style.cursor = 'pointer';
      }
    })

    map.current.on('mouseleave', ['pharmacy_at_noon', 'data-driven-circles' ], (e) => {
      map.current.getCanvas().style.cursor = '';
    })

  });

  //  map.current.setLayoutProperty('pharmacy_at_noon', 'visibility', 'none');  turn off layer
  //  map.current.setLayoutProperty('pharmacy_at_noon', 'visibility', 'visible'); turn on layer

  return (
    <div>
      <div>
        <Sidebar {...{map}}/>
      </div>
      <div ref={mapContainer} className="map-container" />
      <div className="zoom">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </div>
  );
}

export default App;
