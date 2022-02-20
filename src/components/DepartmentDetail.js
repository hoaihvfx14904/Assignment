import React from 'react';
import { Card, CardImg, CardText, CardTitle} from 'reactstrap';
import dateFormat from 'dateformat';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
  
    const DepartmentDetail = (props) =>{
        console.log(JSON.stringify(props.dpm))
        if(props.staffs != null){
            const menu = props.staffs.map((staff) => {
                return (
                    <Card className='col-12 col-md-4 mt-2 p-1'>
                        <CardImg src={staff.image} alt={staff.name}></CardImg>
                        <CardText className='css-staff m-auto'><strong>{staff.name}</strong></CardText>
                    </Card>
                )
            });
        return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/department">Bộ phận</Link></BreadcrumbItem>
                         <BreadcrumbItem >{props.dpm.name}</BreadcrumbItem> 
                    </Breadcrumb>           
                </div>
                <div className="row">
                   {menu}
                </div>
                </div>
            );
        }else {
            return <div> </div>
        }
    }
        export default DepartmentDetail;