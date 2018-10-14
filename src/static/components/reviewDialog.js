import React from 'react';
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {ArrowForward} from "@material-ui/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faMeh, faFrown } from '@fortawesome/free-solid-svg-icons';


export default class FormDialog extends React.Component {
    static propTypes = {
      ambassador: PropTypes.object
    };
    static defaultProps = {
      ambassador: null
    };
    state = {
        open: false,
        rating: null,
        review: ""
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    onSaveFeedback = () => {
        const {rating, review} = this.state;
        if(!rating) return;
        fetch(`/api/ambassadors/${this.props.ambassador.id}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rating, review})
        }).then(() => this.handleClose());
    };
    handleChange = (e) => {
        this.setState({review: e.target.value})
    };
    render() {
        const {ambassador} = this.props;
        const fullName = `${ambassador.firstName} ${ambassador.lastName}`;
        return (
            <div>
                <Button onClick={this.handleClickOpen} color="primary">Leave Feedback</Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: 400}}>
                        <div style={{width: 200, height: 200, borderRadius: 200, backgroundColor: "#078B75", margin: 20}}/>
                        <div>Rate</div>
                        <div><b>{fullName}</b></div>
                        <div style={{margin: "20px 0"}}>
                            <FontAwesomeIcon icon={faFrown} onClick={() => this.setState({rating: 1})} style={{color: this.state.rating === 1 ? "#078B75" : "#C1C1C1", fontSize: 80, margin: "0 10px"}} />
                            <FontAwesomeIcon icon={faMeh} onClick={() => this.setState({rating: 2})} style={{color: this.state.rating === 2 ? "#078B75" : "#C1C1C1", fontSize: 80, margin: "0 10px"}} />
                            <FontAwesomeIcon icon={faSmile} onClick={() => this.setState({rating: 3})} style={{color: this.state.rating === 3 ? "#078B75" : "#C1C1C1", fontSize: 80, margin: "0 10px"}} />
                        </div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={`Describe the experience with ${fullName}`}
                            fullWidth
                            onChange={this.handleChange}
                        />
                        <div style={{background: !this.state.rating ? "#C1C1C1" : "#078B75", borderRadius: 10, margin: 20}}>
                            <Button disabled={!this.state.rating}>
                                <ArrowForward onClick={this.onSaveFeedback} style={{fontSize: 75, color: "white"}} />
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}