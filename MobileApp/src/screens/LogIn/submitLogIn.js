import { SubmissionError, reset } from 'redux-form';

export default function submitLogin(values, dispatch, props) {
  let error = {};
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const { email, password } = values;

  if (!reg.test(email)) {
    error.email = 'Format email salah';
  } else {
    if (!email) {
      error.email = 'Email harus diisi';
    } else if (!password) {
      error.password = 'Password harus diisi';
    }
  }

  if (Object.keys(error).length) {
    throw new SubmissionError(error);
  } else {
    // post login
  }
}