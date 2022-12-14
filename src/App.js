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
  const categories = ['pharmacy', 'restaurant', 'subway', 'office'];

  function initiailizeMap() {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/jordanse/cl8c3v9iu000t14mn4gvkpopd',
      center: [lng, lat],
      zoom: zoom
    });
  };

  function turnOffIconLayers() {
    categories.forEach(category => {
      map.current.setLayoutProperty(`${category}_at_noon`, 'visibility', 'none');
    });
  };

  function addNavigationControl() {
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  };

  function addLongAndLatitudeInfo() {
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  };

  function popupInfo() {
    categories.forEach(category => {
      /* When a click event occurs on a feature in the layer that contains all sidewalk density info, open a popup at the
     location of the feature, with description HTML from its properties. */
      map.current.on('click', `${category}_at_noon`, (e) => {
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates[0]//.slice(); <- documentation shows slice but our data format doesn't seem to work with that. I think it's an issue with MultiLineString. Using the first set of coordinates only is the temp. workaround
      const description = e.features[0].properties.p_queue_12;

      /* Ensure that if the map is zoomed out such that multiple
       copies of the feature are visible, the popup appears
       over the copy being pointed to. */
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
   
      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .setText(`people at noon: ${description}`)
        .addTo(map.current);
      });
    }); 
  };

  function addPointer() {
    categories.forEach(category => {
      map.current.on('mouseenter', `${category}_at_noon`, (e) => {
        if (e.features.length) {
          map.current.getCanvas().style.cursor = 'pointer';
        }
      });
  
      map.current.on('mouseleave', `${category}_at_noon`, (e) => {
        map.current.getCanvas().style.cursor = '';
      });
    })
    
  };

  function addEventListeners() {
    addLongAndLatitudeInfo();
    popupInfo();
    addPointer();
  }
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    initiailizeMap();

    map.current.on('load', ()=> {
      turnOffIconLayers();
      addNavigationControl();
      addEventListeners();
    });
  });

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
