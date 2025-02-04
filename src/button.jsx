export const Button = () => {
  const handleClick = () => {
    alert('Hello world');
  };
  return <button onClick={handleClick}>this is button!</button>;
};
