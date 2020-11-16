import React from 'react';
import { Link as RouteLink, useRouteMatch } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteUserDialog from './DeleteUserDialog';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  header: {
    marginTop: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
    width: '100%',
    height: 640,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  formControl: {
    minWidth: 200,
  },
}));

function getUserRows(users, role, query) {
  const rows = [];
  users.forEach((item, index) => {
    if (role === 'all' || item.role === role) {
      if (
        query === '' ||
        item.username.indexOf(query) !== -1 ||
        item.name.indexOf(query) !== -1 ||
        item.email.indexOf(query) !== -1 ||
        item.role.indexOf(query) !== -1
      ) {
        rows.push({
          id: index,
          username: item.username,
          name: item.name,
          email: item.email,
          role: item.role,
          action: item._id,
        });
      }
    }
  });
  return rows;
}

function ActionButtons(props) {
  const { url } = useRouteMatch();
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <IconButton component={RouteLink} to={`${url}/${props.user}/edit`} >
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item xs={6}>
          <DeleteUserDialog id={props.user} />
        </Grid>
      </Grid>
    </div>
  );
}

const columns = [
  { field: 'id', headerName: '#', width: 50 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'role', headerName: 'Role', width: 150 },
  {
    field: 'action',
    headerName: 'Actions',
    renderCell: (params) => <ActionButtons user={params.value} />,
  },
];

export default function UserList(props) {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [filter, setFilter] = React.useState({
    role: 'all',
    query: '',
  });
  const { path } = useRouteMatch();

  const onChangeValue = (event) => {
    const value = event.target.value;
    setFilter({
      ...filter,
      [event.target.name]: value,
    });
  };

  React.useEffect(() => {
    axios
      .get(`/api/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container className={classes.root} maxWidth="md">
      <Card className={classes.header}>
        <CardHeader title="Users" />
        <CardActions>
        <Grid className={classes.toolbar} container>
        <Grid item xs>
          <Button
            variant="outlined"
            color="primary"
            component={RouteLink}
            to={`${path}/create`}
          >
            Create new user
          </Button>
        </Grid>
        <Grid item>
          <ButtonGroup>
            <Button>Import</Button>
            <Button>Export</Button>
          </ButtonGroup>
        </Grid>
      </Grid>
        </CardActions>
      </Card>
      <Paper className={classes.paper} variant="outlined">
        <Grid container>
          <Grid item xs>
            <TextField
              value={filter.query}
              onChange={onChangeValue}
              id="search"
              label="Search"
              variant="outlined"
              name="query"
            />
          </Grid>
          <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                value={filter.role}
                onChange={onChangeValue}
                labelId="role-label"
                id="role"
                label="Role"
                name="role"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div className={classes.table}>
          <DataGrid
            rows={getUserRows(users, filter.role, filter.query)}
            columns={columns}
            pageSize={10}
            checkboxSelection
          />
        </div>
      </Paper>
    </Container>
  );
}
