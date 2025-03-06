
const { useState, useEffect } = React;

export function MailUnreadCounter({ mails , activeFolder}) {
    const [unreadCount, setUnreadCount] = useState(null)

    useEffect(() => {
        if (activeFolder === 'inbox') {
            const count = mails ? mails.filter(mail => !mail.isRead).length : 0;
            setUnreadCount(count);
        }
    }, [mails, activeFolder]); 

    return (
            <span>{unreadCount}</span>
        
    )
}