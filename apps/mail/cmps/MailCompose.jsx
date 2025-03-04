
import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useNavigate, useParams, useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailCompose() {

    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const [searchParams] = useSearchParams()
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (mailId) {
            loadMail()
        } else if (searchParams.get('fromNotes')) {
            const mailFromParams = mailService.getMailFromSearchParams(searchParams)
            setMailToEdit(mailFromParams)
        }
    }, [mailId, searchParams])

    function loadMail() {
        mailService.get(mailId) 
            .then(mail => {
                if (mail.status === 'draft') {
                    setMailToEdit(mail) 
                } else {
                    setMailToEdit(mailService.getEmptyMail())
                }

            })
            .catch(err => console.log('Error loading mail:', err))
    }
    function onSaveMail(ev) {
        ev.preventDefault()
        mailToEdit.status = 'sent'

        mailService.save(mailToEdit)
            .then(() => {
                showSuccessMsg(`New Mail saved successfully!`)
                navigate('/mail')
            })
            .catch(err => console.log('err:', err))
           
    }


    function onAsSaveDraft() {
        if (mailToEdit.to || mailToEdit.subject || mailToEdit.body){
        mailToEdit.status = 'draft'

        mailService.save(mailToEdit)
            .then(() => {
                console.log('Saved as draft')
            })
            .catch(err => console.log('err:', err))
        } 
            navigate('/mail')
    }

    function handleChange({ target }) {
        const { name, value } = target

        setMailToEdit(prevMail => ({
            ...prevMail, 
            [name]: value 
        }))
    }


    return (
        <section className='mail-compose'>

            <div className="mail-compose-header">
                <h2>{mailId ? 'Edit Message' : 'New Message'}</h2>
                <button onClick={onAsSaveDraft} className='close-btn'>X</button>
            </div>

            <form onSubmit={onSaveMail}>

                <input
                    onChange={handleChange}
                    type='email'
                    name='to'
                    id='to'
                    placeholder='To'
                    value={mailToEdit.to}
                    required
                />

                <input
                    onChange={handleChange}
                    type='text'
                    name='subject'
                    id='subject'
                    placeholder='Subject'
                    value={mailToEdit.subject}
                    required
                />

                <textarea
                    onChange={handleChange}
                    name='body'
                    id='body'
                    value={mailToEdit.body}
                    required
                ></textarea>

                <div className="mail-compose-footer">
                    <button type='submit'>Send</button>
                </div>
            </form>
        </section>
    )

}