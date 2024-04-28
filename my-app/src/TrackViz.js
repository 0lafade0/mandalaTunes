import React from 'react';
import './TrackViz.css';
import { Card, //Accordion 
            } from 'react-bootstrap';
import Spirograph from './Spirograph';
import { List, ListItem, ListItemAvatar, Avatar, Container, ListItemText, IconButton, 
        Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const TrackViz = ({trackObj, trackInfo, trackArtist, trackImg}) => {
    console.log(trackObj.artists);
    console.log("THIS IS THE SONG'S KEY." + trackInfo.key);

    let modeType; // reformat it so that all this stuff is word slotting instead of senteces
    let strokeType;
    if (trackInfo.mode == 0) { //0 = minor, 1 = major
        modeType = 'This song is minor, so it has no stroke.';
    } else {
        modeType = 'This song is major, so it has stroke.';
    }

    return (
        <div className='vizSpace'>
        <div className="parent-container">
        <Container >
            <Spirograph 
                track={trackInfo}
                //why cant i get rid of you. bitch
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
            <ListItem secondaryAction={
                    <IconButton edge="end" aria-label="play" size="large">
                      <PlayCircleOutlineIcon fontSize="large" />
                    </IconButton>
                  }>
                <ListItemAvatar>
                <Avatar sx={{ width: 56, height: 56 }} alt="Song Album Image" variant="rounded" src={trackImg} />
                </ListItemAvatar>
                <ListItemText >
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
        <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header">
            <Typography>What am I looking at?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
                {modeType} <br/>
                Stroke Weight: Time Signature  <br/>
                # of Layers: Danceability<br/>
                Types of Shape: Key <br/>
                Colors: Danceability, Energy, Valence <br/>
                Transparency: Loudness 
          </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{width: '400px'}}>
        <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header">
            <Typography>Pure Stats (for those familiar with Spotify API)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
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
          </Typography>
          </AccordionDetails>
        </Accordion>
            {/* <Accordion.Item eventKey="0">
                <Accordion.Header>What am I looking at?</Accordion.Header>
                <Accordion.Body>
                {modeType} <br/>
                Stroke Weight: Time Signature  <br/>
                # of Layers: Danceability<br/>
                Types of Shape: Key <br/>
                Colors: Danceability, Energy, Valence <br/>
                Transparency: Loudness 
                </Accordion.Body>
            </Accordion.Item> */}
            {/* <Accordion.Item eventKey="1">
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
       </Accordion> */}
  </Container>
  </div>
    );
}

export default TrackViz