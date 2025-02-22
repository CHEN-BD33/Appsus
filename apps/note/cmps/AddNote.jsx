
const { useState } = React

export function AddNote({ onAddNote }) {
    const [note, setNote] = useState('')

    function handleSubmit(ev) {
        ev.preventDefault()
        if (!note.trim()) return

        const noteInfo = {
            type: 'NoteTxt',
            info: { txt: note }
        }
        onAddNote(noteInfo)
        setNote('')
    }

    return (
        <div className='add-note-container'>
            <form onSubmit={handleSubmit}>
                <section className='add-note'>
                    <input type="text" id="txt" name="txt" value={note} onChange={(e) => setNote(e.target.value)} placeholder='Enter text..' />
                </section>

                <section className='note-actions'>
                    <div className='note-type-btn'>

                        <button type='button' title="Text note"></button>

                    </div>

                    <button type="submit">Add</button>
                </section>


            </form>
        </div>
    )
}