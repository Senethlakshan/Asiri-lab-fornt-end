import  { useState } from 'react';
import '../css/CompanyProfile.css'
import { useLocation } from 'react-router-dom';
import AccountDetails from './tabs/AccountDetails';
import UserTabs from './tabs/UserTab';
import PolicyDetailsTab from './tabs/PolicyDetailsTab';
import ClaimsTab from './tabs/ClaimsTab';
import EndorsementsTab from './tabs/EndorsementsTab';



const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();
  const state = location.state as { companyID: string };



  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="company-profile">
      <h1 className='company-name'>Company Profile</h1>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabClick(1)}
        >
          Account Details
        </div>
        <div
          className={`tab ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => handleTabClick(2)}
        >
         <h2> User </h2>
        </div>
        <div
          className={`tab ${activeTab === 3 ? 'active' : ''}`}
          onClick={() => handleTabClick(3)}
        >
         Policy Details
        </div>
        <div
          className={`tab ${activeTab === 4 ? 'active' : ''}`}
          onClick={() => handleTabClick(4)}
        >
         <h2> Claims</h2>
        </div>
        <div
          className={`tab ${activeTab === 5 ? 'active' : ''}`}
          onClick={() => handleTabClick(5)}
        >
          <h2>Endorsements</h2>
        </div>
      </div>

      {/* Content for each tab */}
      <div className="tab-content">
        {activeTab === 1 && <AccountDetails companyID={state?.companyID} />}
        {activeTab === 2 && <UserTabs/>}
        {activeTab === 3 && <PolicyDetailsTab/>}
        {activeTab === 4 && <ClaimsTab/>}
        {activeTab === 5 && <EndorsementsTab/>}
      </div>
    </div>
  );
};

export default CompanyProfile;
