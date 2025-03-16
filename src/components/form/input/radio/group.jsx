import RadioButton from './button';

/**
 * interface RadioGroupProps {
 *  title: string;
 *  required?: boolean,
 *  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
 *  selectedId: string;
 *  buttons: Array<{ id: string; name: string; label: string; checked?: boolean }>;
 * }
 *
 */
const RadioGroup = ({ title, buttons, value, onChange, required = false }) => {
  return (
    <section role="radiogroup">
      {required && <span style={{ color: '#b20000' }}>*</span>}
      <p>{title}</p>
      {buttons.map((button) => (
        <RadioButton
          key={button.id}
          {...button}
          onChange={onChange}
          checked={button.id === value}
        />
      ))}
    </section>
  );
};

export default RadioGroup;
