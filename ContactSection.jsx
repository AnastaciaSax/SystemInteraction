import React from "react";
import { Box, Typography, Stack } from "@mui/material";

const ContactSection = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "62.5%",
        height: "700px",
        mx: "auto",
        mt: { xs: "60px", md: "120px" },
        mb: { xs: "60px", md: "120px" },
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        flexDirection: { xs: "column", md: "row" },
        gap: { xs: 6, md: 0 },
      }}
    >
      {/* Текстовый блок */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "472px",
          gap: "45px",
          flexShrink: 0,
        }}
      >
        {/* Заголовок и описание */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: "33px" }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"DM Serif Display", serif',
              fontWeight: 400,
              fontSize: { xs: "32px", md: "50px" },
              lineHeight: "125%",
              letterSpacing: "1px",
              color: "#292F36",
            }}
          >
            Wanna Contact Us?
          </Typography>
          <Typography
            sx={{
              fontFamily: "Jost, sans-serif",
              fontSize: { xs: "18px", md: "22px" },
              lineHeight: "150%",
              color: "#4D5053",
            }}
          >
            We're always happy to hear from fellow design enthusiasts. Whether
            it's a quick hello or a spark of a new idea, drop us a message
            anytime, and let's chat about making your space truly special.
          </Typography>
        </Box>

        {/* Контакты */}
        <Stack spacing={3}>
          <Stack
            direction="row"
            spacing={1.6}
            alignItems="center"
            sx={{ height: "54px" }}
          >
            <Box
              component="img"
              src="/Assets/mail.svg"
              alt="Mail icon"
              sx={{ width: 28, height: 28 }}
            />
            <Typography
              sx={{
                fontFamily: "Jost, sans-serif",
                fontSize: "24px",
                letterSpacing: "0.24px",
              }}
            >
              interno@gmail.com
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1.6}
            alignItems="center"
            sx={{ height: "54px" }}
          >
            <Box
              component="img"
              src="/Assets/phone.svg"
              alt="Phone icon"
              sx={{ width: 28, height: 28 }}
            />
            <Typography
              sx={{
                fontFamily: "Jost, sans-serif",
                fontSize: "24px",
                letterSpacing: "0.24px",
              }}
            >
              +1 (378) 400-1234
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1.6}
            alignItems="center"
            sx={{ height: "54px" }}
          >
            <Box
              component="img"
              src="/Assets/site.svg"
              alt="Web site icon"
              sx={{ width: 28, height: 28 }}
            />
            <Typography
              sx={{
                fontFamily: "Jost, sans-serif",
                fontSize: "24px",
                letterSpacing: "0.24px",
              }}
            >
              www.interno.com
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* Карта */}
      <Box
        sx={{
          flex: 1,
          height: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box
          component="iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9363747399586!2d-73.98502118459355!3d40.69057257933426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a30f4a8ea9d%3A0x7ec99e56c8d3b169!2sLong%20Island%20University%20Brooklyn!5e0!3m2!1sen!2sus!4v1682355282600!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
          sx={{
            width: "653px",
            height: "700px",
            border: "none",
            borderRadius: "0px 326.5px 0px 123px",
            overflow: "hidden",
            background: "#C4C4C4",
          }}
        />
      </Box>
    </Box>
  );
};

export default ContactSection;
