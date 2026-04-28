import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  AppBar,
  Toolbar
} from '@mui/material';

const LandingPage = ({ onGetStarted }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
            🚀 Landing Page
          </Typography>
          <Button 
            color="inherit" 
            onClick={onGetStarted}
            sx={{
              borderRadius: '20px',
              px: 3,
              fontWeight: 600,
              border: '2px solid rgba(255,255,255,0.3)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                transform: 'translateY(-2px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            Get Started
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{
        background: 'linear-gradient(135deg, #667eea15 0%, #764ba215 100%)',
        minHeight: 'calc(100vh - 64px)'
      }}>
        <Container sx={{ pt: 8, pb: 6 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3
                }}
              >
                Welcome to Our Platform
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4, lineHeight: 1.8 }}>
                Experience a fully responsive interface designed with Material UI.
                Seamlessly adaptable to any device size with stunning visuals.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                onClick={onGetStarted}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '30px',
                  px: 5,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 28px rgba(102, 126, 234, 0.5)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                Get Started Now →
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '350px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderRadius: '24px',
                  boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(0deg)',
                    boxShadow: '0 25px 70px rgba(102, 126, 234, 0.4)'
                  }
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 700, textAlign: 'center' }}>
                  ✨ Responsive Visuals
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid container spacing={4} sx={{ mt: 6 }}>
            {[
              { title: 'Fast & Secure', icon: '🔒', desc: 'Enterprise-grade security with lightning-fast performance' },
              { title: 'Responsive Design', icon: '📱', desc: 'Beautiful on every screen size and device' },
              { title: 'Easy to Use', icon: '⚡', desc: 'Intuitive interface that just works' }
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 4,
                    height: '100%',
                    borderRadius: '20px',
                    background: 'white',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 15px 40px rgba(102, 126, 234, 0.2)',
                      borderColor: 'rgba(102, 126, 234, 0.3)'
                    }
                  }}
                >
                  <Typography variant="h3" sx={{ mb: 2 }}>
                    {item.icon}
                  </Typography>
                  <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 700, color: '#667eea' }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Premium Feature
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.7 }}>
                    {item.desc}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
