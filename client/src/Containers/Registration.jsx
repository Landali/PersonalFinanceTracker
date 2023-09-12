import { useGlobalContext } from '../Context/globalContext';
import { useNavigate } from 'react-router-dom';

const checkValidSession = (auth, navigate) => {
    if (!auth) {
       navigate('/');
    }
}

const Registration = () => {
    const navigate = useNavigate();
    const { auth } = useGlobalContext()
    checkValidSession(auth, navigate);

    return (
        <div>
            Registration 
        </div>
    )
}

export default Registration