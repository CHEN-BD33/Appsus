import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getEmptyNoteTxt,
    getEmptyNoteImgVid,
    getEmptyNoteTodos,
    duplicate,
    getFilterFromSearchParams,
    getEmailParamsFromNote
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => {
                    if (note.type === 'NoteTxt') {
                        return regExp.test(note.info.txt)
                    } else if (note.type === 'NoteImg' || note.type === 'NoteVideo') {
                        return regExp.test(note.info.title || '')
                    } else if (note.type === 'NoteTodos') {
                        return regExp.test(note.info.title || '') ||
                            note.info.todos.some(todo => regExp.test(todo.txt))
                    }
                    return false
                })
            }

            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }
            notes.sort((a, b) => {
                if (a.isPinned && !b.isPinned) return -1
                if (!a.isPinned && b.isPinned) return 1
                return b.createdAt - a.createdAt
            })

            return notes
        })
}


function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        const noteToSave = _createNote(note.type, note.info, note.style.backgroundColor)
        return storageService.post(NOTE_KEY, noteToSave)
    }
}
function getDefaultFilter() {
    return { txt: '', type: '' }
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const type = searchParams.get('type') || ''

    return { txt, type }
}

function getEmptyNoteTxt() {
    return {
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#ffffff' },
        info: { title: '', txt: '' }
    }
}

function getEmptyNoteImgVid(type = 'NoteImg') {
    return {
        type,
        isPinned: false,
        style: { backgroundColor: '#ffffff' },
        info: { url: '', title: '' }
    }
}

function getEmptyNoteTodos() {
    return {
        type: 'NoteTodos',
        isPinned: false,
        style: { backgroundColor: '#ffffff' },
        info: { title: '', todos: [] }
    }
}

function duplicate(noteId) {
    return get(noteId)
        .then(note => {
            const duplicatedNote = { ...note, id: null }
            return save(duplicatedNote)
        })
}

function getEmailParamsFromNote(note) {
    const { type, info } = note
    let subject, body
    if (type === 'NoteTxt') {
        subject = info.title || ''
        body = info.txt || ''
    } else if (type === 'NoteImg' || type === 'NoteVideo') {
        subject = info.title || ''
        body = info.url || ''
    } else if (type === 'NoteTodos') {
        subject = info.title || ''
        body = info.todos.map(todo => `${todo.txt} ${todo.doneAt ? '(Done)' : ''}`).join('\n')
    } else {
        subject = 'Note from Keep'
        body = ''
    }
    return { subject, body }
}

function _createNote(type, info, backgroundColor, isPinned = false) {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type,
        isPinned,
        style: {
            backgroundColor,
        },
        info
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#E2DED1'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                createdAt: 1112223,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#F6C5A2'
                },
                info: {
                    title: 'SHOP',
                    txt: 'Get Materna'
                }
            },
            {
                id: 'n103',
                createdAt: 1112224,
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#B4DDE3'
                },
                info: {
                    url: 'https://www.israelhayom.co.il/wp-content/uploads/2024/12/17/17/veo2-960x640.jpg',
                    title: 'Bobi'
                }
            },
            {
                id: 'n104',
                createdAt: 1112225,
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#A2E0D2'
                },
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving liscence', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            },
            {
                id: 'n105',
                createdAt: 1112226,
                type: 'NoteVideo',
                isPinned: false,
                style: {
                    backgroundColor: '#FEF3A0'
                },
                info: {
                    url: 'https://www.youtube.com/watch?v=Ksun-Vas0Yo',
                    title: 'SnoopDogg'
                }
            },

        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}


//mail service//

function getMailFromSearchParams(searchParams) {
    const subject = searchParams.get('subject') || ''
    const body = searchParams.get('body') || ''
    const to = searchParams.get('to') || ''
    
    return {
      to,
      subject,
      body,
      from: 'user@appsus.com',
      sentAt: null,
      removedAt: null,
      isRead: false
    }
  }