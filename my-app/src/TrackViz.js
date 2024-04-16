import React from 'react';
import './TrackViz.css';
import Card from 'react-bootstrap/Card';

const TrackViz = ({trackObj, trackInfo, trackArtist}) => {
    console.log(trackObj.artists);
    return (
       <Card>
            <Card.Body>
                
                <Card.Title>{trackObj.name}</Card.Title>
                <Card.Subtitle>{trackArtist}</Card.Subtitle>
                <Card.Text>
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
                </Card.Text>
            </Card.Body>
       </Card>
    );
}

export default TrackViz