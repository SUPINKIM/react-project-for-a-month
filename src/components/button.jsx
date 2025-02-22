const Button = ({ name, onClick, type = 'button' }) => {
  return (
    <button onClick={onClick} type={type}>
      <span id="button-name" className="placeholder">
        {name}
      </span>
    </button>
  );
};

export default Button;
