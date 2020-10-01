import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown,ButtonGroup,Button } from 'react-bootstrap';
import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'
const Transfer = () => {
  const [type, setType] = useState(null);
  const [user, setUser] = useState('')

    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('app-token'))) //  Retorna o registro para formato array-objeto
    }, [!user]);

    const handleSubmit = values => {
      let body = {
        user_send_id: user ? user.user.id : 0,
        user_receive_id: values ? values.user_receive_id : '',
        value_transfer: values ? values.value_transfer : '',    // Testando valores para transferir preencher a variavel body conforme o banco;
        name_transfer: values ? values.name_transfer : '',
        type: type || ''
      }
      axios.post('http://localhost:3307/api/transfer/create', body)
        .then(resp => {
            const { data } = resp   //cadastro para retornar o valor "data" para que possa conter os valores do user e direcionar para login.
            if (data) {
                history.push('/')
            }
        })
    }

    const validations = yup.object().shape({
    })
    return (
        <>
        <image className="logo2" href="./images/logo2.png" alt="logo2"/>
            <h1>Transferência</h1>
            <h4>Faça sua transferência preenchendo todos os campos.</h4>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="Login">
                    <div className="Login-Group">
                      <h3>Valor</h3>
                        <Field
                            name="value_transfer"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="value_transfer"
                            className="Login-Error"
                        />
                    </div>
                    <div className="Login-Group">
                      <h3>Nome da transferência</h3>
                        <Field
                            name="name_transfer"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="name_transfer"
                            className="Login-Error"
                        />
                    </div>
                    <div className="Login-Group">
                    <h3>Tipo</h3>
                    <Dropdown as={ButtonGroup} onSelect={(value) => setType(value)}>
                      <Button variant="success">{type || 'Selecione'}</Button>
                      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey='receita'>Receita</Dropdown.Item>
                        <Dropdown.Item eventKey='resultado'>Resultado</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </div>
                    <div className="Login-Group">
                      <h3>Conta (ID)</h3>
                        <Field
                            name="user_receive_id"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="user_receive_id"
                            className="Login-Error"
                        />
                    </div>
                    <button className="Login-btn" type="submit" onClick={() => handleSubmit()}>Register</button>
                </Form>
            </Formik>
        </>
    )
}

export default Transfer