import React, {PureComponent} from "react";
import Header from "./header";
import CoursesList from "./CourseList"

class Main extends PureComponent {
    render() {
        return (
            <div>
                <Header />
                <CoursesList />
            </div>
        );
    }
}

export default Main;
