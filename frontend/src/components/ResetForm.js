import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetForm = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = formData;

    if (!email) {
      alert("Please fill all the fields");
      return;
    }
    try {
      await axios.post(
        "http://localhost:3000/api/pass/forgotpassword",
        formData
      );
      alert("Recovery Mail Sent , PLease check your Mail.")
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-4">Password Reset Form</h2>
      <h3 className="text-lg font-medium mb-2">Add Registered Mail Only</h3>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Send Mail
        </button>
      </form>
    </div>
  );
};

export default ResetForm;
