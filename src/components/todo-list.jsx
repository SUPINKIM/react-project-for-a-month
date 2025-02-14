import Button from './button';
import React from '@/utils/state';

const TodoList = () => {
  /**
   * interface Todo {
   *  id: number;
   *  isChecked: boolean;
   *  value: string;
   * }
   */
  const [todos, setTodos] = React.useState([]);

  const createTodo = () => {
    const value = document.getElementById('todo-input').value;

    if (!value) {
      alert('할 일을 입력해주세요.');
      return;
    }

    const todo = {
      id: new Date().getTime(),
      isChecked: false,
      value,
    };

    setTodos([...todos, todo]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const resetTodo = () => {
    setTodos([]);
  };

  const toggleCheck = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isChecked: !todo.isChecked,
          };
        }
        return todo;
      }),
    );
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      createTodo();
    }
  };

  return (
    <div>
      <div>
        <input
          id="todo-input"
          type="text"
          autoComplete="off"
          onKeyUp={handleKeyUp}
        />
        <Button name="할 일 추가" onClick={createTodo} />
      </div>

      <br />
      <Button name="초기화" onClick={resetTodo} />

      <h4>오늘의 할 일 목록 👇</h4>

      {todos.length > 0 && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <Button
                style={{ border: 0, background: 'transparent' }}
                name={todo.isChecked ? '✅' : '⭕️'}
                onClick={() => toggleCheck(todo.id)}
              />
              <span>{`   ${todo.value}   `}</span>
              <Button name="삭제" onClick={() => deleteTodo(todo.id)} />
            </li>
          ))}
        </ul>
      )}

      {todos.length === 0 && <p>모든 할 일을 마쳤습니다 🎉👏</p>}
    </div>
  );
};

export default TodoList;
