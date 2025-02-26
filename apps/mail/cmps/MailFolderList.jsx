import { MailUnreadCounter } from "./MailUnreadCounter.jsx";


export function MailFolderList({ onFolderSelect }){
     return(
        <section className="mailFolder-list">

        <button onClick={() => onFolderSelect('inbox')}>Inbox <MailUnreadCounter /></button>
        <button onClick={() => onFolderSelect('sent')}>Sent</button>
        <button onClick={() => onFolderSelect('trash')}>Trash</button>
        <button onClick={() => onFolderSelect('draft')}>Draft</button>
        </section>
        )

}




