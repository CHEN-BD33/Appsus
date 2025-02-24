

const { useState, useEffect } = React

export function NoteVideo({ info, onChangeInfo }) {
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

    function getYoutubeEmbUrl(url) {
        if (!url) return ''
        if (url.includes('youtube.com')) {
            const videoId = url.split('v=')[1] || url.split('/').pop()
            return `https://www.youtube.com/embed/${videoId}`
        }
        return url
    }

return (
    <section className='note-video'>
        <section className='note-video-title'>
            <input type='text' name='title' value={infoToEdit.title} onChange={handleChange} style={{ backgroundColor: 'inherit' }} placeholder='Enter title...' />
        </section>

        <section className='note-video-url'>
            <input type='text' name='url' value={infoToEdit.url} onChange={handleChange} style={{ backgroundColor: 'inherit' }} placeholder='Enter video URL...' />
        </section>

        {infoToEdit.url && (
            <div className='video-container'>
                <iframe src={getYoutubeEmbUrl(infoToEdit.url)} title={infoToEdit.title} />
            </div>
        )}
    </section>

)
}