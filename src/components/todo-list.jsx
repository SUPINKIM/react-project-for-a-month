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
    //console.log(e);
    createTodo();
  };

  return (
    <div>
      {/* 
        부분 리렌더링으로 input value는 계속해서 업데이트 되고 input value와 관계 없는 
        form tag는 기존 dom이 재사용되어야 원하는 대로 submit 시점에 업데이트 된 
        todoInputValue 값이 가져올 수 있을 것이라 생각함.
        현재는 onChange 핸들러가 실행되면서 전체 DOM이 다시 그려지면서 
        기존 form 요소가 제거되면서 event listener에 등록된 onSubmit 이벤트가 실행되지 않음
        그래서 onChange 이벤트만 동작하고 onSubmit 이벤트가 동작하지 않는 문제가 발생
      */}

      {/* <form onSubmit={handleSubmit}></form> */}

      <input
        id="todo-input"
        type="text"
        value={todoInputValue}
        onChange={handleChange}
        autoComplete="off"
      />
      <Button name="할 일 추가" onClick={handleSubmit} />

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
                onChange={() => toggleCheck(todo.id)}
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
