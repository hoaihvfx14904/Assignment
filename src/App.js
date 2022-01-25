import logo from './logo.svg';
import React, { Component} from 'react';
import {STAFFS} from './shared/staffs.jsx';
import Menu from './components/MenuComponents.js'
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import { render } from '@testing-library/react';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,

    }
  }
  render(){
  return (
    <div className='App'>
      <Navbar dark color='primary'>
        <div className='container'>
          <NavbarBrand href='/'>Ứng dụng quản lý nhân sự v1.0</NavbarBrand>
        </div>
      </Navbar>
      <Menu staffs={this.state.staffs}/>
      
     
    </div>
  );
  }
}

export default App;
