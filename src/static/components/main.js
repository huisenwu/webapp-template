import React, {PureComponent} from "react";
import Header from "./header";
import AmbassadorList from "./ambassadorList";
import Search from "./search";
import {FormGroup, FormControlLabel, TextField, Switch} from "@material-ui/core";

class Main extends PureComponent {
    state = {
        ambassadors: null
    };
    onSearch = query => {
        //ex. http://localhost:8080/api/ambassadors?tags=Apartment&tags=Education
        fetch(`/api/ambassadors?tags=${query.join("tags=")}`).then(response => response.json()).then(ambassadors => this.setState({ambassadors}));
    };
    render() {
        console.log("!!! AMBASS", this.state.ambassadors);
        return (
            <div>
                <Header />
                <div style={{height: "85px", display: "flex", justifyContent: "space-around", alignContent: "center"}}>
                    <TextField label="Name" margin="normal"/>
                    <Search onSearch={this.onSearch} />
                    <TextField label="Languages" margin="normal"/>
                    <TextField label="Location" margin="normal"/>
                    <TextField label="Gender" margin="normal"/>
                    <FormControlLabel control={<Switch value="Available"/>} label="Available" />
                </div>
                <AmbassadorList ambassadors={this.state.ambassadors}/>

            </div>
        );
    }
}

export default Main;
