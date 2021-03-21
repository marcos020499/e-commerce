import React, { Component } from 'react'
import './style.scss';
import 'font-awesome/css/font-awesome.min.css';
import Modal from '@bdenzer/react-modal';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import  {connect} from  'react-redux'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import wallpaper from '../../Images/wallpaper.jpg'
import {setCurrentUser} from '../../actions'
toast.configure();
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      name: '',
      secondName: '',
      city: '',
      input: '',
      shouldShowModal: false,
      shouldShowModal2: false,
      shouldShowModal1: false,
      shouldShowModal3: false,
    }
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal2 = this.closeModal2.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.closeModal1 = this.closeModal1.bind(this);
    this.openModal1 = this.openModal1.bind(this);
    this.closeModal3 = this.closeModal3.bind(this);
    this.openModal3 = this.openModal3.bind(this);
  }

  closeModal() {
    this.setState({ shouldShowModal: false });
  }
  closeModal2() {
    this.setState({ shouldShowModal2: false });
  }
  closeModal1() {
    this.setState({ shouldShowModal1: false });
  }
  closeModal3() {
    this.setState({ shouldShowModal3: false });
  }

  openModal() {
    this.setState({ shouldShowModal: true });
  }
  openModal2() {
    this.setState({ shouldShowModal2: true });
    this.setState({ shouldShowModal: false });
  }
  openModal1() {
    this.setState({ shouldShowModal1: true });
    this.setState({ shouldShowModal2: false });
  }
  openModal3() {
    this.setState({ shouldShowModal3: true });
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { user, password } = this.state;
    axios.post('http://localhost:8080/api/usuarios/login', { user, password })
       .then(() => {
        toast.success('credenciales validas',{
            position: toast.POSITION.TOP_CENTER}
            )
        this.props.history.push("/login");
       })
       .catch(err => {
          if (err.response && err.response.status === 404) {
             return toast.error("Credenciales inválidas")
          }
      });
  }

  register = event => {
    event.preventDefault();
    const {user, password, name, secondName, city} = this.state
    axios.post(`http://localhost:8080/api/usuarios/crear`, {user, password, name, secondName, city})
      .then(() => {
        toast.success(`usuario creado`,{
          position: toast.POSITION.TOP_CENTER}
          )
          this.props.history.push("/login");
      })
    .catch(err => toast.warn(`No se pudo crear el usuario`))
  }
  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    }
    handleChange =(e)=> {
      this.setState({ input: e.target.value });
    }
    handleClick =(e) =>{
      console.log(this.state.input);
    }
  render() {
    const {user, password, name, secondName, city, input} = this.state;
    const modalStyle = {
      animationTime: 400,
      modalHeader: {
      backgroundColor: 'gray'
      },
      modalStyle: {
        width: '10px'
      }
    }

    return (
      <div>
        <div className='navBox' >
          <span onClick={this.openModal} className='iconBar'><i className='fa fa-bars'></i></span>
          <h1 style={{position: 'relative', top: '-40%'}}>My shop</h1> 
          <a className='fa fa-search principal' onClick={this.openModal3}></a>
          <Link to="/cart" className="fa fa-shopping-cart">{this.props.numberCart}</Link>
          <a className='fa fa-user' onClick={this.openModal2}></a>               
        </div>
        <div className='modalContainer'>
          <Modal
            customStyle={modalStyle}
            closeModal={this.closeModal}
            shouldShowModal={this.state.shouldShowModal}
          > 
              <h2>MENU</h2>
              <a href='/' className='fa fa-home' style={{padding: '1%'}}> Home</a>
              <a href='/categories' className='fa fa-filter' style={{padding: '1%'}}> Categories</a>
              <a href='/cart' className='fa fa-shopping-basket' style={{padding: '1%'}}> Shooping Cart</a>
              <button className='fa fa-user' onClick={this.openModal2}> Sign In</button>
          </Modal>
        </div>
        <form onSubmit={this.onSubmit}>
              <Modal
              customStyle={modalStyle}
              closeModal={this.closeModal2}
              shouldShowModal={this.state.shouldShowModal2}
              >
                <div className='login' style={{color: 'purple'}}>
                  <h3>LOGIN</h3>
                  <div className='inputLogin'>
                    <input type="text"placeholder='Ingresa tu usuario ' value={user} name='user' onChange={this.onChange} required/>
                    <input type="password"placeholder='Ingresa tu contraseña' value={password} name='password' onChange={this.onChange} required/>
                    <h3>No tienes una cuenta? <button className='newUser' onClick={this.openModal1}>Registrate</button></h3>
                    <button type='submit'>Iniciar sesion</button>
                    <Link to="/phoneInput/mm" className="LoginReference">Olvidaste tu contraseña </Link>
                  </div>
                </div>
              </Modal>
            </form>
            <form onSubmit={this.register}>
              <Modal
              customStyle={modalStyle}
              closeModal={this.closeModal1}
              shouldShowModal={this.state.shouldShowModal1}
              >
                <div className='Register' style={{color: 'purple'}}>
                  <h3>REGISTRO</h3>
                  <div className='inputRegister'>
                    <input type="text"placeholder='Ingresa tu usuario ' value={user} name='user' onChange={this.onChange} required/>
                    <input type="password"placeholder='Ingresa tu contraseña' value={password} name='password' onChange={this.onChange} required/>
                    <input type="text"placeholder='Ingresa tu nombre ' value={name} name='name' onChange={this.onChange} required/>
                    <input type="text"placeholder='Ingresa tu apellido (opcional)' value={secondName} name='secondName' onChange={this.onChange}/>
                    <input type="text"placeholder='Ciudad donde vives ' value={city } name='city' onChange={this.onChange} required/>
                    <button type='submit'>REGISTRAR USUARIO</button>
                  </div>
                </div>
              </Modal>
            </form>
            <form>
              <Modal
              customStyle={modalStyle}
              closeModal={this.closeModal3}
              shouldShowModal={this.state.shouldShowModal3}
              >
                  <div className=''>
                    <input type="text" onChange={ this.handleChange } />
                    <a className='fa fa-search principal' href={`/filter/${this.state.input}`} style={{position: 'relative', right: '-3%'}}></a>
                </div>
              </Modal>
            </form>
            <div>
              <h2 className='backgroundText'>the best technology shop</h2>
              <img className='background' src={wallpaper} alt=""/>
            </div>
      </div>
    )
  
  }
}


const mapStateToProps = state =>{
  return{
      numberCart:state._todoProduct.numberCart
  }
}
const mapDispatchToProps = {
  setCurrentUser
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(index))
