import React from "react";
import { Box, Typography, Button } from "@mui/material";

const JoinSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "62.55%",
        py: "80px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "70px",
        backgroundColor: "#292F36",
        mx: "auto", // центрируем
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "47.54%",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {/* Заголовок */}
        <Box
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            gap: "11px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#FFF",
              textAlign: "center",
              fontSize: "50px",
              whiteSpace: "nowrap",
              fontWeight: 600,
            }}
          >
            Wanna Join The Interno?
          </Typography>
          <Typography
            sx={{
              color: "#FFF",
              textAlign: "center",
              fontSize: "22px",
              mx: "7%",
            }}
          >
            It's your gateway to a community where creativity and collaboration
            thrive.
          </Typography>
        </Box>

        {/* Кнопки */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: "32px",
          }}
        >
          <Button
            href="checkIn.html"
            sx={{
              width: "139px",
              height: "55px",
              borderRadius: "18px",
              backgroundColor: "#CDA274",
              boxShadow: "0px 10px 20px 0px #1F2022",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "11px",
              "&:hover": { backgroundColor: "#b88e62" },
            }}
          >
            <Typography
              sx={{
                color: "#FFF",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.36px",
              }}
            >
              Check In
            </Typography>
            <Box
              component="img"
              src="/Assets/butArrow.svg"
              alt="arrow"
              sx={{ width: "18px", height: "18px" }}
            />
          </Button>

          <Button
            href="signIn.html"
            sx={{
              width: "139px",
              height: "55px",
              borderRadius: "18px",
              backgroundColor: "#CDA274",
              boxShadow: "0px 10px 20px 0px #1F2022",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "11px",
              "&:hover": { backgroundColor: "#b88e62" },
            }}
          >
            <Typography
              sx={{
                color: "#FFF",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "0.36px",
              }}
            >
              Sign In
            </Typography>
            <Box
              component="img"
              src="/Assets/butArrow.svg"
              alt="arrow"
              sx={{ width: "18px", height: "18px" }}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default JoinSection;
