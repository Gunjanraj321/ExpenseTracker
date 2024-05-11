
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isAuth , user} from "../redux/authSlice";

const Auth = () => {
  const isAuthenticated = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const checkToeknExpiration = async () => {
    try {
      if (isAuthenticated?.token) {
        const response = await axios.post("http://localhost:3000/api/sign/authCheck", {
          token: isAuthenticated.token,
        });
        
        if (response.data.success !==false) {
          dispatch(isAuth(true));
        } 
      }
    } catch (err) {
      dispatch(isAuth(false));
      dispatch(user(null));
      console.log(err);
    }
  };

  return checkToeknExpiration;
};

export default Auth;
