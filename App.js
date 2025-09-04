import React, { Component } from "react"; 
import './App.css';
import './style.css';

import Header from "./components/Header"; 
import Title from "./components/Title";
import Agency from "./components/Agency";
import SectionService from "./components/Section-service";
import SectionAbout from "./components/Section-about-us";
import SectionWork from "./components/Section-our-work";
import SectionTest from "./components/Section-testimonial";
import SectionProject from "./components/Section-have-project";
import Footer from "./components/Footer";

class App extends React.Component {
  render() {
    return (
      <>
      <div className="App">
        <div className="thumb">
        <Header />
        <Title />
        </div>
        <div className="web">
        <Agency />
         <SectionService />
         <SectionAbout />
         <SectionWork />
         <SectionTest />
         <SectionProject />
         <Footer />
        </div>

      </div>
      </>
    );
  }
}

export default App;