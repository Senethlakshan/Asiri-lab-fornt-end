import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
import '../css/Dashbord.css';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const AddUser = () => {
  const location = useLocation();
  const { companyID } = location.state || { companyID: '' };

  // State for form fields
  const [proposerCode, setProposerCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [profileName, setProfileName] = useState('');

    // States for form fields

    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [designation, setDesignation] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [role, setRole] = useState('');

  // Fetch company details based on companyID and populate form fields
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        if (!companyID) {
          toast.warn('No company ID provided.');
          return;
        }
        const response = await axios.get(`http://localhost:5000/api/auth/admin/s1/company/${companyID}`);
        const { company } = response.data;
        setProposerCode(company.proposerCode);
        setCompanyName(company.companyName);
        setProfileName(company.profile_name);
      } catch (error) {
        console.error('Failed to fetch company details:', error);
        toast.error('Failed to fetch company details.');
      }
    };

    fetchCompanyDetails();
  }, [companyID]);


  const handleCreateUser = async (e) => {
    e.preventDefault(); // Prevent the form from submitting through the browser

    const userRegistrationData = {
      username,
      password,
      role, 
      email,
      contactNumber,
      companyName,
      profileName,
      proposerCode,
      designation,
      address,
      dob,
      companyID
    };

    try {
      await axios.post('http://localhost:5000/api/auth/register', userRegistrationData);
      toast.success('User successfully created!');
      // Clear the form or redirect as needed
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error('Failed to create user.');
    }
  };


  // handleDelete button
  const handleDelete = () => {
    
  };

  //  function to generate a password 
  const generatePassword = () => {
    
  };

  return (
    <>
      <Breadcrumb pageName="Add User" />

      {/* Fetch data API part */}
      <div className="companies_section">
        {/* Proposer code */}
        <div className="form-group-cp">
          <label htmlFor="proposerCode">Proposer Code</label>
          <input
            type="text"
            id="proposerCode"
            name="proposerCode"
            value={proposerCode}
            onChange={(e) => setProposerCode(e.target.value)}
            className="input-field"
            readOnly // Consider if this should be editable
          />
        </div>

        {/* Company name */}
        <div className="form-group-cp">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="input-field"
            readOnly // Consider if this should be editable
          />
        </div>

        {/* Profile name */}
        <div className="form-group-cp">
          <label htmlFor="profileName">Profile Name</label>
          <input
            type="text"
            id="profileName"
            name="profileName"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            className="input-field"
            readOnly // Consider if this should be editable
          />
        </div>
      </div>

      {/* Add User section PART 2 */}
      <div className="add_user_section">
        <div className="add-user-form">
          <div className="column ">
           <form className='formlayout'  onSubmit={handleCreateUser} >
            {/* frist column */}
           <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="adduser-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                placeholder="Contact Number"
                className="adduser-input"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
              <input
                type="text"
                id="designation"
                name="designation"
                placeholder="Designation"
                className="adduser-input"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                
              />
              <input
                type="date"
                id="designationDate"
                name="designationDate"
                className="adduser-input"
                value={designation}
                onChange={(e) => setDob(e.target.value)}
              />
              <textarea
                id="address"
                name="address"
                placeholder="Address"
                className="adduser-input"
                value={designation}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>

              {/* second column */}
              <select
                id="User Role"
                name="role"
                className="adduser-input"
                 value={role} 
                 onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select User Role</option>{' '}
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>

              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username "
                className="adduser-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="adduser-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn-adduser-generate" onClick={generatePassword}>Generate</button>
          
            <div className="btn-action">
              <button className="btn-adduser" onClick={handleCreateUser}>Create User</button>
              {/* <Link to="/dashboard/calendar"> */}
                <button className="btn-adduser-cansel" onClick={handleDelete}>Cancel</button>
              {/* </Link> */}
            </div>  
           </form>
          </div>


        </div>
      </div>
    </>
  );
};

export default AddUser;
