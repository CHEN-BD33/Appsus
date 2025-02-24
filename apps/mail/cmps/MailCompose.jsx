
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

    const { from ,to, subject, body } = mailToEdit

    return (
        <section className='mail-compose'>
            <div className="mail-compose-header">
            <h2>{mailId ? "Edit Message" : "New Message"}</h2>
            <button onClick={onClose} className="close-btn">X</button>
            </div>
            
            <form onSubmit={onSaveMail}>
                <label htmlFor='from'>From</label>
                <input
                    onChange={handleChange}
                    value={from}
                    type='email'
                    name='from'
                    id='from'
                    disabled 
                />
    
                <label htmlFor='to'>To</label>
                <input
                    onChange={handleChange}
                    value={to}
                    type='email'
                    name='to'
                    id='to'
                    required
                />
    
                <label htmlFor='subject'>Subject</label>
                <input
                    onChange={handleChange}
                    value={subject}
                    type='text'
                    name='subject'
                    id='subject'
                    required
                />
    
                <label htmlFor='body'>Body</label>
                <textarea
                    onChange={handleChange}
                    value={body}
                    name='body'
                    id='body'
                    required
                ></textarea>
    
                <button type='submit'>Save</button>
            </form>
        </section>
    )

}