import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Link,
    useParams
  } from "react-router-dom";
import { AppData } from './AppData';
import useFetch  from "./Hooks.js"
import LoadingIndicator from './LoadingIndicator.js'

//Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

//css
import './Home.css'

//helper functions
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

export function Department(props) {
    let department = props.department;
    let name = department.displayName;
    let id = department.departmentId;
    let url = `/department/${id}`;


    return (
        <Link to={url}>
        <li>
            {name}
        </li>
        </Link>
    );
}

export function DepartmentsList(props) {
  const [data, loading] = useFetch(
    "https://collectionapi.metmuseum.org/public/collection/v1/departments"
  );
    
    if (loading){
      return <LoadingIndicator/>
    }

    const department_list = data.departments.map((department) => 
        <Department key={department.departmentId} department={department} />
    );    

    return(
        <div id="department_list">
          <ul>
            {department_list}
          </ul>
        </div>
    );

}

export default function Home() {
    //NEEDS WORK: get the actual total amount of objects when first loading the app.
    let randomIntUrl = `/object/${getRandomInt(474439)}`
    return (
        <Container id="content" fluid>
        <Row>
          <Col></Col>
          <Col xs="6">
            <h3>Departments</h3>
            <DepartmentsList />
          </Col>
          <Col></Col>
        </Row>
        <br/>
        <Row>
            <Col></Col>
            <Col xs="6">
            <Button href={randomIntUrl} size="lg" variant="secondary" block>
              See Random Piece!
            </Button>
            </Col>
            <Col></Col>
        </Row>
      </Container>
    )
}