import React, { Component } from 'react';
import {Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

import {Link} from 'react-router-dom';
import msitlogo from './msitlogo.png';
import './customNavbar.css';

const bar = {backgroundColor: '#001340'};

const text = {color: 'white'};

export default class customNavbar extends Component {
    render() {
        return (
            <div style={bar} class="no-print">
                <ul class="topnav">
                    <li>
                        <Navbar href="/">
                            <img src={msitlogo} width="250" height="40" class="logo-img" className="d-inline-block"/>
                        </Navbar>
                    </li>
                    <li class="right"><Nav.Link href="/">Logout</Nav.Link></li>
                    <li class="right">
                    <NavDropdown title="Graduation" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/course">Course Completion Certificate</NavDropdown.Item>
                        <NavDropdown.Item href="/nodue">No-due Form</NavDropdown.Item>
                        <NavDropdown.Item href="/transcripts">Transcripts</NavDropdown.Item>
                    </NavDropdown>                                
                    </li>
                    <li class="right">
                    <NavDropdown title="Grades" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/">Grading</NavDropdown.Item>
                    <NavDropdown.Item href="/">Review Grade</NavDropdown.Item>
                    <NavDropdown.Item href="/">Something</NavDropdown.Item>
                    </NavDropdown>
                    </li>
                    <li class = "right"><Nav.Link href="/">Grading Policy</Nav.Link></li>
                    <li class ="right">
                    <NavDropdown title="Onboarding" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/">Invite Students</NavDropdown.Item>
                    <NavDropdown.Item href="/">Invite Mentors</NavDropdown.Item>
                    </NavDropdown>
                    </li>
                    <li class="right">
                        <Nav.Link href="/"><button class="btn"><i class="fa fa-home"></i></button></Nav.Link>
                    </li>
                </ul>

            
            </div>
        
        );
    }
}