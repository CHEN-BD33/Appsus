import { utilService } from "../../../services/util.service.js"
import { storageService } from "./mail.async-storage.service.js"

export const mailService  = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams
}

window.bs = mailService
const MAIL_KEY = 'mailDB'

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (!mails || !mails.length) {
                mails = gMails
                _saveMailsToStorage()
            }
            if (filterBy.subject) {
                const regExp = new RegExp(filterBy.subject, 'i')
                mails = mails.filter(m => regExp.test(m.subject))
            }

            if (filterBy.isRead !== undefined && filterBy.isRead !== '') {
                const isRead = filterBy.isRead === true; 
                mails = mails.filter(m => m.isRead === isRead)
            }
            if (filterBy.folder) {
                mails = mails.filter(m => m.folder === filterBy.folder)
            }
            return mails
        })
}


function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(_setNextPrevMailId)
}

function _setNextPrevMailId(mail) {
    return storageService.query(MAIL_KEY).then((mails) => {
        const mailIdx = mails.findIndex(currMail => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}

    
function getById(mailId) {
    return storageService.get(MAIL_KEY , mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}


function getEmptyMail(id = '', from = '', to = '') {
    return {
        id: id || utilService.makeId(),
        createdAt: Date.now(),
        subject: '',
        body: '',
        isRead: false,
        sentAt: 0,
        removedAt: null,
        from: from || 'user@appsus.com',
        to: to || 'user@appsus.com',
    }
}

function getDefaultFilter() {
    return { subject: '', body: '' ,isRead:'' }
}


function _createMail() {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        subject: utilService.makeLorem(3),
        body: utilService.makeLorem(15),
        isRead: false,
        removedAt: null,
        from: loggedinUser.email,
        to: 'user@appsus.com',
    }
}

function _saveMailsToStorage() {
    storageService.save(MAIL_KEY, gMails)
}

function getFilterFromSearchParams(searchParams) {
    const subject = searchParams.get('subject') || ''
    const isRead = searchParams.get('isRead') || ''
    return { subject, isRead }
}



    // basic user:
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

    //• Model - start with a basic model of mails: 
    var gMails = [{
    id: 'e101',
    createdAt : 1551133930500, //February 25, 2019, at 22:32:10 
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594, //February 25, 2019, at 22:32:10
    removedAt : null,
    from: 'momo@momo.com',
    to: 'user@appsus.com'
},
{
    id: 'e102',
    createdAt : 1551191930500, //26 February 2019 14:38
    subject: 'Love you!',
    body: utilService.makeLorem(150),
    isRead: false,
    sentAt : 1551192990512, //26 February 2019 14:56
    removedAt : null,
    from: 'bobo@bobo.com',
    to: 'user2@appsus.com'
},
{
    id: 'e103',
    createdAt : 1561192990512, //22 June 2019 08:43
    subject: 'H1!',
    body: utilService.makeLorem(300),
    isRead: true,
    sentAt : 1561203990512, // 22 June 2019 11:46
    removedAt : null,
    from: 'dodo@dodo.com',
    to: 'user3@appsus.com'
}
]

