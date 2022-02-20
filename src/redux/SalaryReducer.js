import * as ActionTypes from './ActionTypes'

export const SalaryReducer = (state = {isLoading: true, err: null, salary: []}, action) => {
    switch(action.type) {
        case  ActionTypes.SALARY_LOADING:
            return {...state, isLoading:true, err: null, salary: []};
        case  ActionTypes.SALARY:
            return {...state, isLoading: false, err: null, salary: action.payload};
        case ActionTypes.SALARY_FAIL:
            return {...state, isLoading: false, err: 'errmess', salary: []};
        default :
        return state;
    }
}