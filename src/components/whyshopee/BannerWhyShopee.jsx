import React from 'react';
import banner1 from '../../img/whyshopee.jpg';

const BannerWhyShopee = () => {
  return (
    <div>
      <div 
        className="banner__whyshopee"
        style={{
          width: "100%", 
          height: "400px",  // Adjust the height as needed
          overflow: "hidden",
          position: "relative"
        }}
      >
        <img 
          src={banner1} 
          alt="Why Shopee" 
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", 
            objectPosition: "center"
          }} 
        />
      </div>
    </div>
  );
};

export default BannerWhyShopee;
