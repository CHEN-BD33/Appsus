
const { useState } = React

export function ColorPicker({ backgroundColor, onChangeColor }) {
    const [isOpen, setIsOpen] = useState(false)

    const colors = [
        '#E8EAED',
        '#E2DED1',
        '#FAAFA8',
        '#D3BFDB',
        '#A8C6DF',
        '#B4DDE3',
        '#A2E0D2',
        '#C9E4C5',
        '#FEF3A0',
        '#F6C5A2',
        '#F4B5AE'
    ]

    return (
        <section className='color-picker'>
                <button onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    setIsOpen(!isOpen)
                }} className='color-picker-btn' title="Choose Note Color"><img src='assets/css/apps/note/img/colorpicker.svg'></img></button>

                {isOpen && (
                    <div className='color-options'>
                        {colors.map(color => (
                            <div key={color} className='color-option' style={{ backgroundColor: color }} onClick={(e) => {
                                e.stopPropagation()
                                e.preventDefault()
                                onChangeColor(color)
                                setIsOpen(false)
                            }}>
                            </div>
                        ))}
                    </div>
                )}
        </section>
    )
}