import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../../css/CompanyProfile.css';


interface AccountDetailsProps {
  companyID: string;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ companyID }) => {

  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [policies, setPolicies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setIsLoading(true);
      try {
        console.log(`Fetching details for companyID: ${companyID}`);
        const response = await axios.get(`http://localhost:5000/api/auth/admin/s1/company/${companyID}`);
        if (response.data && response.data.company) {
          setCompanyDetails(response.data.company);
          setPolicies(response.data.policies);
        } else {
          console.error("No company details found in response");
        }
      } catch (error) {
        console.error("Failed to fetch company details:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (companyID) {
      fetchCompanyDetails();
    } else {
      console.error("No companyID provided");
    }
  }, [companyID]);
  
  return (
    <>
      {companyDetails && (
        <div className="acc-container">
          {/* Example of displaying proposerCode, modify as needed for other fields */}
          <div className="form-row">
            <label htmlFor="proposerCode">Proposer Code:</label>
            <input type="text" id="proposerCode" value={companyDetails.proposerCode} readOnly />
          </div>
          {/* Add more fields here */}
        </div>
      )}

      {policies.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Policy ID</th>
              <th>Policy Number</th>
              <th>Create Date</th>
              <th>Commence Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {policies.map(policy => (
              <tr key={policy._id}>
                <td>{policy.policyID}</td>
                <td>{policy.policyNumber}</td>
                <td>{new Date(policy.createDate).toLocaleDateString()}</td>
                <td>{new Date(policy.commenceDate).toLocaleDateString()}</td>
                <td>{policy.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AccountDetails;
