const initialInput = {
    todoList: []
}
const allReducers = (state = initialInput, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                todoList: [...state.todoList, action.payload]
            }
            case 'UPDATE_TODO':
                const updatedTodoList = state.todoList.map(todo => {
                    if (todo.id === action.id) {
                        return { ...todo, data: { ...todo.data, ...action.data } }; // Merge existing and new data
                    }
                    return todo;
                });
                return {
                    ...state,
                    todoList: updatedTodoList,
                };
            
        case 'DELETE_TODO':
            return {
                todoList: state.todoList.filter(todo => todo.id !== action.id)
            }
        default:
            return state
    }
}
export default allReducers