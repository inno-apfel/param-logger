import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

function TanksList() {
  const { user, loading, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // redirect to login page after logout
  };
  
  if (loading) {
    return <p>Loading...</p>
  }
  else {
    return (
        <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
  }
  
}

export default TanksList;