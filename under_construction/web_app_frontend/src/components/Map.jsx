import React, { useEffect, useState } from 'react';

const TrailMap = ({ trailData }) => {
  // Path to the under construction image
  const mapImagePath = "./map.svg";
  const futureSnohomishImagePath = "./futuresnohomish.svg";
  const futureBothellImagePath = "./futurebothell.svg";
  const kirklandImagePath = "./kirkland.svg";
  const futureBellevueImagePath = "./futurebellevue.svg";
  const newcastleImagePath = "./newcastle.svg";
  const futureRedmondImagePath = "./futureredmond.svg";
  const redmondImagePath = "./redmond.svg";
  const futureLightRailPath = "./futurelightrail.svg";

  // Coordinates for cities, simplified as [latitude, longitude]
  const cityLocations = {
    Kirkland: { lat: 47.681487, lon: -122.208735, position: { left: '104px', top: '409px' } },
    Newcastle: { lat: 47.530101, lon: -122.163458, position: { left: '81.99px', top: '703px' } },
    Redmond: { lat: 47.673988, lon: -122.121512, position: { left: '176.5px', top: '429.5px' } },
    //Seattle: { lat: 47.6062, lon: -122.3321, position: { left: '2px', top: '486px' } }, // Approximate position for demo
    Bellevue: { lat: 47.6101, lon: -122.2015, position: { left: '132px', top: '583.5px' } },
  };

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          // Check if the user is within a proximity to any of the cities
          Object.keys(cityLocations).forEach(city => {
            const cityLat = cityLocations[city].lat;
            const cityLon = cityLocations[city].lon;
            // Simple check for proximity, adjust the threshold as needed
            if (Math.abs(cityLat - latitude) < 0.05 && Math.abs(cityLon - longitude) < 0.05) {
              setUserLocation(city);
            }
          });
        },
        (error) => console.error("Error accessing location: ", error.message)
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <div className="relative">
      {/* Background map image */}
      <img
        src={mapImagePath}
        alt="Map under construction"
        className="w-[350.5px] h-[958.15px]"
      />

      {/* Overlay image positioned on top of the map */}
      <img
        src={futureSnohomishImagePath}
        alt="Future Snohomish"
        className="absolute left-[179.97px] bottom-[672.15px]"
      />

      <img
        src={futureBothellImagePath}
        alt="Future Bothell"
        className="absolute left-[143px] top-[288px]"
      />
      <img
        src={kirklandImagePath}
        alt="kirkland"
        className="absolute left-[104px] top-[409px]"
      />
      <img
        src={futureBellevueImagePath}
        alt="Future Bellevue"
        className="absolute left-[132px] top-[583.5px]"
      />
      <img
        src={newcastleImagePath}
        alt="Newcastle"
        className="absolute left-[81.99px] top-[703px]"
      />
      <img
        src={futureRedmondImagePath}
        alt="Future Redmond"
        className="absolute left-[169.5px] top-[317px]"
      />
      <img
        src={redmondImagePath}
        alt="Redmond"
        className="absolute left-[176.5px] top-[429.5px]"
      />
      <img
        src={futureLightRailPath}
        alt="Future Light Rail"
        className="absolute left-[2px] top-[486px]"
      />
      {userLocation && (
        <img
          src="./YouAreHere.svg"
          alt="You Are Here"
          style={{
            position: 'absolute',
            left: cityLocations[userLocation].position.left,
            top: cityLocations[userLocation].position.top
          }}
        />
      )}

    </div>

  );
};

export default TrailMap;
