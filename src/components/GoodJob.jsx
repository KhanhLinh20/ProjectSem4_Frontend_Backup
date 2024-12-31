import React from 'react'
import g1 from '../img/g1.jpg'
import '../css/stylejob.css'
import logo from '../img/new.png'

const GoodJob = () => {
    return (
        <div className='my-5 top__job' style={{ width: "80%", margin: "auto" }}>
            <div className="row  ">
                <div className="col-8 col-sm-12 col-md-4 job__item">
                    <div className="card">
                        <div>
                            <img className="card-img-top" src={g1} alt />
                            <img src={logo} alt="" className="logo__new"/>
                        </div>

                        <div className="card-body">
                            <h4 className="card-title">
                                Experienced Salesforce Developer-French
                            </h4> <p className="card-text">Branding</p>
                            <p className="card-text">Caping VietName</p>
                            <p className="card-text">Deal</p>
                            <p className="card-text">Local</p>
                        </div>
                    </div>
                </div>
             

                <div className="col-8 col-sm-12 col-md-4 job__item">
                    <div className="card">
                        <div>
                            <img className="card-img-top" src={g1} alt />
                            <img src={logo} alt="" className="logo__new"/>
                        </div>

                        <div className="card-body">
                            <h4 className="card-title">
                                Experienced Salesforce Developer-French
                            </h4> <p className="card-text">Branding</p>
                            <p className="card-text">Caping VietName</p>
                            <p className="card-text">Deal</p>
                            <p className="card-text">Local</p>
                        </div>
                    </div>
                </div>
                <div className="col-8 col-sm-12 col-md-4 job__item">
                    <div className="card">
                        <div>
                            <img className="card-img-top" src={g1} alt />
                            <img src={logo} alt="" className="logo__new"/>
                        </div>

                        <div className="card-body">
                            <h4 className="card-title">
                                Experienced Salesforce Developer-French
                            </h4> <p className="card-text">Branding</p>
                            <p className="card-text">Caping VietName</p>
                            <p className="card-text">Deal</p>
                            <p className="card-text">Local</p>
                        </div>
                    </div>
                </div>
                <div className="col-8 col-sm-12 col-md-4 job__item">
                    <div className="card">
                        <div>
                            <img className="card-img-top" src={g1} alt />
                            <img src={logo} alt="" className="logo__new"/>
                        </div>

                        <div className="card-body">
                            <h4 className="card-title">
                                Experienced Salesforce Developer-French
                            </h4> <p className="card-text">Branding</p>
                            <p className="card-text">Caping VietName</p>
                            <p className="card-text">Deal</p>
                            <p className="card-text">Local</p>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}

export default GoodJob
