import React from 'react';
import {
    Card, CardTitle, CardImg, CardText,  Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from "reactstrap";
import dateFormat from 'dateformat';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Control, LocalForm, Errors } from "react-redux-form";
import { url } from '../shared/url';


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

        const [doB, setdoB] = useState('');
        const [startDate, setstartDate] = useState('');

        const [modalOpen, setModalOpen] = useState(false);

        const handleSubmit =(values) =>{
            setModalOpen(!modalOpen);
            const neStaff = {
                image: "/asset/images/alberto.png",
              };
            return fetch(url + 'staffs', {
                method: "PATCH",
                body: JSON.stringify(neStaff),
                headers: {
                  "Content-Type": "application/json"
                },
                credentials: "same-origin"
            })
            .then(response => {
                if (response.ok) {
                  return response;
                } else {
                  var error = new Error('Error ' + response.status + ': ' + response.statusText);
                  error.response = response;
                  throw error;
                }
              },
              error => {
                    throw error;
              })
            .catch(error =>  { console.log('post staff', error.message); alert('Your staff could not be posted\nError: '+error.message); });
        
             

        }


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
                        <Button onClick={() => setModalOpen(!modalOpen)}>Cập nhật thông tin</Button>
                    </div>
                </div>
                {/*  Modal */}
                <div className="row">
                    <Modal isOpen={modalOpen}
                            toggle={(modalOpen) => setModalOpen(!modalOpen)}
                    >
                        <ModalHeader>Thêm nhân viên</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => handleSubmit(values)}>
                                <Row className="mt-2">
                                    <Label htmlFor="name" md={3}>Tên</Label>
                                    <Col md={9}>
                                        <Control.text 
                                            placeholder={props.staff.name}
                                            model=".name"
                                            id="name"
                                            name="name"
                                            className="form-control" 
                                            
                                            ></Control.text>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Label md={3} htmlFor="doB">Ngày sinh</Label>
                                    <Col md={9}>
                                        <Control.text
                                        placeholder={props.staff.doB}
                                        type="date"
                                        model=".doB"
                                        id="doB"
                                        name="doB"
                                        value={doB}
                                        onChange={(event) =>setdoB(event.target.value)}
                                        className="form-control"
                                       
                                        ></Control.text>
                                        
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Label htmlFor="startDate" md={3}>Ngày bắt đầu</Label>
                                    <Col md={9}>
                                        <Control.text
                                            placeholder={props.staff.startDate}
                                            model=".startDate"
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            className="form-control"
                                            value={startDate}
                                            onChange={(event) => setstartDate(event.target.value)}
                                           
                                        ></Control.text>
                                       
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Label htmlFor="department" md={3}>Bộ phận</Label>
                                    <Col md={9}>
                                        <Control.select

                                            model=".department"
                                            id="department"
                                            name="department"
                                            className="form-control"
                                            defaultValue={props.staff.departmentId}
                                        >
                                        <option>Dept01</option>
                                        <option>Dept02</option>
                                        <option>Dept03</option>
                                        <option>Dept04</option>
                                        <option>Dept05</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Label htmlFor="salaryScale" md={3}>Hệ số lương</Label>
                                    <Col md={9}>
                                        <Control.text
                                            placeholder={props.staff.salaryScale}
                                            model=".salaryScale"
                                            id="salaryScale"
                                            name="salaryScale"
                                            className="form-control"
                                           
                                        ></Control.text>
                                       
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Label htmlFor="annualLeave" md={3}>Ngày nghỉ còn lại</Label>
                                    <Col md={9}>
                                        <Control.text
                                            placeholder={props.staff.annualLeave}
                                            model=".annualLeave"
                                            id="annualLeave"
                                            name="annualLeave"
                                            className="form-control"
                                           
                                        ></Control.text>
                                       
                                    </Col>             
                                </Row>
                                <Row className="mt-2">
                                    <Label htmlFor="overTime" md={3}>Ngày làm thêm</Label>
                                    <Col md={9}>
                                        <Control.text
                                            placeholder={props.staff.overTime}
                                            model=".overTime"
                                            id="overTime"
                                            name="overTime"
                                            className="form-control"
                                           
                                        ></Control.text>
                                       
                                    </Col> 
                                </Row>
                                <Row className="mt-2">
                                    <Col md={{ size: 3, offset: 3 }}>
                                        <Button type="submit" className="btn btn-info">
                                            Cập nhật
                                        </Button>
                                    </Col>
                                </Row>  
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
                </div>
            );
        }else {
            return <div> </div>
        }
    }
        export default StaffDetail;