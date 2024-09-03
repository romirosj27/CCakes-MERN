import logo from "./Chandi Cakes Logo.jpg";
import "./NavBar.css";

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
import Link from "@mui/material/Link";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createTheme, colors, ThemeProvider } from "@mui/material";

export default function NavBar(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [itemCount, setItemCount] = useState();

  const appBarPages =
    location.pathname === "/"
      ? [ "Gallery"]
      : ["Home", "Gallery"];

  const settings = ["My Events", "Profile", "Account", "Friends", "Created Events", "Help", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const userInitials = localStorage.getItem("user_initials");

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

  const handleButtonClick = (event) => {
    const selectedButton = event.target.textContent
      .toLowerCase()
      .replace(/\s+/g, "");

    {
      (() => {
        switch (selectedButton) {
          case "home":
            navigate("/");
            break;
          case "gallery":
            navigate("/cakes");
            break;
          // case "shop":
          //   navigate("/products");
          //   break;
          default:
            return null;
        }
      })();
    }

    console.log(`Button ${selectedButton} was pressed`);
  };

  const [showNavbar, setShowNavbar] = useState(true);

//   useEffect(() => {
//     let lastScrollTop = 0;

//     const handleScroll = () => {
//       let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//       if (scrollTop > lastScrollTop) {
//         // Downscroll
        
//       } else {
//         // Upscroll
//         setShowNavbar(true);
//       }
//       lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(245,233,207,255)",
        transition: "top 0.3s",
        top: showNavbar ? "0" : "-64px", // Adjust the value based on the height of your AppBar
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - full width browser */}
          <Link
            href="/"
            color="inherit"
            align="center"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          >
            <img src={logo} alt="Logo" className="logo" />
          </Link>

          {/* Drop-down pages menu for smaller browser */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              {appBarPages.map((page) =>
                location !== "/" ? (
                  <MenuItem key={page} onClick={handleButtonClick}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ) : null
              )}
            </Menu>
          </Box>

          {/* Logo - smaller width browser */}
          <Link
            href="/"
            color="inherit"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              ml: 7,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={logo} alt="Logo" className="logo" />
          </Link>

          {/* Full width page selection */}
          <Box
            justifyContent="center"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {appBarPages.map((page) => (
              <Button
                key={page}
                onClick={handleButtonClick}
                sx={{
                  my: 2,
                  px: 4,
                  color: "#3b1a0b",
                  display: "block",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* User icon drop down menu */}
          <Box>
            {/* <div>
              <Link href="/login">
                <Button sx={{ color: "#3b1a0b" }}> Login </Button>
              </Link>
              <Link href="/register">
                <Button sx={{ color: "#3b1a0b" }}> Register </Button>
              </Link>
            </div> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}


// import logo from "./Chandi Cakes Logo.jpg";
// import "./NavBar.css";

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import MenuItem from "@mui/material/MenuItem";
// import Link from "@mui/material/Link";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";

// export default function NavBar(props) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [anchorElNav, setAnchorElNav] = useState(null);

//   const appBarPages = ["Home", "Gallery", "Contact"];

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleButtonClick = (event) => {
//     const selectedButton = event.target.textContent.toLowerCase().replace(/\s+/g, "");

//     switch (selectedButton) {
//       case "home":
//         navigate("/");
//         break;
//       case "gallery":
//         navigate("/cakes");
//         break;
//       case "contact":
//         navigate("/contact");
//         break;
//       default:
//         return null;
//     }

//     console.log(`Button ${selectedButton} was pressed`);
//   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         background: "rgba(255, 255, 255, 0.8)",
//         backdropFilter: "blur(10px)",
//         boxShadow: "none",
//       }}
//     >
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           {/* Logo - full width browser */}
//           <Link
//             href="/"
//             color="inherit"
//             align="center"
//             sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
//           >
//             <Avatar alt="Logo" src={logo} sx={{ width: 56, height: 56, borderRadius: '50%' }} />
//           </Link>

//           {/* Drop-down pages menu for smaller browser */}
//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {appBarPages.map((page) => (
//                 <MenuItem key={page} onClick={handleButtonClick}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           {/* Logo - smaller width browser */}
//           <Link
//             href="/"
//             color="inherit"
//             sx={{
//               flexGrow: 1,
//               display: { xs: "flex", md: "none" },
//               ml: 1,
//               alignItems: "center",
//             }}
//           >
//             <Avatar alt="Logo" src={logo} sx={{ width: 56, height: 56, borderRadius: '50%' }} />
//           </Link>

//           {/* Full width page selection */}
//           <Box
//             justifyContent="center"
//             sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
//           >
//             {appBarPages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleButtonClick}
//                 sx={{
//                   my: 2,
//                   px: 4,
//                   color: "black",
//                   display: "block",
//                   textTransform: "none",
//                   fontSize: "1rem",
//                 }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           {/* Order Now button */}
//           <Button
//             variant="contained"
//             color="warning"
//             sx={{
//               display: { xs: "none", md: "block" },
//               textTransform: "none",
//               backgroundColor: "#ff7f50",
//               borderRadius: "25px",
//               px: 3,
//             }}
//             onClick={() => navigate("/order")}
//           >
//             Order Now
//           </Button>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

