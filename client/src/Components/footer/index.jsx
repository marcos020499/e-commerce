import React, { Component } from 'react'
import './style.scss';
import 'font-awesome/css/font-awesome.min.css';

export default class index extends Component {
  render() {
    return (
      <>
        <div className='divFooter'>
          <div className='box7'>
            <div className='child1'>
              <h1 className='title6'>About Us</h1>
              <h1 className='text6'>All the things in the same place</h1> 
              <div className='iconsFooter'>
              <a href="/" className='fa fa-facebook'></a>  
              <a href="/" className='fa fa-instagram'></a> 
              <a href="/" className='fa fa-whatsapp'></a> 
              <a href="/" className='fa fa-twitter'></a> 
            </div>
          </div>
          <div className='child2'>
            <h1 className='title6'>Get in touch</h1> 
            <h1 className='text7'>Location :</h1>
            <h1 className='text6'>Guadalajara Jalisco, Mexico</h1>
            <h1 className='text7'>Contact :</h1>
            <h1 className='text6'>Phone : +52 33 2670 4013</h1>
            <h1 className='text6'>Email : info@example.com</h1>
          </div>
          <div className='child3'>
            <h1 className='title6'>Quick Links</h1>
            <h1 className='text6'>Home</h1>
            <h1 className='text6'>About</h1>
            <h1 className='text6'>Shop</h1>
          </div>
          <div className='child4'>
            <h1 className='title6'>Sign up for your offers</h1>
            <h1 className='text6'>By subscribing to our mailing list you will always get latest news and updates from us.</h1>
            <input className='input' type="text" placeholder='Enter your email...'/>
          </div>
          </div>
          <h1 className='text8'>© 2021 All Rights Reserved | Design by Marcos Manzo</h1>
        </div>
      </>
    )
  }
}