
import React, { Component} from 'react';
import StaffList from './StaffComponent.js';
import Department from './DepartmentComponent.js';
import StaffDetail from './StaffdetailComponent';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import Salary from './SalaryComponent.js';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import { fetchStaff, fetchDepartment, fetchSalary } from '../redux/CreatorAction.js';
import { connect } from 'react-redux';
import DepartmentDetail from './DepartmentDetail.js';

const mapStateToProps = state => {
  
  return ({
    staffs: state.staffs,
    department: state.department,
    salary: state.salary
  })
}
const mapDispatchToProps = (dispatch) => ({
  fetchStaff : () => {dispatch(fetchStaff())},
  fetchDepartment : () => {dispatch(fetchDepartment())},
  fetchSalary : () => {dispatch(fetchSalary())},
})

class Main extends Component {
  
  componentDidMount() {
    this.props.fetchStaff();
    this.props.fetchDepartment();
    this.props.fetchSalary();
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
        <Department department={this.props.department.department} 
                    isLoading={this.props.department.isLoading}
                    err={this.props.department.err}     
         />
    );
  }
  const StaffWithId = ({match}) => {
    
    return(
        <StaffDetail staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.id,10))[0]} />
    );
  };
  const StaffWithDpmId = ({match}) => {

    return(
        <DepartmentDetail 
        staffs={this.props.staffs.staffs.filter((staff) => staff.departmentId.indexOf(match.params.id) !== -1)} 
        dpm={this.props.department.department.filter((dpm) => dpm.id.indexOf(match.params.id) !== -1)[0]}
        />
    );
  };
  return (
    <div className='App'>
      <Header />
         <Switch>
             <Route path='/department/:id' component={StaffWithDpmId} />
             <Route path='/department' component={DepartmentPage} />
             <Route exact path='/staff' component={() => <StaffList
                  staffs={this.props.staffs.staffs}
                  isLoading={this.props.staffs.isLoading}
                  err={this.props.staffs.err}
                  /* updateState={(newStaff) => this.updateState(newStaff)} */
                />} />
             <Route path='/staff/:id' component={StaffWithId} />
             <Route path='/salary' component={() => <Salary 
                    staffs={this.props.salary.salary} 
                    isLoading={this.props.salary.isLoading}
                    err={this.props.salary.err}
                    />}/>
             <Redirect to='/staff' />
         </Switch>
      <Footer />
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));