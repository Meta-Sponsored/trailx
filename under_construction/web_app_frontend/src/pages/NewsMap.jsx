import {Trailx_NavHeader, MyCarousel} from '../components'; 
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-react-navigations";
import React from 'react';



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
      <MyCarousel />
    </div>
  );
};

export default NewsMap;

