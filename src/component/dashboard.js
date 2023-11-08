import React from "react"
import { useEffect, useState } from "react"
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Paper, TableContainer } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import filmApi from "../api/filmsApi";
export default function Dashboard() {

  const [APIData, setAPIData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelSucDia, setOpenDelSucDia] = useState(false);
  const [idDelete, setIdDelete] = useState(-1);
  useEffect(() => {
    fetchFilmsList();
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setOpenDelSucDia(false);
    fetchFilmsList();
  };

  const deleteFilm = async () => {
    setOpen(false);
    try {
      const response = await filmApi.delete(`${idDelete}`);
      console.log(response);
      setOpenDelSucDia(true);
    } catch (error) {
      console.log('Failed to fetch film list: ', error);
    }
  };

  const showConfirmDeleteDialog = (id) => {
    setIdDelete(id);
    setOpen(true);

  };

  const fetchFilmsList = async () => {
    try {
      const response = await filmApi.getAll();
      console.log(response);
      setAPIData(response);
    } catch (error) {
      console.log('Failed to fetch film list: ', error);
    }
  }


  return (

    <div>
      <h1 className="font-pages">Dashboard</h1>
      <Link to="/addNewFilm">
        <IconButton><Button variant="contained">Add Films</Button></IconButton>
      </Link>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="left">nation</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Year</TableCell>

              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {APIData.map((staff) => (
              <TableRow
                key={staff.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {staff.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {staff.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {staff.info}
                </TableCell>
                <TableCell align="left">{staff.nation}</TableCell>
                <TableCell align="right">

                  <img align="left" alt="Remy Sharp" src={staff.image} style={{ width: 200, height: 300, }} />

                </TableCell>
                <TableCell align="left">{staff.year}</TableCell>

                <TableCell align="left">
                  <Stack direction="row" spacing={3}>
                    <Link to={`/updateFilm/${staff.id}`}>
                      <IconButton><EditIcon /></IconButton>
                    </Link>

                    <IconButton onClick={(e) => { showConfirmDeleteDialog(staff.id) }}><DeleteIcon /></IconButton>


                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Staff"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="warning">
              <AlertTitle>Are you sure to delete this Film ?</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteFilm}>Yes</Button>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openDelSucDia}
        onClose={handleOk}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Message"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="success">
              <AlertTitle>Delete Film Successfully</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk}>OK</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}