import React from 'react';
import {
    Card, CardTitle, CardImg, CardText,  Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from "reactstrap";
import dateFormat from 'dateformat';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Control, LocalForm, } from "react-redux-form";


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

    // -----Staffdetail
    const StaffDetail = (props) =>{

        const [doB, setdoB] = useState(props.staff.doB);
        const [startDate, setstartDate] = useState(props.staff.startDate);

        const [modalOpen, setModalOpen] = useState(false);
        const [modalDeleOpen, setModalDeleOpen] = useState(false);

        // handle update info staff
        const handleSubmit =(values) =>{
            setModalOpen(!modalOpen);
            const id = props.staff.id ;
            const dataUpdate = {
                id: id,
                name: values.name,
                doB: doB,
                startDate: startDate,
                salaryScale: values.salaryScale,
                departmentId: values.department,
                annualLeave: values.annualLeave,
                overTime: values.overTime,
            };
            console.log(dataUpdate);
        return props.updateStaff(dataUpdate, id);
        }

        // handle delete function
        const handleDelete =() =>{
            setModalDeleOpen(!modalDeleOpen)
            props.deleteStaff(props.staff.id);
        }

        // handele cancel delete
        const handleCancel =() => {
            setModalDeleOpen(!modalDeleOpen)
        }

    // render component
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
                        <Button onClick={() => setModalOpen(!modalOpen)}>Cập nhật thông tin </Button>
                        <Button className='ms-2' onClick={() => setModalDeleOpen(!modalDeleOpen)}>Xóa</Button>
                    </div>
                </div>
                {/*  Modal update */}
                <div className="row">
                    <Modal isOpen={modalOpen}
                            toggle={(modalOpen) => setModalOpen(!modalOpen)}
                    >
                        <ModalHeader>Cập nhật thông tin nhân viên</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => handleSubmit(values)}>
                                <Row className="mt-2">
                                    <Label htmlFor="name" md={3}>Tên</Label>
                                    <Col md={9}>
                                        <Control.text 
                                            defaultValue={props.staff.name}
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
                                        defaultValue={props.staff.doB}
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
                                            defaultValue={props.staff.startDate}
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
                                            defaultValue={props.staff.salaryScale}
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
                                            defaultValue={props.staff.annualLeave}
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
                                            defaultValue={props.staff.overTime}
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
                {/*  Modal dele */}
                <div className='row'>
                    <Modal isOpen={modalDeleOpen}
                            toggle={(modalDeleOpen) => setModalDeleOpen(!modalDeleOpen)}
                            className="w-25 h-25 position-absolute top-50 start-50 translate-middle"
                    >
                        <ModalBody>
                            <Row>
                                <Col md={12} >
                                <p className='m-auto p-4'><strong>Bạn chắc chắn muốn xóa?</strong></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                               <Link to="/menu">
                                <Button onClick={() => handleDelete()} className='w-100 btn btn-info'>Yes</Button>
                                </Link>
                                </Col>
                                <Col md={6}>
                                <Button  onClick={() => handleCancel()} className='w-100 btn btn-info'>No</Button>
                                </Col>
                            </Row>
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