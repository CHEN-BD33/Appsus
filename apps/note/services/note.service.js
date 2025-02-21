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
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.info.txt))
            }
            if (filterBy.noteType) {
                notes = notes.filter(note => note.type === filterBy.noteType)
            }
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
        const noteToSave = _createNote(note.type, note.info)
        return storageService.post(NOTE_KEY, noteToSave)
    }
}
function getDefaultFilter() {
    return { txt: '', noteType: '' }
}

function getEmptyNoteTxt() {
    return {
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#ffffff' },
        info: { txt: '' }
    }
}

// function getEmptyNoteImg() {
//     return {
//         type: 'NoteImg',
//         isPinned: false,
//         style: { backgroundColor: '#ffffff' },
//         info: { url: '', title: '' }
//     }
// }

// function getEmptyNoteTodos() {
//     return {
//         type: 'NoteTodos',
//         isPinned: false,
//         style: { backgroundColor: '#ffffff' },
//         info: {
//             title: '',
//             todos: []
//         }
//     }
// }


function _createNote(type, info) {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type,
        isPinned: false,
        style: {
            backgroundColor: '#ffffff'
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
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#00d'
                }
            },
            {
                id: 'n103',
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: false,
                color: 'yellow',
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving liscence', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            }

        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}


