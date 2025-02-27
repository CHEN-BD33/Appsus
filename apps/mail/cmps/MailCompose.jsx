
import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailCompose(){
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(!mailId) return
         loadMail()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(setMailToEdit)
            .catch(err => console.log('err:', err))
    }

    function onSaveMail(ev) {
        ev.preventDefault()
         mailToEdit.status = 'sent'

        mailService.save(mailToEdit)
            .then(() => {
                showSuccessMsg(`New Mail saved successfully!`)
            })
            .catch(err => console.log('err:', err))
            navigate('/mail')
    }


    function onAsSaveDraft() {
        if (!mailToEdit.to && !mailToEdit.subject && !mailToEdit.body) return 
        mailToEdit.status = 'draft'

        mailService.save(mailToEdit)
            .then(() =>  {
                console.log('Saved as draft')
            })
            .catch(err => console.log('err:', err))
            navigate('/mail')
    }

    function handleChange({ target }) {
        const field = target.name
        var value = target.value

        setMailToEdit(prevMail => ({ ...prevMail, [field]: value }))
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
                    required
                    value={mailToEdit.to || ''}
                />
    
                <input
                    onChange={handleChange}
                    type='text'
                    name='subject'
                    id='subject'
                    placeholder='Subject'
                    required
                    value={mailToEdit.subject || ''}
                />
    
                <textarea
                    onChange={handleChange}
                    name='body'
                    id='body'
                    required
                    value={mailToEdit.body || ''}
                ></textarea>

                <div className="mail-compose-footer">
                    <button type='submit'>Send</button>
                </div>
            </form>
        </section>
    )

}