import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

const pages = [
  { name: "Home", path: "/" },
  { name: "Catalog", path: "/catalog" },
];

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      className="header-container"
      sx={{ boxShadow: "none", backgroundColor: "transparent" }}
    >
      <Toolbar
        sx={{
          width: "62.4%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 0,
        }}
      >
        {/* Логотип */}
        <Box className="logo" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/Assets/Logo.png" alt="Logo" />
          <Typography variant="h6" component="h1" sx={{ fontSize: "40px", fontFamily: '"DM Serif Display", serif' }}>
            Interno
          </Typography>
        </Box>

        {/* Desktop меню */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: "46px",
            alignItems: "center",
          }}
        >
          {pages.map((page) => (
            <Link key={page.name} to={page.path} className="header-link">
              {page.name}
            </Link>
          ))}
        </Box>

        {/* Mobile burger menu */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={null}
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {pages.map((page) => (
              <MenuItem key={page.name} onClick={() => setMobileMenuOpen(false)}>
                <Link to={page.path} className="header-link">
                  {page.name}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
