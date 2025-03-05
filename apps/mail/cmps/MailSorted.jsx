export function MailSorted({ onSetSort, selectedOption }) {
    const handleSortChange = (event) => {
        const sortBy = event.target.value

        switch (sortBy) {
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
                onSetSort('date', sortOrder)
                break;
        }
    };

    return (
        <tr>
            <td>
                <div className="mail-sorted">
                    <div className="sorted-filter-container">
                        <span className="unChecked"></span>
                        <select onChange={handleSortChange} value={selectedOption}>
                            <option value="Read">Read</option>
                            <option value="UnRead">UnRead</option>
                            <option value="Starred">Starred</option>
                            <option value="UnStarred">UnStarred</option>
                        </select>
                    </div>

                    <div className="nav-container">
                        <div className="counter">
                            <span>1-50</span> <span>of</span> <span>500</span>
                        </div>
                        <div>
                            <span><img src="assets/css/apps/mail/images/arrowLeft.png" alt="Previous" /></span>
                            <span><img src="assets/css/apps/mail/images/arrowRight.png" alt="Next" /></span>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    );
}