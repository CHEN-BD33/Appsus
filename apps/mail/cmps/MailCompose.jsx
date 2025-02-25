
import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailCompose(){
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (mailId) loadMail()
    }, [])

    function loadMail() {
        mailService.get(mailId)
            .then(setMailToEdit)
            .catch(err => console.log('err:', err))
    }

    function onSaveMail(ev) {
        ev.preventDefault()
        mailService.save(mailToEdit)
            .then(() => {
                showSuccessMsg(`New Mail saved successfully!`)
                navigate('/mail')
            })
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setMailToEdit(prevMail => ({ ...prevMail, [field]: value }))
    }
    function onClose() {
        navigate('/mail')
      }

   

    return (
        <section className='mail-compose'>
            <div className="mail-compose-header">
            <h2>{mailId ? "Edit Message" : "New Message"}</h2>
            <button onClick={onClose} className="close-btn">X</button>
            <button></button>
            </div>
            
            <form onSubmit={onSaveMail}>
               
                <input
                    onChange={handleChange}
                    type='email'
                    name='to'
                    id='to'
                    placeholder="To"
                    required
                />
    
                <input
                    onChange={handleChange}
                    type='text'
                    name='subject'
                    id='subject'
                    placeholder="Subject"
                    required
                />
    
                <textarea
                    onChange={handleChange}
                    name='body'
                    id='body'
                    required
                ></textarea>
    
                <button type='submit'>Save</button>
            </form>
        </section>
    )

}