import React from 'react';

const ContentShopeeValues = () => {
  return (
    <div>
      {/* Main Section */}
      <div className="text-center" style={{ width: '80%', margin: 'auto', padding: '50px 0' }}>
        <h2 className="pb-5" style={{ fontWeight: 'bold', color: '#ee4d2d' }}>
          Shopee's Core Values
        </h2>
        <p style={{ fontSize: '18px', color: '#555', maxWidth: '800px', margin: 'auto' }}>
          At Shopee, our core values drive everything we do. We are passionate about creating an inclusive, innovative,
          and empowering work environment where our people can thrive. These values reflect our commitment to building a better future
          for both our employees and our customers.
        </p>

        {/* Card Grid Section */}
        <div className="row row-cols-1 row-cols-md-3 g-4" style={{ marginTop: '40px' }}>
          {/* Card 1 */}
          <div className="col">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
              <img
                src="https://careers.shopee.sg/blog/wp-content/uploads/2024/02/downsized.jpg"
                className="card-img-top"
                alt="Integrity"
                style={{ width: '100%', height: '250px', objectFit: 'cover' }} // Increased width and height
              />
              <div className="card-body" style={{ padding: '20px' }}>
                <h5 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold' }}>Integrity</h5>
                <p className="card-text" style={{ fontSize: '14px', color: '#777' }}>
                  We uphold the highest standards of integrity and transparency in everything we do. By being honest and accountable,
                  we build trust with our colleagues, partners, and customers.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
              <img
                src="https://careers.shopee.sg/blog/wp-content/uploads/2024/02/Career-Site-Banner.png"
                className="card-img-top"
                alt="Innovation"
                style={{ width: '100%', height: '250px', objectFit: 'cover' }} // Increased width and height
              />
              <div className="card-body" style={{ padding: '20px' }}>
                <h5 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold' }}>Innovation</h5>
                <p className="card-text" style={{ fontSize: '14px', color: '#777' }}>
                  We foster a culture of creativity and innovation where everyone is encouraged to think outside the box and push boundaries.
                  At Shopee, we believe that great ideas come from diverse perspectives.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col">
            <div className="card border-0 shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
              <img
                src="https://careers.shopee.sg/blog/wp-content/uploads/2024/01/Career-Site-Banner.png"
                className="card-img-top"
                alt="Collaboration"
                style={{ width: '100%', height: '250px', objectFit: 'cover' }} // Increased width and height
              />
              <div className="card-body" style={{ padding: '20px' }}>
                <h5 className="card-title" style={{ fontSize: '20px', fontWeight: 'bold' }}>Collaboration</h5>
                <p className="card-text" style={{ fontSize: '14px', color: '#777' }}>
                  Teamwork is at the heart of our success. We believe in the power of collaboration, sharing knowledge, and supporting each other to achieve common goals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center" style={{ marginTop: '50px' }}>
          <a href="http://localhost:3000/opportunity" className="btn btn-primary" style={{backgroundColor: '#ee4d2d', borderColor: '#f85b2a' }}>
            Join Our Team at Shopee
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContentShopeeValues;
