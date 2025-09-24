import React from "react";
import { Box, Typography } from "@mui/material";

const ItemBanner = ({ title }) => (
  <Box component="main" className="banner banner--item">
    <Box className="intro">
      <Box className="into-title">
        <Typography 
  variant="h2" 
  sx={{ fontSize: "50px", fontFamily: '"DM Serif Display", serif', fontWeight: 400, lineHeight: "125%", whiteSpace:"nowrap" }}
>
  {title}
</Typography>

<Typography 
  component="span" 
  variant="body1" 
  sx={{ fontSize: "22px", whiteSpace:"nowrap" }}
>
  Home / Catalog / {title}
</Typography>
      </Box>
    </Box>
  </Box>
);

export default ItemBanner;