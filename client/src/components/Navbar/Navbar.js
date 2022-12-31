import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BlurOnIcon from "@mui/icons-material/BlurOn";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Searchbar from "../Searchbar/Searchbar";
import { ContextUser } from "../../store/MainContext";
import ChatIcon from "@mui/icons-material/Chat";
import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { getUserData } from "../../api/getUserData";

const pages = ["Home", "Application"];
const settings = ["Home", "Profile", "Settings", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { currentUser, setProfileUser } = useContext(ContextUser);

  const [user, setUser] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
   getUserData(currentUser._id).then(({userData})=>{
    setUser(userData)
   })
    
  }, [])
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAppClick = () => {
    handleCloseUserMenu();
    navigate("/application");
  };

  const HandleHomeClick = () => {
    handleCloseUserMenu();
    navigate("/home");
  };
  // function for redirecting to the user login page
  const userLogout = () => {
    function deleteCookie(name) {
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }

    handleCloseUserMenu();
    deleteCookie("token");
    deleteCookie("refreshToken");
    navigate("/login");
  };

  return (
    <div className="user-navbar" id="user-navbar">
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          height: "56px",
          position: "fixed",
          zIndex: 1,
        }}
        className="navbar-header"
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <BlurOnIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => navigate("/")}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "#0066ed",
                textDecoration: "none",
                fontSize: "1.8rem",
                cursor: "pointer",
              }}
            >
              Shopify
            </Typography>
            <Searchbar />
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={
                      page === "Application"
                        ? handleAppClick
                        : page === "Home"
                        ? HandleHomeClick
                        : handleCloseNavMenu
                    }
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <BlurOnIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#0066ed",
                textDecoration: "none",
              }}
            >
              Shopify
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <Link to='/'>
                <Button>
                  <HomeIcon sx={{ p: 0, fill: "#0066ed" ,width:'1.3em',height:'1.3em'}} />
                </Button>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0, paddingRight: ".5rem" }}>
              <Tooltip title="Chats">
                <Link to="/chats">
                  <Avatar
                    alt="Remy Sharp"
                    sx={{
                      backgroundColor: "#353333",
                      width: "2.5rem",
                      height: "2.5rem",
                    }}
                  >
                    <ChatIcon sx={{ p: 0 }} />
                  </Avatar>
                </Link>
              </Tooltip>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={currentUser.firstname}>
             
              {user?.profilePictureUrl ? 
              <img style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius:"50%",
                cursor:'pointer'
              }}
              onClick={handleOpenUserMenu}
               src={user.profilePictureUrl} alt="" />
              :
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Remy Sharp"
                sx={{
                  backgroundColor: "#353333",
                  width: "2.5rem",
                  height: "2.5rem",
                }}
              />
            </IconButton>
            }
               
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === "Logout"
                        ? userLogout
                        : setting === "Profile"
                        ? () => {
                            setProfileUser(currentUser);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            handleCloseUserMenu();
                            navigate("/profile");
                          }
                        : setting === "Home"
                        ? () => navigate("/")
                        : handleCloseUserMenu
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Navbar;
