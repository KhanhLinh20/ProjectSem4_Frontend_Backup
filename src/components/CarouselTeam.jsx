import React from 'react'
import '../css/carouselgroup.css'

const CarouselTeam = () => {
    return (
        <div className='carousel__team' >
            <div className="card style__background " style={{ width: '18rem' }}>
                <div className="card-body item__title">
                    <h5 className="card-title">Card title</h5>
                    <h6 className="mb-2 text-muted">Card subtitle</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                   <button type='button' className='btn' style={{backgroundColor:"#e67e22"}} ><a href="#" style={{color:'white',textDecoration:"none" }}> Read Our Blogs</a></button>
                   
                </div>
            </div>

        </div>     
        
    )
}

export default CarouselTeam
