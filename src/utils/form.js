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

  const validateByPattern = (target, pattern) => {
    if (!pattern) return '';

    const { regexp, message } = pattern;

    if (target.length > 0 && !regexp.test(target)) {
      return message || '패턴이 일치하지 않습니다.';
    }

    return '';
  };

  const setErrorAs = (name, errorMessage) => {
    setError((prev) => ({
      ...prev,
      [name]: errorMessage,
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
          setError((prev) => ({
            ...prev,
            [name]:
              validateByPattern(e.target.value, options.pattern) ||
              (options.validate && options.validate(e.target.value)),
          }));

          options?.onChange ? options.onChange(e, name) : onChange(e, name);
        } catch (error) {
          console.error(error, 'register 옵션이 정확한지 확인해주세요.');
        }
      },
      value: state[name]?.value,
      error: error[name]?.length > 0,
      errorMessage: error[name],
    };
  };

  return {
    register,
    isLoading,
    isSuccess,
    setErrorAs,
    handleSubmit,
    onChange,
    getState,
    resetState,
  };
};
