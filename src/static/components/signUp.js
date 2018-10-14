import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FaceIcon from '@material-ui/icons/Face';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Search from "./search";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignUp extends React.Component {
static propTypes = {
        classes: PropTypes.object.isRequired,
        onSearch: PropTypes.func
    };

static defaultProps = {
        onSearch: null
    };

    onTagSearch = (query, name) => {
        //set the array that returns to state
        //console.log(query);
        this.setState({[name]:query});
    };

    state = {
        firstName: "",
        lastName: "",
        zipCode: "",
        phone: "",
        email: "",
        status: "ACTIVE",
        gender: "UNSPECIFIED",
        language: [],
        skill: [],
        tags: []
    };

    handleChange(e, name) {
        this.setState({[name]: e.target.value});
    }

    onFormSubmit(event) {
        event.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            postalCode: this.state.postalCode,
            phone: this.state.phone,
            email: this.state.email,
            status: this.state.status,
            gender: this.state.gender,
            tags: [...this.state.skill.map(i => {return{id:i.id}}), ...this.state.language.map(i => {return{id:i.id}})]
        }
        //console.log(data);
        fetch('/api/ambassadors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                data
            )
        });
        //console.log("submit");
    }
    render() {
        const {classes} = this.props;

        //console.log(this.state);

        return (
            <React.Fragment>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <FaceIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5" style={{textAlign: "center"}}>
                            Register Ambassador
                        </Typography>
                        <form className={classes.form}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="firstName">First Name</InputLabel>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    autoComplete="firstName"
                                    autoFocus
                                    onChange={(e) => this.handleChange(e, "firstName")} value={this.state.firstName}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="lastName">
                                    Last Name
                                </InputLabel>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    autoComplete="lastName"
                                    autoFocus
                                    onChange={(e) => this.handleChange(e, "lastName")} value={this.state.lastName}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="Zip Code">
                                    Zip Code
                                </InputLabel>
                                <Input
                                    name="Zip Code"
                                    type="Zip Code"
                                    id="Zip Code"
                                    onChange={(e) => this.handleChange(e, "postalCode")} value={this.state.postalCode}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="Phone Number">
                                    Phone
                                </InputLabel>
                                <Input
                                    name="Phone Number"
                                    type="Phone Number"
                                    id="Phone Number"
                                    onChange={(e) => this.handleChange(e, "phone")} value={this.state.phone}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="Email">
                                    Email
                                </InputLabel>
                                <Input
                                    name="Email"
                                    type="Email"
                                    id="Email"
                                    onChange={(e) => this.handleChange(e, "email")} value={this.state.email}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="Status">Status</InputLabel>
                                <Select
                                    onChange={(e) => this.handleChange(e, "status")} value={this.state.status}
                                >
                                    <MenuItem value={"ACTIVE"}>Active</MenuItem>
                                    <MenuItem value={"INACTIVE"}>Inactive</MenuItem>
                                    <MenuItem value={"PAUSED"}>Paused</MenuItem>
                                </Select>
                            </FormControl>
                            <div>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="Gender">Gender</InputLabel>
                                <Select
                                    onChange={(e) => this.handleChange(e, "gender")} value={this.state.gender}
                                >
                                    <MenuItem value={"MALE"}>Male</MenuItem>
                                    <MenuItem value={"FEMALE"}>Female</MenuItem>
                                    <MenuItem value={"UNSPECIFIED"}>Unspecified</MenuItem>
                                    <MenuItem value={"OTHER"}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            </div>
                            <div></div>
                            <Search onSearch={(query) => this.onTagSearch(query, "skill")} searchType="skill" searchName="Skills"
                                    placeHolder="ex. legal services"/>
                            <Search onSearch={(query) => this.onTagSearch(query, "language")} searchType="language" searchName="Language"
                                    placeHolder="ex. Spanish, Italian"/>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={(e) => this.onFormSubmit(e)}
                            >
                                Sign Up
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(SignUp);
