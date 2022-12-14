import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect } from 'react';
import { Button, Card, CardMedia, TextField } from '@mui/material';
import { display } from '@mui/system';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { serverUrl } from '../serverUrl';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ImageView from 'react-single-image-viewer';
import 'react-single-image-viewer/dist/index.css';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ShowAllProducts() {
  const [users, setUsers] = React.useState();
  const [listChange, setListChange] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form, setForm] = useState();
  const navigate = useNavigate();
  //   const [change,setChange] = useState(true)

  const handleSubmit = () => {
    axios
      .patch(`${serverUrl}/product/edit`, form, { withCredentials: true })
      .then((res) => {
        // navigate('/admin/products')
        setListChange(!listChange);
        handleClose();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 230 },
    { field: 'amount', headerName: 'Amount', width: 230 },
    { field: 'description', headerName: 'Description', width: 230 },
    {
      field: 'action',
      width: 330,
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const onClick = async (e) => {
          setForm(params.row);
          handleOpen();
          e.stopPropagation(); // don't select this row after clicking
          try {
            axios
              .patch(`${serverUrl}/admin/user/unBlock?id=${params.row._id}`)
              .then((res) => {
                // toast('UnBlocked User ', { autoClose: 800 });
                setListChange(!listChange);
              });
          } catch (err) {
            console.log(err);
            // toast("Some Error Occured",{autoClose:800})
          }
        };
        const handleDelete = () => {
          axios
            .delete(`${serverUrl}/product/delete?id=${params.row._id}`)
            .then((res) => {
              console.log(res);
              setListChange(!listChange);
            })
            .catch((err) => {
              console.log(err);
            });
        };

        return (
          <>
            <Button
              style={{ zIndex: '0' }}
              variant='outlined'
              color='success'
              onClick={onClick}
            >
              Edit
            </Button>

            <Button
              style={{ zIndex: '0' }}
              variant='outlined'
              color='error'
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    axios
      .get(`${serverUrl}/products`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        let response = res.data;
        setUsers(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [listChange]);

  console.log(users);
  return (
    <div
      style={{
        height: 500,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {users && (
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        {form && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <TextField
                id='modal-modal-title'
                label='Name'
                variant='outlined'
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                }}
              ></TextField>
              <TextField
                id='modal-modal-description'
                label='Description'
                variant='outlined'
                value={form.description}
                sx={{ mt: 2 }}
                onChange={(e) => {
                  setForm({ ...form, description: e.target.value });
                }}
              ></TextField>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component='img'
                  height='194'
                  image={form.image}
                  alt='Paella dish'
                />
              </Card>
              <Button
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            </Box>
          </Modal>
        )}
      </div>
    </div>
  );
}
