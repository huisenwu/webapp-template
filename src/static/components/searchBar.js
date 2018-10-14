import React, {PureComponent} from "react"
import PropTypes from "prop-types";
import {TextField, FormControlLabel, Switch} from "@material-ui/core";
import Search from "./search";

class SearchBar extends PureComponent {
    static propTypes = {
        onTagSearch: PropTypes.func,
        onNameSearch: PropTypes.func
    };
    static defaultProps = {
        onTagSearch: null,
        onNameSearch: null
    };
    render() {
        return (
            <div style={{height: "85px", display: "flex", justifyContent: "space-around", alignContent: "center", backgroundColor: "#DCDCDC"}}>
                <TextField label="First Name" onChange={(e) => this.props.handleChange(e, "firstName")} margin="normal"/>
                <TextField label="Last Name" onChange={(e) => this.props.handleChange(e, "lastName")} margin="normal"/>
                <Search onSearch={this.props.onTagSearch} searchType="skill" searchName="Skills" placeHolder="ex. legal services" />
                <Search onSearch={this.props.onTagSearch} searchType="language" searchName="Language" placeHolder="ex. Spanish, Italian" />
                <FormControlLabel control={<Switch value="Available"/>} label="Available" />
            </div>
        )
    }
}

export default SearchBar;
