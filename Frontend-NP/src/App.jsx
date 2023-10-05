import "./App.css";
import { Outlet } from "react-router-dom";
import { useAuth } from "./contexts/authContext";
import Navbar from "./components/Home/Navbar";
import NavbarEmployee from "./pages/EmployeePortal/NavbarEmployee";

function App() {
  const { user } = useAuth();
  
  return (
    <>
      {user == null ? <Navbar /> : <NavbarEmployee />}
      
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
