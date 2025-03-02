const RadioButton = ({ id, label, name, onChange, checked = false }) => {
  return (
    <div>
      <label for={id}>{label}</label>
      <input
        type="radio"
        id={id}
        value={id}
        name={name}
        onChange={onChange}
        checked={checked}
      />
    </div>
  );
};

export default RadioButton;
