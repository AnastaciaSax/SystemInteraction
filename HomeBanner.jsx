import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function HomeBanner() {
  return (
    <Box
      component="main"
      sx={{
        width: "62.55%",
        height: "auto",
        mt: "100px",
        mx: "auto",
        borderRadius: "70px",
        background: `url('/Assets/banner.png') no-repeat center center / cover`,
        p: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "487px",
          gap: "21px",
          pl: "52px",
          pt: "20px",
        }}
      >
        {/* Текст */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "18px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"DM Serif Display", serif',
              fontWeight: 400,
              fontSize: "65px",
              color: "#292F36",
              lineHeight: "125%",
            }}
          >
            Let Your Home Be Unique
          </Typography>
          <Typography
            sx={{
              fontFamily: "Jost, sans-serif",
              fontWeight: 400,
              fontSize: "22px",
              color: "#4D5053",
              lineHeight: "150%",
            }}
          >
            Our design experts blend modern creativity with timeless elegance, crafting spaces that truly reflect your personality.
          </Typography>
          <Typography
            sx={{
              fontFamily: "Jost, sans-serif",
              fontWeight: 400,
              fontSize: "22px",
              color: "#4D5053",
              lineHeight: "150%",
            }}
          >
            Discover a new way to experience home design, where innovation meets practicality and every room tells your unique story.
          </Typography>
        </Box>

        {/* Кнопка */}
        <Button
          href="/catalog"
          sx={{
            mt: "20px",
            px: "48px",
            py: "26px",
            borderRadius: "18px",
            backgroundColor: "#292F36",
            boxShadow: "0px 10px 20px 0px rgba(192,192,192,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#1f242a",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Jost, sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              color: "#FFF",
              lineHeight: "125%",
            }}
          >
            Get Started
          </Typography>
          <Box
            component="img"
            src="/Assets/arrowButton.svg"
            alt="Arrow"
            sx={{ width: "24px", height: "24px" }}
          />
        </Button>
      </Box>
    </Box>
  );
}

export default HomeBanner;
