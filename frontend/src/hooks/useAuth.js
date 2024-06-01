import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isAuth } from "../redux/authSlice";

const Auth = () => {
  const token = useSelector((state) => state.auth.setToken);
  const dispatch = useDispatch();

  const checkToeknExpiration = async () => {
    try {
      if (token) {
        const response = await axios.post("http://localhost:3000/api/sign/authCheck", {
          token: token,
        });
        
        if (response.data.success !==false) {
          dispatch(isAuth(true));
        } 
      }
    } catch (err) {
      dispatch(isAuth(false));
      console.log(err);
    }
  };

  return checkToeknExpiration;
};

export default Auth;
