import React from "react";
import { Box, Typography } from "@mui/material";

function CatalogBanner() {
  return (
    <Box component="main" className="banner banner--catalog">
      <Box className="intro">
        <Box className="into-title">
          <Typography component="h2" data-i18n="catalogTitle" sx={{
    color: "#292F36",
    fontFamily: '"DM Serif Display", serif',
    fontWeight: 400,
    lineHeight: "125%",
     fontSize: "50px",
     whiteSpace: "nowrap"
  }}>
            
            Design Catalog
          </Typography>
          <Typography component="span" data-i18n="homeCatalogBreadcrumb">
            Home / Catalog
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CatalogBanner;