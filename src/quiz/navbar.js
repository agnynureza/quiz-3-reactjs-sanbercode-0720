import React, {useContext} from 'react'
import logo from '../img/logo.png'
import {Link} from 'react-router-dom'
import {LoginContext} from './loginContext'

const Navbar = () => {
    const[status, setStatus] = useContext(LoginContext)

    return (
        <>
        <header>
            <img id="logo" src={logo} width="200px"/>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home </Link> 
                    </li>
                    <li>
                        <Link to="/about">About </Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link> 
                    </li>
                    <li>
                        <Link to="/movies">Movie List Editor</Link> 
                    </li>
                    {status ? 
                        <li>
                            <Link to="/">Logout</Link> 
                        </li> 
                      :
                        <li>
                        <Link to="/login">Login</Link> 
                        </li>
                    }  
                </ul>
            </nav>
        </header>
        </> 
    )
}
export default Navbar;