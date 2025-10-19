import React, { useEffect, useState } from "react";
import "./Preloader.css"; 

function Preloader({ loading }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!loading) {
      // добавляем плавное скрытие
      const timer = setTimeout(() => setHidden(true), 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (hidden) return null;

  return (
    <div id="preloader" className={!loading ? "hidden" : ""}>
      <div className="spinner"></div>
    </div>
  );
}

export default Preloader;