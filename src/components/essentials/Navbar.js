import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../static/images/logo.svg'

function Navbar() {
    const [path, setPath] = useState(window.location.pathname.split("/"))
    const [lastPath, setLastPath] = useState(window.location.pathname.split("/").pop())

    const loc = useLocation()
    console.log(window.location.pathname.split("/").includes("my"))

    useEffect(() => {
        let pathTemp = window.location.pathname.split("/")
        setPath(pathTemp)
        setLastPath(pathTemp.pop())
    }, [loc])

    return (
        <div className="navbar">
            <img src={logo} width="40px" />

            <Link 
                to={"/"} 
                className={lastPath == '' ? "menu_item menu_item_active" : "menu_item"}
                style={{marginLeft: "20px"}}
            >
                Витрина
            </Link>

            <Link 
                to={"/my"} 
                className="menu_item"
                className={lastPath == 'my' ? "menu_item menu_item_active" : "menu_item"}
            >
                Мой проект
            </Link>

            <Link 
                to={"/request"}
                className={lastPath == 'request' ? "menu_item menu_item_active" : "menu_item"}
            >
                Запрос
            </Link>
        </div>
    )
}

export default Navbar