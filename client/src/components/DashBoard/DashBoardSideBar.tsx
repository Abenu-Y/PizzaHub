import { useEffect, useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Box, Divider, Typography } from '@mui/material';
import {
  MenuOpen as MenuIcon,
  Login as ExitToAppIcon
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import sidebarPizzaImg from '../../assets/image/emojisidebar.png'
import orderIcon from '../../assets/icon/order.png'
import profileIcon from '../../assets/icon/profile.png'
import pizzaIcon from '../../assets/image/pizzaIcon.png'
import roleIcon from '../../assets/icon/profile1.png'

const DashBoardSideBar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab('orders'); // Default to "Orders" if no tab is provided
    }
  }, [location.search]);


  const handleLogOut = () =>{
    localStorage.removeItem('info')
    navigate('/')
    window.location.reload()
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: { xs: '100%', md: '258px' },
        // flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: { xs: '100%', md: '258px' },
          boxSizing: 'border-box',
          backgroundColor: '#fff', // White background for sidebar
          boxShadow: '0px 0px 15px 0px #0000000D', // Shadow effect
        },
      }}
    >
      {/* Logo Section with Pizza and Menu Icon */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="16px"
        sx={{ height: '64px' ,  boxShadow: '7px 0px 15px 0px #0000000D'}} // Adjust the height to suit the design
      >
        <Typography variant="h6" component="div">
          PIZZA
        </Typography>
        <IconButton>
          <MenuIcon sx={{ color: '#000' }} />
        </IconButton>
      </Box>

    

      {/* Full-width Pizza Image Placeholder */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
        sx={{ backgroundColor: '#FF81000D', width: '100%',height:'113px',border: 'none'  }}
      >
        <Typography variant="body1" color="textSecondary">
            <img src={sidebarPizzaImg} alt="" style={{border: 'none' }}/>
        </Typography>
      </Box>



      {/* Sidebar List Items */}
      <List sx={{border: 'none' }}>
        {/* Orders Tab */}
        <ListItemButton
          selected={tab === 'orders'}
          component={Link}
          to="/dashboard?tab=orders"
          sx={{ textDecoration: 'none',bgcolor:"#FF810066" }}
        >
          <ListItemIcon>
             <img src={orderIcon} alt="orderIcon" />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItemButton>

        {/* Add Menu Tab */}
        <ListItemButton
          selected={tab === 'menu'}
          component={Link}
          to="/dashboard?tab=menu"
          sx={{ textDecoration: 'none', color: 'inherit' }}
          
        >
          <ListItemIcon>
            <img src={pizzaIcon} alt="orderIcon" />
          </ListItemIcon>
          <ListItemText primary="Add Menu" />
        </ListItemButton>

        {/* User Tab */}
        <ListItemButton
          selected={tab === 'user'}
          component={Link}
          to="/dashboard?tab=user"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItemIcon>
            <img src={roleIcon} alt="orderIcon" />
          </ListItemIcon>
          <ListItemText primary="User" />
        </ListItemButton>

        {/* Role Tab */}
        <ListItemButton
          selected={tab === 'role'}
          component={Link}
          to="/dashboard?tab=role"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItemIcon>
            <img src={profileIcon} alt="orderIcon" />
          </ListItemIcon>
          <ListItemText primary="Role" />
        </ListItemButton>

        <Divider sx={{marginInline:"auto",width:"250px"}} />

        {/* Sign Out Button */}
        <ListItemButton
          onClick={handleLogOut}
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItemIcon>
            <ExitToAppIcon sx={{ color: '#FF0000' }} />
          </ListItemIcon>
          <ListItemText primary="Log Out" sx={{color:"#FF0000"}} />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default DashBoardSideBar;
