/**
 * @link https://react-hook-form.com/docs/useform/register
 */
import React from '@/utils/state';

export const useForm = () => {
  const [state, setState] = React.useState({}); // Record<string, { value: string, required: boolean }>
  const [error, setError] = React.useState({}); // Record<string, string>
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const resetState = () => {
    setState({});
    setError({});
    setIsLoading(false);
  };

  const handleSubmitCallback = async (callback) => {
    const isNotValid = Object.keys(state).some(
      (key) =>
        (state[key].required && state[key].value.length === 0) || error[key],
    );

    if (isNotValid || Object.keys(state).length === 0) {
      alert('입력 내용을 다시 확인해주세요.');
      return;
    }

    setIsLoading(true);
    await callback(state);
    setIsSuccess(true);
    setIsLoading(false);
    resetState();
  };

  const handleSubmit = (callback) => {
    try {
      if (!callback) throw new Error('onSubmit을 정의되지 않았습니다.');
      return () => handleSubmitCallback(callback);
    } catch (e) {
      console.error(e);
    }
  };

  const onChange = (e, name) => {
    setState((prev) => ({
      ...prev,
      [name]: { ...prev[name], value: e.target.value },
    }));
  };

  const getState = (key) => state[key]?.value;

  const validateByPattern = (target, regexp, message, name) => {
    console.log(
      target,
      regexp,
      message,
      name,
      target.length > 0,
      !regexp.test(target),
      `${target.length > 0 && !regexp.test(target)}`,
    );
    if (target.length > 0 && !regexp.test(target)) {
      setError((prev) => ({
        ...prev,
        [name]: message || '패턴이 일치하지 않습니다.',
      }));
      return;
    }
    setError((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const register = (name, options = {}) => {
    setState((prev) => {
      if (prev[name]) return prev;
      return {
        ...prev,
        [name]: { value: '', required: options.required || false },
      };
    });

    return {
      ...options,
      onChange: (e) => {
        try {
          if (options?.pattern) {
            const { regexp, message } = options.pattern;
            validateByPattern(e.target.value, regexp, message, name);
          } else if (options?.validate) {
            setError((prev) => ({
              ...prev,
              [name]: options.validate(e.target.value),
            }));
          }
          options?.onChange ? options.onChange(e, name) : onChange(e, name);
        } catch (error) {
          console.error(error, '옵션이 정확한지 확인해주세요.');
        }
      },
      value: state[name]?.value,
      error: error[name]?.length > 0,
      errorMessage: error[name],
    };
  };

  return {
    register,
    handleSubmit,
    onChange,
    getState,
    resetState,
    isLoading,
    isSuccess,
  };
};
