import React, {PureComponent} from "react"
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Course from "./Course"

class CoursesList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        };
    }

    componentDidMount() {
        fetch("/api/courses").then(response => response.json()).then(courses => this.setState({courses}));
    }

    render() {
        const {courses} = this.state;
        return (
            <div>
                {courses ?
                    <div>
                        <Grid container spacing={24} style={{padding: 24}}>
                            {courses.map(currentCourse =>
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Course course={currentCourse}/>
                                </Grid>
                            )}
                        </Grid>
                    </div> :
                "No courses found"}
            </div>
        )
    }
}

export default CoursesList;