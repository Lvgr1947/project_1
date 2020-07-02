import React, {Component} from 'react';
import iiitlogo from './iiit.jpg';
import {Button} from 'react-bootstrap';
import "./transcripts.css";


const date = new Date().getDate();
const month = new Date().getMonth()+1;
const year = new Date().getFullYear();
export default class transcripts extends Component {
    constructor(){
        super();
        this.state = {
            show1: false,
            cols:[],
            rows:[],
            sems:[],
            acadyr1:[],
            acadyr2:[],
            grade:[],
            points:[],
            scale:[],
            iscompleted: false,
            status: true,
            transcript:[]
        };
    } 
    async componentDidMount() {
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const userID = '3';
        const API1 = 'https://ja4plte1we.execute-api.ap-south-1.amazonaws.com/test1/graduation';
        const resp1 = await fetch(proxyUrl+API1);
        const data = await resp1.json();
        const API2 = 'https://p4trvnmn67.execute-api.ap-south-1.amazonaws.com/test1/transcript';
        const resp2 = await fetch(proxyUrl+API2);
        const data1 = await resp2.json();   
        this.setState({transcript: data1[0]});
        // console.log(this.state.transcript)
        const len = data.length;
        if(len != 1){
            this.state.status=false;
        }
        else{
            if(data1[0].isCompleted=="true"){
                this.state.iscompleted=true
            }
            else{
                this.state.iscompleted=false
            }
        // console.log(this.state.iscompleted);
        const acad = Object.entries(data[0].enrollments.academicYear)
        for(let i = 0; i < acad.length; i++) {
            const sem = Object.entries(data[0].enrollments.academicYear[i].semesters)
            // console.log(sem[1])
            for(let j = 0; j < sem.length; j++) {
                const s = Object.entries(data[0].enrollments.academicYear[i].semesters[j])
                // console.log(s.length)
                for( let k = 0; k < s.length; k++) {
                    
                    this.state.cols.push(<td>{s[k][1].courseName}</td>)
                    this.state.cols.push(<td>{s[k][1].grade}</td>)
                    this.state.rows.push(<tr>{this.state.cols}</tr>)
                    this.state.cols=[]
                    // console.log(this.state.rows)                    
                }
                this.state.sems.push(this.state.rows);
                
                this.state.rows=[];
                
                // console.log(this.state.sems[j])
            }
            if(i==0){
                this.state.acadyr1.push(this.state.sems);
                // console.log(this.state.acadyr1)
            }
            else{
                this.state.acadyr2.push(this.state.sems);
            }
            this.state.sems=[];
            // console.log(this.state.acadyr2);
        }

    }
    const grad = Object.entries(data1[0].gradeScale);
    // console.log(grad);
    for(let p=0; p<grad.length; p++){
        this.state.scale.push(grad[p][1].grade);
        this.state.scale.push(": ");
        this.state.scale.push(grad[p][1].points);
        this.state.scale.push("      ");
        
    }
    this.state.grade.push(this.state.scale);
    // console.log(this.state.grade);
    // console.log(this.state.iscompleted);
}
    render() {        
        return (

            <div class="container">
                <form class="print">      
                    <br/>   
                    <p>{this.state.iscompleted}</p> 
                    <center><h3>International Institute of Information Technology, Hyderabad</h3></center>
                    <div class="col-sm-3 sidenav">
                        {/* <img src={iiitlogo} width="250" height="80"/> */}
                        <img src={iiitlogo} class="img-fluid" width="250" height="80" alt="Responsive image"></img>
                        <p>MSIT</p>
                        <p>Date of issue: {date}/{month}/{year}</p>
                        <p>Consolidated mark sheet</p>
                    </div>
                    <div class="col-sm-9 text-left">                   
                        <p>(Deemed University) </p>
                        <p>HYDEARABAD, INDIA</p>
                        <p>http://www.iiit.ac.in</p>
                        <div class="col-sm-8 text-left">
                        <p>NAME: {this.state.transcript.name}</p>
                        <h4><i>MASTER OF SCIENCE IN INFORMATION TECHNOLOGY</i></h4>
                        <p>CGPA: {this.state.transcript.cgpa}</p>
                        <br/>
                        <p>Credits Obtained: 108 </p>                                
                        </div>
                        <div  class="col-sm-4 text-right">
                        <p>ROLL NUMBER: {this.state.transcript.rollNumber}</p>
                        <br/><br/>
                        <p> Required credits for completion: 108</p>
                        </div>
                    </div> 
                    <div class="col-sm-3 text-left"></div>
                    <div class="col-sm-8 text-left">
                        <div>
                        <p onClick={()=>{this.setState({show1:!this.state.show1})}} block>{ this.state.show1? 'First Year Courses' : 'First Year Courses'}</p>
                            <table id="table" class="table table-bordered table-sm" cellspacing="0" width="100%">
                                <tr>
                                    <th>COURSES</th>
                                    <th>GRADES</th>
                                </tr>
                                <tbody>
                                    {this.state.acadyr1}
                                </tbody>
                            </table>
                        </div>                        
                    </div> 
                    
                    <div class="col-sm-3 text-left"></div>
                    <div class="col-sm-8 text-left">                   
                        <div>
                        <p onClick={()=>{this.setState({show1:!this.state.show1})}} block>{ this.state.show1? 'Second Year Courses' : 'Second Year Courses'}</p>
                        
                            <table id="table" class="table table-bordered table-sm" cellspacing="0" width="100%">
                                <tr>
                                    <th>COURSES</th>
                                    <th>GRADES</th>
                                </tr>
                            <tbody>
                            {this.state.acadyr2}
                            </tbody>
                            </table>
                        </div>                           
                    </div> 
                    <div class="col-sm-3 text-left"></div>
                    <div class="col-sm-8 text-left">
                        <p>CGPA Cumilative Grade Point Average</p>                                
                        <p>{this.state.grade}</p>
                        <br/>
                    </div>
                    <div class="col-sm-1 text-left"></div>
                    <div class="col-sm-11 text-left">  
                    <center><Button disabled={!this.state.iscompleted} onClick={() => window.print()}>{this.state.iscompleted==null?'View your courses':this.state.iscompleted? 'PRINT' : 'Loading...'}</Button>
                    </center></div>
                    <br/>
                </form>            
            </div>            
        );
    }
}