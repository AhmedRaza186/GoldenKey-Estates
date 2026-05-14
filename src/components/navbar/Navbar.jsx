import React, { useState } from 'react'
import './Navbar.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav>
            <div className="linksSide">
                <div className="logo">
                    <a href="" className='logoLink'>
                        <img src="/logo.png" alt="logo" />
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
            <div className={open ? "menuIcon active" : "menuIcon"} onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={open ? faXmark : faBars} />
            </div>
            <div className={open ? "mobileMenu active" : "mobileMenu"}>
                <div className="links" onClick={() => setOpen(false)}>
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
