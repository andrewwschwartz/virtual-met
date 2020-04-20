import React from 'react';
import { useParams } from "react-router-dom";
import useFetch from './Hooks.js';
import LoadingIndicator from './LoadingIndicator.js';

//Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import './Object.css';

export default function ObjectDisplay() {
    let { id } = useParams();
    const [data, loading] = useFetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    );
    console.log(data)
    
    if (loading){
        return<LoadingIndicator/>
    }
    console.log(data)
    let image = data.primaryImage


    let object = JSON.stringify(data)
    return (
        <Container>
            <div className="object_content">
                {image ? (
                <img id="primary_image" src={image} width={"500px"}></img>
                ) : (<h3>No Image Found</h3>)}
            <h4>{data.title}</h4>
            <h5>by {data.artistDisplayName ? (data.artistDisplayName) : ("Artist Unknown")}</h5>
            <p>More info about this object found <a href={data.objectURL} target="_blank">here</a></p>
            </div>
        </Container>
    );
}
