import React, {PureComponent} from "react";
import Header from "./header";
import AmbassadorList from "./ambassadorList"

class Main extends PureComponent {
    render() {
        return (
            <div>
                <Header />
                <AmbassadorList />
            </div>
        );
    }
}

export default Main;
