import React, {FC, useEffect} from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { refreshToken } from "./store/reducers/authSlice";
import "./App.css"


const App: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleGetNewToken = () => {
    const isLoggedLocalStorage = JSON.parse(
      localStorage.getItem("isLogged") as string
    );
    console.log(isLoggedLocalStorage);
    
    console.log(isLoggedLocalStorage, user.id);

    if (!user.id && isLoggedLocalStorage) {
      dispatch(refreshToken());
    }
  };

  useEffect(handleGetNewToken, [dispatch, user]);


  return (  
  <div>
        <AppRoutes />
  </div>
  
  )
}

export default App;
