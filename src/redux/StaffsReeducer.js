import * as ActionTypes from './ActionTypes'

export const StaffReducer = (state = {isLoading: true, err: null, staffs: []}, action) => {
    switch(action.type) {
        case  ActionTypes.STAFF_LOADING:
            return {...state, isLoading:true, err: null, staffs: []};
        case  ActionTypes.STAFF:
            return {...state, isLoading: false, err: null, staffs: action.payload};
        case ActionTypes.STAFF_FAIL:
            return {...state, isLoading: false, err: 'errmess', staffs: []};
        default :
        return state;
    }
}