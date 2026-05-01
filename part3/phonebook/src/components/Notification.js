const Notification = ({ notification }) => {
    if (notification.type === 'success') {
        return (
            <div className='success'>
                {notification.message}
            </div>
        )
    } else if(notification.type === 'error') {
        return (
            <div className='error'>
                {notification.message}
            </div>
        )
    } else {
        return null
    }
}

export default Notification
