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

        const newInfo = { ...infoToEdit, todos: [...infoToEdit.todos || [], todo] }

        setInfoToEdit(newInfo)
        onChangeInfo(newInfo)
        setNewTodo('')

    }

    function removeTodo(idx) {
        const updatedTodos = infoToEdit.todos.filter((todo, index) => index !== idx)
        const newInfo = { ...infoToEdit, todos: updatedTodos }

        setInfoToEdit(newInfo)
        onChangeInfo(newInfo)
    }

    function toggleTodo(idx) {
        const updatedTodos = [...infoToEdit.todos]
        const todoToToggle = updatedTodos[idx]
        updatedTodos.splice(idx, 1)

        todoToToggle.doneAt = todoToToggle.doneAt ? null : Date.now()

        if (todoToToggle.doneAt) {
            updatedTodos.push(todoToToggle)
        } else {
            const firstCheckedIndex = updatedTodos.findIndex(todo => todo.doneAt)
            if (firstCheckedIndex !== -1) {
                updatedTodos.splice(firstCheckedIndex, 0, todoToToggle)
            } else {
                updatedTodos.push(todoToToggle)
            }
        }

        const newInfo = { ...infoToEdit, todos: updatedTodos }

        setInfoToEdit(newInfo)
        onChangeInfo(newInfo)
    }

    const completedTodos = infoToEdit.todos && infoToEdit.todos.some(todo => todo.doneAt)

    return (
        <section className='note-todos'>
            <section className='note-todos-title'>
                <input type='text' name='title' value={infoToEdit.title || ''} onChange={handleChange} style={{ backgroundColor: 'inherit' }} placeholder='Enter title...' />
            </section>

            <section className={`note-todos-list ${completedTodos ? 'completed-todos' : ''}`}>
                <ul>
                    {infoToEdit.todos && infoToEdit.todos.map((todo, idx) => {
                        const firstCompletedIndex = infoToEdit.todos.findIndex(t => t.doneAt)
                        return (
                            <li key={idx} className={`todo-item ${todo.doneAt ? 'completed' : ''} ${todo.doneAt && idx === firstCompletedIndex ? 'first-completed' : ''}`}>
                                <div className='checkbox-container'>
                                    <input type='checkbox' checked={todo.doneAt !== null} onChange={() => toggleTodo(idx)} id={`todo-${idx}`} style={{ backgroundColor: '#fff' }} />
                                    <label htmlFor={`todo-${idx}`} style={{ textDecoration: todo.doneAt ? 'line-through' : 'none', color: todo.doneAt ? '#888' : 'inherit', cursor: 'pointer', userSelect: 'none' }}>{todo.txt}</label>
                                </div>
                                <button className='remove-todo-btn' onClick={() => removeTodo(idx)}>✕</button>
                            </li>
                        )
                    })}
                </ul>
            </section>

            <section className='note-add-new-todo'>
                <span>+</span><input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddTodo(e)
                    }
                }} style={{ backgroundColor: 'inherit', border: 'none' }} placeholder='List Item' />

            </section>

        </section>



    )
}


