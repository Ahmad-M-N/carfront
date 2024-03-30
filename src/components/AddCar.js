import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent"; 
import DialogTitle from "@mui/material/DialogTitle";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";

function AddCar(props) {

    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState(
        {
            brand:'',
            model: '',
            color:'',
            year:'',
            price:''
        });
    
    const handleClickOpen = () =>{
        setOpen(true);
    }

    const handleClose = () =>{
        setOpen(false);
    }

    const handleChange = (event) =>{
        setCar({...car, [event.target.name] : event.target.value})
    }

    const handleSave =()=>{
        props.addCar(car);
        handleClose();
    }

    return (
        <div>
            <Button  variant="contained" onClick={handleClickOpen}> New Car </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Car</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField label="Brand" name="brand"
                            autofocus variant="standard"
                            value = {car.brand} onChange={handleChange}
                        /><br/>
                        <TextField label="Model" name="model"
                            variant="standard"
                            value = {car.model} onChange={handleChange}
                        /><br/>
                        <TextField label="Color" name="color"
                            variant="standard"
                            value = {car.color} onChange={handleChange}
                        /><br/>
                        <TextField label="Year" name="year"
                            variant="standard"
                            value = {car.year} onChange={handleChange}
                        /><br/>
                        <TextField label="Price" name="price"
                            variant="standard"
                            value = {car.price} onChange={handleChange}
                        /><br/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick ={handleClose}>Cancel</Button>
                    <Button onClick ={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}

export default AddCar;