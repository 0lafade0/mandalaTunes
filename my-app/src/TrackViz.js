import React from 'react';
import './TrackViz.css';
import { Card, Container, Accordion } from 'react-bootstrap';
import Spirograph from './Spirograph';

const TrackViz = ({trackObj, trackInfo, trackArtist}) => {
    console.log(trackObj.artists);
    console.log(trackInfo.key);
    return (
        <div>
        <Container className="parent-container">
            <Spirograph 
                acoust={trackInfo.acousticness} 
                dance={trackInfo.danceability} 
                duration={trackInfo.duration_ms} 
                energy={trackInfo.energy} 
                instrum={trackInfo.instrumentalness}
                key={trackInfo.key} 
                live={trackInfo.liveness} 
                loud={trackInfo.loudness} 
                mode={trackInfo.mode} 
                speech={trackInfo.speechiness} 
                tempo={trackInfo.tempo} 
                time_sig={trackInfo.time_signature} 
                valence={trackInfo.valence} />
         </Container>
        <Container>
        <Accordion style={{width: '500px'}}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{trackObj.name} <br /> {trackArtist}</Accordion.Header>
                <Accordion.Body>
                Stroke? (Yes or No): Mode <br/>
                Stroke Weight: Time Signature  <br/>
                # of Layers: Danceability<br/>
                Types of Shape: Key <br/>
                Colors: Danceability, Energy, Valence <br/>
                Transparency: Loudness 
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Pure Stats</Accordion.Header>
                <Accordion.Body>
                Acousticness: {trackInfo.acousticness} <br />
                Danceability: {trackInfo.danceability} <br />
                Duration_ms: {trackInfo.duration_ms} <br />
                Energy: {trackInfo.energy} <br />
                Instrumentalness: {trackInfo.instrumentalness} <br />
                Key: {trackInfo.key} <br />
                Liveness: {trackInfo.liveness} <br />
                Loudness: {trackInfo.loudness} <br />
                Mode: {trackInfo.mode} <br />
                Speechiness: {trackInfo.speechiness} <br />
                Tempo: {trackInfo.tempo} <br />
                Time Signature: {trackInfo.time_signature} <br />
                Valence: {trackInfo.valence} <br />
                </Accordion.Body>
            </Accordion.Item>
       </Accordion>
       </Container>
    </div>
    );
}

export default TrackViz