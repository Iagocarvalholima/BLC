import React, {useState} from 'react';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Toast } from 'react-bootstrap';
import axios from 'axios';
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import {history} from '../../history';
import './styles.css';
import logo from '../Images/LC.png'; 

  const Login = () => { 
  const [viewPassword, setViewPassword] = useState(false) // setViewPassword altera o estado  
  const [show, setShow] = useState(false);
  
  function funcViewPassword(password){  //função para ver o password ou não
    setViewPassword(!password)
  }

  function ToastView() { //mensagem de erro
    return (
          <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Body>Autenticação invalida, verifique os campos e tente novamente!</Toast.Body>  
          </Toast>
    );
  }

  const handleSubmit = values => {
      axios.post('http://localhost:3307/api/auth/', values)
          .then(resp => {
              const { data } = resp
              if (data) {
                  localStorage.setItem('app-token', JSON.stringify(data)) // seta o registro em formato de String
                  history.push('/')
              }
            }).catch((error)=>{
              setShow(true)  
            })
          }

  const validations = yup.object().shape({ //Valida os inputs com limitações e requisições se  acaso nao for Clicado;
    email:yup.string().email().required(),
    password: yup.string().min(8).required()
  })

  return(
  <>
  <img src={logo} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%' }} />
  <h1 color="#FFF">Login</h1>
    <Formik initialValues={{}}
      validationSchema={validations} 
      onSubmit={handleSubmit}>
    <Form className="Login">
  <div className="Login-Group">
        <h3>Email</h3>
        <Field 
        name="email"
        className="Login-Field"
        />
         <ErrorMessage 
         component="span" 
         name="email"
         className="Login-Error"
         />
  </div>
      
   <div className="Login-Group">
      <h3>Senha { viewPassword 
        ? <a onClick={()=>funcViewPassword(viewPassword)} ><IoIosEye/></a>
        : <a onClick={()=>funcViewPassword(viewPassword)}><IoIosEyeOff/></a>}
      </h3>
        <Field 
        name="password"
        type= {viewPassword === false && 'password'}
        className="Login-Field"
         />
         
         <ErrorMessage 
         component="span" 
         name="password"
         className="Login-Error"
         />
  </div>
  <div>
        
 </div>

      <button className="Login-btn" type="submit" onClick={handleSubmit()}>Entrar</button>
      <ToastView/>

           </Form>
        </Formik>
        
     </>
    )
  }
export default Login;