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
    getEmptyNoteTodos
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => {
                    if (note.type === 'NoteTxt') {
                        return regExp.test(note.info.txt)
                    }
                    return false
                })
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
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
    return { txt: '', type: '' }
}

function getEmptyNoteTxt() {
    return {
        type: 'NoteTxt',
        isPinned: false,
        style: { backgroundColor: '#ffffff' },
        info: { txt: '' }
    }
}

function getEmptyNoteImgVid() {
    return {
        type: 'NoteImg',
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
                    backgroundColor: '#E2DED1'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#E8EAED'
                },
                info: {
                    txt: 'Get Materna'
                }
            },
            {
                id: 'n103',
                createdAt: 1112223,
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
                createdAt: 1112224,
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
                createdAt: 1112225,
                type: 'NoteVideo',
                isPinned: false,
                style: {
                    backgroundColor: '#B4DDE3'
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


