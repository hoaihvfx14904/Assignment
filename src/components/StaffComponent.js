import React, { useState } from "react";
import {
  Card, CardImg, CardText,  Button, Modal, ModalHeader, ModalBody, Label, Row, Col} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";

const required = (value) => value && value.length > 0 ;
const maxlength = (len) => (value) => !(value) || (value.length <= len);
const isNumber = (value) => !(value) ||!isNaN(Number(value));

//-- Stafflist
const StaffList = ({ staffs , postStaff, isLoading, err}) => {

  // set state
  const [Name, setName] = useState(null);
  const [SEARCH, setSEARCH] = useState(null);
  const [doB, setdoB] = useState('');
  const [startDate, setstartDate] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
 // loading
 const LOADING = <Loading />
 const ERR = {err}; 
 
  // render staff list
  const STAFFS = staffs.map((staff) => {
    if(staff.length === 0){
      return <div></div>
    } else {
    return (
      <Link
        to={`/staffs/${staff.id}`}
        className="col-6 col-md-4 col-lg-2 text-dark mb-2"
        style={{ textDecoration: "none" }}
      >
        <div key={staff.id}>
          <Card tag="li" className="mt-2 p-1">
            <CardImg src={staff.image}></CardImg>
            <CardText>{staff.name}</CardText>
          </Card>
        </div>
      </Link>
    );
    }
  });
  
  // render search by name results
  const handleSearch = (event, Name) => {
    event.preventDefault();
    const name = Name.value;
    const dataSearch = staffs
      .filter((staff) => {
        if (name === "") {
          return staff;
        } else if (staff.name.toLowerCase().includes(name.toLowerCase())) {
          return staff;
        }
      })
      .map((staff) => {
        return ( 
            <div key={staff.id} className='col-6 col-md-4 col-lg-2 text-dark mb-2'>
              <Card tag="li" className="mt-2 p-1">
                <CardImg src={staff.image}></CardImg>
                <CardText>{staff.name}</CardText>
              </Card>
            </div>
        );
      });
    setSEARCH(dataSearch);
    Name.value = "";
  };

  // submit add staff
  const handleSubmit =(values) =>{
    const newStaff = {
        id: staffs.length,
        name: values.name,
        doB: doB,
        salaryScale: values.salaryScale,
        startDate: startDate,
        departmentId: values.department,
        annualLeave: values.annualLeave,
        overTime: values.overTime,
        image: "/asset/images/alberto.png",
      };
      setModalOpen(!modalOpen);
      postStaff(newStaff);
  };

  // return function stafflist
  return (
    <div className="container">
      <div className="row mb-1">
      <h3 className="col-10 col-md-4 mt-1 pb-1 text-dark">Nhân viên</h3>
      <Button
            dark
            className="col-2 col-md-1 mt-1 "
            onClick={() => setModalOpen(!modalOpen)}
             style={{background:"grey"}} 
          >
          <span className="fa fa-plus-square fa-lg"></span>
       </Button>
        <div className="col-10 col-md-5">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nhập tên nhân viên"
              ref={(input) => {
                return setName(input);
              }}
              className="form-control pb-3 mt-1"
            ></input>          
        </div>
          <Button
              type="submit"
              onClick={(event) => handleSearch(event, Name)}
              className="col-2 col-md-2 btn btn-info mt-1"
            >
              Tìm
            </Button> 
      </div>
      <hr></hr>
      <div className="row">   {/* Điều kiện render */}
        {SEARCH === null
          ? isLoading ? LOADING: err ? ERR : STAFFS
          : SEARCH.length == 0
          ? "Không tìm thấy nhân viên nào"
          : SEARCH}
      </div>
     {/*  Modal add staff */}
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
                                model=".name"
                                id="name"
                                name="name"
                                className="form-control" 
                                validators={{required, maxLength : maxlength(15)}}
                                ></Control.text>
                                <Errors 
                                model=".name"
                                show={(field) => field.touched && !field.focus}
                                messages={{
                                    required : " Không được để trống",
                                    maxLength: "Không được dài quá 15 ký tự"
                                }}
                                className="text-danger"
                                ></Errors>
                          </Col>
                      </Row>
                      <Row className="mt-2">
                          <Label md={3} htmlFor="doB">Ngày sinh</Label>
                          <Col md={9}>
                            <Control.text
                               type="date"
                               model=".doB"
                               id="doB"
                               name="doB"
                               value={doB}
                               onChange={(event) =>setdoB(event.target.value)}
                               className="form-control"
                               validators={{required}}
                               ></Control.text>
                               <Errors
                                model=".doB"
                                show={(field) => field.touched && !field.focus}
                                messages={{
                                required: "Yêu cầu nhập.",
                                }}
                                className="text-danger"
                                ></Errors>
                          </Col>
                      </Row>
                      <Row className="mt-2">
                          <Label htmlFor="startDate" md={3}>Ngày bắt đầu</Label>
                          <Col md={9}>
                            <Control.text
                                model=".startDate"
                                type="date"
                                id="startDate"
                                name="startDate"
                                className="form-control"
                                value={startDate}
                                onChange={(event) => setstartDate(event.target.value)}
                                validators={{required}}
                            ></Control.text>
                            <Errors
                                model=".startDate"
                                show={(field) => field.touched && !field.focus}
                                messages={{
                                required: "Yêu cầu nhập.",
                                }}
                                className="text-danger"
                            ></Errors>
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
                                defaultValue="IT"
                            >
                            <option>Sale</option>
                            <option>HR</option>
                            <option>Marketing</option>
                            <option>IT</option>
                            <option>Finance</option>
                            </Control.select>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Label htmlFor="salaryScale" md={3}>Hệ số lương</Label>
                        <Col md={9}>
                            <Control.text
                                model=".salaryScale"
                                id="salaryScale"
                                name="salaryScale"
                                className="form-control"
                                validators={{ required, isNumber }}
                            ></Control.text>
                            <Errors
                                model=".salaryScale"
                                show={(field) => field.touched && !field.focus}
                                messages={{
                                required: "Yêu cầu nhập.",
                                isNumber: "Hãy nhập số.",
                                }}
                                className="text-danger"
                            ></Errors>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Label htmlFor="annualLeave" md={3}>Ngày nghỉ còn lại</Label>
                        <Col md={9}>
                            <Control.text
                                model=".annualLeave"
                                id="annualLeave"
                                name="annualLeave"
                                className="form-control"
                                validators={{required, isNumber}}
                            ></Control.text>
                            <Errors
                                model=".annualLeave"
                                show={(field) => field.touched && !field.focus}
                                messages={{
                                required: "Yêu cầu nhập.",
                                isNumber: "Hãy nhập số.",
                                }}
                                className="text-danger"
                            ></Errors>
                        </Col>             
                      </Row>
                      <Row className="mt-2">
                          <Label htmlFor="overTime" md={3}>Ngày làm thêm</Label>
                          <Col md={9}>
                            <Control.text
                                model=".overTime"
                                id="overTime"
                                name="overTime"
                                className="form-control"
                                validators={{required, isNumber}}
                            ></Control.text>
                            <Errors
                                model=".overTime"
                                show={(field) => field.touched && !field.focus}
                                messages={{
                                required: "Yêu cầu nhập.",
                                isNumber: "Hãy nhập số.",
                                }}
                                className="text-danger"
                            ></Errors>
                        </Col> 
                    </Row>
                    <Row className="mt-2">
                        <Col md={{ size: 3, offset: 3 }}>
                            <Button type="submit" className="btn btn-info">
                                Thêm
                            </Button>
                        </Col>
                    </Row>  
                  </LocalForm>
              </ModalBody>
          </Modal>
      </div>
    </div>
  );
};

export default StaffList;