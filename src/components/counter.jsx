import React from '@/utils/state';
import Button from './button';

const Counter = () => {
  const [name, setName] = React.useState('김수빈');
  const [height, setHeight] = React.useState('157cm');
  const [count, setCount] = React.useState(0);

  const handleChangeName = () => {
    setName('최수빈이지롱~');
  };

  const handleChangeHeight = () => {
    setHeight('내 키는 원래 2m야~');
  };

  return (
    <div>
      <div>
        <p>{name}</p>
        <Button name="이름을 변경해보세요." onClick={handleChangeName} />
      </div>
      <p>{height}</p>
      <Button name="키를 변경해보세요." onClick={handleChangeHeight} />
      <p>{count}</p>
      <Button name="Increase+" onClick={() => setCount(count + 1)} />
      <Button name="Decrease-" onClick={() => setCount(count - 1)} />
    </div>
  );
};

export default Counter;
