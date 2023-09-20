import React from 'react'
import "../styles/RegisterStyles.css";
import {Link,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import {Form,message} from 'antd';
import axios from 'axios'
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onfinishHandler=async(values)=>{
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/v1/user/login',values);
      window.location.reload();
      dispatch(hideLoading())
      if(res.data.success){
        localStorage.setItem('token',res.data.token);
        message.success('Login successfully');
        navigate('/');

      }else{
        message.error(res.data.message);
      }

    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('something went wrong');
    }
  };
  return (
    <div className='form-container'>
      
      <Form layout="vertical" onFinish={onfinishHandler} className='register-form p-4' >
      <h3 className='text-center'>Login Form</h3>
        
        <Form.Item label='Email' name="email">
          <input type='email' required/>
        </Form.Item>
        <Form.Item label='Password' name="password">
          <input type='password' required/>
        </Form.Item>
        <div className='button-container'>
  <Link to="/register" className='registration-link'>
    Not a user? Register here
  </Link>
  <button className='btn btn-primary' type='submit'>
    Login
  </button>
</div>

      </Form>
    </div>
  );
};

export default Login;