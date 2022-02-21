
import React, { Component} from 'react';
import StaffList from './StaffComponent.js';
import Department from './DepartmentComponent.js';
import StaffDetail from './StaffdetailComponent';
import Header from './HeaderComponent.js';
import Footer from './FooterComponent.js';
import Salary from './SalaryComponent.js';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import { fetchStaff, fetchDepartment, fetchSalary, postStaff , deleteStaff, updateStaff} from '../redux/CreatorAction.js';
import { connect } from 'react-redux';
import DepartmentDetail from './DepartmentDetail.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  
  return ({
    staffs: state.staffs,
    department: state.department,
    salary: state.salary
  })
}
const mapDispatchToProps = (dispatch) => ({
  postStaff: (newStaff) => {dispatch(postStaff(newStaff))},
  deleteStaff: (id) => {dispatch(deleteStaff(id))},
  updateStaff: (dataUpdate, id) => {dispatch(updateStaff(dataUpdate, id))},
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
        <StaffDetail 
        updateStaff={(dataUpdate, id) => this.props.updateStaff(dataUpdate, id)}
        deleteStaff={(id) => this.props.deleteStaff(id)}
        staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.id,10))[0]} />
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
  // return class main
  return (
    <div className='App'>
      <Header />
      <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
         <Switch>
             <Route path='/department/:id' component={StaffWithDpmId} />
             <Route path='/department' component={DepartmentPage} />
             <Route exact path='/staff' component={() => <StaffList
                    staffs={this.props.staffs.staffs}
                    isLoading={this.props.staffs.isLoading}
                    err={this.props.staffs.err}
                    postStaff={(newStaff) => this.props.postStaff(newStaff)}
                    />}
               />
             <Route path='/staffs/:id' component={StaffWithId} />
             <Route path='/salary' component={() => <Salary 
                    staffs={this.props.salary.salary} 
                    isLoading={this.props.salary.isLoading}
                    err={this.props.salary.err}
                    />}
              />
             <Redirect to='/staff' />
         </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));