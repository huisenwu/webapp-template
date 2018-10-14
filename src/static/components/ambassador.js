import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ExpansionPanel, Chip, ExpansionPanelSummary, ExpansionPanelDetails, Button, Divider} from '@material-ui/core';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {PlayArrow, Pause, Stop} from "@material-ui/icons";
const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});

function DetailedExpansionPanel(props) {
    const { classes, ambassador } = props;
    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className={classes.column} style={{display: "flex"}}>
                        {
                            ambassador.status === "ACTIVE" ?
                                <PlayArrow style={{paddingRight: 10}} /> :
                                ambassador.status === "INACTIVE" ?
                                    <Stop style={{paddingRight: 10}}/> :
                                ambassador.status === "PAUSED" ?
                                    <Pause style={{paddingRight: 10}}/> :
                                    null
                        }
                        <Typography className={classes.heading}>{ambassador.firstName} {ambassador.lastName}</Typography>
                    </div>
                    <div className={classes.column}>
                        {
                            ambassador?.tags?.map(tag => {
                                if(tag.type === "Skill") return <Chip label={tag.name} key={tag.id} className={classes.chip} />
                            })
                        }
                    </div>
                    <div className={classes.column}>
                        {
                            ambassador?.tags?.map(tag => {
                                if(tag.type === "Language") return <Chip label={tag.name} key={tag.id} className={classes.chip} />
                            })
                        }
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>{ambassador?.postalCode}</Typography>
                     </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <div className={classes.column} />
                    <div className={classes.column}>
                        <Typography className={classes.heading}>{ambassador?.gender}</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>{ambassador?.phone}</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Ratings 2.3/3 based on 24 ratings</Typography>
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelDetails className={classes.details}>
                    <div className={classes.column} />
                    <div className={classes.column}>
                        <Typography className={classes.heading}>{ambassador?.email}</Typography>
                    </div>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Button size="small" color="primary">Leave Feedback</Button>
                    <Button size="small" color="primary">Edit</Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        </div>
    );
}

DetailedExpansionPanel.propTypes = {
    classes: PropTypes.object.isRequired,
    ambassador: PropTypes.object
};
DetailedExpansionPanel.defaultProps = {
    ambassador: null
};

export default withStyles(styles)(DetailedExpansionPanel);
