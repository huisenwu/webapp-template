import React, {PureComponent} from "react"
import Grid from "@material-ui/core/Grid";
import Ambassador from "./ambassador"

class AmbassadorList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            ambassadors: []
        };
    }

    componentDidMount() {
        fetch("/api/ambassadors").then(response => response.json()).then(ambassadors => this.setState({ambassadors}));
    }

    render() {
        const {ambassadors} = this.state;
        return (
            <div>
                {ambassadors ?
                    <div>
                        <Grid container spacing={24} style={{padding: 24}}>
                            {ambassadors.map(currentAmbassador =>
                                <Grid item xs={12} sm={6} lg={4} xl={3} key={currentAmbassador.id} >
                                    <Ambassador ambassador={currentAmbassador} />
                                </Grid>
                            )}
                        </Grid>
                    </div> :
                "No Ambassadors found"}
            </div>
        )
    }
}

export default AmbassadorList;
