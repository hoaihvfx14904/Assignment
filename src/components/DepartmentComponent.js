import React from "react";
import { CardText, Card} from 'reactstrap';

function RenderCard({item}) {
        return(
            <Card >
                <h2>{item.name}</h2>
                <CardText className="css-staff">Số lượng nhân viên: {item.numberOfStaff}</CardText>
            </Card>
            );  
}
function Department ({department}) {
    if(department.length === 0){
        return <div></div>
    } else {
    const dpm = department.map((item) =>{
    return (
        <div className='col-12 col-md-6 col-lg-4 mb-2 mt-2' >
            <RenderCard item={item} />
        </div>
    )})
    return (
        <div className="container">
            <div className="row">
             {dpm}
            </div>
        </div>
    )   
}
}
export default Department;