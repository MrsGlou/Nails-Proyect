import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const data = localStorage.getItem("user");
    const parseUser = JSON.parse(data);

    if (data) {
      return parseUser;
    } else {
      return null;
    }
  });

  //! ALLUSER -----solo cuando me registro para guardar la respuesta--

  const [allUser, setAllUser] = useState({
    data: {
      confirmationCode: "",
      user: {
        password: "",
        email: "",
      },
    },
  });

  const navigate = useNavigate();

  //------LOGIN-------//
  const userLogin = (data) => {
    // Primero lo meto en el localstorage
    localStorage.setItem("user", data);

    //Despues lo metemos parseado al estado global que setea nuestro usuario logado
    const parseUser = JSON.parse(data);
    setUser(() => parseUser);
  };

  //------LOGOUT-------//
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const bridgeData = () => {
    const data = localStorage.getItem("data");
    const dataJson = JSON.parse(data);
    console.log(dataJson);
  };
  // UseMemo memoriza el return de una funcion
  const value = useMemo(
    () => ({
      user,
      setUser,
      userLogin,
      logout,
      allUser,
      bridgeData,
    }),
    [user, allUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
