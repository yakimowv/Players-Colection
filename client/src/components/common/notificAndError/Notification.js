import './Notification.css';

import { useNotificationContext } from '../../../contexts/NotificationContext';

const Notification = () => {
    const { notification, hideNotification } = useNotificationContext();

    if (!notification.show) {
        return null;
    }

    return (
        <div className="notifications" bg={notification.type} onClose={hideNotification}>
            <p>
                {notification.message}
            </p>
        </div>
    );
};

export default Notification;