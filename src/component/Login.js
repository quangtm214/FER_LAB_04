import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import adminApi from '../api/adminApi';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './Authen';
export default function Login() {
    const navigate = useNavigate();
    const { user, loginUser, logoutUser } = useUserContext();

    const [on, setOn] = useState('none');
    const fetchUser = async (name, pass) => {
        try {
            const response = await adminApi.getAll();
            console.log(response);
            const filteredUser = response.find((user2) => user2.name === name && user2.pass === pass);
            console.log(filteredUser);
            if (filteredUser) {
                loginUser(filteredUser);
                navigate('/dashboard');
            } else {
                setOn('block');
            }
        } catch (error) {
            console.log('Failed to fetch user : ', error);
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: "",
            pass: "",
        },
        onSubmit: (values) => {
            console.log(values);
            fetchUser(values.name, values.pass);

        },

        validationSchema: Yup.object({
            name: Yup.string().required("Required.").typeError("please enter name"),
            pass: Yup.string().required("Required.").typeError("please enter pass"),
        }),

    });


    return (
        <Grid container spacing={2} sx={{ mt: 25 }}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                variant="outlined"
                                fullWidth
                                id="name"
                                label="name"
                                name="name"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={formik.values.pass}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.pass && Boolean(formik.errors.pass)}
                                helperText={formik.touched.pass && formik.errors.pass}
                                variant="outlined"
                                fullWidth
                                id="pass"
                                label="pass"
                                name="pass"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="overline" display={on} gutterBottom>
                                login fail
                            </Typography>
                        </Grid>

                    </Grid>
                    <Button
                        style={{
                            marginTop: 20,
                        }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Submit
                    </Button>
                </form>
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
    )
}
