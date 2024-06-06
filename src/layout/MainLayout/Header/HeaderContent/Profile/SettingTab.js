import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { CommentOutlined, LockOutlined, QuestionCircleOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const SettingTab = () => {
  const theme = useTheme();
  const navigator = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    if(index == 0)
      navigator('/support');
    setSelectedIndex(index);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <QuestionCircleOutlined />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
      
      <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary="Privacy Center" />
      </ListItemButton>
    </List>
  );
};

export default SettingTab;
