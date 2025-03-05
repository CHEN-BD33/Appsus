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
        const noteToSave = _createNote(note.type, note.info, note.style.backgroundColor, note.isPinned, note.labels)
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
        info: { title: '', txt: '' },
        labels: []
    }
}

function getEmptyNoteImgVid(type = 'NoteImg') {
    return {
        type,
        isPinned: false,
        style: { backgroundColor: '#ffffff' },
        info: { url: '', title: '' },
        labels: []
    }
}

function getEmptyNoteTodos() {
    return {
        type: 'NoteTodos',
        isPinned: false,
        style: { backgroundColor: '#ffffff' },
        info: { title: '', todos: [] },
        labels: []
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

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function _createNote(type, info, backgroundColor, isPinned = false, labels = []) {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        type,
        isPinned,
        style: {
            backgroundColor,
        },
        info,
        labels
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112221,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#E2DED1'
                },
                info: {
                    txt: 'Full stack Me Baby!'
                },
                labels: ['Critical', 'Work']
            },
            {
                id: 'n102',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#F6C5A2'
                },
                info: {
                    title: 'Workout Hours',
                    txt: 'Monday - 13:00'
                },
                labels: ['Critical']
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
                    title: 'Swimming Dog'
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
                },
                labels: ['Critical']
            },
            {
                id: 'n105',
                createdAt: 1112225,
                type: 'NoteImg',
                isPinned: true,
                style: {
                    backgroundColor: '#FEF3A0'
                },
                info: {
                    url: 'https://media.istockphoto.com/id/483293702/photo/laughing-donkey.jpg?s=612x612&w=0&k=20&c=dhfnTkQEkOGdg9zquzX8H7_OQ637fRpgNVq46N7-pdA=',
                    title: 'Donkey'
                },
            },
            {
                id: 'n106',
                createdAt: 1112226,
                type: 'NoteTodos',
                isPinned: true,
                style: {
                    backgroundColor: '#FAAFA8'
                },
                info: {
                    title: 'Birthday Party at Friday',
                    todos: [
                        { txt: 'Buy Cake', doneAt: null },
                        { txt: 'Buy Balloons', doneAt: null },
                        { txt: 'Buy Snacks', doneAt: 187111111 },
                        { txt: 'Buy Gift', doneAt: 187111112 }
                    ]
                },
                labels: ['Friends']

            },
            {
                id: 'n107',
                createdAt: 1112227,
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#A8C6DF'
                },
                info: {
                    url: 'https://media.istockphoto.com/id/1154370446/photo/funny-raccoon-in-green-sunglasses-showing-a-rock-gesture-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=kkZiaB9Q-GbY5gjf6WWURzEpLzNrpjZp_tn09GB21bI=',
                    title: 'Funny'
                }
            },
            {
                id: 'n108',
                createdAt: 1112228,
                type: 'NoteTodos',
                isPinned: true,
                style: {
                    backgroundColor: '#A2E0D2'
                },
                info: {
                    title: 'Supermarket',
                    todos: [
                        { txt: 'Eggs', doneAt: null },
                        { txt: 'Bread', doneAt: null },
                        { txt: 'Materna', doneAt: null },
                        { txt: 'Bananas X 5', doneAt: null },
                        { txt: 'Tomatos X 4', doneAt: null },
                        { txt: 'Oatmeal', doneAt: null },
                        { txt: 'Pasta', doneAt: 187111113 }
                    ]
                },
                labels: ['Family']
            },
            {
                id: 'n109',
                createdAt: 1112229,
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#A2E0D2'
                },
                info: {
                    title: 'SuperPharm',
                    todos: [
                        { txt: 'Diapers', doneAt: null },
                        { txt: 'Acamol', doneAt: null },
                        { txt: 'Wipes', doneAt: null },
                        { txt: 'Hair shampoo', doneAt: null },
                        { txt: 'Soap', doneAt: null },
                        { txt: 'Body cream', doneAt: null },
                        { txt: 'Tissues', doneAt: null }
                    ]
                },
                labels: ['Family']
            },
            {
                id: 'n110',
                createdAt: 1112230,
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#F6C5A2'
                },
                info: {
                    title: 'IKEA',
                    todos: [
                        { txt: 'Zip locks', doneAt: null },
                        { txt: 'Bathroom carpet', doneAt: null },
                        { txt: 'Box', doneAt: null },
                    ]
                },
                labels: ['Work']
            },
            {
                id: 'n111',
                createdAt: 1112231,
                type: 'NoteVideo',
                isPinned: true,
                style: {
                    backgroundColor: '#F4B5AE'
                },
                info: {
                    title: 'LOLI',
                    url: 'https://www.youtube.com/watch?v=fFwPEtIwRbs'
                },
                labels: ['Spam']
            },
            {
                id: 'n112',
                createdAt: 1112232,
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#E8EAED'
                },
                info: {
                    title: 'View',
                    url: 'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?cs=srgb&dl=pexels-jaime-reimer-1376930-2662116.jpg&fm=jpg'
                },
                labels: ['Romantic, Memories']
            },
        ]
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

