import React, {Component} from 'react';
import  { Link } from 'react-router-dom';
import {  Jumbotron, Row, Col, Image, Button} from 'react-bootstrap';
import './Home.css';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    <h2>Welcome to Students Dashboard</h2>
                    <br></br>
                    <center>               
                    <Link to="/course">
                        <Button bsStyle="primary">Students dashboard</Button>&emsp;
                    </Link>
                    </center>
                </Jumbotron>]
            </div>
        );
    }
}