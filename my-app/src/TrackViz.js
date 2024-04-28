import React from 'react';
import './TrackViz.css';
import { Card, Accordion } from 'react-bootstrap';
import Spirograph from './Spirograph';
import { List, ListItem, ListItemAvatar, Avatar, Container, ListItemText, ListItemButton } from '@mui/material'


const TrackViz = ({trackObj, trackInfo, trackArtist, trackImg}) => {
    console.log(trackObj.artists);
    console.log("THIS IS THE SONG'S KEY." + trackInfo.key);
    return (
        <div className='vizSpace'>
        <div className="parent-container">
        <Container >
            <Spirograph 
                track={trackInfo}
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
                valence={trackInfo.valence} 
            />
         </Container>
        <Container>
            {/* for sake of something to commit */}
        <List>
            <ListItem>
                <ListItemAvatar>
                <Avatar sx={{ width: 56, height: 56 }} alt="Song Album Image" variant="rounded" src={trackImg} />
                </ListItemAvatar>
                <ListItemText>
                <div className="ms-2 me-auto">
                <div className="fw-bold">{trackObj.name}</div>
                {trackArtist}
              </div>
                </ListItemText>
            </ListItem>
        </List>
        
       </Container>
    </div>
    <Container disableGutters="true" sx={{ mr: '24px', width: '400px'}}>
    <Card>
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
    </Card.Body>
    </Card>
    <Accordion style={{width: '400px'}}>
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