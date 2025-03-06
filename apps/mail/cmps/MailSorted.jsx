import { mailService } from "../services/mail.service.js"

export function MailSorted({ onSetSort, selectedOption}) {

    // function handleClickedChecked() {
    //     console.log('im at the sort ')
    //     onClickChecked()
    // }
    function handleClickedChecked() {
    console.log('select')
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
                    <span onClick={handleClickedChecked} className= 'unChecked'></span>

                        <select onChange={handleSortChange} value={selectedOption}>
                        <option value="none">none</option>
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