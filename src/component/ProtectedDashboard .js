import { useUserContext } from './Authen';
import { Navigate } from 'react-router-dom';
import Dashboard from './dashboard';


const ProtectedDashboard = () => {
    const { user } = useUserContext();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <Dashboard />;
};

export default ProtectedDashboard;
