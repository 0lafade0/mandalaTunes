import React from 'react';
import './TrackLabel.css';
import { List, ListItem, ListItemAvatar, Avatar, Container, ListItemText, IconButton, 
    Accordion, AccordionSummary, AccordionDetails, Typography, Tooltip} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const TrackLabel = ({trackObj, trackArtist, trackImg}) => {

    if (!trackObj) {
        return <div>No track selected</div>;
      }

    return (
        <List>
            <Tooltip title="In an ideal world this would play the full track. However i don't want to 
            pay for premuim (and the 30 second preview didnt feel worth it).">
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
            </Tooltip>
        </List>
    );
}

export default TrackLabel