import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/userServices'
import {useNotificationContext,types} from '../../contexts/NotificationContext'


function Logout() {
    const navigate = useNavigate();
    const { user, logout } = useAuthContext();
    const {addNotification}=useNotificationContext
    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                logout();
                navigate('/');
            })
            .catch(err=>{
              addNotification(err,types.error)
            })
    }, [])


  return (
    null
  )
}

export default Logout