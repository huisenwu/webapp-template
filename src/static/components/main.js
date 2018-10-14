import React, {PureComponent} from "react";
import Header from "./header";
import AmbassadorList from "./ambassadorList";
import SearchBar from "./searchBar";
import SignUp from "./signUp";

class Main extends PureComponent {
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
                <Header />
                <SearchBar onTagSearch={this.onTagSearch} handleChange={this.handleChange} onNameSearch={this.onNameSearch} />
                <AmbassadorList ambassadors={this.state.ambassadors}/>
                <div>
                    <SignUp />
                </div>

            </div>
        );
    }
}

export default Main;
