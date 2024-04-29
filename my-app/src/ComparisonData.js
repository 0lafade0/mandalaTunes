import React from 'react';
import './ComparisonData.css';
import { List, ListItem, ListItemAvatar, Avatar, Container, ListItemText, IconButton, 
    Accordion, AccordionSummary, AccordionDetails, Typography, Tooltip} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const ComparisonData = ({trackObj1, trackInfo1, trackObj2, trackInfo2}) => {

    let modeType1, strokeType1, keyType1, sideCount1, layerCount1, dancePerc1, 
        timeType1, strokeWTypeNum1, strokeWType1, acoustPerc1, enerPerc1, valPerc1,
        modeType2, strokeType2, keyType2, sideCount2, layerCount2, dancePerc2, 
        timeType2, strokeWTypeNum2, strokeWType2, acoustPerc2, enerPerc2, valPerc2,
        song1name, song2name,
        compDance, compLayers, compAcoust, compEnergy, compVal, compKey, compSides, compStroke, compTime;

        //for comp mode, just like vs unlike

    function scale (number, inMin, inMax, outMin, outMax) {
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    function percentage (number) {
        return Math.floor(number * 100);
    }
    
    song1name = trackObj1.name;
    song2name = trackObj2.name;

    //SONG 1
    acoustPerc1 = Math.round(scale(trackInfo1.acousticness,0,1,0,100));
    dancePerc1 = percentage(trackInfo1.danceability);
    layerCount1 = Math.round(scale(trackInfo1.danceability,0,1,3,30));
    sideCount1 = Math.round(scale(trackInfo1.key,-1,11,8,30));
    strokeWTypeNum1 = Math.round(scale(trackInfo1.time_signature,3,7,1,5));
    enerPerc1 = percentage(trackInfo1.energy);
    valPerc1 = percentage(trackInfo1.valence);

    //SONG 1
    acoustPerc2 = Math.round(scale(trackInfo2.acousticness,0,1,0,100));
    dancePerc2 = percentage(trackInfo2.danceability);
    layerCount2 = Math.round(scale(trackInfo2.danceability,0,1,3,30));
    sideCount2 = Math.round(scale(trackInfo2.key,-1,11,8,30));
    strokeWTypeNum2 = Math.round(scale(trackInfo2.time_signature,3,7,1,5));
    enerPerc2 = percentage(trackInfo2.energy);
    valPerc2 = percentage(trackInfo2.valence);


    if (trackInfo1.key == 0) {
        keyType1 = 'C';
        } else if (trackInfo1.key == 1) {
            keyType1 = 'C♯/D♭';
        } else if (trackInfo1.key == 2) {
            keyType1 = 'D';
        } else if (trackInfo1.key == 3) {
            keyType1 = 'D♯/E♭';
        } else if (trackInfo1.key == 4) {
            keyType1 = 'E';
        } else if (trackInfo1.key == 5) {
            keyType1 = 'F';
        } else if (trackInfo1.key == 6) {
            keyType1 = 'F♯/G♭';
        } else if (trackInfo1.key == 7) {
            keyType1 = 'G';
        } else if (trackInfo1.key == 8) {
            keyType1 = 'G♯/A♭';
        } else if (trackInfo1.key == 9) {
            keyType1 = 'A';
        } else if (trackInfo1.key == 10) {
            keyType1 = 'A♯/B♭';
        } else if (trackInfo1.key == 11) {
            keyType1 = 'B';
        } else if (trackInfo1.key == -1) {
            keyType1 = "Spotify doesn't know :(";
        }
        
    if (trackInfo2.key == 0) {
        keyType2 = 'C';
        } else if (trackInfo2.key == 1) {
            keyType2 = 'C♯/D♭';
        } else if (trackInfo2.key == 2) {
            keyType2 = 'D';
        } else if (trackInfo2.key == 3) {
            keyType2 = 'D♯/E♭';
        } else if (trackInfo2.key == 4) {
            keyType2 = 'E';
        } else if (trackInfo2.key == 5) {
            keyType2 = 'F';
        } else if (trackInfo2.key == 6) {
            keyType2 = 'F♯/G♭';
        } else if (trackInfo2.key == 7) {
            keyType2 = 'G';
        } else if (trackInfo2.key == 8) {
            keyType2 = 'G♯/A♭';
        } else if (trackInfo2.key == 9) {
            keyType2 = 'A';
        } else if (trackInfo2.key == 10) {
            keyType2 = 'A♯/B♭';
        } else if (trackInfo2.key == 11) {
            keyType2 = 'B';
        } else if (trackInfo2.key == -1) {
            keyType2 = "Spotify doesn't know :(";
        }

    // a coup!!! sticks
    if (acoustPerc1 > acoustPerc2) {
        compAcoust = 'more';
    } else if (acoustPerc1 == acoustPerc2) {
        compAcoust = 'the same';
    } else if (acoustPerc1 < acoustPerc2) {
        compAcoust = 'less';
    }

    //do the dance stick the beat
    if (dancePerc1 > dancePerc2) {
        compDance = 'more';
    } else if (dancePerc1 == dancePerc2) {
        compDance = 'the same';
    } else if (dancePerc1 < dancePerc2) {
        compDance = 'less';
    }

    //nrg. betwreen you and me
    if (enerPerc1 > enerPerc2) {
        compEnergy = 'more';
    } else if (enerPerc1 == enerPerc2) {
        compEnergy = 'the same';
    } else if (enerPerc1 < enerPerc2) {
        compEnergy = 'less';
    }

    //fuck um. valorant or something
    if (valPerc1 > valPerc2) {
        compVal = 'more';
    } else if (valPerc1 == valPerc2) {
        compVal = 'the same';
    } else if (valPerc1 < valPerc2) {
        compVal = 'less';
    }

    //key
    if (trackInfo1.key > trackInfo2.key) {
        compKey = 'a higher';
    } else if (trackInfo1.key == trackInfo2.key) {
        compKey = 'the same';
    } else if (trackInfo1.key < trackInfo2.key) {
        compKey = 'a lower';
    }

    //layers
    if (layerCount1 > layerCount2) {
        compLayers = 'more';
    } else if (layerCount1 == layerCount2) {
        compLayers = 'the same amount of';
    } else if (layerCount1 < layerCount2) {
        compLayers = 'less';
    }

    //sides
    if (sideCount1 > sideCount2) {
        compSides = 'more';
    } else if (sideCount1 == sideCount2) {
        compSides = 'the same number of';
    } else if (sideCount1 < sideCount2) {
        compSides = 'less';
    }

    //stroke
    if (trackInfo1.mode == 0 ) {
        compStroke= 'no stroke';
    } else if (strokeWTypeNum1 > strokeWTypeNum2) {
        compStroke= 'a thicker';
    } else if (strokeWTypeNum1 == strokeWTypeNum2) {
        compStroke = 'the same thickness';
    } else if (strokeWTypeNum1 < strokeWTypeNum2) {
        compStroke = 'a thinner';
    }

    // time sigs all wounds
    if (trackInfo1.time_signature > trackInfo2.time_signature) {
        compTime= "a 'higher'";
    } else if (trackInfo1.time_signature == trackInfo2.time_signature) {
        compTime = 'the same';
    } else if (trackInfo1.time_signature < trackInfo2.time_signature) {
        compTime = "a 'lower'";
    }

    return (
        <div className='searchNComp'>this is the the comparion will go!
        <Accordion sx={{width: '500px', margin: 'auto'}}>
        <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1c"
            id="panel1h">
            <Typography>Gimmie that data!</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography align='left' sx={{marginBottom: 0}}>
            <b>{song1name} has... </b>
            <ul className='dataList'>
                <li> {compTime} time signature ({trackInfo1.time_signature}/4 vs. {trackInfo2.time_signature}/4) </li>
                {/* tooltip about the time sig equaling stroke */}
                <li> {compSides} sides ({sideCount1} vs. {sideCount2}) </li>
                <li> {compLayers} layers ({layerCount1} vs. {layerCount2}) </li>
                <li> {compKey} key ({keyType1} vs. {keyType2}) </li> 
                <li> {compDance} danceability ({dancePerc1}% vs. {dancePerc2}%) </li>
                <li> {compEnergy} energy ({enerPerc1}% vs. {enerPerc2}%)</li>
                <li> {compVal} valence ({valPerc1}% vs. {valPerc2}%)</li>
                <li> {compAcoust} acousticness ({acoustPerc1}% vs. {acoustPerc2}%) </li>
                {/* yeah we should stilll tool tip the spotify api shit */}
            </ul>
          </Typography>
          <Typography align='right' sx={{marginTop: 0, paddingTop: 0}}><b>than {song2name}.</b></Typography>
          </AccordionDetails>
        </Accordion>
        </div>
    )
}

export default ComparisonData