import React, { Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';
import dateFormat from 'dateformat';


class Menu extends Component {

    constructor(props){
        super(props);

        this.state = {
            selectedStaff: null,
        };
    }
        onDishSelect(staff){
            this.setState({selectedStaff: staff});
        }
        renderDish(staff){
            if(staff != null){
                return (
                    <div className='col-12 col-md-6 col-lg-4 mt-1'>
                    <Card >
                        <CardTitle><strong>Họ và tên: {staff.name}</strong></CardTitle>
                        <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}</CardText>
                        <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                        <CardText>Bộ phận: {staff.department.name}</CardText>
                        <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                        <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                    </Card>
                    </div>
                );

            }else{
                return <div></div>;
            }
        }
          
    
    render(){

        const menu = this.props.staffs.map((staff) =>{
            return (
                <div key={staff.id} className='col-12 col-md-6 col-lg-4 mt-1'>
                    <Card onClick={() => this.onDishSelect(staff)}>
                        <CardTitle>
                            {staff.name}
                        </CardTitle>
                
                    </Card>
                </div>
            )
        });
        return (
            <div className='container'>
                <div className='row'>
                     {menu}
                     <p>Nhấn vào tên nhân viên để xem thông tin</p>
                </div>

                <div className='row'>
                     {this.renderDish(this.state.selectedStaff)}
                </div>
                
            </div>
        );
    }

}
export default Menu;