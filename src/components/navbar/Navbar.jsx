import React from 'react'
import './Navbar.scss'
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    return (
        <nav>
            <div className="linksSide">
                <div className="logo">
                    <a href="" className='logoLink'>
                        <img src={logo} alt="logo" />
                        <span>GoldenKey</span>
                    </a>
                </div>
                <div className="links">
                    <a href='#'>Home</a>
                    <a href='#'>About</a>
                    <a href='#'>Contact</a>
                    <a href='#'>Agents</a>
                </div>
            </div>
            <div className="btnsSide">
                <button className="login">Login</button>
                <button className="signup">Sign Up</button>
            </div>
              <div className="menuIcon">
                
              </div>
            <div className="mobileMenu">
                <div className="links">
                    <a href='#'>Home</a>
                    <a href='#'>About</a>
                    <a href='#'>Contact</a>
                    <a href='#'>Agents</a>
                    <a className="login">Login</a>
                    <a className="signup">Sign Up</a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
