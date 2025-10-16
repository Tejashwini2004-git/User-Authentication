import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppConstants } from "../util/constants";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendURL = AppConstants.BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // ✅ Get user profile
  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendURL}/profile`, {
        withCredentials: true, // important for sending cookie
      });
      if (response.status === 200) {
        setUserData(response.data);
      }
    } catch (error) {
      console.error("Profile error:", error.response?.data || error.message);
      toast.error("Unable to retrieve profile");
    }
  };

  const getAuthState = async () => {
    try {
      const response = await axios.get(`${backendURL}/is-authenticated`, {
        withCredentials: true, // ✅ important
      });

      if (response.status === 200 && response.data === true) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Auth check error:", error.response?.data || error.message);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  return (
    <AppContext.Provider
      value={{
        backendURL,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        getUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
