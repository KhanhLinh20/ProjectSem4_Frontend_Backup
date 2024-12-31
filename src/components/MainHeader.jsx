import React from 'react'
import { NavLink } from 'react-router-dom'
import '../css/mainheader.css'


const MainHeader = () => {
    return (
        <div>
            <div className='container' style={{ width: "70%", margin: "auto" }}>
                <nav className='navbar d-flex justify-content-between navbar-light bg-white'>
                    <div className='logo__home'>
                    <li className='p-3' style={{ listStyle: "none" }}>
                        <NavLink to="" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                            <img
                            src="https://deo.shopeemobile.com/shopee/shopee-careers-live-vn/assets/img/shopee-logo.0ce43657.svg"
                            alt="Shopee Logo"
                            style={{
                                width: "120px", // Tăng kích thước logo
                                height: "40px", // Tăng kích thước logo
                                marginRight: "4px" // Khoảng cách giữa logo và chữ
                            }}
                            />
                            <span style={{
                            color: "#ee4d2d",
                            fontSize: "30px", // Tăng kích thước chữ để phù hợp với logo
                            fontWeight: "bold",
                            lineHeight: "1" // Đảm bảo chữ ngang với logo
                            }}>
                            Careers
                            </span>
                        </NavLink>
                    </li>
                    </div>
                    <div className='nav__title d-flex justify-content-around header__item'>
                        <li className='p-3' style={{ listStyle: "none" }}>
                            <NavLink
                                to="about"
                                className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}
                            >
                                About
                            </NavLink>
                        </li>
                        <li className='p-3' style={{ listStyle: "none" }}>
                            <NavLink
                                to="whyshopee"
                                className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}
                            >
                                Why Shopee
                            </NavLink>
                        </li>
                        <li className='p-3' style={{ listStyle: "none" }}>
                            <NavLink
                                to="opportunity"
                                className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}
                            >
                                Jobs
                            </NavLink>
                        </li>
                        {/* <li className='p-3' style={{ listStyle: "none" }}>
                            <NavLink
                                to="lifeshopee"
                                className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}
                            >
                                Life At Shopee Blog
                            </NavLink>
                        </li> */}
                        <li className='p-3' style={{ listStyle: "none" }}>
                            <NavLink
                                to="Track"
                                className={({ isActive }) => (isActive ? 'active-link' : 'default-link')}
                            >
                                Track
                            </NavLink>
                        </li>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default MainHeader
