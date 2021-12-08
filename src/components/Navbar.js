// import React from 'react'
import PropTypes from 'prop-types'


/* 
1. mode => dark or light
2. title => Tile of Navbar
3. aboutText => About

*/
export default function Navbar(props) {

    return (
        <nav id="navBar" className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`} style={{ height: "60px", borderBottom: props.mode === "dark" ? "1px solid white" : "1px solid black" }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    {props.title}
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">
                                {props.aboutText}
                            </a>
                        </li>
                    </ul>
                    {/* <form className="d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-primary" type="submit">
                            Search
                        </button>
                    </form> */}
                    <div className={`form-check form-switch text-${props.mode === "dark" ? "light" : "dark"} mx-3`}>
                        <input className="form-check-input" onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                    </div>
                </div>
            </div>
        </nav>
    )
}

// sets the type of props
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    aboutText: PropTypes.string.isRequired
}

// set the default value if no value is given
Navbar.defaultProps = {
    title: "Set title here",
    aboutText: 'About'
}