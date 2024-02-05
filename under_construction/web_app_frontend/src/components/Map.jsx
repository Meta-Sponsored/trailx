import React, { useState } from 'react';
import { Map as ReactMapGL } from 'react-map-gl';

const TrailMap = ({ trailData }) => {
  // Initialize viewport state using useState hook
  const [viewport, setViewport] = useState({
    container: 'map',
    //center: [47.621014, -122.206668],
    latitude: 47.6101, // Bellevue's latitude
    longitude: -122.2015, // Bellevue's longitude // Default longitude, adjust as necessary
    zoom: 11,
    width: '100%',
    height: '100%',
  });

  // You can adjust this method if you have specific logic for updating the viewport
  const handleViewportChange = (nextViewport) => {
    setViewport(nextViewport);
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      onViewportChange={handleViewportChange}
      mapboxApiAccessToken="pk.eyJ1IjoibGV1bmdob24iLCJhIjoiY2xzODhjNzVmMTlwZjJqcDZqMXdoZm9iZyJ9.8XG_OWOev1MdPSQ_QLSqww"
    >
      {/* Add markers or other custom components here */}
    </ReactMapGL>
  );
};

export default TrailMap;
