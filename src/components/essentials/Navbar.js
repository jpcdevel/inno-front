import { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../static/images/logo.svg'

import { UserContext } from '../auth/AuthLayer'

function Navbar() {
    const [path, setPath] = useState(window.location.pathname.split("/"))
    const [lastPath, setLastPath] = useState(window.location.pathname.split("/").pop())
    const { user } = useContext(UserContext)
    const loc = useLocation()

    useEffect(() => {
        let pathTemp = window.location.pathname.split("/")
        setPath(pathTemp)
        setLastPath(pathTemp.pop())
    }, [loc])

    return (
        <div className="navbar_main">
            <img src={logo} width="40px" />

            {user.type !== "startup" && (
                <Link 
                    to={"/"} 
                    className={lastPath == '' ? "menu_item menu_item_active" : "menu_item"}
                    style={{marginLeft: "20px"}}
                >
                    Витрина
                </Link>
            )}

            {user.type == 'startup' && (
                <Link 
                    to={"/my"} 
                    className="menu_item"
                    className={lastPath == 'my' ? "menu_item menu_item_active" : "menu_item"}
                >
                    Мои продукты
                </Link>
            )}

            <Link 
                to={"/logout"}
                className="menu_item ms-auto"
            >
                Выйти
            </Link>
        </div>
    )
}

export default Navbar