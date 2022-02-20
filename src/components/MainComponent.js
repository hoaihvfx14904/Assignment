
import React, { Component} from 'react';
import {DEPARTMENTS, STAFFS} from '../shared/staffs.js';
import StaffList from './StaffComponent.js';
import Department from './DepartmentComponent.js';
import StaffDetail from './StaffdetailComponent';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import Salary from './SalaryComponent.js';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import { fetchStaff, fetchDepartment } from '../redux/CreatorAction.js';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  
  return ({
    staffs: state.staffs,
    department: state.department
  })
}
const mapDispatchToProps = (dispatch) => ({
  fetchStaff : () => {dispatch(fetchStaff())},
  fetchDepartment : () => {dispatch(fetchDepartment())},
})

class Main extends Component {
  
  componentWillMount() {
    this.props.fetchStaff();
    this.props.fetchDepartment();
  }
  

  /* updateState(staff) {
    const currentStaffs = this.props.staffs;
    this.setState({
      staffs: currentStaffs.concat([staff]),
    });
    localStorage.setItem("Staffs", JSON.stringify(currentStaffs.concat([staff])));
  } */
  render(){
  const DepartmentPage = () => {
    return(
        <Department department={this.props.department.department} />
    );
  }
  const StaffWithId = ({match}) => {
    return(
        <StaffDetail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.id,10))[0]} />
    );
  };
  return (
    <div className='App'>
      <Header />
         <Switch>
             <Route path='/department' component={DepartmentPage} />
             <Route exact path='/staff' component={() => <StaffList
                  staffs={this.props.staffs.staffs}
                  isLoading={this.props.staffs.isLoading}
                  err={this.props.staff.err}
                  /* updateState={(newStaff) => this.updateState(newStaff)} */
                />} />
             <Route path='/staff/:id' component={StaffWithId} />
             <Route path='/salary' component={() => <Salary staffs={this.props.staffs.staffs} />} />
            
             <Redirect to='/staff' />
         </Switch>
      <Footer />
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));