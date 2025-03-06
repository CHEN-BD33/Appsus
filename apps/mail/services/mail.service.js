
import { storageService } from "./mail.async-storage.service.js"
import { utilService } from "./mail.util.service.js"

export const mailService  = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams,
    getMailFromSearchParams,
    getMailId

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
            if (filterBy.status === 'starred') {
                mails = mails.filter(mail => mail.isStarred === true)
            } else if (filterBy.status) {
                mails = mails.filter(mail => mail.status.includes(filterBy.status))
            }
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body))
            }
            if (typeof filterBy.isRead === 'boolean') {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }
            if (typeof filterBy.isChecked === 'boolean') {
                mails = mails.filter(mail => mail.isChecked === filterBy.isChecked)
            }
            if (filterBy.lables && filterBy.lables.length) {
                mails = mails.filter(mail => mail.lables && mail.lables.some(label => filterBy.lables.includes(label)))
            }

            if (filterBy.sortBy) {
              if (filterBy.sortBy === 'date') {
                  mails = mails.sort((a, b) => filterBy.sortOrder === 'desc' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt)
              } else if (filterBy.sortBy === 'subject') {
                  mails = mails.sort((a, b) => filterBy.sortOrder === 'desc' ? b.subject.localeCompare(a.subject) : a.subject.localeCompare(b.subject))
              } else if (filterBy.sortBy === 'isStarred') {
                  mails = mails.sort((a, b) => filterBy.sortOrder === 'desc' ? b.isStarred - a.isStarred : a.isStarred - b.isStarred)
              } else if (filterBy.sortBy === 'isRead') {
                  mails = mails.sort((a, b) => filterBy.sortOrder === 'desc' ? b.isRead - a.isRead : a.isRead - b.isRead)
                } 
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


function getEmptyMail(to = "", subject = "", body = "") {
    return {
    fullname: loggedinUser.fullname,
    createdAt: Date.now(), 
    subject,
    body,
    isRead: true,
    sentAt :0, 
    removedAt : null,
    from: loggedinUser.email,
    to,
    status:'sent',
    isStarred:false,
    isChecked: false
     
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
        from: loggedinUser.fullname,
        to: 'user@appsus.com',
    }
}

function _saveMailsToStorage() {
    storageService.save(MAIL_KEY, gMails)
}

function getFilterFromSearchParams(searchParams) {
  const status = searchParams.get('status') || 'inbox'
  const txt = searchParams.get('txt') || ''
  const isRead = searchParams.get('isRead')
  const isStarred = searchParams.get('isStarred')
  const sortBy = searchParams.get('sortBy') || 'date'
  const sortOrder = searchParams.get('sortOrder') || 'desc'


  return {
      status,
      txt,
      isRead,
      isStarred,
      sortBy,
      sortOrder
  }
}

  function getMailFromSearchParams(searchParams) {
    const to = searchParams.get('to') || ''
    const subject = searchParams.get('subject') || ''
    const body = searchParams.get('body') || ''

    return{
        fullname: loggedinUser.fullname,
        createdAt: Date.now(),
        subject,
        body,
        isRead: true,
        sentAt: 0,
        removedAt: null,
        from: loggedinUser.email,
        to,
        status: 'draft'
    }
}

    // basic user:
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

function getMailId(){
  gMails.forEach(mail => {
    return mail.id
  });
}

    //• Model - start with a basic model of mails: 
    const gMails = Array.from({ length: 100 }, (_, idx) => {
        const id = `e${101 + idx}`;
        const names = ['momo', 'bobo', 'dodo', 'lolo', 'koko', 'toto', 'nono', 'pipo', 'roro', 'soso'];
        const fullname = `${names[idx % names.length]} ${names[idx % names.length]}`;
        const subjects = ['Hello!', 'Meeting Reminder', 'Miss you!', 'Project Update', 'Check this out!', 'Urgent!', 'Invitation', 'Follow-up', 'Weekend Plans', 'Greetings'];
        const fromDomain = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'mail.com'];
        const toUser = `user${(idx % 10) + 1}@appsus.com`;
        const createdAt = Date.now() - Math.floor(Math.random() * 10000000000);
        const sentAt = createdAt + Math.floor(Math.random() * 10000);
        
        return {
            id,
            fullname,
            createdAt,
            subject: subjects[idx % subjects.length],
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(Math.floor(Math.random() * 5) + 1),
            isRead: Math.random() < 0.5,
            sentAt,
            removedAt: null,
            from: `${fullname.split(' ')[0].toLowerCase()}@${fromDomain[idx % fromDomain.length]}`,
            to: toUser,
            status: 'inbox',
            isStarred: Math.random() < 0.2,
            isChecked: false
        };
    });