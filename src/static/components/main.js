import React, {PureComponent} from "react";
import Header from "./header";
import AmbassadorList from "./ambassadorList";
import Search from "./search";

class Main extends PureComponent {

    onSearch = query => {
        //@TODO need endpoint for search and query shape
        console.log("!!! - onSearch func - query", query);
        // fetch(`/api/ambassadors${query}`).then(response => response.json()).then(ambassadors => this.setState({ambassadors}));
    };
    render() {
        return (
            <div>
                <Header />
                <Search onSearch={this.onSearch} />
                <AmbassadorList />
            </div>
        );
    }
}

export default Main;
