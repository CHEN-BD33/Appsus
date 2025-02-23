
const { useState, useEffect } = React

export function NoteImg({ info, onChangeInfo }) {
    const [infoToEdit, setInfoToEdit] = useState({ ...info })

    useEffect(() => {
        setInfoToEdit(info)
    }, [info])

    function handleChange({ target }) {
        const { name, value } = target
        const newInfo = { ...infoToEdit, [name]: value }
        setInfoToEdit(newInfo)
        onChangeInfo(newInfo)
    }

    return (
        <section className='note-img'>
            <section className='note-img-title'>
                <input type='text' name='title' value={infoToEdit.title} onChange={handleChange} style={{ backgroundColor: 'inherit' }} placeholder='Enter title...' />
            </section>

            <section className='note-img-url'>
                <input type='text' name='url' value={infoToEdit.url} onChange={handleChange} style={{ backgroundColor: 'inherit' }} placeholder='Enter image URL...' />
            </section>

            {infoToEdit.url && <img src={infoToEdit.url} alt={infoToEdit.title} />}
        </section>
    )
}