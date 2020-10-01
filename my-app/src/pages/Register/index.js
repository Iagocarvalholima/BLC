import React from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'

import './styles.css'
const Register = () => {
    const handleSubmit = values => {
        axios.post('http://localhost:8080/v1/api/user', values)
            .then(resp => {
                const { data } = resp   //cadastro para retornar o valor "data" para que possa conter os valores do user e direcionar para login.
                if (data) {
                    history.push('/login')
                }
            })
    }


    const validations = yup.object().shape({
        email: yup.string().email().required(), //validação para verificar se o email e a senha esta sendo escrito corretamente.
        password: yup.string().min(8).required()
    })
    return (
        <>
        <image className="logo2" href="./images/logo2.png" alt="logo2"/>
            <h1>Cadastro</h1>
            <h4>Se cadastre e venha fazer parte da familia BLC digital</h4>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="Login">
                    <div className="Login-Group">
                      <h3>Nome</h3>
                        <Field
                            name="firstName"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="firstName"
                            className="Login-Error"
                        />
                    </div>
                    <div className="Login-Group">
                      <h3>Sobrenome</h3>
                        <Field
                            name="lastName"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="lastName"
                            className="Login-Error"
                        />
                    </div>
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
                    <h3>Senha</h3>
                        <Field
                            name="password"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="password"
                            className="Login-Error"
                        />
                        <h3>Confirmar Senha</h3>
                        <Field
                            name="password"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="password"
                            className="Login-Error"
                        />
                    </div>
                    <button className="Login-btn" type="submit">Register</button>
                    <link><a>Já tenho cadastro</a></link>
                </Form>
            </Formik>
        </>
    )
}

export default Register