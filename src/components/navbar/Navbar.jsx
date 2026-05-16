import React, { useState } from 'react'
import './Navbar.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [open, setOpen] = useState(false);
    let user = true

    return (
        <nav>
            <div className="linksSide">
                <div className="logo">
                    <Link to="/" className='logoLink'>
                        <img src="/logo.png" alt="logo" />
                        <span>GoldenKey</span>
                    </Link>
                </div>
                <div className="links">
                    <a href='#'>Home</a>
                    <a href='#'>About</a>
                    <a href='#'>Contact</a>
                    <a href='#'>Agents</a>
                </div>
            </div>
            <div className="btnsSide">
                {user ? (
                    <div className="user">
                        <img
                            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                            alt=""
                        />
                        <span>John Doe</span>
                        <Link to="/profile" className="profile">
                            <div className="notification">3</div>
                            <span>Profile</span>
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="login">Login</Link>
                        <Link to="/register" className="signup">Sign Up</Link>
                    </>
                )}

            </div>
            <div className={open ? "menuIcon active" : "menuIcon"} onClick={() => setOpen(!open)}>
                <FontAwesomeIcon icon={open ? faXmark : faBars} />
            </div>
            <div className={open ? "mobileMenu active" : "mobileMenu"}>
                <div className="links" onClick={() => setOpen(false)}>
                    <Link to='/'>Home</Link>
                    <Link to='/'>About</Link>
                    <Link to='/'>Contact</Link>
                    <Link to='/'>Agents</Link>
                    <Link to="/login" className="login">Login</Link>
                    <Link to="/register" className="signup">Sign Up</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
