
const { useState } = React

export function LabelPicker({onChange}) {
    const labels = [
        {name:'Critical', picked: '✔'  , backgroundColor: '#eb5a46'},
        {name:'Family', picked: '✔'  , backgroundColor: '#0078bf'}, 
        {name:'Work', picked: '✔'  , backgroundColor: '#60bd4e'}  , 
        {name:'Frinds', picked: '✔'  , backgroundColor: '#f3d700'} , 
        {name:'Spam', picked: '✔'  , backgroundColor: '#ff9f1a'} , 
        {name:'Memoreis', picked: '✔'  , backgroundColor: '#c376e1'} , 
        {name:'Romantic', picked: '✔'  , backgroundColor: '#0099b7'}]
    const [selectedLabels, setSelectedLabels] = useState([])

    function toggleLabel(label) {
        var updatedLabels
        if (selectedLabels.includes(label)) {
            updatedLabels = selectedLabels.filter(l => l !== label)
        } else {
            updatedLabels = [...selectedLabels, label]
        }
        setSelectedLabels(updatedLabels)
        onChange(updatedLabels) 
    }

    return (
        <section className="label-picker">
            <h3>Pick Labels:</h3>
            <div className="label-container">
            {labels.map(label => (
                <button key={label.name} onClick={() => toggleLabel(label.name)} style={{backgroundColor: label.backgroundColor}}
                >
                    {label.name} {selectedLabels.includes(label.name) ? <span>{label.picked} </span> : ''}
                </button>
            ))}
            </div>

        
           
        </section>
    )
}

//Show the selected labels on the email / note missing (Afthe the app
//  email and App note)

