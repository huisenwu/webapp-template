import React, {PureComponent} from "react";
import Header from "./header";
import AmbassadorList from "./ambassadorList";
import Search from "./search";
import {FormControlLabel, TextField, Switch} from "@material-ui/core";

class Main extends PureComponent {
    state = {
        ambassadors: null,
        firstName: "",
        lastName: ""
    };
    componentDidMount() {

    }
    onNameSearch() {
        //ex. http://localhost:8080/api/ambassadors?firstName=Phillip&lastName=Jones
        const {firstName, lastName} = this.state;
        if(!firstName && !lastName) return;
        fetch(`/api/ambassadors?${firstName ? `firstName=${firstName}` : ""}&${lastName ? `lastName=${lastName}` : ""}`).then(response => response.json()).then(ambassadors => this.setState({ambassadors}));
    }
    onTagSearch = query => {
        //ex. http://localhost:8080/api/ambassadors?tags=Apartment&tags=Education
        fetch(`/api/ambassadors?tags=${query.join("tags=")}`).then(response => response.json()).then(ambassadors => this.setState({ambassadors, firstName: "", lastName: ""}));
    };
    handleChange(name) {
        this.setState({[name]: event.target.value}, () => this.onNameSearch());
    }
    render() {
        return (
            <div>
                <Header />
                <div style={{height: "85px", display: "flex", justifyContent: "space-around", alignContent: "center", backgroundColor: "#DCDCDC"}}>
                    <TextField label="First Name" onChange={() => this.handleChange("firstName")} margin="normal" value={this.state.firstName}/>
                    <TextField label="Last Name" onChange={() => this.handleChange("lastName")} margin="normal" value={this.state.lastName}/>
                    <Search onSearch={this.onTagSearch} searchType="skill" searchName="Skills" placeHolder="ex. legal services" />
                    <Search onSearch={this.onTagSearch} searchType="language" searchName="Language" placeHolder="ex. Spanish, Italian" />
                    <FormControlLabel control={<Switch value="Available"/>} label="Available" />
                </div>
                <AmbassadorList ambassadors={this.state.ambassadors}/>

            </div>
        );
    }
}

export default Main;
