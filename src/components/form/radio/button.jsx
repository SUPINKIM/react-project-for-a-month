const RadioButton = ({ id, label, name }) => {
  return (
    <div>
      <label for={id}>{label}</label>
      <input type="radio" id={id} value={id} name={name} />
    </div>
  );
};

export default RadioButton;
