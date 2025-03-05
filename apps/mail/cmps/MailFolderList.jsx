import { MailUnreadCounter } from "./MailUnreadCounter.jsx"
const {useNavigate} = ReactRouterDOM 
const {useState } = React


export function MailFolderList({ onFolderSelect , onCloseDetails}){
         const [activeFolder, setActiveFolder] = useState(null)

        function handleFolderClick(folder) {
            setActiveFolder(folder)
            onFolderSelect(folder)
            onCloseDetails()
        }

        return (
                <section className="mailFolder-list">
                    <button 
                    className={activeFolder === "inbox" ? "active" : ""}
                    onClick={() => handleFolderClick("inbox")}
                    >
                        <div className="inbox-text-container">
                        <img src="assets/css/apps/mail/images/empty/emptyInbox.png"/>
                        Inbox 
                        </div>
                    
                        <MailUnreadCounter />
                    </button>
                    <button 
                    className={activeFolder === "starred" ? "active" : ""}
                    onClick={() => handleFolderClick("starred")}
                    >
                    <img src="assets/css/apps/mail/images/empty/unStarred.png"/>
                        Starred</button>
                        <button 
                        className={activeFolder === "sent" ? "active" : ""}
                        onClick={() => handleFolderClick("sent")}
                        >
                    <img src="assets/css/apps/mail/images/empty/emptySent.png"/>
                        Sent</button>
                        <button 
                         className={activeFolder === "trash" ? "active" : ""}
                         onClick={() => handleFolderClick("trash")}
                        >
                    <img src="assets/css/apps/mail/images/empty/emprtTrash.png"/>
                        Trash</button>
                        <button 
                        className={activeFolder === "draft" ? "active" : ""}
                         onClick={() => handleFolderClick("draft")}
                        >
                    <img src="assets/css/apps/mail/images/empty/emptyDraft.png"/>
                        Draft</button>
                </section>
            )

}


