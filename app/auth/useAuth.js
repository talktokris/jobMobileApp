import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import jwtDecode from "jwt-decode";

import apiClient from "../api/client";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  const logIn = async (authToken) => {
    // console.log(authToken);
    authStorage.storeToken(authToken);

    const profile = await apiClient.post("/profile", {});
    //console.log(profile.data);

    // const user = jwtDecode(authToken);
    setUser(profile.data);
  };
  return { user, logIn, logOut };
};
