import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core'

import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/home">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component={Link} to="/upload">
      <ListItemIcon>
        <CloudUploadIcon />
      </ListItemIcon>
      <ListItemText primary="Upload" />
    </ListItem>
    {/* <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItem> */}
  </div>
);

const SecondaryListItems = () => {

  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  }

  return (
    <div>
      <ListItem button onClick={handleLogout}>
        <ListItemIcon>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  )
}

export default SecondaryListItems;