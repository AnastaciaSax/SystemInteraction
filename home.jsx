import React, { useState, useEffect } from "react";

import Preloader from "../components/Preloader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/HomeBanner";
import Slider from "../components/Slider";
import ContactSection from "../components/ContactSection";
import Client from "../components/Client";
import Counter from "../components/Counter";
import JoinSection from "../components/JoinSection";

import "../styles/homeStyle.css";
import "../styles/homeAdaptation.css";
import "../styles/homeAnimation.css";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Симуляция загрузки прелоадера
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // === Slider ===
    const sliderContainer = document.querySelector(".slider");
    const slidesContainer = document.querySelector(".slides");
    const btnPrev = document.querySelector(".prev");
    const btnNext = document.querySelector(".next");
    const slides = document.querySelectorAll(".slide");
    if (!sliderContainer || !slidesContainer || !btnPrev || !btnNext) return;

    let currentIndex = 0;
    let visibleSlides = getVisibleSlides();
    let slideStep = 0;

    function getVisibleSlides() {
      const w = window.innerWidth;
      if (w <= 767) return 1;
      if (w <= 1024) return 2;
      return 3;
    }

    function updateDimensions() {
      const containerWidth = sliderContainer.clientWidth;
      const computedGap = parseFloat(getComputedStyle(slidesContainer).gap) || 27;
      const slideWidth =
        (containerWidth - computedGap * (visibleSlides - 1)) / visibleSlides;
      slides.forEach((slide) => {
        slide.style.flex = `0 0 ${slideWidth}px`;
      });
      slideStep = slideWidth + computedGap;
    }

    function updateSlider() {
      slidesContainer.style.transform = `translateX(-${currentIndex * slideStep}px)`;
      btnPrev.disabled = currentIndex <= 0;
      btnNext.disabled = currentIndex >= slides.length - visibleSlides;
    }

    function initSlider() {
      visibleSlides = getVisibleSlides();
      updateDimensions();
      updateSlider();
    }

    const nextHandler = () => {
      if (currentIndex < slides.length - visibleSlides) {
        currentIndex += 0.5;
        updateSlider();
      }
    };
    const prevHandler = () => {
      if (currentIndex > 0) {
        currentIndex -= 0.5;
        updateSlider();
      }
    };

    btnNext.addEventListener("click", nextHandler);
    btnPrev.addEventListener("click", prevHandler);

    let startX = 0;
    const touchStartHandler = (e) => (startX = e.touches[0].clientX);
    const touchEndHandler = (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (diff > 50) nextHandler();
      else if (diff < -50) prevHandler();
    };
    slidesContainer.addEventListener("touchstart", touchStartHandler);
    slidesContainer.addEventListener("touchend", touchEndHandler);

    const resizeHandler = () => initSlider();
    window.addEventListener("resize", resizeHandler);

    initSlider();

    // === Burger menu ===
    const toggle = document.querySelector(".burger-toggle");
    const menu = document.querySelector(".burger-menu");
    const burgerHandler = () => menu.classList.toggle("active");
    toggle.addEventListener("click", burgerHandler);

    return () => {
      btnNext.removeEventListener("click", nextHandler);
      btnPrev.removeEventListener("click", prevHandler);
      slidesContainer.removeEventListener("touchstart", touchStartHandler);
      slidesContainer.removeEventListener("touchend", touchEndHandler);
      window.removeEventListener("resize", resizeHandler);
      toggle.removeEventListener("click", burgerHandler);
    };
  }, []);

  return (
    <>
      <Preloader loading={loading} />
      <div className="container">
        <Header />
        <Banner />
        <Slider />
        <ContactSection />
        <Client />
        <Counter />
        <JoinSection />
        <Footer />
      </div>
    </>
  );
}

export default Home;
