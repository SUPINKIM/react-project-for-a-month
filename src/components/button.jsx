const Button = ({ name, onClick }) => {
  return (
    <button onClick={onClick}>
      <span id="button-name" className="placeholder">
        {name}
      </span>
    </button>
  );
};

export default Button;
