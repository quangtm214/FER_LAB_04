import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import filmApi from '../api/filmsApi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from '@mui/material';
export default function UpdateFilm() {
    const filmState = useParams();
    const [film, setFilm] = useState({
        id: "",
        title: "",
        image: "",
        clip: "",
        year: "",
        nation: "",
        info: "",
    });
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        const fetchFilm = async () => {
            try {
                const response = await filmApi.get(filmState.id);
                console.log(response);
                setFilm(response);
            } catch (error) {
                console.log('Failed to fetch film list: ', error);
            }
        }
        fetchFilm();
    }, []);

    const Addnewfilm = async (data) => {
        try {
            const response = await filmApi.addNewFilm(data);
            console.log(response);
            setOpen(true);
        } catch (error) {
            console.log('Failed to add film : ', error);
        }
    }
    const formik = useFormik({
        enableReinitialize: true,

        initialValues: film,

        onSubmit: (values) => {
            Addnewfilm(values);
        },

        validationSchema: Yup.object({
            title: Yup.string().required("Required."),
            clip: Yup.string().url().required("Required.").typeError("Please enter a valid url"),
            year: Yup.number().integer().required("Required.").typeError("Please enter a valid number"),
            image: Yup.string().url().required("Required.").typeError("Please enter a valid url"),
            nation: Yup.string().required("Required."),
            info: Yup.string().required("Required."),
        }),

    });
    return (
        <div>
            <h1 className="font-pages">Add new staff</h1>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.title && (<Typography variant="caption" color="red">{formik.errors.title}</Typography>)}
                    <TextField
                        label="Image"
                        name="image"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.image && (<Typography variant="caption" color="red">{formik.errors.image}</Typography>)}
                    <TextField
                        label="Year"
                        name="year"
                        value={formik.values.year}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.year && (<Typography variant="caption" color="red">{formik.errors.year}</Typography>)}
                    <TextField
                        label="Clip"
                        name="clip"
                        value={formik.values.clip}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.clip && (<Typography variant="caption" color="red">{formik.errors.clip}</Typography>)}
                    <TextField
                        label="Nation"
                        name="nation"
                        value={formik.values.nation}
                        onChange={formik.handleChange}
                    />

                    {formik.errors.nation && (<Typography variant="caption" color="red">{formik.errors.nation}</Typography>)}
                    <TextField
                        label="Info"
                        name="info"
                        multiline
                        rows={4}
                        value={formik.values.info}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.info && (<Typography variant="caption" color="red">{formik.errors.info}</Typography>)}



                </Stack>

                <Button variant="contained" size="small"
                    type='submit'>
                    Save
                </Button>

            </form>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Congraturation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="success">
                            <AlertTitle>Update successful!</AlertTitle>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button><Link to='/dashboard' style={{ textDecoration: "none" }}>Dashboard</Link></Button>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


        </div>
    )
}
