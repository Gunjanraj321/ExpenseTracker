
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { isAuth , login} from "../redux/authSlice";

const Auth = () => {
  const isAuthenticated = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const checkToeknExpiration = async () => {
    try {
      if (isAuthenticated?.token) {
        const response = await axios.post("http://localhost:3000/api/auth", {
          token: isAuthenticated.token,
        });
        
        if (response.data.success === true) {
          dispatch(isAuth(true));
        } 
        else {
          dispatch(isAuth(false));
          dispatch(login(null));
        }
      }
    } catch (err) {
      dispatch(isAuth(false));
      dispatch(login(null));
      console.log(err);
    }
  };

  return checkToeknExpiration;
};

export default Auth;
