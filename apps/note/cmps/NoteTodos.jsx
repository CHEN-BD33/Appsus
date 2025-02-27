const { useState, useEffect } = React

export function NoteTodos({ info, onChangeInfo }) {
    const [infoToEdit, setInfoToEdit] = useState({ ...info })
    const [newTodo, setNewTodo] = useState('')

    useEffect(() => {
        setInfoToEdit(info)
    }, [info])

    function handleChange({ target }) {
        const { name, value } = target
        const newInfo = { ...infoToEdit, [name]: value }
        setInfoToEdit(newInfo)
        onChangeInfo(newInfo)
    }

    function handleAddTodo(ev) {
        ev.preventDefault()

        const todo = {
            txt: newTodo,
            doneAt: null
        }

        const newTodo = { ...infoToEdit, todo: [...infoToEdit.todo, todo] }

        setInfoToEdit(newInfo)
        onChangeInfo(newInfo)
        setNewTodo('')

    }

    function toggleTodo(idx) {
        const updatedTodos = [...infoToEdit.todos]
        updatedTodos[idx].doneAt = updatedTodos[idx].doneAt ? null : Date.now()

        const newInfo = { ...infoToEdit, todo: updatedTodos }

        setInfoToEdit(newInfo)
        onChangeInfo(newInfo)
    }

    return (
        <section className='note-todos'>
            <section className='note-todos-title'>
                <input type='text' name='title' value={infoToEdit.title} onChange={handleChange} style={{ backgroundColor: 'inherit' }} placeholder='Enter title...' />
            </section>

            <section className='note-todos-list'>
                <ul>
                    {infoToEdit.todos && infoToEdit.todos.map((todo, idx) => (
                        <li key={idx} className='todo-item'>
                            <input type='checkbox' checked={todo.doneAt !== null} onChange={() => toggleTodo(idx)} id={`todo-${idx}`} />
                            <label htmlFor={`todo-${idx}`} style={{ textDecoration: todo.doneAt ? 'line-through' : 'none', color: todo.doneAt ? '#888' : 'inherit', cursor: 'pointer', userSelect: 'none' }}>{todo.txt}</label>

                        </li>
                    ))}
                </ul>
            </section>

            <section className='note-add-new-todo'>
                <form onSubmit={handleAddTodo}>
                    <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} style={{ backgroundColor: 'inherit', border: 'none' }} placeholder='List Item' />
                </form>
            </section>

        </section>



    )
}


