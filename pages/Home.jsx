import { showSuccessMsg } from '../services/event-bus.service.js'
import { LabelPicker } from '../cmps/LabelPicker.jsx'

export function Home() {

    function onChange(updatedLabels){
        console.log('Updated Labels' , updatedLabels)
    }
    return <section className="container home">
        <h1>Welcome home</h1>
        <button onClick={() => showSuccessMsg('Yep, that works')}>Show Msg</button>
        <LabelPicker onChange={onChange} />
        <div className="box-container">
            <div className="box1"></div>
            <div className="box2"></div>
        </div>
    </section>
}