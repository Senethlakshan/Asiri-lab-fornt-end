import React, { useState, useEffect, useRef } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import Breadcrumb from '../../components/Breadcrumb';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { LuUserPlus,LuTrash2,LuEye,LuUserPlus2 } from "react-icons/lu";
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-orange/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import SkeletonTable from '../SkeletonTable';
import '../../css/Dashbord.css'
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface RowData {
  id: number;
  companyID:string;
  br_number:string;
  profile_name:string;
  contactNumber:string;
  createDateTime:string;
  proposerCode:string;
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<RowData[]>([]);
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);//set page show rows
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  const menu = useRef<any>(null);

  const handleDelete = async (companyIDs: string | string[]) => {

    // Check if any company profile is selected
  if (!companyIDs.length) {
    toast.warn('Please select at least one company profile to delete.');
    return;
  }

    if (window.confirm('Are you sure you want to delete selected profiles?')) {
      try {
        await axios.post('http://localhost:5000/api/auth/admin/s1/delete-company-profiles', { companyIDs }, { withCredentials: true });
        setData(data.filter(item => !companyIDs.includes(item.companyID)));
        alert('Profile(s) deleted successfully.');
      } catch (error) {
        console.error('Error deleting profile(s):', error);
        alert('Failed to delete the profile(s).');
      }
    }
  };

  const menuItems = [
    {
      label: 'Delete Selected',
      icon: 'pi pi-trash',
      command: () => handleDelete(selectedRows.map(row => row.companyID))
    }
  ];

  const selectionColumnHeader = (
    <>
      <Button icon="pi pi-ellipsis-v" onClick={(e) => menu.current?.toggle(e)} className="p-button-text" />
      <Menu model={menuItems} popup ref={menu} id="popup_menu" appendTo={document.body} />
    </>
  );
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/admin/s1/view-all-company-profiles',
          {
            
            withCredentials: true,
          });
       
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  const toggleSelectRow = (rowData: RowData) => {
    if (selectedRows.some(row => row.id === rowData.id)) {
      setSelectedRows(selectedRows.filter(row => row.id !== rowData.id));
    } else {
      setSelectedRows([...selectedRows, rowData]);
    }
  };


  const handleView = (companyID: string) => {

    navigate('/dashboard/Company-Profile',{ state: { companyID } });
    
  };

  const handleAddUser = (companyID: string) => {

     navigate('/dashboard/AddUser',{ state: { companyID } });
    //  console.log('company id : '+companyID);
    
  };

  const formatDate = (datetime: string): string => {
    const date = new Date(datetime);
    return date.toLocaleDateString('en-CA'); // Formats to 'YYYY-MM-DD'
  };

  return (
    <>
      <Breadcrumb pageName="Dashboard" />
      <div className="mb-4 relative">
        <div className="mb-4">
          <InputText
            type="search"
            placeholder="Search here..."
            className='px-7 py-3'
            onInput={(e: React.ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value)}
          />
          <i className="pi pi-search ml-3 p-3 text-white bg-yellow" />

          {/* create profile button section  bottom-sec */}
       <div className="flex justify-end">
         <Link to="/dashboard/CreateProfile">
          <button className="create_profile_btn">
            Create Profile <LuUserPlus  className="ml-2 text-lg" />
           </button>
        </Link>
      </div>
        </div>
        {loading ? (
          <div className="">
              <SkeletonTable/>
          </div>
        ) : (
          <DataTable
            value={data}
            selection={selectedRows}
            onSelectionChange={(e) => setSelectedRows(e.value)}
            paginator
            rows={rows}
            first={first}
            onPage={(e) => setFirst(e.first)}
            selectionMode="multiple"
            sortMode="multiple"
            globalFilter={globalFilter}
            className='custom-row-height'
          >
            <Column selectionMode="multiple" headerStyle={{ width: '3rem',fontSize:'2px'}}
             header={selectionColumnHeader} 
            ></Column>
            <Column field="companyID" header="ID" sortable ></Column>
            <Column field="proposerCode" header="Proposer Code" sortable ></Column>
            <Column field="br_number" header="Registration Number" sortable></Column>
            <Column field="companyName" header="Company Name" sortable></Column>
            <Column field="profile_name" header="Profile Name" sortable ></Column>
           

            <Column field="address" header="Address" sortable></Column>
            <Column field="createDateTime" header="Created Date"  body={(rowData: RowData) => formatDate(rowData.createDateTime)} sortable></Column>
            <Column  body={(rowData: RowData) => (
              <>
                {/* view company profile */}
                <button  className='p-1 rounded-lg text-graydark hover:bg-iconSuBlue hover:text-blue mx-1' onClick={() => handleView(rowData.companyID)}><LuEye/></button> 
                {/* add user role for new company  */}
                <button className='p-1 rounded-lg  text-graydark hover:bg-iconSubGreen hover:text-iconMainGreen mx-1' onClick={() => handleAddUser(rowData.companyID)}><LuUserPlus2 /></button> 
                {/* delete compnay profile */}
                <button className='p-1 rounded-lg  text-iconMainOrange hover:bg-iconSubOrange hover:text-iconMainOrange mx-1' onClick={() => handleDelete(rowData.companyID)}><LuTrash2/></button> 
              </>
            )} header="Actions"  bodyStyle={{ minWidth: '150px' }}  ></Column>
          </DataTable>
        )}
      </div>

      
    </>
  );
};

export default Dashboard;


