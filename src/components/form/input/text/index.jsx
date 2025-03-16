const Text = ({
  id,
  value,
  label,
  type = 'text',
  errorMessage,
  required = false,
  error = false,
  onChange,
}) => {
  return (
    <div>
      {required && <span style={{ color: '#d0312d' }}>*</span>}
      <label for={id}>{`${label} `}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete="off"
        style={{
          height: '20px',
          'border-radius': '2px',
          'border-width': '1px',
          'box-shadow': error ? '0 0 0 2px #d0312d' : '',
          outline: 'none',
          border: error ? 'none' : '1px solid #222',
        }}
      />
      {error && errorMessage && (
        <p style={{ 'font-size': '12px', color: '#d0312d' }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Text;
