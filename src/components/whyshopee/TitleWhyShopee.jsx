import React from 'react';
import title1 from '../../img/g1.jpg';
import title2 from '../../img/g2.jpg';
import title3 from '../../img/g3.jpg';

const TitleWhyShopee = () => {
  return (
    <div>
      {/* Title Section */}
      <div className="title__why mb-5">
        <div className="" style={{ width: '80%', margin: 'auto', padding: '50px 0' }}>
          <h2 className="card-title py-5 text-center" style={{color: "#ee4d2d"}}>Why Choose a Career at Shopee?</h2>
          <p className="card-text">
          Choosing Shopee as the place to grow your career is a smart decision to join one of the fastest-growing e-commerce platforms in Southeast Asia and Taiwan. At Shopee, you’ll not only work in a dynamic and creative environment but also have the opportunity to learn and grow alongside talented individuals from diverse backgrounds. We place innovation and creativity at the heart of everything we do, encouraging our team to think outside the box and find optimal solutions to big challenges. 
          </p>
          <p>
          Shopee offers you the chance to develop yourself through in-depth training programs, a collaborative work environment, and exciting challenges every day. You’ll work directly with diverse teams and have the opportunity to contribute to global projects, from product development and optimizing customer experiences to solving logistics and tech-related problems.
          </p>
          <p>
          With our commitment to career growth and continuous innovation, Shopee is the perfect place to build your career, explore new opportunities, and make a positive impact on the community. At Shopee, we’re not just looking for employees, but passionate, creative individuals who are eager to challenge themselves and grow with us towards success.
          </p>
        </div>
      </div>

      {/* Another Title Section */}
      <div className="" style={{ width: '80%', margin: 'auto', paddingBottom: '50px' }}>
        <h2 className="card-title py-5 text-center" style={{color: "#ee4d2d"}}>Our Mission and Vision</h2>
        <p className="card-text">
        At Shopee, our mission is to empower consumers and businesses through technology, bringing the best of e-commerce to Southeast Asia and Taiwan. We strive to provide a seamless and convenient online shopping experience that connects millions of buyers and sellers, enabling them to discover, share, and grow together. Our goal is to create a trusted, inclusive, and innovative platform that fosters economic growth, enriches lives, and drives positive change in the communities we serve.
        </p>
        <p>
        Our vision is to be the leading e-commerce platform that revolutionizes the way people shop, work, and live. We aim to build a sustainable ecosystem where businesses, large and small, can thrive by leveraging Shopee’s powerful tools, data, and insights. Through continuous innovation, we aspire to shape the future of e-commerce, technology, and logistics, ensuring that our users and partners have the resources they need to succeed in an ever-evolving digital world.
        </p>
        <p>
        By joining Shopee, you become part of a global team that is not just building an e-commerce platform but a community-driven ecosystem. Together, we can create a more connected, inclusive, and sustainable future for everyone.
        </p>
      </div>

      {/* Cards Section */}
      <div className="text-center">
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{ width: '90%', margin: 'auto' }}>
          <div className="col">
            <div className="card border-0">
              <img
                src={title1}
                className="card-img-top"
                alt="Why Shopee is Popular"
                style={{
                  height: '300px',           // Increased height for a larger image
                  objectFit: 'cover',        // Ensures images are not stretched
                  width: '100%'              // Ensures the image fills the width of the container
                }}
              />
              <div className="card-body">
                <h5 className="card-title">Why Shopee is a Great Place to Work</h5>
                <p className="card-text">
                  Shopee fosters a culture of continuous learning and growth. We provide a collaborative environment where you can build your career, develop new skills, and take on new challenges. If you're looking for a workplace where your ideas matter and your contributions make a real impact, Shopee is the place to be!
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card border-0">
              <img
                src={title2}
                className="card-img-top"
                alt="Shopee's Key Features"
                style={{
                  height: '300px',           // Increased height for a larger image
                  objectFit: 'cover',        // Ensures images are not stretched
                  width: '100%'              // Ensures the image fills the width of the container
                }}
              />
              <div className="card-body">
                <h5 className="card-title">Shopee's Values and Culture</h5>
                <p className="card-text">
                  At Shopee, our values are at the core of everything we do. We believe in teamwork, innovation, integrity, and a commitment to excellence. Our diverse and inclusive culture empowers every team member to thrive. We encourage openness, creativity, and the freedom to explore new ideas that drive our success.
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <div className="card border-0">
              <img
                src={title3}
                className="card-img-top"
                alt="How Shopee Supports Career Growth"
                style={{
                  height: '300px',           // Increased height for a larger image
                  objectFit: 'cover',        // Ensures images are not stretched
                  width: '100%'              // Ensures the image fills the width of the container
                }}
              />
              <div className="card-body">
                <h5 className="card-title">Career Growth Opportunities at Shopee</h5>
                <p className="card-text">
                  Shopee offers a range of career development programs, mentorship opportunities, and resources to help you succeed. Whether you're looking to specialize in a particular field or take on leadership roles, we provide the tools and support needed to help you reach your career goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleWhyShopee;
