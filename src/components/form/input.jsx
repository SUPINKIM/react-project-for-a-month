import RadioButton from './radio/button';
import RadioGroup from './radio/group';
import Text from './text';

const Input = ({ children }) => children;

Input.Text = Text;
Input.RadioGroup = RadioGroup;
Input.RadioButton = RadioButton;

export default Input;
