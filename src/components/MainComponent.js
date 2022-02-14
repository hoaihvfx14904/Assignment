
import React, { Component} from 'react';
import {DEPARTMENTS, STAFFS} from '../shared/staffs.js';
import StaffList from './StaffComponent.js';
import Department from './DepartmentComponent.js';
import StaffDetail from './StaffdetailComponent';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import Salary from './SalaryComponent.js';
import {Switch, Route, Redirect} from 'react-router-dom'

class Main extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      department: DEPARTMENTS
    }
  }
  render(){
  const DepartmentPage = () => {
    return(
        <Department department={this.state.department} />
    );
  }
  const StaffWithId = ({match}) => {
    console.log(match.params.id)
    return(
        <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.id,10))[0]} />
    );
  };
  return (
    <div className='App'>
      <Header />
         <Switch>
             <Route path='/department' component={DepartmentPage} />
             <Route exact path='/staff' component={() => <StaffList staffs={this.state.staffs}  />} />
             <Route path='/staff/:id' component={StaffWithId} />
             <Route path='/salary' component={() => <Salary staffs={this.state.staffs} />} />
            
             <Redirect to='/staff' />
         </Switch>
      <Footer />
    </div>
  );
  }
}

export default Main;