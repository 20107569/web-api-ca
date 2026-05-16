import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AuthContext } from "../../contexts/authContext";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const context = useContext(AuthContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  const loggedOutMenuOptions = [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
    { label: "Signup", path: "/signup" }
  ];

  const loggedInMenuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Must Watch", path: "/movies/mustwatch" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Now Playing", path: "/movies/nowplaying" },
    { label: "Top Rated", path: "/movies/toprated" }
  ];

  // Chooses which menu to display based on login state
  const menuOptions = context.isAuthenticated
    ? loggedInMenuOptions
    : loggedOutMenuOptions;

  // Handles clicking a menu option
  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  // Opens mobile dropdown menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Sign user out and send them to home page
  const handleSignOut = () => {
    context.signout();
    navigate("/");
  };


  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 0, mr: 2 }}>
            TMDB Client
          </Typography>

          {/* Subtitle - hidden on small screens */}
          <Typography variant="subtitle1" sx={{ flexGrow: 1, opacity: 0.8, display: { xs: 'none', md: 'block' } }}>
            All you ever wanted to know about Movies!
          </Typography>

          {/* Mobile navigation menu */}
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >

                  {/* Generate mobile menu items */}
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}

                  {/* Show sign out option in mobile menu when logged in */}
                  {context.isAuthenticated && (
                    <MenuItem onClick={handleSignOut}>
                      Sign out
                    </MenuItem>
                  )}

                </Menu>
              </>
            ) : (

              /* Desktop navigation buttons */
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                    sx={{mx: 0.5, '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.15)'}}}
                  >
                    {opt.label}
                  </Button>
                ))}

                {/* Show welcome message and sign out button on desktop when logged in */}
                {context.isAuthenticated ? (
                  <>
                    <Typography sx={{ ml: 2 }}>
                      Welcome {context.userName}!
                    </Typography>

                    <Button color="inherit" onClick={handleSignOut}>
                      Sign out
                    </Button>
                  </>
                ) : (
                  <Typography sx={{ ml: 2 }}>
                    You are not logged in
                  </Typography>
                )}

              </>
            )}
        </Toolbar>
      </AppBar>

      {/* Push page content below fixed header */}
      <Offset />
    </>
  );
};

export default SiteHeader;
