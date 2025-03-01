import Count from './components/count';
import Counter from './components/counter';
import TodoList from './components/todo-list';

const App = () => {
  return (
    <>
      {/* <Header title="안녕하세요 저는 FE 개발자 김수빈입니다." /> */}
      {/* <Content text="이건 Content 컴포넌트입니다.">
        <p>이건 자식 노드입니다.</p>
      </Content> */}
      {/* <h2>간단한 useState 동작 Demo</h2>
      <Counter /> */}
      <Count />

      <h2>TODO 리스트를 만들어봅시다!</h2>
      <TodoList />
    </>
  );
};

export default App;
