import React, {Component} from 'react';

import {Button} from 'react-bootstrap';

export default class Course extends Component {
    constructor(){
        super();
        this.state = {
            show1:false,
            show2:false,
            cols:[],
            rows:[],
            sems:[],
            acadyr1:[],
            acadyr2:[],
            iscompleted: null,
            sayHello : this.sayHello.bind(this),
            status: true
        };
    } 
    sayHello() {
        alert('Applied!');
      }

    async componentDidMount() {
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const userID = "3";
        const API = 'https://ja4plte1we.execute-api.ap-south-1.amazonaws.com/test1/graduation?UserID=';
        const resp = await fetch(proxyUrl+API+userID);
        const data = await resp.json();
        const len = data.length;
        if(len != 1){
            this.state.status=false;
        }
        else{
        // this.setState({iscompleted:data[0].isCompleted});
            if(data[0].isCompleted=="true"){
                this.state.iscompleted=true
            }
            else{
                this.state.iscompleted=false
            }
    
        // console.log(this.state.iscompleted)     
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
                    this.state.cols.push(<td>{s[k][1].status}</td>)
                    this.state.rows.push(<tr>{this.state.cols}</tr>)
                    this.state.cols=[]
                    // console.log(this.state.rows)                    
                }
                this.state.sems.push(<tr><th colspan="3">Semester{j+1}</th></tr>)
                this.state.sems.push(this.state.rows);
                
                this.state.rows=[];
                
                // console.log(this.state.sems[j])
            }
            if(i==0){
                this.state.acadyr1.push(this.state.sems);
            }
            else{
                this.state.acadyr2.push(this.state.sems);
            }
            this.state.sems=[];
            
        }
    }
        
    }    
        render(){                  
            return (            
                <div className="App">
                {
                this.state.status? 
                <header className="App-header">
                
                <div class="container-fluid"> 
                
                <Button onClick={()=>{this.setState({show1:!this.state.show1})}} block>{ this.state.show1? 'First Year Courses' : 'First Year Courses'}</Button>
                    <div id="row">
                        {
                            this.state.show1? 
                            <div>
                                <div>
                                    <table id="table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>COURSES</th>
                                            <th>GRADES</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.acadyr1}
                                    </tbody>
                                    </table>
                                </div>                          
                            </div>
                            : null
                        }                  
                    </div><br></br>
                <Button  size="lg" onClick={()=>{this.setState({show2:!this.state.show2})}} block>{ this.state.show2? 'Second Year Courses' : 'Second Year Courses'}</Button>
                    <div id="row">
                        {
                            this.state.show2? 
                            <div>
                                <div>
                                    <table id="table" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>COURSES</th>
                                            <th>GRADES</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {this.state.acadyr2} 
                                    </tbody>
                                    </table>
                                </div>
                            </div> 
                          : null
                        }                  
                    </div>
                    
                    </div>
                    
                    <br></br>
                    <center><Button variant = "secondary" size="large" disabled={!this.state.iscompleted} onClick={this.sayHello}>{this.state.iscompleted==null?'View your courses':this.state.iscompleted? 'APPLY' : 'You did not complete all the courses, please verify with your mentors'}</Button></center>
                    <br></br>
                    
                </header>  
                :<div><h1><center> No User Found</center></h1></div>}              
              </div>
            );
            
        }

}
    
