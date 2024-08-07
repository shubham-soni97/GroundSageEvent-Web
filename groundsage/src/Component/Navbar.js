import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextApi/AuthContext";

const pages = [
  "Home",
  "Events",
  "Shops",
  "Transactions",
  "Notes",
  "Reports",
];

function Navbar({ handleOpen, isActive, activeEventId, activeEventName }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [currentActiveEventName, setCurrentActiveEventName] =
    React.useState(null);
  const { logout, user } = React.useContext(AuthContext);
  const [settings, setSettings] = React.useState([]);
  const [eventName, setEventName] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    const newArray = [activeEventName, "Visit Profile", "Logout"];
    setSettings(newArray);
    setEventName(activeEventName);
  }, [activeEventName]);

  if (
    location.pathname === "/" ||
    location.pathname === "/referral-code" ||
    location.pathname === "/entermail" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/verification" ||
    location.pathname === "/forgetpassword"
  ) {
    return null;
  }

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const userInitials = user?.user_name ? user.user_name.slice(0, 2).toUpperCase() : "";

  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: "rgb(78, 101, 100)", boxShadow: "none" }}
      >
        <Toolbar disableGutters>
          {/* <NavLink to="/" style={{ textDecoration: "none" }}> */}

          <Box
            component="img"
            src="../../../Images/logo_1 1.png"
            alt="logo"
            sx={{
              height: "45px",
              // display: { xs: "none", md: "block" },
              // justifyContent: "leftwid",
              // alignItems:"left",
              marginLeft: "20px",
            }}
            onClick={()=>navigate('/home/')}
          />
          {/* </NavLink>   */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>            <IconButton
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={`/${page.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {page}
                  </NavLink>{" "}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "space-around",
              margin: "0px 10% 0px 10%",
            }}
          >
            {pages.map((page) => (
              <NavLink
                key={page}
                to={page.toLowerCase()} // Make sure pathnames are lowercase
                style={{ textDecoration: "none" }}
              >
                <Button
                  sx={{
                    my: 2,
                    // justifyContent: "space-around",
                    // width: "150px",
                    // display: "flex",
                    // justifyContent: "space-between",
                    color: location.pathname.includes(page.toLowerCase())
                      ? "rgb(247, 230, 173)"
                      : "white",
                    fontSize: "18px",
                    fontFamily: "Inter",
                    fontWeight: location.pathname.includes(page.toLowerCase())
                      ? "700"
                      : "500",
                    textDecoration: location.pathname.includes(
                      page.toLowerCase()
                    )
                      ? "underline rgb(247, 230, 173)"
                      : "none",
                    textTransform: "none",
                  }}
                >
                  {page}
                </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Profile">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, marginRight: "20px" }}
              >
                   <Avatar>
                  {userInitials}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              PaperProps={{
                sx: {
                  background: "rgb(219,216,216)",
                },
              }}
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
              <Box
                sx={{
                  background: "rgb(219, 216, 216)",
                  margin: "0",
                  padding: "0",
                }}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      sx={{
                        color: "rgb(151, 151, 151)",
                        fontFamily: "Inter",
                        lineHeight: "1",
                        marginTop: "0px",
                        fontSize: "16px",
                        padding: "7px",
                        borderRadius: "6px",
                        fontWeight: "700",
                        transition: "background-color 0.3s, color 0.3s",
                        "&:hover": {
                          color: "rgb(247, 230, 173)",
                          backgroundColor: "rgb(151, 151, 151)",
                        },
                      }}
                      onClick={() => {
                        (setting === "Visit Profile" && navigate("/Profile")) ||
                          (setting === "Logout" && handleLogout()) || (((setting===activeEventName)&&activeEventName) && handleOpen());
                      }}
                    >
                      {setting == null ? (activeEventName == null ? "No Event" : activeEventName) : setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
