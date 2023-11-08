import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useContext } from 'react';
import { useUserContext } from './Authen';


const navItems = [
    {
        id: 1,
        name: 'Home',
        linkName: '/'
    },
    {
        id: 2,
        name: 'login',
        linkName: '/login'
    }, {
        id: 3,
        name: 'Dashboard',
        linkName: '/dashboard'
    },
];
export default function Navbar() {
    const [auth, setAuth] = React.useState(true);
    const { user } = useUserContext();
    return (

        <AppBar component="nav" sx={{ mb: 10 }}>
            <Toolbar>
                <Typography variant="h4" sx={{ my: 2 }}>
                    Cinema
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {navItems.filter(item => item.name !== 'Dashboard' || user)
                        .map((item) => (
                            <Link to={item.linkName}>
                                <Button key={item.id} sx={{ color: '#fff' }}>
                                    {item.name}
                                </Button>
                            </Link>
                        ))}
                </Box>
            </Toolbar>
        </AppBar>
    )
}
