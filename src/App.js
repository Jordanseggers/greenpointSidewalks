import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Box, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';

import Sidebar from './components/Sidebar';

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9yZGFuc2UiLCJhIjoiY2w4Ymx2dGVvMDBpajN2bG1wc3A5c2V4biJ9.Jhrbtvty0Crx_KFvjP0CGA'

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-73.951870);
  const [lat, setLat] = useState(40.730964);
  const [zoom, setZoom] = useState(15);
  const [isOpen, setIsOpen] = useState(false);

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
    
    map.current.on('click', (e) => {
      console.log(`A click event has occurred at ${e.lngLat}`);
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
        <Box sx={{ mr: 1 }}>
          <IconButton
            size="large"
            color="inherit"
            onClick={() => setIsOpen(true)}
          >
            <Menu />
          </IconButton>
        </Box>
      </div>
      <div>
        <Sidebar {...{isOpen, setIsOpen, map}}/>
      </div>
      <div ref={mapContainer} className="map-container" />
      <div className="zoom">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </div>
  );
}

export default App;
