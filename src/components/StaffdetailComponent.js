import React from 'react';
import { Card, CardImg, CardText, CardTitle} from 'reactstrap';
import dateFormat from 'dateformat';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

     function   RenderImage({staff}){
            if(staff != null){
                return (
                    <Card >
                        <CardImg  height='270px' src={staff.image} alt={staff.name}></CardImg>
                        
                    </Card>
                );

            }else{
                return <div></div>;
            }
        }
    function RenderInfo({staff}) {  
            if(staff){
                return (
                    <Card >
                        <CardTitle className='css-staff'><strong>Họ và tên: {staff.name}</strong></CardTitle>
                        <CardText className='css-staff'>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText className='css-staff'>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText className='css-staff'>Bộ phận: {staff.departmentId}</CardText>
                        <CardText className='css-staff'>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText className='css-staff'>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    </Card>
                        )
            } else {
                return <div></div>;
            }
    }  
    const StaffDetail = (props) =>{
        if(props.staff != null){
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Nhân viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                    </Breadcrumb>           
                </div>
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-3 ">
                        <RenderImage staff={props.staff} />
                    </div>
                    <div className="col-12 col-md-8 col-lg-9 ">
                        <RenderInfo staff={props.staff} />
                    </div>
                </div>
                </div>
            );
        }else {
            return <div> </div>
        }
    }
        export default StaffDetail;