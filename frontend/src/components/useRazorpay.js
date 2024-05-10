import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Razorpay from "razorpay";
import {updateUserPremiumStatus} from "../redux/authSlice";

const useRazorpay = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.user);
  const token = isAuthenticated?.token;

  const handlePremium = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/premium/takepremium`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      const { key_id, order_id} = response.data;

      const rzp = new window.Razorpay({
        key_id: key_id, 
        order_id: order_id, 

        handler: async function (response) {
          try {
            const paymentResponse = await axios.post(
              `http://localhost:3000/api/premium/updatetransactionstatus`,
              {
                order_id: order_id,
                payment_id: response.razorpay_payment_id,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                },
              }
            );
              rzp.close();
              alert("Payment Successful, you are now a Premium USER");
              dispatch(updateUserPremiumStatus(true));
              return paymentResponse.json();
            
          } catch (error) {
            console.error("Error occurred while confirming payment", error);
          }
        },
      });

      rzp.open();
    } catch (error) {
      console.error("Error occurred while processing premium purchase", error);
    }
  }, [dispatch, token]);

  return handlePremium;
};

export default useRazorpay;
