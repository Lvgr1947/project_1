import React, {Component} from 'react';

import "./nodue.css";

const date = new Date().getDate();
const month = new Date().getMonth()+1;
const year = new Date().getFullYear();
export default class Nodue extends Component {
    constructor(){
        super();
        this.state = {
            status: true
        };
    } 
    async componentDidMount() {
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const ID = '03';
        const API = 'https://ms86k27c2e.execute-api.ap-south-1.amazonaws.com/test1/userdetails';
        const resp = await fetch(proxyUrl+API);
        const data = await resp.json();
        const len = data.length;        
        this.setState({detail: data});
        var filesize = ""
        try {
            filesize = this.state.detail.size;
        }
        catch{
            this.state.status=false;
        }
        console.log(this.state.status)

    }
    render() {
        return (
            <div>
            {
            this.state.status?
            <div>               
                {this.state.detail?
                <form class="print"> 
                <center>               
                    <div >
                        <h2>International Institute of Information Technology, Hyderabad</h2>
                        <h3>(Deemed University) </h3>
                        <h3><u>No Dues Certificate for MSIT students</u></h3>
                    </div>
                    </center>
                    <div class="col-sm-2"></div>    
                        
                    <div class="col-sm-8" >
                    
                    <p>Mr./ Ms.  <u>{this.state.detail.FirstName} {this.state.detail.LastName}</u>, Roll No. <u>{this.state.detail.RollNumber}</u> is leaving the institution after completing/discontinuing his/her programme <u>{this.state.detail.programName}</u> w.e.f. <u>{date}/{month}/{year}</u>. 
                            The following In-charge may please give No Dues signature against their section after due verification. </p>&nbsp;
                        <p><ol>
                            <li>Systems & Networking -MSIT :</li>&nbsp;
                            <li>Soft Skills Incharge : </li>&nbsp;
                            <li>Library	:</li>&nbsp;
                            <li>Sports & Gymnasium : </li>&nbsp;
                            <li>Care Taker (Hostel) : </li>&nbsp;
                            <li>Mess :</li>&nbsp;
                            <li>Domain Specialization Mentor : </li>&nbsp;
                            <li>MSIT Coordinator : </li>&nbsp;
                            <li>MSIT Placement Officer : </li>&nbsp;
                            <li>MSIT Accounts Office : </li>&nbsp;
                            <li>Registration with Alumni Association:       Yes / No </li>&nbsp;
                            (Submit the Alumni Registration form along with this) 
                            <li>Are you willing to donate your 
                                Caution deposit to the Alumni Association :     Yes / No</li>&nbsp;
                            <li>If Yes, please indicate : 	Full : Rs. 	Part : Rs. </li>&nbsp;
                            <li>Permanent Address with Phone no : </li>&nbsp;
                            (Refund of CD amount to be sent through post) 
                        </ol></p>&nbsp;
                    
                        <p>Date of Submission: {date}/{month}/{year} </p>
                        <p> Signature of the Student: ____________________ </p>&nbsp;
                        <center><button  onClick={() => window.print()}>PRINT</button></center>&emsp;
                    </div>
                    
                    <div class="col-sm-1"></div>
                </form>:<div><center>LOADING...</center></div>
                }
            </div>:<div><center>Not found</center></div>
            }
            </div>
            
        );
    }
}