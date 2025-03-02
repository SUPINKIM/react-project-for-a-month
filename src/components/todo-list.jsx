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

  const [todoInputValue, setTodoInputValue] = React.useState('');

  const isEmpty = todos.length === 0;

  const validateValue = () => {
    if (!todoInputValue.trim().length) {
      alert('할 일을 입력해주세요.');
      return false;
    }

    return true;
  };

  const createTodo = () => {
    if (!validateValue()) return;

    const todo = {
      id: new Date().getTime(),
      isChecked: false,
      value: todoInputValue,
    };

    setTodos([...todos, todo]);
    setTodoInputValue('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const resetTodo = () => {
    setTodos([]);
    setTodoInputValue('');
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

  const handleChange = (e) => {
    setTodoInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // issue1 : 이벤트를 여기서 받아서 처리하는 경우 form 기본 이벤트가 먼저 실행됨
    // 아마도 setInterval로 한 번에 콜백을 실행하면서 시점 문제가 발생하는 것으로 보임
    createTodo();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          id="todo-input"
          type="text"
          value={todoInputValue}
          onChange={handleChange}
          autoComplete="off"
        />
        <Button name="할 일 추가" type="submit" />
      </form>

      <br />
      <Button name="초기화" onClick={resetTodo} />

      <h4>오늘의 할 일 목록 👇</h4>

      {isEmpty ? (
        <p>모든 할 일을 마쳤습니다 🎉👏</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.isChecked}
                onInput={() => toggleCheck(todo.id)}
              />
              <span>{` ${todo.value} `}</span>
              <Button name="삭제" onClick={() => deleteTodo(todo.id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
