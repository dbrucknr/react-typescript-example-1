import { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateListing from "../listings/create-listing.component";

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        CRUD Sample
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/create"} className="navbar-brand">Create Listing</Link>
                        </li>
                    </div>
                </nav>
                <div className="container mt-3">
                    <Switch>
                        <Route exact path="/create" component={CreateListing} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default Navbar
