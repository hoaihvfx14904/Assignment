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