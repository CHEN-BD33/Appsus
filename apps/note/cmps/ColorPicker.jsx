
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
            <section className='color-picker-btn'>
                <button onClick={() => setIsOpen(!isOpen)} style={{ backgroundColor }}>color</button>

                {isOpen && (
                    <div className='color-options'>
                        {colors.map(color => (
                            <div key={color} className='color-option' style={{ backgroundColor: color }} onClick={() => {
                                onChangeColor(color)
                                setIsOpen(false)
                            }}>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </section>
    )
}