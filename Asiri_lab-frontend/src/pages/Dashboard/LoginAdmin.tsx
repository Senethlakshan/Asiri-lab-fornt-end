import { useState } from 'react';
import '../../css/LoginAdmin.css';
import brandLogo from '../../images/logo/JanashakthiLife Logo_White-01.png';
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setUserID } from '../../routes/userSlice';

const LoginAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make a POST request to the backend login endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      }, {
        // Ensure credentials are included with the request so cookies can be set
        withCredentials: true,
      });

      // Check response here, based on how your backend is set up
      if (response.data) {
        toast.success('Successful login');
        
       
        dispatch(setUserID(response.data.user.userID));

        //Save user data to sessionStorage
       sessionStorage.setItem('userSession', JSON.stringify({
       userID: response.data.user.userID,
       username: response.data.user.username,
       role: response.data.user.role,
       isLoggedIn: true

      }));

         // console.log("user id "+response.data.user.userId);


        navigate('/dashboard/Dashboard'); // Adjust the path as needed
      } else {
        toast.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password', { state: { username: username } });
  };
  

  return (
    <div className="two-column-layout">
      <div className="left-side">
        <div className="brand-image-container">
          <img src={brandLogo} alt="Brand Logo" />
        </div>
      </div>
      <div className="right-side">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="formheader">
            <h2 className="font-bold text-4xl text-black-2 mb-2">Hello!</h2>
            <p className="text-2xl text-black-2">Welcome back</p>
          </div>

          <div className="form-group">
            <input
              className="forminput text-xl"
              placeholder="User name"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="forminput text-xl"
              placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          
          </div>

          <button className="loginbtn bg-yellow" type="submit" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </button>
        
              <div className='flex justify-between text-lg '>
              {/* <Link to="/forgot-password"> */}
                <button className="mt-4  hover:text-black" onClick={handleForgotPassword }>Forgot Password?</button>
              {/* </Link>   */}
                <button className="mt-4  hover:text-black ">*Need Help</button>
              </div>
        
        </form>

        {/* Toast messages */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default LoginAdmin;
