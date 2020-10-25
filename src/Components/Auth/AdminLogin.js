import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
//import CssBaseLine from 'material-ui/core/CssBaseLine';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';
const myTheme = createMuiTheme({
    palette:createPalette({
    primary: {
        main: `#E33E7F`,
      },
      secondary: {
        main: '#900C3F',
      },
    })
}
);
const myStyles = makeStyles((theme)=>({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    iconhold: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    }
}
));

function AdminLogin(){
    return(
        <Container>
            <ThemeProvider theme = {myTheme}>
                <CssBaseline/>
                <Grid item xs>
                    <Typography>
                        Still in the works!
                    </Typography>
                </Grid>
            </ThemeProvider>
        </Container>
    );
}

export default AdminLogin;