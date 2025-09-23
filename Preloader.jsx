import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import "../styles/homeStyle.css";

function Preloader({ loading }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setHidden(true), 500); // плавное скрытие
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (hidden) return null;

  return (
    <Box
      id="preloader"
      className={!loading ? "hidden" : ""}
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        zIndex: 1300, // поверх всего
        transition: "opacity 0.5s ease",
        opacity: loading ? 1 : 0,
      }}
    >
      <Box className="spinner" />
    </Box>
  );
}

export default Preloader;