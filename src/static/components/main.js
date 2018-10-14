import React, {PureComponent} from "react";
import Header from "./header";
import AmbassadorList from "./ambassadorList";
import SearchBar from "./searchBar";
import SignUp from "./signUp";
import {FormControlLabel, Grid, TextField, Switch} from "@material-ui/core";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class Main extends PureComponent {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Link to="/" style={{textDecoration: "none"}} ><Header /></Link>
                        <Route exact path="/" component={Menu} />
                        <Route path="/search" component={Search} />
                        <Route path="/register" component={SignUp} />
                    </div>
                </Router>
            </div>
        )
    }
};

class Search extends PureComponent {
    state = {
        ambassadors: null,
        firstName: "",
        lastName: ""
    };
    componentDidMount() {
        this.onTagSearch([]);
    }
    onNameSearch = () => {
        //ex. http://localhost:8080/api/ambassadors?firstName=Phillip&lastName=Jones
        const {firstName, lastName} = this.state;
        if(!firstName && !lastName) return;
        fetch(`/api/ambassadors?${firstName ? `firstName=${firstName}` : ""}&${lastName ? `lastName=${lastName}` : ""}`).then(response => response.json()).then(ambassadors => this.setState({ambassadors}));
    };
    onTagSearch = query => {
        //ex. http://localhost:8080/api/ambassadors?tags=Apartment&tags=Education
        const queryArray = [];
        query.map(tag => queryArray.push(tag.name));
        fetch(`/api/ambassadors?tags=${queryArray.join("tags=")}`).then(response => response.json()).then(ambassadors => this.setState({ambassadors, firstName: "", lastName: ""}));
    };
    handleChange = (e, name) => {
        this.setState({[name]: e.target.value}, () => this.onNameSearch());
    };
    render() {
        return (
            <div>
                <SearchBar onTagSearch={this.onTagSearch} handleChange={this.handleChange} onNameSearch={this.onNameSearch} />
                <AmbassadorList ambassadors={this.state.ambassadors}/>
            </div>
        );
    }
}

class Menu extends PureComponent {
    render() {
        return (
            <div style={{textAlign: "center", paddingTop: "12px"}}>
                <Grid container spacing={8} style={{maxWidth: "940px", margin: "auto"}}>
                    <Grid item md={4} sm={12} xs={12} >
                        <Link to="/search"><img src="/images/immigrant-help.png" /></Link>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12} >
                        <Link to="/login"><img src="/images/agency-signin.png" /></Link>
                    </Grid>
                    <Grid item md={4} sm={12} xs={12} >
                        <Link to="/register"><img src="/images/ambassador_signup.png" /></Link>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Main;
