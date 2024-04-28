import './App.css';
import Search from './Search';
import TrackViz from './TrackViz';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  InputGroup, FormControl, Button, Row, Card, ListGroup} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { List, ListItem, ListItemAvatar, Avatar, Container, ListItemText, ListItemButton, ListSubheader } from '@mui/material'


const CLIENT_ID = "e0b4074fdb834217995fd79096a6138f";
const CLIENT_SECRET = "6f92a1671c7a437f8d150807ee9ae61b";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [trackInfo, setTrackInfo] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [trackImg, setTrackImg] = useState("");

  useEffect(() => {
    // API call
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

  var searchParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }

  // Search
  async function search() {
    console.log("Search for " + searchInput);
    // TEMP, WILL CHANGE SOON
    // Get request using serch to get artist ID

    var returnedTracks = await fetch('https://api.spotify.com/v1/search?q=' + 
      searchInput + '&type=track' + '&market=US&limit=10' , searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTracks(data.tracks.items)
      });
    // get request with search query to grab all tracks from search
    //display those tracks to user

  }
  // console.log(tracks);

  async function getTrackInfo(tr_id) {

    var trackStuff = await fetch ('https://api.spotify.com/v1/tracks/' + 
    tr_id, searchParameters)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setSelectedTrack(data);
      setTrackArtist(data.artists[0].name);
      setTrackImg(data.album.images[0].url);
    })

    var trackQualities = await fetch('https://api.spotify.com/v1/audio-features/' + 
    tr_id, searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTrackInfo(data);
    })

  };

  return (
    <div className="App">
      <h2>Spirofy (technically it should be mandala-fy but that name sucks)</h2>
      <h4>Take the qualities of your favorite spotify song and turn them into a Mandala! </h4>
      
      <Container> 
      {/* We keep this as a bootstrap thing i dont wanna have to figure this out */}
        <InputGroup className="mb-3" size="lg">
          <FormControl 
            placeholder="Search for Song"
            type="input"
            onKeyPress={event => {
              if (event.key == "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
            // need an edge case for if the user doesn't enter anything
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <div className='actionArea'>
      <Container disableGutters="true" sx={{ ml: '24px', position: 'relative',
        overflow: 'auto', maxHeight: '500px'}}>
        <List sx={{width: '500px'}}>
          <ListSubheader>Possible matches (scroll for more!):</ListSubheader>
          {tracks.map((track, i) => {
            console.log(track);
            return (
            <ListItemButton onClick={() => getTrackInfo(track.id)}> 
            {/* onClick, do a function to take in the curren track */}
              <ListItemAvatar>
                <Avatar sx={{ width: 56, height: 56 }} alt="Song Album Image" 
                              variant="rounded" src={track.album.images[0].url} />
              </ListItemAvatar>
              <ListItemText>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{track.name}</div>
                {track.artists[0].name}
              </div>
              </ListItemText>
            </ListItemButton>
             ) 
           })} 
        
        </List>
      </Container>
      <Container disableGutters="true">
           <TrackViz trackObj={selectedTrack} trackInfo={trackInfo} trackArtist={trackArtist} trackImg={trackImg}/>
          
      </Container>
      {/* <Container disableGutters="true" sx={{ mr: '24px'}}>
        <Card>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
        </Card.Body>
        </Card>
      </Container> */}
    </div>
    </div>
  );
}

export default App;
