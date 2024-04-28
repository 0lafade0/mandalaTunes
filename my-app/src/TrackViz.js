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

    function scale (number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    function percentage (number) {
        return Math.floor(number * 100);
    }

    let modeType, strokeType, keyType, sideCount, layerCount, dancePerc, 
        timeType, strokeWTypeNum, strokeWType, bLoudPerc;
    
    bLoudPerc = Math.round(scale(trackInfo.loudness,-60,0,0,100));
    dancePerc = percentage(trackInfo.danceability);
    layerCount = Math.round(scale(trackInfo.danceability,0,1,3,30));
    sideCount = Math.round(scale(trackInfo.key,-1,11,8,30));
    strokeWTypeNum = Math.round(scale(trackInfo.time_sig,3,7,1,5));

    if (trackInfo.mode == 0) { //0 = minor, 1 = major
        modeType = 'minor';
        strokeType = 'no stroke';
        strokeWType = '';
    } else {
        modeType = 'major';
        strokeType = "a stroke.";
        strokeWType = '';
    }

    if (trackInfo.key == 0) {
        keyType = 'C';
        } else if (trackInfo.key == 1) {
            keyType = 'C♯/D♭';
        } else if (trackInfo.key == 2) {
            keyType = 'D';
        } else if (trackInfo.key == 3) {
            keyType = 'D♯/E♭';
        } else if (trackInfo.key == 4) {
            keyType = 'E';
        } else if (trackInfo.key == 5) {
            keyType = 'F';
        } else if (trackInfo.key == 6) {
            keyType = 'F♯/G♭';
        } else if (trackInfo.key == 7) {
            keyType = 'G';
        } else if (trackInfo.key == 8) {
            keyType = 'G♯/A♭';
        } else if (trackInfo.key == 9) {
            keyType = 'A';
        } else if (trackInfo.key == 10) {
            keyType = 'A♯/B♭';
        } else if (trackInfo.key == 11) {
            keyType = 'B';
        } else if (trackInfo.key == -1) {
            keyType = "Spotify doesn't know :(";
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
                This song... <br/>
                is {modeType}, so it has {strokeType} <br/>
                {/* {trackInfo.mode == 1 ? <p>is in {timeType}/4, so the stroke is {strokeWType}px thick. </p> : <></>} */}
                Stroke Weight: Time Signature  <br/>
                {/* maybe we just plain text the stroke weight? i dont think people care to much here :/, 
                like stroke weight, if there's a stroke, is based on time signature, the higher the time sig the thicker the stroke  */}
                has {dancePerc}% danceability, so it has {layerCount} layers.<br/>
                is in the key of {keyType}, so it has {sideCount} 'sides'. like spokes on a wheel!<br/> 
                Colors: Danceability, Energy, Valence (to add to! album ver)<br/>
                is {bLoudPerc}% loud , the higher the loudeness, the higher the opacity
          </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{width: '400px'}}>
        <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header">
            <Typography>Where are you getting these numbers from?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
                this is where we will explain stuff about the conversion process < br/>
                we take qualities from spotify AI adn convert them into parameters!
                generations are non deterministic, but still follow a guide set by the chosen song!
                little bits of randomess in there you know the vibe.
          </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{width: '400px'}}>
        <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel3-content"
            id="panel3-header">
            <Typography>Pure Stats (for those familiar with Spotify API)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
                the scale for each quality is in [brackets] <br />
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