import React, { useState } from "react";
import {
  Card, CardImg, CardText, Input, Button,
} from "reactstrap";
import { Link } from "react-router-dom";


const StaffList = ({ staffs }) => {
  // set state for name & search for search function
  const [Name, setName] = useState(null);
  const [SEARCH, setSEARCH] = useState(null);

  // render staff list
  const STAFFS = staffs.map((staff) => {
    return (
      <Link
        to={`/staff/${staff.id}`}
        className="col col-6 col-md-4 col-lg-2 text-dark mb-2"
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
          <Link
            to={`/staff/${staff.id}`}
            className="col col-6 col-md-4 col-lg-2 text-dark mb-2"
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
      });
    setSEARCH(dataSearch);
    Name.value = "";
  };
  // return function
  return (
    <div className="container">
      <div className="row mb-1">
      <h3 className="col-10 col-md-4 mt-1 pb-1 text-dark">Nhân viên</h3>
      <Button
            dark
            className="col-2 col-md-1 mt-1 "
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
      <div className="row">
        {SEARCH === null
          ? STAFFS
          : SEARCH.length == 0
          ? "Không tìm thấy nhân viên nào"
          : SEARCH}
      </div>
    </div>
  );
};

export default StaffList;