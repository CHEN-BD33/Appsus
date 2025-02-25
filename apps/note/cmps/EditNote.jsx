

const { useState } = React

export function EditNote({ note, onChangeInfo }) {

    const [noteToEdit, setNoteToEdit] = useState(note)

    function handleChange({ target: { name: field, value } }) {
        setNoteToEdit(prevNote => ({...prevNote,
            info: {...prevNote.info,[field]: value}
        }))
    }


    function onSubmit(ev) {
        ev.preventDefault()
        onChangeInfo(noteToEdit)
    }

    return (
        <div className="edit-note">
            <form onSubmit={onSubmit}>
                <textarea name="txt" value={noteToEdit.info.txt} onChange={handleChange} placeholder="Enter your text..."/>
                <button>Save</button>
                <button>Close</button>
            </form>
        </div>
    )

}
