import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  Brightness4,
  Brightness7,
  ExitToApp,
  AccountCircle
} from '@mui/icons-material';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const StyledDashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const StyledMainContent = styled.main`
  flex-grow: 1;
  padding: 20px;
  margin-top: 64px;
  transition: margin-left 0.3s;
`;

const Dashboard = ({ onThemeToggle, isDarkMode }) => {
  const { currentUser, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const drawerWidth = 240;

  return (
    <StyledDashboardContainer>
      <AppBar position="fixed" sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 0.5 }}>
            📊 Admin Dashboard
          </Typography>
          <IconButton 
            color="inherit" 
            onClick={onThemeToggle}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'rotate(180deg)'
              }
            }}
          >
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1">
                {currentUser?.firstName} {currentUser?.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentUser?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={sidebarOpen}
        onClose={isMobile ? toggleSidebar : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Users', 'Settings'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index === 0 ? (
                    <DashboardIcon />
                  ) : index === 1 ? (
                    <PeopleIcon />
                  ) : (
                    <SettingsIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <StyledMainContent
        style={{
          marginLeft: isMobile ? 0 : sidebarOpen ? 0 : -drawerWidth,
          width: '100%'
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome, {currentUser?.firstName}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's what's happening with your platform today.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[
            { title: 'Total Users', value: '1,245', color: 'primary', icon: '👥', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { title: 'Revenue', value: '₹12,450', color: 'success', icon: '💰', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
            { title: 'Active Sessions', value: '342', color: 'info', icon: '🚀', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
            { title: 'Pending Tasks', value: '28', color: 'warning', icon: '📋', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }
          ].map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{
                height: '100%',
                background: metric.gradient,
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
                }
              }}>
                <CardContent>
                  <Typography sx={{ fontSize: '2rem', mb: 1 }}>
                    {metric.icon}
                  </Typography>
                  <Typography sx={{ opacity: 0.9 }} gutterBottom>
                    {metric.title}
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700 }}>
                    {metric.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {[
            { num: 1, icon: '📊', title: 'Analytics' },
            { num: 2, icon: '💳', title: 'Payments' },
            { num: 3, icon: '📈', title: 'Growth' },
            { num: 4, icon: '🎯', title: 'Goals' },
            { num: 5, icon: '⚡', title: 'Performance' },
            { num: 6, icon: '🔒', title: 'Security' }
          ].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.num}>
              <Card sx={{
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.2)'
                }
              }}>
                <CardContent>
                  <Typography sx={{ fontSize: '2rem', mb: 1 }}>
                    {item.icon}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ color: '#667eea', fontWeight: 700 }}>
                    {Math.floor(Math.random() * 1000)} Units
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Performance data for {item.title.toLowerCase()}.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    sx={{
                      color: '#667eea',
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: 'rgba(102, 126, 234, 0.1)'
                      }
                    }}
                  >
                    View Details →
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        
      </StyledMainContent>
    </StyledDashboardContainer>
  );
};

export default Dashboard;
