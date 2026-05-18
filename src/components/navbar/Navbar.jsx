import React, { useContext, useState } from 'react'
import './Navbar.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext.jsx'
import { NotificationContext } from '../../context/NotificationContext.jsx'

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const { notificationCount } = useContext(NotificationContext);
    
    // let user = true

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
                {currentUser ? (
                    <div className="user">
                    <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
                        <span>{currentUser.username}</span>
                        <Link to="/profile" className="profile">
                            {notificationCount > 0 && <div className="notification">{notificationCount}</div>}
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
