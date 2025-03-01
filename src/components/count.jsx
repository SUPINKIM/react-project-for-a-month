import React from '@/utils/state';

const Count = () => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <div>
      <h4>1초마다 값이 업데이트 됩니다!</h4>
      <p>{count}</p>
    </div>
  );
};

export default Count;
