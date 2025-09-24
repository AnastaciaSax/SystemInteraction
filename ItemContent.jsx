import React from "react";
import { Box, Card } from "@mui/material";
import ItemImage from "./ItemImage";
import ItemInfo from "./ItemInfo";

const ItemContent = ({ item }) => (
  <Box className="project">
    <Box className="field">
      <Card
        className="details-card"
        sx={{ display: "flex", gap: "40px", p: 2, alignItems: "center" }}
      >
        <ItemImage src={item.photoURL} alt={item.title} />
        <ItemInfo
          title={item.title}
          category={item.category}
          place={item.place}
          price={item.price}
        />
      </Card>
    </Box>
  </Box>
);

export default ItemContent;
