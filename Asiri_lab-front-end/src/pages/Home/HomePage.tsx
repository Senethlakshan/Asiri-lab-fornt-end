import { useNavigate} from 'react-router-dom';

const HomePage = () =>{

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
      };

      const handleRegister = () => {
        navigate('/register');
      };

    return(

        <>
        <h1 className="text-yellow">Home Page</h1>

       <button className="mr-3 bg-red text-white p-3" onClick={handleLogin}>Login</button>
       <button className="mr-3 bg-red text-white p-3" onClick={handleRegister}>Register</button>
        
        </>

    );
}

export default HomePage;