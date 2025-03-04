
export function NoteLabels({ labels = [] }) {
    const labelColors = {
        'Critical': '#eb5a46',
        'Family': '#0078bf',
        'Work': '#60bd4e',
        'Friends': '#f3d700',
        'Spam': '#ff9f1a',
        'Memories': '#c376e1',
        'Romantic': '#0099b7'
    }
    if (!labels.length) return null

    return (
        <section className="note-labels">
            {labels.map(label => (
                <span key={label} className="note-label" style={{ backgroundColor: labelColors[label] }}>{label}</span>
            ))}
        </section>
    )
}