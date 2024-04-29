import React from 'react';
import './TrackViz.css';
import { Card, //Accordion 
            } from 'react-bootstrap';
import Spirograph from './Spirograph';
import { List, ListItem, ListItemAvatar, Avatar, Container, ListItemText, IconButton, 
        Accordion, AccordionSummary, AccordionDetails, Typography, Tooltip} from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TrackLabel from './TrackLabel';

const TrackViz = ({trackObj, trackInfo, trackArtist, trackImg}) => {

    if (!trackObj) {
        return <div>No track selected</div>;
    }

    console.log(trackObj.artists);
    console.log("THIS IS THE SONG'S KEY." + trackInfo.key);

    function scale (number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    function percentage (number) {
        return Math.floor(number * 100);
    }

    let modeType, strokeType, keyType, sideCount, layerCount, dancePerc, 
        timeType, strokeWTypeNum, strokeWType, bAcoustPerc, enerPerc, valPerc;
    
    bAcoustPerc = Math.round(scale(trackInfo.acousticness,0,1,0,100));
    dancePerc = percentage(trackInfo.danceability);
    layerCount = Math.round(scale(trackInfo.danceability,0,1,3,30));
    sideCount = Math.round(scale(trackInfo.key,-1,11,8,30));
    strokeWTypeNum = Math.round(scale(trackInfo.time_sig,3,7,1,5));
    enerPerc = percentage(trackInfo.energy);
    valPerc = percentage(trackInfo.valence);

    if (trackInfo.mode == 0) { //0 = minor, 1 = major
        modeType = 'minor';
        strokeType = 'no stroke.';
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
                disSize={500}
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
        {/* <List>
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
        </List> */}
        <TrackLabel trackObj={trackObj} trackArtist={trackArtist} trackImg={trackImg}/>
        
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
          <Typography align='left'>
            <b>This song... </b>
            <ul className='dataList'>
                <li> is {' '}
                    <Tooltip title="Refering to two different types of scales/chords. 
                                    Major scales/chords often sound bright and happy, 
                                    while minor scales/chords usually sound more somber or sad.">
                        <span style={{ textDecoration: 'underline', textDecorationStyle:'dotted', cursor: 'pointer' }}> {modeType}</span>
                    </Tooltip>, so it has {strokeType} </li>
                {/* {trackInfo.mode == 1 ? <p>is in {timeType}/4, so the stroke is {strokeWType}px thick. </p> : <></>} */}
                {/* maybe we just plain text the stroke weight? i dont think people care to much here :/, 
                like stroke weight, if there's a stroke, is based on time signature, the higher the time sig the thicker the stroke  */}
                <li> is in {trackInfo.time_signature}/4, which correlates to stroke thickness (if major). </li>
                <li> is in the key of {keyType}, so it has {sideCount} {' '}
                    <Tooltip title="Think of it like a wheel. The number of spokes the wheel has is what this number visualizes!">
                        <span style={{ textDecoration: 'underline', textDecorationStyle:'dotted', cursor: 'pointer' }}>'sides'</span>
                    </Tooltip>.</li> 
                <li> has {dancePerc}%{' '}
                    <Tooltip title="How suitable a track is for dancing based on a 
                                    combination of tempo, 
                                    rhythm stability, beat strength, and overall regularity.">
                        <span style={{ textDecoration: 'underline', textDecorationStyle:'dotted', cursor: 'pointer' }}>danceability</span>
                    </Tooltip>, so it has {layerCount} layers. it also controls{' '}
                    <Tooltip title="The higher the danceability, the further along the rainbow it is. Roy G Biv style!">
                        <span style={{ textDecoration: 'underline', textDecorationStyle:'dotted', cursor: 'pointer' }}>hue</span>
                    </Tooltip>! </li>
                <li> has {enerPerc}%{' '}
                    <Tooltip title="Represents a perceptual measure of intensity and activity. 
                                    Typically, energetic tracks feel fast, loud, and noisy.">
                        <span style={{ textDecoration: 'underline', textDecorationStyle:'dotted', cursor: 'pointer' }}>energy</span>
                    </Tooltip>{', '}which corresponds to{' '}
                    <Tooltip title="Intesity of a color/hue. Higher energy = high saturation.">
                        <span style={{ textDecoration: 'underline', textDecorationStyle:'dotted', cursor: 'pointer' }}>saturation</span>
                    </Tooltip>.</li>
                <li> has {valPerc}%{' '}
                    <Tooltip title="The musical 'positiveness' conveyed by a track. Tracks with high valence sound more positive 
                                    , while tracks with low valence sound more negative.">
                        <span style={{ textDecoration: 'underline', textDecorationStyle:'dotted', cursor: 'pointer' }}>valence</span>
                    </Tooltip>{', '}which corresponds to{' '}
                    <Tooltip title="How bright (non-dark) a color/hue is. Higher valence = higher brightness.">
                        <span style={{ textDecoration: 'underline', textDecorationStyle:'dotted', cursor: 'pointer' }}>brightness</span>
                    </Tooltip>.</li>
                <li> has {bAcoustPerc}%{' '}
                    <Tooltip title="A confidence measure of whether the track is acoustic. The higher the acousticness, the higher the translucency.">
                        <span style={{ textDecoration: 'underline', textDecorationStyle:'dotted', cursor: 'pointer' }}>acousticness</span>
                    </Tooltip>, which corresponds to translucency.</li>
            </ul>
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
  </Container>
  </div>
    );
}

export default TrackViz