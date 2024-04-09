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
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";

const pages = ["Events", "Shops", "Teams", "Transaction", "Notes"];
const settings = ["Visit Profile", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [activePage, setActivePage] = React.useState("Shops"); // Default to the first page
  const navigate = useNavigate();

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
  const handlePageClick = (page) => {
    setActivePage(page);
    handleCloseNavMenu();
  };

  return (
    <div>
      <AppBar
        position="static"
        sx={{ backgroundColor: "rgb(78, 101, 100)", boxShadow: "none" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              src="../../../Images/logo_1 1.png"
              alt="Right Arrow"
              sx={{
                marginRight: "5px",
                height: "45px",
                display: { xs: "none", md: "flex" },
              }} // Adjust margin between image and text
            />
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
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
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              component="img"
              src="../../../Images/logo_1 1.png"
              alt="Right Arrow"
              sx={{
                marginRight: "5px",
                height: "45px",
                display: { xs: "flex", md: "none" },
              }} // Adjust margin between image and text
            />
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                marginLeft: "15%",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  sx={{
                    my: 2,
                    display: "block",
                    justifyContent: "space-around",
                    width: "150px",
                    color: activePage === page ? "rgb(247, 230, 173)" : "white",
                    fontSize: "18px",
                    fontFamily: "Inter",
                    fontWeight: activePage === page ? "700" : "500",
                    textDecoration:
                      activePage === page
                        ? "underline rgb(247, 230, 173)"
                        : "none",
                    textTransform: "none",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src="../../Component/profile..png" />
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
                          transition: "background-color 0.3s, color 0.3s", // Add transition for smooth effect
                          "&:hover": {
                            color: "rgb(247, 230, 173)", // Change text color on hover
                            backgroundColor: "rgb(151, 151, 151)", // Change background color on hover
                          },
                        }}
                        onClick={() => {
                          (setting==='Visit Profile') && navigate("/Profile");
                        }}
                      >
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Box>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default Navbar;