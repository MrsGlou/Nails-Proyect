import Hero from "../components/Home/Hero";
import Services from "../components/Home/Services";
import ServicesTypes from "../components/Home/ServicesTypes";
import Navbar from "../components/Home/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <ServicesTypes />
    </div>
  );
};

export default Home;
