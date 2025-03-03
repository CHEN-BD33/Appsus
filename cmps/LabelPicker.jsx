
const { useState } = React

export function LabelPicker({ selectedLabels = [], onChangeLabels }) {
    const [isOpen, setIsOpen] = useState(false)
    // const [selectedLabels, setSelectedLabels] = useState([])

    const labels = [
        { name: 'Critical', picked: '✔', backgroundColor: '#eb5a46' },
        { name: 'Family', picked: '✔', backgroundColor: '#0078bf' },
        { name: 'Work', picked: '✔', backgroundColor: '#60bd4e' },
        { name: 'Friends', picked: '✔', backgroundColor: '#f3d700' },
        { name: 'Spam', picked: '✔', backgroundColor: '#ff9f1a' },
        { name: 'Memories', picked: '✔', backgroundColor: '#c376e1' },
        { name: 'Romantic', picked: '✔', backgroundColor: '#0099b7' }]

    function toggleLabel(label) {
        let updatedLabels
        if (selectedLabels.includes(label)) {
            updatedLabels = selectedLabels.filter(l => l !== label)
        } else {
            updatedLabels = [...selectedLabels, label]
        }
        // setSelectedLabels(updatedLabels)
        onChangeLabels(updatedLabels)
    }

    return (
        <section className="label-picker">
            {/* <h3>Pick Labels:</h3> */}
            <button onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                setIsOpen(!isOpen)
            }} className="label-picker-btn"><i className="fa-solid fa-tags"></i></button>

            {isOpen && (
                <section className="label-options">
                    {labels.map(label => (
                        <div key={label.name} className={`label-option ${selectedLabels.includes(label.name) ? 'selected' : ''}`} style={{ backgroundColor: label.backgroundColor }} onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            toggleLabel(label.name)
                        }}>
                            <span>{label.name}</span>
                            {selectedLabels.includes(label.name) && <span className="check">{label.picked}</span>}
                        </div>
                    ))}
                </section>
            )}
        </section >
    )
}

//Show the selected labels on the email / note missing (Afthe the app
//  email and App note)
