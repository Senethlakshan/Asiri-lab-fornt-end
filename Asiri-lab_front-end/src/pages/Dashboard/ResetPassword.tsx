import React,{useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../css/LoginAdmin.css';
import brandLogo from '../../images/logo/JanashakthiLife Logo_White-01.png';
import { FaArrowLeft,FaUnlockAlt,FaQuestionCircle } from "react-icons/fa";
import { SyncLoader} from 'react-spinners';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// const ResetPassword = () => {

//   const [loading, setLoading] = useState(false);

//   const handleSendClick = () => {
//     // You can perform any asynchronous operations here
//     // For demonstration purposes, we'll simulate an asynchronous operation with a timeout
//     setLoading(true);
//     setTimeout(() => {
//       // After the operation is complete, reset the loading state
//       setLoading(false);
//     }, 2000); // Replace 2000 with the actual time your operation takes
//   };


//   return (
//    <>
//     <div className="two-column-layout">
//     <div className="left-side">
//         {/*brand image */}
//         <div className="brand-image-container">
//           <img src={brandLogo} alt="Brand Logo" />
//         </div>
//     </div>
//     <div className="right-side">
//         {/* login form */}
//         <form className="login-form">
//           <div className='formheader'>
//           <h2 className="font-bold text-4xl text-black-2 mb-2 back-link">Reset Password<FaUnlockAlt className="ml-2" /></h2>
//          </div>
//           <div className="form-group">
//             <input  className='forminput text-xl' placeholder='New Password' type="text" id="New_Password" name="New_Password" required />
//          </div>
//          <div className="form-group">
//             <input  className='forminput text-xl' placeholder='Confirm Password' type="text" id="ConfmPassword" name="ConfmPassword" required />
//          </div>

//          <div className="form-group">
//             <input  className='forminput text-xl' placeholder='OTP Code' type="text" id="otpCode" name="otpCode" required />
//          </div>
               
//           {/* login button */}

//             <Link to ='/reset-password'>
//             <button className="loginbtn" onClick={handleSendClick} disabled={loading}>
//               {loading ? <SyncLoader color="#fff" size={10} /> : 'Confirm'}
//             </button>
//             </Link>

//          {/* Back link with arrow icon */}
//          <Link to='/'>
//          <div className="back-link">
//               <FaArrowLeft className='mr-2' />
//               <p>Back</p>
//             </div>
//          </Link>
     
//         </form>
        
//     </div>
//   </div>
//    </>
   
//   );
// };


const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { username, email } = location.state || {};

  const handleSendClick = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/user/reset-password', {
        username,
        email,
        otp,
        newPassword,
      });
      toast.success('Password reset successfully');
      // Navigate to login or another desired page
      setTimeout(() => navigate('/'), 5000); // Adjust delay as needed
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="two-column-layout">
        <div className="left-side">
          <div className="brand-image-container">
            <img src={brandLogo} alt="Brand Logo" />
          </div>
        </div>
        <div className="right-side">
          <form className="login-form" onSubmit={handleSendClick}>
            <div className='formheader'>
              <h2 className="font-bold text-4xl text-black-2 mb-2">Reset Password<FaUnlockAlt className="ml-2" /></h2>
            </div>
            <div className="form-group">
              <input className='forminput text-xl' placeholder='New Password' type="password" id="New_Password" name="New_Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <input className='forminput text-xl' placeholder='Confirm Password' type="password" id="ConfirmPassword" name="ConfirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <input className='forminput text-xl' placeholder='OTP Code' type="text" id="otpCode" name="otpCode" value={otp} onChange={(e) => setOtp(e.target.value)} required />
            </div>
            <button className="loginbtn" type="submit" disabled={loading}>
              {loading ? <SyncLoader color="#fff" size={10} /> : 'Confirm'}
            </button>
            <Link to='/'>
              <div className="back-link">
                <FaArrowLeft className='mr-2' />
                <p>Back</p>
              </div>
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};



export default ResetPassword;


 
 