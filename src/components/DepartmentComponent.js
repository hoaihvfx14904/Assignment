import React from "react";
import { CardText, Card} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from "react-router-dom";
function RenderCard({item}) {
        return(
            <Card >
                <h2>{item.name}</h2>
                <CardText className="css-staff">Số lượng nhân viên: {item.numberOfStaff}</CardText>
            </Card>
            );  
}
function Department ({department, isLoading, err}) {
    if(isLoading){
        return <Loading />
    } else if( err){
        return <div>{err}</div>
    }else if(department.length === 0){
        return <div></div>
    } else {
    const dpm = department.map((item) =>{
    return (
        <Link
        key={item.id}
        className='col-12 col-md-6 col-lg-4 dark mb-2 mt-2'
        to={`/department/${item.id}`}
        style={{ textDecoration: "none" }}
        > 
            <RenderCard item={item} />
        </Link>
    )})
    return (
        <div className="container">
            <div className="row ">
             {dpm}
            </div>
        </div>
    )   
}
}
export default Department;