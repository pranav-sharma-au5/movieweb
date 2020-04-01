import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { search } from "../actions/actions";
import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
    state = {
        query: '',
        redirectToSearch: false
    }

    handleSearch(e) {
        e.preventDefault()
        const { query } = this.state
        const { search } = this.props

        if (e.target.checkValidity()) {
            search(query)
            this.setState({ redirectToSearch: true }, () => this.setState({ redirectToSearch: false }))
        }

    }

    render() {
        const active = (tabName) => {
            const { pathname } = this.props.location
            return pathname.includes(tabName)
        }

        const { redirectToSearch, query } = this.state


        return (
            <header>
                <nav className="Navbar">

                    <div className="logo ">
                        MovieWeb
                    </div>
                    <ul className="navbar-list">
                        <li>
                            <Link to="/movies" >
                                <span className={"mx-3 " + (active('movie') ? 'active' : 'inactive')} >Movies</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/tvshows" >
                                <span className={" " + (active('tvshows') ? 'active' : 'inactive')} >TV Shows</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="search-div  ">
                        <form onSubmit={(e) => this.handleSearch(e)} action="">
                            <input value={this.state.query}
                                onChange={(e) => this.setState({ query: e.target.value })}
                                type="text" placeholder="Search here" className="navbar-search-input"
                                required />

                            <div className="navbar-search-icon">
                                <button> <i className="fa  fa-search"></i></button>
                            </div>

                        </form>
                    </div>
                    <div className="navbar-profile">
                        <span>Login </span>
                        <span>SignUp</span>
                    </div>
                </nav>
                {redirectToSearch ? <Redirect to={`/search?query=${query}`} /> : ""}
            </header >);
    }
}

let mapState = (state) => state


let mapProps = (dispatch) => {
    return bindActionCreators({ search }, dispatch)
}
export default connect(mapState, mapProps)(Navbar);