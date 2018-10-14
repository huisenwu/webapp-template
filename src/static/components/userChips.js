import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit,
    },
});

function handleDelete() {
    alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

function handleClick() {
    alert('You clicked the Chip.'); // eslint-disable-line no-alert
}

function OutlinedChips(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Chip
                label="Prototype Cip"
                onClick={handleClick}
                onDelete={handleDelete}
                className={classes.chip}
                Todo
                color= "primary"
                deleteIcon={<DoneIcon />}
                variant="outlined"
            />
        </div>
    );
}

OutlinedChips.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedChips);