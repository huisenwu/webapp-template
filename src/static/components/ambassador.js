import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const Ambassador = props => (
    <div>
        {props.ambassador ?
            <Card >
                <CardContent>
                    <Typography gutterBottom variant="headline">
                        {props.ambassador.firstName}{props.ambassador.lastName}
                    </Typography>
                    <Typography>
                        {props.ambassador.description}
                    </Typography>
                </CardContent>
            </Card> :
        null}
    </div>
);

export default Ambassador;