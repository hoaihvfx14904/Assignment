import { url } from "../shared/url";
import * as ActionTypes from './ActionTypes'

export const fetchStaff = () => (dispatch) => {
    dispatch(staffLoading());
    return fetch(url + 'staffs')
    .then(response => {
        if(response.ok){
            return response;
        } else {
            var error = new Error('Errors' + response.status + ':' + response.statusText);
            error.response = error;
            throw error;
        }
    },
    error => {
        var errMess = new Error(error.message);
        throw errMess;
    }
    )
    .then(response => response.json())
    .then(staffs => dispatch(addStaff(staffs)))
    .catch(error => dispatch(staffFailed(error)))
}

export const staffLoading =() => ({
    type : ActionTypes.STAFF_LOADING
})
export const addStaff =(staffs) => ({
    type : ActionTypes.STAFF,
    payload: staffs
})
export const staffFailed =(errmess) => ({
    type: ActionTypes.STAFF_FAIL,
    payload: errmess
})

// department 

export const fetchDepartment = () => (dispatch) => {
    return fetch(url + 'departments')
    .then(response => {
        if(response.ok){
            return response;
        } else {
            var error = new Error('Errors' + response.status + ':' + response.statusText);
            error.response = error;
            throw error;
        }
    },
    error => {
        var errMess = new Error(error.message);
        throw errMess;
    }
    )
    .then(response => response.json())
    .then(department => dispatch(addDepartment(department)))
    .catch(error => dispatch(departmentFailed(error)))
}

export const addDepartment =(department) => ({
    type : ActionTypes.DEPARTMENT,
    payload: department
})
export const departmentFailed =(errmess) => ({
    type: ActionTypes.DEPARTMENT_FAIL,
    payload: errmess
})

// salary 

export const fetchSalary = () => (dispatch) => {
    dispatch(salaryLoading());
    return fetch(url + 'staffsSalary')
    .then(response => {
        if(response.ok){
            return response;
        } else {
            var error = new Error('Errors' + response.status + ':' + response.statusText);
            error.response = error;
            throw error;
        }
    },
    error => {
        var errMess = new Error(error.message);
        throw errMess;
    }
    )
    .then(response => response.json())
    .then(salary => dispatch(addSalary(salary)))
    .catch(error => dispatch(salaryFailed(error)))
}

export const salaryLoading =() => ({
    type : ActionTypes.SALARY_LOADING
})
export const addSalary =(salary) => ({
    type : ActionTypes.SALARY,
    payload: salary
})
export const salaryFailed =(errmess) => ({
    type: ActionTypes.SALARY_FAIL,
    payload: errmess
})

// add staff

export const postStaff = (newStaff) => (dispatch) => {

    return fetch(url + 'staffs', {
        method: "POST",
        body: JSON.stringify(newStaff),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => dispatch(addStaff(response)))
    .catch(error =>  { console.log('post staff', error.message); alert('Your staff could not be posted\nError: '+error.message); });
};