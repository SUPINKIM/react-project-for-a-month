import { useForm } from '@/utils/form';
import Input from './input';

const Form = () => {
  const { register, handleSubmit } = useForm();

  console.log({ ...register('id', { required: true }) });

  return (
    <div>
      <h1>아래의 폼을 채워주세요!</h1>

      <form>
        <Input.Text id="id" label="아이디" />

        <br />
        <Input.Text id="new-password" label="비밀번호" />

        <br />
        <Input.Text id="password-check" label="비밀번호 확인" />

        <Input.RadioGroup
          title="당신의 직무는 무엇인가요?"
          buttons={[
            { id: 'front-end', name: 'field', label: '프론트엔드' },
            { id: 'back-end', name: 'field', label: '백엔드' },
          ]}
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
        />
      </form>
    </div>
  );
};

export default Form;
