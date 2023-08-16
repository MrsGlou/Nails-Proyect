import Hero from "../components/Home/Hero";
import Services from "../components/Home/Services";
import ServicesTypes from "../components/Home/ServicesTypes";
import "./Home.css";

const Home = () => {
  return (
    <div className="main_layout_home">
      <Hero />
      <Services />
      <ServicesTypes />
    </div>
  );
};

export default Home;
