import * as ActionTypes from './ActionTypes'

export const DepartmentReducer = (state = {err: null, department: []}, action) => {
    switch(action.type) {
        case  ActionTypes.DEPARTMENT:
            return {...state, err: null, department: action.payload};
        case ActionTypes.DEPARTMENT_FAIL:
            return {...state, err: 'errmess', department: []};
        default :
        return state;
    }
}