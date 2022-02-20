import React, {Component} from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse} from "reactstrap";
import {NavLink} from "react-router-dom";
class Header extends Component{
    render(){
        return (
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <Nav navbar>
                            <NavbarBrand className="mr-auto" href="/" >
                                <img src="asset/images/logo.png" height="30" width="41" alt="Resibon" />
                            </NavbarBrand>
                            <NavItem>
                                <NavLink className="nav-link" to="/staff" >
                                    <span className="fa fa-address-book-o fa-lg"></span> Nhân Viên
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/department" >
                                    <span className="fa fa-university fa-lg"></span> Phòng Ban
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to="/salary" >
                                    <span className="fa fa-cc fa-lg"></span> Bảng Lương
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar>
            </>
        )
    }
}
export default Header;