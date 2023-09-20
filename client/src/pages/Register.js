import React from 'react';
import '../styles/RegisterStyles.css';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { Form } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Register = () => {
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/register', values);
      dispatch(hideLoading());
      console.log(values);
      if (res.data.success) {
        message.success('Registered Successfully..');
        // Redirect to the login page on successful registration
        // Replace '/login' with your actual login route
        window.location.href = '/login';
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong!!');
    }
  };

  return (
    <div className='form-container'>
      <Form layout='vertical' onFinish={onFinishHandler} className='register-form'>
        <h3 className='text-center'>Register Form</h3>
        <Form.Item label='Name' name='name'>
          <input className='input-field' type='text' required />
        </Form.Item>
        <Form.Item label='Email' name='email'>
          <input className='input-field' type='email' required />
        </Form.Item>
        <Form.Item label='Password' name='password'>
          <input className='input-field' type='password' required />
        </Form.Item>
        <div className='button-container'>
          <button className='btn btn-primary' type='submit'>
            Register
          </button>
        </div>
        <div className='link-container'>
          <Link to='/login'>Already registered? Login here</Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
