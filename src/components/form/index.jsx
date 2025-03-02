import { useForm } from '@/utils/form';
import Input from './input/index';
import Button from '../button';

const Form = () => {
  const { isSuccess, register, handleSubmit, getState, resetState } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch('/form', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const result = await response.json();

    alert(result.meta.resultMsg || '폼 제출 완료!');
  };

  return (
    <div>
      <h1 style={{ 'text-align': 'center', 'margin-bottom': '32px' }}>
        회원가입
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          margin: '0 auto',
          'text-align': 'center',
          'max-width': '600px',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'flex-direction': 'column',
          gap: '16px',
          'flex-wrap': 'wrap',
        }}
      >
        <Input.Text
          id="id"
          label="아이디"
          {...register('id', {
            required: true,
            validate: (state) => {
              if (state.length > 0 && state.length < 5) {
                return '아이디는 5글자 이상이어야 합니다.';
              }
            },
          })}
        />

        <Input.Text
          id="password"
          type="password"
          label="비밀번호"
          {...register('password', {
            required: true,
            pattern: {
              regexp: /[a-zA-Z\d(*!#$%^&)+]{8,20}/gm,
              message:
                '비밀번호는 8글자 이상, 20자 이하이며 영문, 숫자 및 *,!,#,$,%,^,& 특수 문자가 하나 이상 포함되어야 합니다.',
            },
          })}
        />

        <Input.Text
          id="check-password"
          type="password"
          label="비밀번호 확인"
          {...register('check-password', {
            required: true,
            validate: (value) => {
              if (value && value !== getState('password')) {
                return '비밀번호가 일치하지 않습니다.';
              }
            },
          })}
        />

        <div
          style={{
            display: 'flex',
            gap: '32px',
            'border-top': '1px solid #808080',
            padding: '10px',
            width: '100%',
            'justify-content': 'center',
          }}
        >
          <Input.RadioGroup
            title="당신의 직무는 무엇인가요?"
            buttons={[
              { id: 'front-end', name: 'field', label: '프론트엔드' },
              { id: 'back-end', name: 'field', label: '백엔드' },
            ]}
            {...register('field')}
          />

          <Input.RadioGroup
            title="근무하신지는 얼마나 되셨나요?"
            buttons={[
              { id: '1year', name: 'years', label: '1년 이하' },
              { id: '3year', name: 'years', label: '1년 ~ 3년' },
              { id: '5year', name: 'years', label: '3년 ~ 5년' },
              { id: '7year', name: 'years', label: '5년 ~ 7년' },
              { id: 'upper-7year', name: 'years', label: '그 이상' },
            ]}
            {...register('years')}
          />
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            'border-top': '1px solid #808080',
            padding: '20px',
            width: '100%',
            'justify-content': 'center',
          }}
        >
          <Button
            type="submit"
            name="제출하기"
            style={{
              all: 'unset',
              padding: '12px',
              color: '#ffffff',
              background: '#ed2939',
              border: '1px solid #d0312d',
              'border-radius': '6px',
              cursor: 'pointer',
              width: '120px',
              'text-align': 'center',
            }}
          />

          <Button
            name="양식 지우기"
            onClick={resetState}
            style={{
              all: 'unset',
              padding: '12px',
              color: '#222',
              cursor: 'pointer',
              'font-size': '12px',
              width: '60px',
              'text-align': 'center',
              'text-decoration-line': 'underline',
              'text-underline-offset': '2px',
            }}
          />
        </div>
      </form>

      {isSuccess && (
        <div
          style={{
            'text-align': 'center',
            'margin-top': '32px',
            position: 'fixed',
            top: '55%',
            left: '50%',
            background: '#ffffff',
            width: '100%',
            height: '100%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <p>응답이 성공적으로 기록되었습니다. 감사합니다! ❤️ 🙇‍♀️</p>
        </div>
      )}
    </div>
  );
};

export default Form;
