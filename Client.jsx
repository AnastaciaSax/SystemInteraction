import React from "react";
import { Box, Typography, Stack } from "@mui/material";

const testimonials = [
  {
    img: "/Assets/person.png",
    name: "Nattasha Mith",
    location: "Sydney, USA",
    text: "I was absolutely thrilled with the transformation of my living space. Their keen eye for aesthetics and thoughtful approach.",
  },
  {
    img: "/Assets/person1.png",
    name: "Raymond Galario",
    location: "Sydney, Australia",
    text: "The team listened to my ideas, then elevated them with innovative design solutions. My apartment now feels modern, uniquely mine.",
  },
  {
    img: "/Assets/person2.png",
    name: "Benny Roll",
    location: "Sydney, New York",
    text: "Choosing this company was the best decision. The blend of creativity and expertise transformed my outdated space.",
  },
];

const logos = [
  "/Assets/clientLogo.svg",
  "/Assets/clientLogo1.svg",
  "/Assets/clientLogo2.svg",
  "/Assets/clientLogo3.svg",
  "/Assets/clientLogo4.svg",
];

const Client = () => {
  return (
    <Box
      sx={{
        width: "62.5%",
        mx: "auto",
        mt: { xs: "80px", md: "100px" },
        mb: { xs: "60px", md: "120px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 6, md: 10 },
      }}
    >
      {/* Testimonials */}
      <Box
        sx={{
          width: "100%",
          borderRadius: "70px",
          backgroundColor: "#F4F0EC",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            width: "95.83%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "38px",
          }}
        >
          {/* Заголовок */}
          <Box sx={{ width: { xs: "100%", md: "45.65%" } }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"DM Serif Display", serif',
                fontWeight: 400,
                fontSize: { xs: "32px", md: "50px" },
                textAlign: "center",
                letterSpacing: "1px",
                color: "#292F36",
              }}
            >
              What the People Think About Us
            </Typography>
          </Box>

          {/* Комментарии */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 3 }}
            justifyContent="center"
            alignItems="stretch"
            sx={{ width: "100%" }}
          >
            {testimonials.map((t, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  backgroundColor: "#FFF",
                  borderRadius: "30px",
                  height: "339px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "25px",
                  px: 3,
                  py: 4,
                }}
              >
                {/* Человек */}
                <Box
                  sx={{
                    display: "flex",
                    width: "70%",
                    alignItems: "center",
                    gap: "23px",
                  }}
                >
                  <Box
                    component="img"
                    src={t.img}
                    alt="Person's photo"
                    sx={{ width: 60, height: 60, borderRadius: "50%" }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Jost, sans-serif",
                        fontSize: "22px",
                        lineHeight: "150%",
                        letterSpacing: "0.25px",
                      }}
                    >
                      {t.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Jost, sans-serif",
                        fontSize: "18px",
                        letterSpacing: "0.18px",
                        color: "#4D5053",
                      }}
                    >
                      {t.location}
                    </Typography>
                  </Box>
                </Box>

                {/* Текст */}
                <Box sx={{ width: "80%" }}>
                  <Typography
                    sx={{
                      fontFamily: "Jost, sans-serif",
                      fontSize: "22px",
                      letterSpacing: "0.22px",
                      color: "#4D5053",
                      lineHeight: "150%",
                    }}
                  >
                    {t.text}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Client Logos */}
      <Stack
        direction="row"
        spacing={{ xs: 4, md: "9.9%" }}
        justifyContent="center"
        alignItems="center"
        sx={{ width: "56.82%" }}
      >
        {logos.map((src, i) => (
          <Box
            key={i}
            component="img"
            src={src}
            alt="Client logo"
            sx={{ maxWidth: "120px", height: "auto" }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Client;