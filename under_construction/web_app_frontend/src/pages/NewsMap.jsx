import {Trailx_NavHeader, MyCarousel, TrailMap} from '../components'; 
import React from 'react';

const yourTrailData = {
  id: 'trail-001',
  name: 'Lake View Trail',
  description: 'A scenic route offering stunning views of the lake and surrounding mountains.',
  difficulty: 'Moderate',
  length: '5 miles',
  startLat: 47.6062, // Starting latitude of the trail
  startLong: -122.3321, // Starting longitude of the trail
  endLat: 47.6097, // Ending latitude of the trail (if applicable)
  endLong: -122.3355, // Ending longitude of the trail (if applicable)
  path: [ // An array of coordinates representing the trail's path; optional depending on your implementation
    [47.6062, -122.3321],
    [47.6070, -122.3335],
    [47.6080, -122.3340],
    [47.6097, -122.3355]
  ]
};


const NewsMap = () => {
  const styles = {
    newsMapContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
    },
    newsUpdatesSection: {
      marginTop: '32px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    newsUpdates: {
      alignItems: 'center',
      display: 'flex',
      gap: '12px',
      height: '48px',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
    },
    vector: {
      flex: 1,
      height: '5.77px',
      objectFit: 'cover',
      position: 'relative',
    },
    title: {
      color: '#000000',
      fontFamily: '"Poppins-SemiBold", Helvetica',
      fontSize: '28px',
      fontWeight: 600,
      letterSpacing: '0',
      lineHeight: 'normal',
      marginTop: '-1px',
      position: 'relative',
      width: '276px',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }
  };

  return (
    <div style={styles.newsMapContainer}>
      <Trailx_NavHeader />
      <div style={styles.newsUpdatesSection}>
        <div style={styles.newsUpdates} id="NEWS_UPDATES">
          <img style={styles.vector} alt="Vector" src="vector 17.svg" />
          <div style={styles.title}>NEWS & UPDATES</div>
          <img style={styles.vector} alt="Vector" src="vector 18.svg" />
        </div>
      </div>
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <MyCarousel />
    </div>
    <div style={styles.newsUpdatesSection}>
        <div style={styles.newsUpdates} id="NEWS_UPDATES">
          <img style={styles.vector} alt="Vector" src="vector 17.svg" />
          <div style={styles.title}>INTERACTIVE MAP</div>
          <img style={styles.vector} alt="Vector" src="vector 18.svg" />
        </div>
      </div>
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <TrailMap trailData={yourTrailData}/>
    </div>
    </div>

  );
};

export default NewsMap;

