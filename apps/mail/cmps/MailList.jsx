
import { MailPreview } from "./MailPreview.jsx"
import { MailSorted } from "./MailSorted.jsx"
const {useState} = React

export function MailList({mails , onToggleRead , onSelectMail , onClickStarred ,onRemoveMail, onSetSort}){
    const [selectedMails, setSelectedMails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const mailsPerPage = 50;

    function handleToggleAll(isChecked) {
        if (isChecked) {
            setSelectedMails(mails.map(mail => mail.id)); // Select all
        } else {
            setSelectedMails([]); // Deselect all
        }
    }

    function handleToggleSingle(mailId) {
        setSelectedMails(prevSelected =>
            prevSelected.includes(mailId) ? prevSelected.filter(id => id !== mailId) : [...prevSelected, mailId]
        );
    }

    function handlePageChange(newPage) {
        if (newPage < 1 || newPage > Math.ceil(mails.length / mailsPerPage)) return;
        setCurrentPage(newPage);
    }

    const startIndex = (currentPage - 1) * mailsPerPage;
    const endIndex = startIndex + mailsPerPage;
    const displayedMails = mails.slice(startIndex, endIndex);
    if (!mails) return "Loading..."

    return (
    <table className="mail-list">
        <thead>

        <MailSorted 
            onSetSort={onSetSort} 
            mails={mails} 
            onToggleAll={handleToggleAll}   
            currentPage={currentPage}
            totalPages={Math.ceil(mails.length / mailsPerPage)}
            onPageChange={handlePageChange}
            />
        </thead>
            <tbody>
                {displayedMails.map((mail) => (
                    
                    <MailPreview key={mail.id}
                    mail={mail} 
                    isChecked={selectedMails.includes(mail.id)}
                    onToggleCheck={handleToggleSingle}
                    onToggleRead={onToggleRead}
                    onSelectMail={onSelectMail}
                    onClickStarred={onClickStarred}
                    onRemoveMail={onRemoveMail} 
                    />
                ))}
            </tbody>
        </table>
    
    )

}