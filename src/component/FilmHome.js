import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import filmApi from '../api/filmsApi';
import { useEffect } from 'react';

export default function FilmHome() {

    const [Films, setFilms] = useState([]);

    useEffect(() => {
        const fetchFilmsList = async () => {
            try {
                const response = await filmApi.getAll();
                console.log(response);
                setFilms(response);
            } catch (error) {
                console.log('Failed to fetch film list: ', error);
            }
        }
        fetchFilmsList();
    }, []);

    return (
        <Grid container spacing={12} sx={{ pt: 10 }}>
            {
                Films.map((film) => (
                    <Grid item xs={4} key={film.id}>
                        <Card sx={{ maxWidth: 300 }}>
                            <CardActionArea>
                                <Link to={`detail/${film.id}`}>
                                    <CardMedia
                                        component="img"
                                        image={film.image}
                                        alt="green iguana"
                                    />
                                </Link>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {film.title}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {film.year}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {film.nation}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))
            }
        </Grid >


    )
}
