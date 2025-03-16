const Button = ({ name, onClick, type = 'button', ...props }) => {
  return (
    <button
      id={`button-${name}`}
      type={type}
      onClick={onClick ? onClick : undefined}
      {...props}
    >
      {name}
    </button>
  );
};

export default Button;
