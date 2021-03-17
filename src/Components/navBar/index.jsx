import React, { Component } from 'react'
import './style.scss';
import 'font-awesome/css/font-awesome.min.css';
import Modal from '@bdenzer/react-modal';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
        shouldShowModal: false,
    }
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({ shouldShowModal: false });
  }

  openModal() {
    this.setState({ shouldShowModal: true });
  }
  render() {
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
      <>
        <div className='navBox' >
          <span href='/' onClick={this.openModal} className='iconBar'><i className='fa fa-bars'></i></span>
          <h1>My shop</h1> 
          <a href="/"className='fa fa-user-plus'></a>
          <a href="/"className='fa fa-search principal'></a>
          <a href="/"className='fa fa-shopping-cart'></a>                
        </div>
        <div className='modalContainer'>
          <Modal
            customStyle={modalStyle}
            closeModal={this.closeModal}
            shouldShowModal={this.state.shouldShowModal}
          > 
            <div className='modal'>
              <h2>MENU</h2>
              <p><span className='fa fa-home'> Home</span></p>
              <p><span className='fa fa-filter'> Categories</span></p>
              <p><span className='fa fa-shopping-basket'> Shooping Cart</span></p>
              <p><span className='fa fa-user'> Sig in</span></p>
              </div>
          </Modal>
        </div>
      </>
    )
  
  }
}