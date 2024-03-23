import React from 'react'
import styles from '../../styles/navbar.module.css'
import logo from '../../assets/images/logo.png'
import { useAuthValue } from '../../context/userAuthentication'
import { Link } from 'react-router-dom'
import { LuPenSquare } from "react-icons/lu";
import { toast } from 'react-toastify'

/**
 * Navbar component
 * @returns 
 */
function Navbar() {
    const { authetication, handleAuthetication } = useAuthValue()
    /**
     * Handles the logout functionality by removing the data from local strorage and making authetication state as null
     */
    const handleLogout = () => {
        handleAuthetication(null)
        localStorage.removeItem('authetication');
        toast.success('User logged out successfully.')
    }

    return (
        <header>
            <nav className={styles.headerContainer}>
                <div className={styles.leftCont}>
                    <div className={styles.logoContainer}>
                        <h1>
                            <Link to="/">
                                <img src={logo} alt='Story Scape' width='60px' height='60px' />
                                <span style={{ color: '#009dda' }}>Story</span> Scape
                            </Link>

                        </h1>
                    </div>
                    <div className={styles.searchContainer}>
                        <input type="text" placeholder="Search" />
                    </div>
                </div>
                <div className={styles.navContainer}>
                    <ul>
                        {!authetication &&
                            <><li>
                                <Link to="/story">Our Story</Link>
                            </li>
                                <li>
                                    <Link to="/sign-in">Sign in</Link>
                                </li>
                                <li>
                                    <Link to="/sign-up">Sign up</Link>
                                </li></>
                        }
                        {authetication &&
                            <>
                                <li>
                                    <Link to="/write"><LuPenSquare />
                                        Write</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                                <li>
                                    <img src={`${process.env.REACT_APP_BACKEND_ENDPOINT}${authetication.avatar}`} width="40" height="40" />
                                </li>
                            </>
                        }
                    </ul>
                </div>

            </nav>
        </header>
    )
}

export default Navbar