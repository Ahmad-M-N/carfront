import React from "react";
import { SERVER_URL } from '../constants.js';
import {DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses} from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddCar from './AddCar';
import EditCar from './EditCar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'

function Carlist() {

    const [open, setOpen] = React.useState(false);
    const [cars, setCars]= React.useState([]);

    const fetchCars = () => {
        const token = sessionStorage.getItem("jwt");

        fetch(SERVER_URL+'api/cars',{headers: {'Authorization': token}})
        .then(response => response.json())
        .then(responseData => setCars(responseData._embedded.cars))
        .catch(err => console.error(err));
    }

    const onDelClick= (url) =>{
        const token = sessionStorage.getItem("jwt");
        if (window.confirm("Are you sure you want to delete?")){
            fetch(url, {method: 'DELETE', headers: {'Authorization': token}})
            .then(response => {

                if (response.ok){
                    fetchCars(); 
                    setOpen(true);
                }

                else {
                    alert('Something went wrong!');
                }

            })
            .catch(err => console.error(err))
        }
    }

    const addCar = (car) => {
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/cars',
        {
            method: 'POST',
            headers: {'Content-Type':'application/json', 'Authorization': token},
            body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok) {
                fetchCars();
            }
            else {
                alert('Something went wrong!');
            }
        })
        .catch(err => console.error(err))
    }
    
    const updateCar = (car, link) => {
        const token = sessionStorage.getItem("jwt");
        fetch(link,
        {
            method: 'PUT',
            headers: {'Content-Type':'application/json', 'Authorization': token},
            body: JSON.stringify(car)
        })
        .then(response => {
            if (response.ok) {
                fetchCars();
            }
            else {
                alert('Something went wrong!');
            }
        })
        .catch(err => console.error(err))
    } 

    React.useEffect(()=>{
        fetchCars()
    }, []);

    const columns = [
        {field: 'brand', headerName: 'Brand', width: 200},
        {field: 'model', headerName: 'Model', width: 200},
        {field: 'color', headerName: 'Color', width: 200},
        {field: 'year', headerName: 'Year', width: 150},
        {field: 'price', headerName: 'Price', width: 200},
        {
            field: '_links.self.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>  
                <IconButton onClick={()=> onDelClick(row.id)}>
                    <DeleteIcon color="error"/>
                </IconButton>
        },
        {
            field: '_links.car.href',
            headerName: '',
            sortable: false,
            filterable: false,
            renderCell: row =>  
                <EditCar
                    data={row}
                    updateCar={updateCar}
                />
        }
    ];

    function CustomToolbar(){
        return (
            <GridToolbarContainer className={gridClasses.toolbarContainer}>
                <GridToolbarExport/>
            </GridToolbarContainer>
        )
    }
    return (
        <React.Fragment>
            <Stack mt={2} mb={2}>
                <AddCar addCar={addCar} />
            </Stack>
            <div style={{ height: 350, width: '100%'}}>
                <DataGrid 
                    rows={cars}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row=> row._links.self.href}
                    components={{Toolbar: CustomToolbar}}
                />

                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={()=> setOpen(false)}
                    message= "Car Deleted"
                />
            </div>                
        </React.Fragment>

    );

}

export default Carlist;