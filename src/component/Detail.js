import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Films } from '../shared/ListOfFilms';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Detail() {
    const sateFilm = useParams();
    const film = Films.find(obj => {
        return obj.id == sateFilm.id;
    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (

        <>
            <Card sx={{ display: 'flex', pt: 10 }} >
                <CardActionArea sx={{ display: 'flex', pl: 1, pb: 1 }}>
                    <CardMedia
                        component="img"
                        image={film.image}
                        alt="green iguana"
                    />
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                            {film.title}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {film.year}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {film.nation}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {film.info}
                        </Typography>
                        <IconButton onClick={handleOpen} aria-label="play/pause">
                            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <iframe src={film.clip} title={film.title} frameborder="0"
                        style={{ width: 700, height: 400, }}
                        allow="accelerometer; autoplay; clipboard-write; 
                        encrypted-media; gyroscope; picture-in-picture" >
                    </iframe>
                </Box>
            </Modal >
        </>
    )
}
