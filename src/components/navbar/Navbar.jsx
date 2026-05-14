import React, { useState } from 'react'
import './Navbar.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const [open, setOpen] = useState(false);
    let user = false

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
                        <button className="login">Login</button>
                        <button className="signup">Sign Up</button>


                    </>
                )}

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
