import React, {PureComponent} from "react";
import Header from "./header";
import AmbassadorList from "./ambassadorList";
import Search from "./search";
import {FormControlLabel, TextField, Switch} from "@material-ui/core";
import SignUp from "./signUp";

class Main extends PureComponent {
    state = {
        ambassadors: null
    };
    onTagSearch = query => {
        //ex. http://localhost:8080/api/ambassadors?tags=Apartment&tags=Education
        fetch(`/api/ambassadors?tags=${query.join("tags=")}`).then(response => response.json()).then(ambassadors => this.setState({ambassadors}));
    };
    render() {
        console.log("!!! AMBASS", this.state.ambassadors);
        return (
            <div>
                <Header />
                <div style={{height: "85px", display: "flex", justifyContent: "space-around", alignContent: "center", backgroundColor: "#DCDCDC"}}>
                    <TextField label="Name" margin="normal"/>
                    <Search onSearch={this.onTagSearch} searchType="skill" searchName="Skills" placeHolder="ex. legal services" />
                    <Search onSearch={this.onTagSearch} searchType="language" searchName="Language" placeHolder="ex. Spanish, Italian" />
                    <TextField label="Location" margin="normal"/>
                    <TextField label="Gender" margin="normal"/>
                    <FormControlLabel control={<Switch value="Available"/>} label="Available" />
                </div>
                <AmbassadorList ambassadors={this.state.ambassadors}/>
                <div>
                    <SignUp onSearch={this.onTagSearch}/>
                </div>

            </div>
        );
    }
}

export default Main;
