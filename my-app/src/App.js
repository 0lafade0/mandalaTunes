import './App.css';
import Search from './Search';
import TrackViz from './TrackViz';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card, ListGroup} from 'react-bootstrap';
import {useState, useEffect} from 'react';

const CLIENT_ID = "e0b4074fdb834217995fd79096a6138f";
const CLIENT_SECRET = "6f92a1671c7a437f8d150807ee9ae61b";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [trackInfo, setTrackInfo] = useState("");
  const [trackArtist, setTrackArtist] = useState("");

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
      searchInput + '&type=track' + '&market=US&limit=20' , searchParameters)
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
      <Search />
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl 
            placeholder="Search for Artist"
            type="input"
            onKeyPress={event => {
              if (event.key == "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search}>
            Search
          </Button>
        </InputGroup>
      </Container>
      <div className='actionArea'>
      <Container>
        <ListGroup>
          {tracks.map((track, i) => {
            // console.log(track);
            return (
            <ListGroup.Item action onClick={() => getTrackInfo(track.id)}> 
            {/* onClick, do a function to take in the curren track */}
              <div className="ms-2 me-auto">
                <div className="fw-bold">{track.name}</div>
                {track.artists[0].name}
              </div>
            </ListGroup.Item>
             ) 
           })} 
        
        </ListGroup>
      </Container>
      <Container>
           <TrackViz trackObj={selectedTrack} trackInfo={trackInfo} trackArtist={trackArtist}/>
      </Container>
    </div>
    </div>
  );
}

export default App;
