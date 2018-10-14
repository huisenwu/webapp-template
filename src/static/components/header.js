import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const Header = () => (
    <div >
        <StyledAppBar position="static">
            <Toolbar>
                <Typography variant="title" color="inherit">
                    Ambassador Connect
                </Typography>
            </Toolbar>
        </StyledAppBar>
    </div>
);

const StyledAppBar = withStyles({
    root: {
        backgroundColor: '#078b75'
    }
})(AppBar);

export default Header;
