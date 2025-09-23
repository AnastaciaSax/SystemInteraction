import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "124px",
        width: "100%",
      }}
    >
      <Box
        className="interno"
        sx={{
          display: "flex",
          width: "62.55%",
          alignItems: "flex-start",
          gap: "101px",
          flexWrap: "wrap",
        }}
      >
        {/* Info */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "18px", flexShrink: 0, width: "32.78%" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px", mb: "15px" }}>
            <img src="/Assets/Logo.png" alt="Logo" />
            <Typography variant="h4">Interno</Typography>
          </Box>
          <Typography sx={{ fontSize: "22px" }}>
            "Design Your Dream, Live Your Vision" <br />
            We create interiors that are an extension of your unique story.
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "54px", width: "57.25%" }}>
            <img src="/Assets/media.png" alt="Media icon" />
            <img src="/Assets/meadia1.png" alt="Media icon" />
            <img src="/Assets/meadia2.png" alt="Media icon" />
            <img src="/Assets/meadia3.png" alt="Media icon" />
          </Box>
        </Box>

        {/* Pages */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "9px", flexShrink: 0, width: "10.42%" }}>
          <Typography sx={{ fontSize: "25px" }}>Pages</Typography>
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
        </Box>

        {/* Services */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "9px", flexShrink: 0, width: "10.01%" }}>
          <Typography sx={{ fontSize: "25px" }}>Services</Typography>
          <Link to="/catalog?category=Kitchen">Kitchen</Link>
          <Link to="/catalog?category=Living%20Room">Living Room</Link>
          <Link to="/catalog?category=Bathroom">Bathroom</Link>
          <Link to="/catalog?category=Dining%20Hall">Dining Hall</Link>
          <Link to="/catalog?category=Bedroom">Bedroom</Link>
        </Box>

        {/* Contact */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "26px", flexShrink: 0, width: "21.52%" }}>
          <Typography sx={{ fontSize: "25px" }}>Contact</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <Typography sx={{ fontSize: "22px" }}>55 East Birchwood Ave. Brooklyn, New York 11201</Typography>
            <Typography sx={{ fontSize: "22px" }}>interno@gmail.com</Typography>
            <Typography sx={{ fontSize: "22px" }}>(123) 456 - 7890</Typography>
          </Box>
        </Box>
      </Box>

      {/* Copyright */}
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center", gap: "10px" }}>
        <Box sx={{ width: "100%", height: "1px", backgroundColor: "#E5E5E5" }} />
        <Typography sx={{ fontSize: "22px" }}>Copyright © Interno | Designed by Anastacia Sax</Typography>
      </Box>
    </Box>
  );
}

export default Footer;

