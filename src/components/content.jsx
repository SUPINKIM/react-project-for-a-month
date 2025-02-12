/**
 * @props text: string
 * @props children: ReactNode
 * @props button: {
 *  title: string;
 *  onClick?: (e: PointerEvent) => void;
 * }
 */
const Content = ({ text, button, children }) => {
  return (
    <div>
      <p>{text}</p>
      {children}
      {button && <button onClick={button.onClick}>{button.title}</button>}
    </div>
  );
};

export default Content;
