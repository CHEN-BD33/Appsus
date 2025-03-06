const {useState} = React

export function MailSorted({mails, onSetSort, selectedOption, onToggleAll, currentPage, totalPages, onPageChange,  onMarkAllAsRead, onDeleteAll}) {
    const [isChecked, setIsChecked] = useState(false);


    function handleSelectAll(event) {
        const checked = event.target.checked;
        setIsChecked(checked);
        onToggleAll(checked);
    }

    const handleSortChange = (event) => {
        const sortBy = event.target.value

        switch (sortBy) {
            case 'none':
            onSetSort('date', 'desc')
            break;
            case "Read":
                onSetSort('isRead', 'desc')
                break;
            case "UnRead":
                onSetSort('isRead', 'asc')
                break;
            case "Starred":
                onSetSort('isStarred', 'desc')
                break;
            case "UnStarred":
                onSetSort('isStarred', 'asc')
                break;
            default:
                onSetSort('date', 'asc')
                break;
        }
    };

    return (
        <tr>
            <td>
                <div className="mail-sorted">
                    <div className="sorted-filter-container">
                    <input type="checkbox"  className={`${isChecked ? "checked" : "unChecked"}`} onChange={handleSelectAll} />
                        <select onChange={handleSortChange} value={selectedOption}>
                        <option value="none">none</option>
                            <option value="Read">Read</option>
                            <option value="UnRead">UnRead</option>
                            <option value="Starred">Starred</option>
                            <option value="UnStarred">UnStarred</option>
                        </select>

                     
                        <div style={{ display: isChecked ? 'block' : 'none' }}>
                            <button onClick={onMarkAllAsRead}><img src="assets/css/apps/mail/images/empty/unread.png" /></button>
                        </div>
                       

                    </div>

                    <div className="nav-container">
                        <div className="counter">
                            <span>{(currentPage - 1) * 50 + 1}-{Math.min(currentPage * 50, mails.length)}</span>
                            <span> of {mails.length}</span>
                        </div>
                        <div>
                            <span onClick={() => onPageChange(currentPage - 1)} className={currentPage === 1 ? "disabled" : ""}>
                                <img src="assets/css/apps/mail/images/arrowLeft.png" alt="Previous" />
                            </span>
                            <span onClick={() => onPageChange(currentPage + 1)} className={currentPage === totalPages ? "disabled" : ""}>
                                <img src="assets/css/apps/mail/images/arrowRight.png" alt="Next" />
                            </span>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
}