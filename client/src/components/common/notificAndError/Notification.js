import './Notification.css';

import { Toast } from 'react-bootstrap';

import { useNotificationContext } from '../../../contexts/NotificationContext';

const Notification = () => {
    const { notification, hideNotification } = useNotificationContext();

    if (!notification.show) {
        return null;
    }

    return (
        <Toast className="notifications" bg={notification.type} onClose={hideNotification}>
            <Toast.Body>
                {notification.message}
            </Toast.Body>
        </Toast>
    );
};

export default Notification;