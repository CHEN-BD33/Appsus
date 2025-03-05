
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
    getMailFromSearchParams

}

window.bs = mailService
const MAIL_KEY = 'mailDB'

// const filterBy = {
//     status: 'inbox',
//     txt: 'puki', 
//     isRead: true, 
//     lables: ['important', 'romantic'],
//     isStarred:false,
//     isChecked: false
//    }

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
        });
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

    //• Model - start with a basic model of mails: 
    var gMails = [{
    id: 'e101',
    fullname: 'momo momo',
    createdAt : 1551133930500, 
    subject: 'Miss you!',
    body: 'Would love to catch up sometimes',
    isRead: false,
    sentAt : 1551133930594, 
    removedAt : null,
    from: 'momo@momo.com',
    to: 'user@appsus.com',
    status:'inbox',
    isStarred:false,
    isChecked: false
},
{
    id: 'e102',
    fullname :'bobo bobo',
    createdAt : 1551191930500,
    subject: 'Love you!',
    body: utilService.makeLorem(150),
    isRead: false,
    sentAt : 1551192990512, 
    removedAt : null,
    from: 'bobo@bobo.com',
    to: 'user2@appsus.com',
    status:'inbox',
    isStarred:false,
    isChecked: false
},
{
    id: 'e103',
    fullname: 'dodo dodo' ,
    createdAt : 1561192990512, 
    subject: 'H1!',
    body: utilService.makeLorem(300),
    isRead: true,
    sentAt : 1561203990512, 
    removedAt : null,
    from: 'dodo@dodo.com',
    to: 'user3@appsus.com',
    status:'inbox',
    isStarred:false,
    isChecked: false
}
]

