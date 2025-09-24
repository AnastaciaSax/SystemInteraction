import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ItemInfo = ({ title, category, price, place }) => (
  <Box
    className="details-info"
    sx={{
      flex: 1,
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    }}
  >
    <Typography variant="h3" sx={{ fontSize: "40px", mb: 1, fontFamily: '"DM Serif Display", serif' }}>
      {title}
    </Typography>
    <Typography variant="body1" sx={{ fontSize: "25px" }}>
      Category: {category}
    </Typography>
    <Typography variant="body1" sx={{ fontSize: "25px" }}>
      Place: {place}
    </Typography>
    <Typography sx={{ fontSize: "30px", fontWeight: "bold", color: "#e56413" }}>
      ${price}
    </Typography>

    <div className="catalog-butt">
      <Link to="/catalog">← Back to Catalog</Link>
    </div>
  </Box>
);

export default ItemInfo;
