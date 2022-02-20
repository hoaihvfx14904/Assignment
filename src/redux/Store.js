import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { DepartmentReducer } from "./DepartmentReducer";
import { StaffReducer } from "./StaffsReeducer";
import { SalaryReducer } from "./SalaryReducer";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: StaffReducer,
            department: DepartmentReducer,
            salary: SalaryReducer
        }),
        applyMiddleware( thunk, logger)
    )
    return store;
}
