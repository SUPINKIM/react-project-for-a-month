export const Button = () => {
  const handleClick = () => {
    alert('Hello world');
  };
  return (
    <button onClick={handleClick}>
      <span className="button-name">this is button!</span>
      <div>
        <span>this is children~</span>
      </div>
    </button>
  );
};
