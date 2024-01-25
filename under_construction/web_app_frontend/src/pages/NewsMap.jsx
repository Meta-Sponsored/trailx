import {Trailx_NavHeader} from '../components'; 
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
      <CarouselComponent>
        <CarouselItemsDirective>
          <CarouselItemDirective template='<figure class="img-container"><img src="https://ej2.syncfusion.com/products/images/carousel/cardinal.png" alt="cardinal" style="height:100%;width:100%;" /><figcaption class="img-caption">Cardinal</figcaption></figure>'/>
          <CarouselItemDirective template='<figure class="img-container"><img src="https://ej2.syncfusion.com/products/images/carousel/hunei.png" alt="kingfisher" style="height:100%;width:100%;" /><figcaption class="img-caption">Kingfisher</figcaption></figure>'/>
          <CarouselItemDirective template='<figure class="img-container"><img src="https://ej2.syncfusion.com/products/images/carousel/costa-rica.png" alt="keel-billed-toucan" style="height:100%;width:100%;" /><figcaption class="img-caption">Keel-billed-toucan</figcaption></figure>'/>
          <CarouselItemDirective template='<figure class="img-container"><img src="https://ej2.syncfusion.com/products/images/carousel/kaohsiung.png" alt="yellow-warbler" style="height:100%;width:100%;" /><figcaption class="img-caption">Yellow-warbler</figcaption></figure>'/>
          <CarouselItemDirective template='<figure class="img-container"><img src="https://ej2.syncfusion.com/products/images/carousel/bee-eater.png" alt="bee-eater" style="height:100%;width:100%;" /><figcaption class="img-caption">Bee-eater</figcaption></figure>'/>
        </CarouselItemsDirective>
      </CarouselComponent>
    </div>
  );
};

export default NewsMap;

