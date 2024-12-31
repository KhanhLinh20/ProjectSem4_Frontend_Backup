import React from 'react';
import banner1 from '../../img/opport1.jpg';

const BannerOpport = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <img 
          src={banner1} 
          alt="Banner Opportunity" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Đảm bảo ảnh phủ hết diện tích
          }} 
        />
        {/* Lớp phủ mờ */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)' // Màu nền mờ
        }}></div>
        {/* Nội dung bên trên banner */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#fff',
          textAlign: 'center',
          zIndex: 1,
        }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Your Opportunity Awaits</h1>
          <p style={{ fontSize: '1rem', marginTop: '10px' }}>Explore new career paths with us!</p>
        </div>
      </div>
    </div>
  );
}

export default BannerOpport;
