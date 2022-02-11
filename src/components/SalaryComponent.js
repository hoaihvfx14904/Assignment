import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardTitle} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderSalary ({staff}) {
    const basicSalary = 3000000;
    const overTimeSalary = 200000;
    let salary = (staff.salaryScale * basicSalary) + (staff.overTime * overTimeSalary);
    return (
        <Card> 
                <h3>{staff.name}</h3>
                <CardTitle className='css-staff'>Mã nhân viên: {staff.id} </CardTitle>
                <CardTitle className='css-staff'>Hệ số lương: {staff.salaryScale} </CardTitle>
                <CardTitle className='css-staff'>Giờ làm thêm: {staff.overTime} </CardTitle>
                <CardTitle className='css-staff'><p className='css-salary'>Lương: {salary}</p></CardTitle>
        </Card>
    );
}
   
    const Salary = (props) => {
        const menu = props.staffs.map((staff) =>{
            return (
                <div key={staff.id} className='col-12 col-md-6 col-lg-4 mt-3'>
                    <RenderSalary staff={staff}  />
                </div>
            )
        });
    
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Nhân viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
                    </Breadcrumb>                
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );


}
export default Salary;