import React, {PureComponent} from "react"
import PropTypes from "prop-types";
import {List, ListItem, ListItemText, Divider} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Ambassador from "./ambassador"

class AmbassadorList extends PureComponent {
    constructor(props) {
        super(props);
    }
    static propTypes = {
        ambassadors: PropTypes.array
    };
    static defaultProps = {
        ambassadors: null
    };
    render() {
        const {ambassadors} = this.props;
        return (
            <div style={{margin: "20px"}}>
                    <div>
                        <Divider />
                {ambassadors ?
                        <List>
                            {ambassadors.map(currentAmbassador =>
                                <ListItem xs={12} sm={6} lg={4} xl={3} key={currentAmbassador.id} >
                                    <Ambassador ambassador={currentAmbassador} />
                                </ListItem>
                            )}
                        </List> :
                "No Ambassadors found"}
                    </div>
            </div>
        )
    }
}

export default AmbassadorList;
