import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const navItems = [
    {
        id: 1,
        name: 'Home',
        linkName: '/'
    },
    {
        id: 2,
        name: 'About',
        linkName: '/About'
    },
    {
        id: 3,
        name: 'Contact',
        linkName: '/Contact'
    }
];
export default function Navbar() {
    return (
        <AppBar component="nav" sx={{ mb: 10 }}>
            <Toolbar>

                <Typography variant="h4" sx={{ my: 2 }}>
                    MUI
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {navItems.map((item) => (
                        <Link to={`/`}>
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
