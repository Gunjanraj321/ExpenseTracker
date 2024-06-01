import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPage = () => {
    const { uuid } = useParams();
    console.log(uuid);
    const [formData, setFormData] = useState({
        password:'',
        confirmPassword:''
    })

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { password, confirmPassword } = formData;
        if(password !== confirmPassword){
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3000/api/pass/newPassword`, {
                uuid: uuid,
                password: password
            });
            setSuccessMessage(response.data.message);
            navigate('/');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 px-4">
          <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <input 
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              required
            />
            <input 
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <button 
              type="submit" 
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Reset Password
            </button>
          </form>
        </div>
    );
}

export default ResetPage;