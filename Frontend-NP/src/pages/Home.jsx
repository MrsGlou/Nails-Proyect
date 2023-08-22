import AboutUs from "../components/Home/AboutUs";
import Contact from "../components/Home/Contact";
import Footer from "../components/Home/Footer";
import Hero from "../components/Home/Hero";
import OurTeam from "../components/Home/OurTeam";
import Services from "../components/Home/Services";
import ServicesTypes from "../components/Home/ServicesTypes";
import "./Home.css";

const Home = () => {
  return (
    <div className="main_layout_home">
      <Hero />
      <Services />
      <ServicesTypes />
      <AboutUs />
      <Contact />
      <OurTeam />
      <Footer />
    </div>
  );
};

export default Home;
