import React, {useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import { AppData } from './AppData';
import useFetch from './Hooks.js';
import LoadingIndicator from './LoadingIndicator.js';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import './Department.css'

export function ObjectListItem(props) {
    let url = `/object/${props.id}`
    const [data, loading] = useFetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.id}`
    );
    if (loading){return ''}

    let image = data.primaryImageSmall
    let title = data.title
    let artist = data.artistDisplayName


    return (
        <div className="object_card">
            {image ? <Image src={image} thumbnail /> : <div id="no_image">"No Image "</div>}
            <Link to={url}>{title} <br/> by {artist ? artist: "Unknown Artist"}</Link>
        </div>
    );
}

export function ObjectsList(props) {
    let { id } = useParams();
    const [data, loading] = useFetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${props.department.departmentId}`
    );
    
    if (loading){
        return<LoadingIndicator/>
    }
    
    let objects = data.objectIDs.slice(0,50);
    
    const object_list = objects.map((object) => 
        <ObjectListItem key={object} id={object} department={props.department} />
    );   
  

    return (
    <div id="objects_list">
            {object_list}
    </div>
    );
}

export default function Department(props) {
    let { id } = useParams();
    const [data, loading] = useFetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/departments`
    );
    
    if (loading){
        return<LoadingIndicator/>
    }

    if (id === undefined) {
        return "Oops"
    }
    
    let department = data.departments.find(department => department.departmentId == id)
    console.log(department)
    return (
        <Container>
            <div id="department">
                <h3>{department.displayName}</h3>
                <ObjectsList department={department}/>
            </div>   
        </Container>
    );
}
