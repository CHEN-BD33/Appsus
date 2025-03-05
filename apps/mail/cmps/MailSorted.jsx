
export function MailSorted() {


    return (<tr>
                <td >
                    <div className="mail-sorted">
                        <div className="sorted-filter-container">
                       <span className = "unChecked"></span>
                       <select>
                       <option>Read</option>
                       <option>UnRead</option>
                       <option>Starred</option>
                       <option>UnStarred</option>
                        </select>
                        </div>
                     
                        <div className="nav-container">
                            <div className="counter">
                            <span>1-50</span> <span>of</span> <span>500</span>
                            </div>
                            <div>
                                <span><img src="assets/css/apps/mail/images/arrowLeft.png" /></span>
                                <span><img src="assets/css/apps/mail/images/arrowRight.png" /></span>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
         
    
      )
    
}