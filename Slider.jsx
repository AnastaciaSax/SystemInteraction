import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function Slider() {
  const slides = [
    { src: "/Assets/bed1.png", category: "Bedroom" },
    { src: "/Assets/kitchen1.jpg", category: "Kitchen" },
    { src: "/Assets/bath1.jpg", category: "Bathroom" },
    { src: "/Assets/bed5.jpg", category: "Bedroom" },
    { src: "/Assets/kitchen2.jpg", category: "Kitchen" },
    { src: "/Assets/dining1.jpg", category: "Dining Hall" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 767) setVisibleSlides(1);
      else if (w <= 1024) setVisibleSlides(2);
      else setVisibleSlides(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextHandler = () => {
    if (currentIndex < slides.length - visibleSlides) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevHandler = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <Box
      sx={{
        width: "62.5%",
        mx: "auto",
        mt: { xs: "60px", md: "100px" },
        mb: { xs: "60px", md: "100px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "32px", md: "50px" },
          fontFamily: '"DM Serif Display", serif',
          fontWeight: 400,
          textAlign: "center",
          color: "#292F36",
        }}
      >
        What We Offer
      </Typography>

      {/* Slides wrapper */}
      <Box
        sx={{
          display: "flex",
          gap: "27px",
          transition: "transform 0.5s ease-in-out",
          transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
          width: "100%",
        }}
      >
        {slides.map((slide, i) => (
          <Box
            key={i}
            sx={{
              flex: `0 0 ${100 / visibleSlides}%`,
              height: { xs: "200px", md: "244px" },
              borderRadius: "30px",
              overflow: "hidden",
            }}
          >
            <Link to={`/catalog?category=${slide.category}`}>
              <Box
                component="img"
                src={slide.src}
                alt={slide.category}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Link>
          </Box>
        ))}
      </Box>

      {/* Navigation buttons */}
      <Box sx={{ display: "flex", gap: 4 }}>
        <IconButton
          onClick={prevHandler}
          disabled={currentIndex <= 0}
          sx={{
            width: 60,
            height: 60,
            backgroundColor: "#f0f0f0",
            borderRadius: "50%",
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={nextHandler}
          disabled={currentIndex >= slides.length - visibleSlides}
          sx={{
            width: 60,
            height: 60,
            backgroundColor: "#f0f0f0",
            borderRadius: "50%",
            "&:hover": { backgroundColor: "#e0e0e0" },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Slider;