import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { EditOutlined, ProfileOutlined, LogoutOutlined, UserOutlined, WalletOutlined } from '@ant-design/icons';


const ProfileTab = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    if(index == 200){
      console.log("log-out");
      navigate('/login');
    }
    setSelectedIndex(index);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      
      <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="View Profile" />
      </ListItemButton>      
      
      <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 200)}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

ProfileTab.propTypes = {
  handleLogout: PropTypes.func
};

export default ProfileTab;
