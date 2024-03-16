import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Breadcrumb from '../../src/components/Breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { LuX,LuPlusCircle  } from 'react-icons/lu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Dashbord.css';

interface PolicyDetails {
  PROPOSERCODE: string;
  DOCUMENTNO: string;
  STATUS: string;
  CREATEDT: string;
  COMMENCEDATE: string;
  REGISTRATIONNUMBER: string;
  CompanyName: string;
}


interface GrpMembers {

  DOCUMENTNO: string;
  ITEMNAME: string;
  EMPLOYEENUMBER: string;
  CATEGORY: string;
  DATEOFBIRTH: string;
  SERIALNO: string;
  ITEMSERIALNO: string;

}

const CreateProfile: React.FC = () => {
  const [proposerCode, setProposerCode] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [ContactNumber, setContactNumber] = useState('');
  const [ProfileName, setProfileName] = useState('');
  const [Address, setAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [policyDetails, setPolicyDetails] = useState<PolicyDetails[]>([]);
  const [GrpMembers, setGrpMembers] = useState<GrpMembers[]>([]);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<PolicyDetails[]>([]);
  const [selectedRows, setSelectedRows] = useState<PolicyDetails[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(4);
  const [globalFilter, setGlobalFilter] = useState('');


  const [data1, setData1] = useState<GrpMembers[]>([]);
  const [selectedRows1, setSelectedRows1] = useState<GrpMembers[]>([]);

  // import axios from 'axios';

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'http://localhost:5000/api/auth/admin/s1/get-company-details',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ proposerCode }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const { PolicyDetails } = await response.json();
      setPolicyDetails(PolicyDetails);

      // Assuming you want to use the first policy detail for the form
      if (PolicyDetails.length > 0) {
        setRegistrationNumber(PolicyDetails[0].REGISTRATIONNUMBER);
        setCompanyName(PolicyDetails[0].CompanyName);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDetails = async () => {
    
    setLoading(true);
    try {
      const body = {
        companyName,
        br_number: registrationNumber,
        profile_name: ProfileName,
        address:Address,
        contactNumber:ContactNumber,
        createDateTime: new Date().toISOString(),
        proposerCode:proposerCode,
        policies: selectedRows.map(policy => ({
          policyNumber: policy.DOCUMENTNO,
          createDate: policy.CREATEDT,
          commenceDate: policy.COMMENCEDATE,
          status: policy.STATUS,
        })),
      };

      const response = await fetch('http://localhost:5000/api/auth/admin/s1/create-company-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to create company profile');
      }

      toast.success('Company profile created successfully');
      // Optionally reset form here
    } catch (error) {
      toast.error('Company profile created faild !');
      console.error('Error creating profile:', error);
    } finally {
      setLoading(false);
    }
  };

 
  const handleCancel = () => {
    setProposerCode('');
    setRegistrationNumber('');
    setCompanyName('');
    setContactNumber('');
    setProfileName('');
    setAddress('');
    setPolicyDetails([]);
    setSelectedRows([]);
  };


  const formatDate = (datetime: string): string => {
    const date = new Date(datetime);
    return date.toLocaleDateString('en-CA'); // Formats to 'YYYY-MM-DD'
  };


  return (
    <>
      <Breadcrumb pageName="Create Profile" />
      <div className="flex items-center mb-4 relative">
        <input
          type="text"
          placeholder="Enter Proposer Code"
          value={proposerCode}
          onChange={(e) => setProposerCode(e.target.value)}
          className="mr-2 ml-4 p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="p-2 text-white rounded bg-yellow"
        >
          Search
        </button>
      </div>

      {loading ? (
        <div className="animate-pulse">
          <div className="flex items-center justify-center absolute inset-0 bg-gray bg-opacity-50">
            <FaSpinner className="animate-spin mr-2" />
            Searching...
          </div>
        </div>
      ) : (
        <>
          <div className="acc-container bg-stroke rounded-md p-4">
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="brNumber">BR Number</label>
                <input
                  id="brNumber"
                  type="text"
                  value={registrationNumber}
                  // readOnly
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label htmlFor="companyName">Company Name</label>
                <input
                  id="companyName"
                  type="text"
                  value={companyName}
                  // readOnly
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
             
              <div className="form-row">
                <label htmlFor="ContactNumber">Contact Number</label>
                <input type="text" id="ContactNumber" name="ContactNumber"
                value={ContactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="ProfileName">Profile Name</label>
                <input type="text" id="ProfileName" name="ProfileName" 
                 value={ProfileName}
                 onChange={(e) => setProfileName(e.target.value)} 
                />
              </div>
              <div className="form-row">
                <label htmlFor="Address">Address</label>
                <input type="text" id="Address" name="Address"
                 value={Address}
                 onChange={(e) => setAddress(e.target.value)}
                  />
              </div>
            </div>
          </div>

          <div className="bg-gray">
          <h1 className='bg-yellow text-black-2 ml-4 p-4 '>Group Policies</h1>
            <DataTable
              value={policyDetails}
              selection={selectedRows}
              onSelectionChange={(e) => setSelectedRows(e.value)}
              first={first}
              onPage={(e) => setFirst(e.first)}
              selectionMode="multiple"
              sortMode="multiple"
              globalFilter={globalFilter}
              paginator
              rows={5}
              className="ml-4"
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: '3em' }}
              ></Column>
              <Column field="PARENTDOCUMENTNO" header="Document No"></Column>
              <Column field="CREATEDT" header="Create Date" body={(rowData: PolicyDetails) => formatDate(rowData.CREATEDT)}></Column>
              <Column field="COMMENCEDATE" header="Commence Date"  body={(rowData: PolicyDetails) => formatDate(rowData.COMMENCEDATE)}></Column>
              <Column field="STATUS" header="Status"></Column>
            </DataTable>
          </div>

          {/* users details   */}

          <div className="bg-gray mt-5 ">
           <h1 className='bg-yellow text-black-2 ml-4 p-4 '>Group Members</h1>

           
           {/* "DOCUMENTNO": "JSV2023-1",
            "ITEMNAME": "Mr.A.H.Mohamed Faiq",
            "EMPLOYEENUMBER": "197432500311",
            "CATEGORY": "EMP",
            "DATEOFBIRTH": "1974-11-20 00:00:00",
            "SERIALNO": "1",
            "ITEMSERIALNO": "1" */}

            <DataTable
              value={GrpMembers}
              selection={selectedRows1}
              onSelectionChange={(e) => setSelectedRows1(e.value)}
              first={first}
              onPage={(e) => setFirst(e.first)}
              selectionMode="multiple"
              sortMode="multiple"
              globalFilter={globalFilter}
              paginator
              rows={5}
              className="ml-4"
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: '3em' }}
              ></Column>
              <Column field="DOCUMENTNO" header="Document No"></Column>
              <Column field="ITEMNAME" header="ITEMNAME" body={(rowData: PolicyDetails) => formatDate(rowData.CREATEDT)}></Column>
              <Column field="EMPLOYEENUMBER" header="EMPLOYEENUMBER"  body={(rowData: PolicyDetails) => formatDate(rowData.COMMENCEDATE)}></Column>
              <Column field="CATEGORY" header="CATEGORY"></Column>
            </DataTable>
          </div>

          






          <div className="create-btn-section fixed bottom-0 left-0 right-0 flex justify-end p-4 bg-white shadow-md ">
            <button
              className="mx-4 my-4 px-4 py-2 rounded-xl bg-yellow hover:bg-yellowdark text-white flex items-center"
              onClick={handleSaveDetails}
            >
              Create <LuPlusCircle className="ml-2 text-lg" />
            </button>
            <button
              className="mx-4 my-4 px-4 py-1 rounded-xl bg-red hover:bg-iconMainOrange text-white flex items-center"
              onClick={handleCancel} 
            >
              Cancel <LuX className="ml-2 text-lg" />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default CreateProfile;
