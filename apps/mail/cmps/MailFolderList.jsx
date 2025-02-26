import { MailUnreadCounter } from "./MailUnreadCounter.jsx"
const {useNavigate} = ReactRouterDOM 



export function MailFolderList({ onFolderSelect }){

        const navigate = useNavigate()

        function handleFolderClick(folder) {
            onFolderSelect(folder)
        }
        return (
                <section className="mailFolder-list">
                    <button onClick={() => handleFolderClick("")}>
                        Inbox <MailUnreadCounter />
                    </button>
                    <button onClick={() => handleFolderClick("sent")}>Sent</button>
                    <button onClick={() => handleFolderClick("trash")}>Trash</button>
                    <button onClick={() => handleFolderClick("draft")}>Draft</button>
                </section>
            )

}




