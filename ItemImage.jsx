import React from "react";
import { Box, CardMedia } from "@mui/material";

const ItemImage = ({ src, alt }) => (
  <Box
    className="details-pic"
    sx={{
      flex: 2,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <CardMedia
      component="img"
      image={src}
      alt={alt}
      sx={{
        maxWidth: "100%",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
      }}
    />
  </Box>
);

export default ItemImage;
