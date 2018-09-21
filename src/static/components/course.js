import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Course = props => (
    <div>
        {props.course ? 
            <Card >
                <CardContent>
                    <Typography gutterBottom variant="headline">
                        {props.course.title}
                    </Typography>
                    <Typography>
                        {props.course.description}
                    </Typography>
                </CardContent>
            </Card> :
        null}
    </div>
);

export default Course;