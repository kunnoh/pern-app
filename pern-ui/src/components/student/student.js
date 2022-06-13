import React, { useEffect, useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import "./student.css";
import userApi from "../../services/user.service";
// import MaterialTable from "material-table";
// import tableIcons from "../../shared/materialIcons/matTableIcons";
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


const useStyles = makeStyles(theme => ({
  root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // padding: theme.spacing(2),
      '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
      },
      '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
      },
  },
}));

export default function Dashboard() {
  const form = useRef();
  const classes = useStyles();
  const { user: currentUser } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setData] = useState('');
  const [edit, setEdit] = useState(false);
  // create state variables
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  useEffect(()=>{
    const fetchData = async()=>{
      setLoading(true);
      try {
        const { data: response } = await userApi.getUsers()
        setData(response);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleConfirm = (e) => {
    const userToEdit = users['usersList'][e.target.id];
    setFirstname(userToEdit.firstname);
    setLastname(userToEdit.lastname);
    setEmail(userToEdit.email);
    setconfirm(true);
  }

  const handleClose = () => {
    setOpen(false);
    setconfirm(false);
  };

  const delUser = async (e)=>{
    try {
      await userApi.deleteUser(email)
      window.location.reload();
      setconfirm(false)
    } catch (err) {
      setLoading(false);
      console.log(err);
      setconfirm(false)
    }
  }

  const updateUser = (e) => {
    const userToEdit = users['usersList'][e.target.id];
    setFirstname(userToEdit.firstname);
    setLastname(userToEdit.lastname);
    setEmail(userToEdit.email);
    setEdit(true);
    setOpen(true);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if(edit){
        await userApi.updateUser(firstname, lastname, email);
        setEdit(false);
        window.location.reload();
      } else{
        await userApi.createUser(email, firstname, lastname)
        window.location.reload();
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
    setOpen(false);
  }

  // check if the user is authenticated
  if(!currentUser) {
    return <Navigate to="/login"/>
  }

  return(
    <div className='flex column'>
      <div className="flex row users-nav">
        <p>Registered Users</p>
        <button type="button" onClick={handleOpen} className="flex flex-center">
            <strong>+ &nbsp;</strong>
            add user
        </button>
      </div>
      <div className="flexLayout column reg-users-container">
          {loading && <div>loading..</div>}
          {!loading && (<table>
            <tbody>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
              {users['usersList'].map((user, index)=>
                (
                  <tr>
                    <td>{index+1}.</td>
                    <td>
                      <a href={user.id}>
                          {user.firstname} {user.lastname}
                      </a>                            
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span onClick={updateUser} className="edit" id={index}>Edit</span>
                      <span onClick={handleConfirm} className="delete" id={index}>Delete</span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>)}
          <div className='flex info'>
            <strong>prev</strong>
            <span>&nbsp; {users.page}&nbsp;</span>
            <strong>next</strong>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;total {users.totalUsers}</span>
          </div>
      </div>

      {/* dialog to capture user data */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>add new user</DialogTitle>
        <DialogContent>
            <form
              ref={form}
              id='myForm'
              className={classes.root}
              onSubmit={handleSubmit}>
              <TextField 
                    label="first name"
                    variant="filled"
                    type="text"
                    required
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                />
              <TextField 
                    label="last name"
                    variant="filled"
                    type="text"
                    required
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                />
              <TextField 
                  label="Email"
                  variant="filled"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
              />
            </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button type="submit" form="myForm">save</Button>
        </DialogActions>
      </Dialog>


      {/* dialog to capture user data */}
      <Dialog open={confirm} onClose={handleClose}>
        <DialogTitle>delete this user</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>no</Button>
          <Button variant="contained" onClick={delUser}>yes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}