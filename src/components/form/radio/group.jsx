import RadioButton from './button';

/**
 * interface RadioGroupProps {
 *  title: string;
 *  name: string;
 *  buttons: Array<{ id: string; name: string; label: string; checked?: boolean }>;
 * }
 *
 */
const RadioGroup = ({ title, buttons, required = false }) => {
  return (
    <section role="radiogroup">
      {required && <span style={{ color: '#b20000' }}>*</span>}
      <p>{title}</p>
      {buttons.map((button) => (
        <RadioButton key={button.id} {...button} />
      ))}
    </section>
  );
};

export default RadioGroup;
