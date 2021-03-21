import React, { Component } from 'react'
import firebase from './firebase'
import { toast } from 'react-toastify';
import axios from 'axios';
import { withRouter} from 'react-router-dom';
import { Form, Input } from 'antd';
toast.configure();
class App extends Component {
    state = {
      data: [],
      password: ''
  }
  handleChangePassword = (event) => {
    this.setState({ password: event.currentTarget.value })
  }
  componentDidMount(){
    axios.get(`http://localhost:8080/api/usuarios/filtrarUser/mm`)
    .then(res => {
        const { password } = res.data
        this.setState({
          data: res.data,
          password
        });
      })
      .catch(err => {
        toast.warn("No se puede mostrar la información - " + err)
      })
  }
  fetchData=event =>{
    event.preventDefault();
    const variables = {
      password: this.state.password 
  }
      axios.post(`http://localhost:8080/api/usuarios/editar/mm`, variables) 
      .then(() => {
          toast.success(`producto editado`,{
            position: toast.POSITION.TOP_CENTER}
            )
      })
      .catch(err => toast.warn(`No se pudo editar el producto`))
  }
  handleClick=()=>{
    var recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    var number = '+523326704013';
    firebase.auth().signInWithPhoneNumber(number, recaptcha).then( function(e) {
      var code = prompt('Enter the otp', '');

        
        if(code === null) return;

        
        e.confirm(code).then(function (result) {
            document.querySelector('label').textContent +=   result.user.phoneNumber;
            alert(this.state.data.password)
        }).catch(function (error) {
            console.error( error);
            
        });

    })
    .catch(function (error) {
        console.error( error);

    });
  }
  render() {
    const {data} = this.state;
    return (
      <div>
        
        <div id="recaptcha"></div>
        {
          data.map((item,index)=>(
          <div key={index} className="containerProduct" >
          <h3>{item.password}</h3>
          </div>
          ))
        }
        <button onClick={this.handleClick}>Click</button>
      </div>
    )
  }
}

export default withRouter(App)
