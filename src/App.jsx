import Content from './components/content';
import Header from './components/header';

const App = () => {
  return (
    <>
      <Header title={'안녕하세요 저는 FE 개발자 김수빈입니다.'} />
      <Content text={'이건 Content 컴포넌트입니다.'}>
        <div>이건 자식 노드입니다.</div>
      </Content>
    </>
  );
};

export default App;
