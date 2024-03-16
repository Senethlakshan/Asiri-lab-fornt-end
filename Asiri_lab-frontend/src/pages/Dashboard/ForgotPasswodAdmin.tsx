// import React,{useState} from 'react';
// import { Link,useNavigate,useLocation } from 'react-router-dom';
// import '../../css/LoginAdmin.css';
// import brandLogo from '../../images/logo/JanashakthiLife Logo_White-01.png';
// import { FaArrowLeft,FaQuestionCircle} from "react-icons/fa";
// import { SyncLoader} from 'react-spinners';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const ForgotPasswodAdmin = () => {

  
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const username = location.state?.username || '';


//   const handleSendClick = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.post('http://localhost:5000/api/auth/user/send-otp', {
//         username: username,
//         email: email,
//       });
//       toast.success('OTP sent. Please check your email.');
//       // Optionally navigate to the reset password page or stay on the current page
//       navigate('/reset-password');
//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       toast.error('Failed to send OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
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
//         {/* send otp to email  form */}
//         <form className="login-form " onSubmit={handleSendClick}>
//           <div className='formheader'>
//           <h2 className="font-bold text-4xl text-black-2 mb-2 back-link">Forgot Password<FaQuestionCircle className='ml-2'/></h2>
//          </div>
//           <div className="form-group">
//             <input  className='forminput text-xl' placeholder='Email' type="text" id="username" name="username" required />
//          </div>
               
//           {/* send email button */}

//             {/* <Link to ='/reset-password'> */}
//             <button className="loginbtn" onClick={handleSendClick} disabled={loading}>
//               {loading ? <SyncLoader color="#fff" size={10} /> : 'Send'}
//             </button>
//             {/* </Link> */}

//          {/* Back link with arrow icon */}
//          <Link to='/'>
//          <div className="back-link">
//               <FaArrowLeft className='mr-2' />
//               <p>Back</p>
//             </div>
//          </Link>
     
//         </form>
        
//         {/* Toast messages */}
//         <ToastContainer />
//     </div>
//   </div>
//    </>
   
//   );
// };

// export default ForgotPasswodAdmin;


// {/* <form className="login-form" onSubmit={handleSendClick}>
// <div className='formheader'>
//   <h2 className="font-bold text-4xl text-black-2 mb-2 back-link">Forgot Password<FaQuestionCircle className='ml-2'/></h2>
// </div>
// <div className="form-group">
//   <input className='forminput text-xl' placeholder='Email' type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
// </div>
// <button className="loginbtn" type="submit" disabled={loading}>
//   {loading ? <SyncLoader color="#fff" size={10} /> : 'Send'}
// </button>
// <Link to='/'>
//   <div className="back-link">
//     <FaArrowLeft className='mr-2' />
//     <p>Back</p>
//   </div>
// </Link>
// </form> */}


import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../css/LoginAdmin.css';
import brandLogo from '../../images/logo/JanashakthiLife Logo_White-01.png';
import { FaArrowLeft, FaQuestionCircle } from "react-icons/fa";
import { SyncLoader } from 'react-spinners';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordAdmin = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || '';

  const handleSendClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/auth/user/send-otp', {
        username: username,
        email: email,
      });
      toast.success('OTP sent. Please check your email.');

      setTimeout(() => {
        navigate('/reset-password',{ state: { username: username, email: email } });
      }, 20000);
      
      } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error('Failed to send OTP. Please try again.');
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
              <h2 className="font-bold text-4xl text-black-2 mb-2 back-link">Forgot Password<FaQuestionCircle className='ml-2'/></h2>
            </div>
            <div className="form-group">
              <input className='forminput text-xl' placeholder='Email' type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <button className="loginbtn" type="submit" disabled={loading}>
              {loading ? <SyncLoader color="#fff" size={10} /> : 'Send'}
            </button>
            <Link to='/'>
              <div className="back-link">
                <FaArrowLeft className='mr-2' />
                <p>Back</p>
              </div>
            </Link>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordAdmin;
