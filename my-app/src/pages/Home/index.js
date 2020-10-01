import React,{ useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Navbar } from 'react-bootstrap';
import axios from 'axios';
import {history} from '../../history';
import moment from 'moment'

const Home = () => {
  const [listTable, setListTable] = useState([])
  const [user, setUser] = useState('')

    useEffect(() => {
      axios.get('http://localhost:3307/api/transfer/2') //passa
        .then(resp => {   
            const { data } = resp.data
            if (data) {
            setListTable(data.data);
            }
          })
      }, []);

      useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('app-token')))
    }, [listTable]);

return (
  <>
  <Navbar bg="dark" variant="dark">
<Navbar.Brand href="#home">{user ? user.user.name : ''}</Navbar.Brand>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
    {user ? '$' + user.user.sale : 0}
    </Navbar.Text>
  </Navbar.Collapse>
</Navbar>
<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Codigo</th>
      <th>Nome da transferencia</th>
      <th>Valor</th>
      <th>Tipo</th>
      <th>Destinatario</th>
      <th>Data da transferencia</th>
   </tr>
  </thead>
  <tbody>
    {listTable.map((item) => { 
      return ( 
      <tr style={{backgroundColor: item.name_user_receive == user.user.name ? 'green' : 'transpartent' }}> 
        <td>{item.id}</td> 
        <td>{item.name}</td> 
        <td>{item.sale}</td>
        <td>{item.type}</td>  
        <td>{item.name_user_receive}</td> 
       <td>{moment(item.created_at, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
      </tr> 
    ) 
  })}
  </tbody>
</Table>
 <button className="Login-btn" type="submit" onClick={() => history.push('/transfer')}>Transferir</button>
 </>
)}

export default Home;