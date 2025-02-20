const Button = ({ name, onClick, type = 'button' }) => {
  return (
    <button
      id="button-name"
      type={type}
      onClick={onClick ? onClick : undefined}
    >
      {name}
    </button>
  );
};

export default Button;
