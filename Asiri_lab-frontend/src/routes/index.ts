import Dashbord from '../pages/sidebarPages/Dashbord';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import CreateProfile from '../pages/CreateProfile';
import AddUser from '../pages/AddUser';
import DeleteConfirmationDashboard from '../pages/DeleteConfomDashbord';
import CompanyProfile from '../pages/CompanyProfile';
import UserPage from '../pages/sidebarPages/UserPage';
import PolicyDetailsPage from '../pages/sidebarPages/PolicyDetailsPage';
import ClaimsPage from '../pages/sidebarPages/ClaimsPage';
import EndorsementsPage from '../pages/sidebarPages/EndorsementsPage';


const coreRoutes = [
  
  {
    path: '/dashboard/profile',
    title: 'Profile',
    component: Profile,
  }
  ,
  {
    path: '/dashboard/Dashboard',
    title: 'DashboardPage',
    component: Dashbord,
  },
  {
    path: '/dashboard/User',
    title: 'UserPage',
    component: UserPage,
  }
  ,
  {
    path: '/dashboard/PolicyDetails',
    title: 'PolicyDetailsPage',
    component: PolicyDetailsPage,
  },
  {
    path: '/dashboard/Claims',
    title: 'ClaimsPage',
    component: ClaimsPage,
  },
 
  {
    path: '/dashboard/Endorsements',
    title: 'EndorsementsPage',
    component: EndorsementsPage,
  },
   {
    path: '/dashboard/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/dashboard/CreateProfile',
    title: 'CreateProfile',
    component: CreateProfile,
  },
  {
    path: '/dashboard/AddUser',
    title: 'AddUser',
    component: AddUser,
  }
  ,
  {
    path: '/dashboard/Delete-user',
    title: 'DeleteConfirmationDashboard',
    component: DeleteConfirmationDashboard,
  }
  ,
  {
    path: '/dashboard/Company-Profile',
    title: 'CompanyProfile',
    component: CompanyProfile,
  }
];

const routes = [...coreRoutes];
export default routes;
