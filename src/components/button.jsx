const Button = () => {
  const handleClick = () => {
    alert('Hello world');
  };
  return (
    <button onClick={handleClick}>
      <span id="button-name" className="placeholder">
        this is button!
      </span>
      <div id="children-container">
        <span>this is children~</span>
      </div>
    </button>
  );
};

export default Button;
