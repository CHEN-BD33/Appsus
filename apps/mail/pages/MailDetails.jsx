import { mailService } from "../services/mail.service.js"
const { useNavigate} = ReactRouterDOM
const { useState, useEffect} = React

export function MailDetails({mailId, onCloseDetails,onRemoveMail, onToggleRead, mails }){
    const [mail, setMail] = useState(null)
    const navigate = useNavigate()

    


    useEffect(() => {
        if (mailId) {
            loadMail()
            
        }
    }, [mailId])


    
    function loadMail() {
        mailService.get(mailId)
            .then(mail => {
                setMail(mail)})
            .catch((err) => {
                console.log('err:', err)
            })
    }
    function removeThisMail(mailId) {
        onRemoveMail(mailId)
          .then(() => {
            onCloseDetails()
          })
          .catch((err) => {
            console.error("Error removing mail:", err)
          })
      }

      function handleToggleRead() {
        onToggleRead(mailId)
          .then(() => loadMail())
          .catch(err => console.error("Error toggling read:", err))
      }
      
      const navigateToMail = (mailId) => {
        navigate(`/mail/${mailId}`);
      };
      
      
      if (!mailId || !mail) return  <img src="assets/css/apps/mail/images/empty/loding.gif"/>
   
      return (
        <section className="mail-details">
          <div className="nav-bar-container">
            <div className="action-buttons-container">
            <button onClick={onCloseDetails}><img src="assets/css/apps/mail/images/back.png" /></button>
            <button onClick={()=>removeThisMail(mailId)}><img src="assets/css/apps/mail/images/empty/emprtTrash.png" /></button>
            <span onClick={handleToggleRead} className = {`${mail.isRead ? "read-icon" : "unread-icon"}`}></span>

            </div>
            <div className="navigate-container">
          <span className="mail-index-count">{`${mails.findIndex(m => m.id === mailId) + 1} of ${mails.length}`}</span>
          <button>
            <img src="assets/css/apps/mail/images/arrowLeft.png" alt="Previous" />
          </button>
          <button >
            <img src="assets/css/apps/mail/images/arrowRight.png" alt="Next" />
          </button>
        </div>
        </div>

        <div className="mail-details-container">
            <h2 className="mail-subject">{mail.subject}</h2>
            <div className="user-details">
            <div> <span className="mail-fullName">{mail.fullname} </span><span className="mail-from">{`<${mail.from}>`}</span></div>
            <span className="mail-sentAt">{new Date(mail.sentAt).toLocaleString()}</span>
            </div>
            <span className="mail-to" >to {mail.to}</span>
            <p className="mail-body">{mail.body}</p>
            </div>
         
            </section>
    )


} 