import './App.css';
import Search from './Search';
import TrackViz from './TrackViz';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  InputGroup, FormControl, Button, Row, Card, ListGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { List, ListItem, ListItemAvatar, Avatar, Container, ListItemText, 
         ListItemButton, ListSubheader, Typography, Tooltip, ToggleButton, 
         ToggleButtonGroup, Stack } from '@mui/material'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TrackLabel from './TrackLabel';
import Spirograph from './Spirograph';
import ComparisonData from './ComparisonData';


const CLIENT_ID = "e0b4074fdb834217995fd79096a6138f";
const CLIENT_SECRET = "6f92a1671c7a437f8d150807ee9ae61b";

function App() {

  // single song analysis
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState("");
  const [trackInfo, setTrackInfo] = useState("");
  const [trackArtist, setTrackArtist] = useState("");
  const [trackImg, setTrackImg] = useState("");

  //for comparing songs
  const [selectedTrack1, setSelectedTrack1] = useState("");
  const [selectedTrack2, setSelectedTrack2] = useState("");
  const [trackInfo1, setTrackInfo1] = useState("");
  const [trackInfo2, setTrackInfo2] = useState("");
  const [trackArtist1, setTrackArtist1] = useState("");
  const [trackArtist2, setTrackArtist2] = useState("");
  const [trackImg1, setTrackImg1] = useState("");
  const [trackImg2, setTrackImg2] = useState("");
  const [whichTrack, setWhichTrack] = useState("Song 1");
  const [compareActive, setCompareActive] = useState(false);

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

  async function changeView() {
    setCompareActive(prevCompareActive => !prevCompareActive);    
    console.log("Changeview function activated!");
    console.log("(change) CompareActive is: " + compareActive);
  }

  // SEARCH CONCEPT
  async function search() {
    console.log("Search for " + searchInput);

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

    // TRACK CONCEPT
  async function getTrackInfo(tr_id) {

    var trackStuff = await fetch ('https://api.spotify.com/v1/tracks/' + 
    tr_id, searchParameters)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log("Which song are you supposed to be. " + whichTrack);
      if (!compareActive) {
        setSelectedTrack(data);
        setTrackArtist(data.artists[0].name);
        setTrackImg(data.album.images[0].url);
        console.log("This means we're still using the original state places!");
      } else if (whichTrack === 'Song 1') {
        setSelectedTrack1(data);
        setTrackArtist1(data.artists[0].name);
        setTrackImg1(data.album.images[0].url);
        console.log("This means we're picking for track 1!");
      } else if (whichTrack === 'Song 2') {
        setSelectedTrack2(data);
        setTrackArtist2(data.artists[0].name);
        setTrackImg2(data.album.images[0].url);
        console.log("This means we're picking for track 2!");
      }
    })

    var trackQualities = await fetch('https://api.spotify.com/v1/audio-features/' + 
    tr_id, searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (!compareActive) {
        setTrackInfo(data);
        } else if (whichTrack === 'Song 1') {
          setTrackInfo1(data);
        } else if (whichTrack === 'Song 2') {
          setTrackInfo2(data);
        }
    })
    console.log("Which song are you supposed to be. " + whichTrack);
    console.log("Does this comparison work?? " + (whichTrack === 'Song 1'));
  };



  const handleWhich = (event, newWhich) => {
    if (newWhich !== null) {
    setWhichTrack(newWhich);
    console.log("Which Song is it babe: " + whichTrack);
    }    
  };


  return (
    <div className="App">
      <Container disableGutters='true' className='titleTop' sx={{marginTop: '10px', width: '200px', paddingRight:'5px', paddingTop: '5px', paddingBottom: '5px'}}>
      <Typography variant="h5"  align='center'><MusicNoteIcon fontSize='medium' />MandalaTunes{'  '}</Typography>
      </Container>
      <Typography variant="subtitle1" color='white'>Take the qualities of your favorite spotify 
      song and turn them into a <Tooltip title="Don't know what this is? Give it a click!">
        <span style={{ textDecoration: 'underline', textDecorationStyle:'dotted', cursor: 'pointer' }}>
          <a href="https://www.google.com/search?client=firefox-b-1-d&q=mandala" target="_blank">mandala</a>
          </span>
      </Tooltip>!</Typography>
      
      <div className={(compareActive) ? 'hideView' : ''}>
      <Container> 
      <Stack direction="row" spacing={2}>
        <InputGroup className="mb-3" size="lg">
          <FormControl className='searchBar'
            placeholder="Search for Song"
            type="input"
            onKeyPress={event => {
              if (event.key == "Enter") {
                search();
              }
            }}
            onChange={event => setSearchInput(event.target.value)}
          />
          <Button onClick={search} style={{backgroundColor: '#1DB954', borderColor: '#1DB954'}}>
            Search
          </Button>
        </InputGroup>
        <Button onClick={changeView} style={{width: '200px', height: '48px', backgroundColor: '#1DB954', borderColor: '#1DB954'}}>
          Compare Tracks
        </Button>
        </Stack>
      </Container>
      <div className='actionArea'>
      <Container disableGutters="true" sx={{ ml: '24px', position: 'relative',
        overflow: 'auto', maxHeight: '500px', width: '600px',  '& ul': { padding: 0 }}} className='searchResults'>
        <List sx={{width: 'auto'}} subheader={<li />} >
        <li>
            <ul>
          <ListSubheader sx={{ position: 'sticky', top: '0', zIndex: '1000', backgroundColor: '#2a2a2a', color: 'white' }}>Possible matches (scroll for more!):</ListSubheader>
          {tracks.map((track, i) => {
            console.log(track);
            return (
            <ListItemButton onClick={() => getTrackInfo(track.id)}> 
              <ListItemAvatar>
                <Avatar sx={{ width: 56, height: 56 }} alt="Song Album Image" 
                              variant="rounded" src={track.album.images[0].url} />
              </ListItemAvatar>
              <ListItemText>
              <div className="ms-2 me-auto">
                <div className="fw-bold" >{track.name}</div>
                <div style={{color: '#8B8B8B'}}>{track.artists[0].name}</div>
              </div>
              </ListItemText>
            </ListItemButton>
            ) 
            
          })} 
          </ul>
          </li>
        </List>
      </Container>
      <Container disableGutters="true" className='displayPort'>
           <TrackViz trackObj={selectedTrack} trackInfo={trackInfo} trackArtist={trackArtist} trackImg={trackImg}/>
      </Container>
      </div>

    </div>

        {/* COMPARISON CONCEPT */}


      <div className={(compareActive) ? '' : 'hideView'}> 
           <div className='searchNToggle'>
           
            <Container disableGutters="true" >
            <Stack direction="row" spacing={2}>
              <InputGroup className="mb-3 d-flex justify-content-start" size="lg">
                <FormControl 
                  placeholder={"Search for Songs" }
                  type="input"
                  onKeyPress={event => {
                    if (event.key == "Enter") {
                      search();
                    }
                  }}
                  onChange={event => setSearchInput(event.target.value)}
                />
                <Button onClick={search} style={{backgroundColor: '#1DB954', borderColor: '#1DB954'}}>
                  Search
                </Button>
              </InputGroup>
              <ToggleButtonGroup sx={{width: '250px', height: '48px', margin: 0}}
                color="primary"
                value={whichTrack}
                exclusive
                onChange={handleWhich}
                aria-label="Track Choice">
                <ToggleButton value="Song 1"
                sx={{
                  backgroundColor: '#2A2A2A', // not selected
                  color: '8b8b8b', 
                  '&:hover': {
                    backgroundColor: '#1DB954',
                  },
                  '&.Mui-selected': { // selected
                      backgroundColor: '#F6F6F6', 
                      color: '#000000', 
                      '&:hover': {
                        backgroundColor: '#1DB954', 
                      },
                  },
                }}
                
                >Song 1</ToggleButton>
                <ToggleButton value="Song 2"
                
                sx={{
                  backgroundColor: '#2A2A2A', // not selected
                  color: '8b8b8b', 
                  '&:hover': {
                    backgroundColor: '#1DB954', 
                  },
                  '&.Mui-selected': { // selected
                      backgroundColor: '#F6F6F6', 
                      color: '#000000', 
                      '&:hover': {
                        backgroundColor: '#1DB954', 
                      },
                  },
                }}
                
                >Song 2</ToggleButton>
              </ToggleButtonGroup>
              <Button onClick={changeView} style={{width: '200px', height: '48px', margin: 0, backgroundColor: '#1DB954', borderColor: '#1DB954'}}>
                Single Analysis
              </Button>
              </Stack>
            </Container>
           
            </div>
            <div className='compSong'>
              
              <Container disableGutters="true" sx={{width: '455px', paddingTop: '5px', backgroundColor: 'black'}} className='compSongreal'>
                <Spirograph style={{padding: '0px', marginTop:'10px', borderStyle: 'solid', borderWeight: '3px'}}
                    track={trackInfo1} 
                    disSize={450} 
                    acoust={trackInfo1.acousticness} 
                    dance={trackInfo1.danceability} 
                    duration={trackInfo1.duration_ms} 
                    energy={trackInfo1.energy} 
                    instrum={trackInfo1.instrumentalness}
                    key={trackInfo1.key} 
                    live={trackInfo1.liveness} 
                    loud={trackInfo1.loudness} 
                    mode={trackInfo1.mode} 
                    speech={trackInfo1.speechiness} 
                    tempo={trackInfo1.tempo} 
                    time_sig={trackInfo1.time_signature} 
                    valence={trackInfo1.valence} 
                  />
                <TrackLabel trackObj={selectedTrack1} trackArtist={trackArtist1} trackImg={trackImg1} />
              </Container>
              
             <div className='searchNData'>
             <ComparisonData trackObj1={selectedTrack1} trackInfo1={trackInfo1} trackObj2={selectedTrack2} trackInfo2={trackInfo2}/>

              <Container disableGutters="true" sx={{ ml: '24px',mr: '24px', position: 'realtive', width: '500px',
                overflow: 'auto', maxHeight: '500px', marginTop: '20px', '& ul': { padding: 0 }}} className='searchResults'>
                <List sx={{width: '500px'}}  subheader={<li />}>
                  <li>
                    <ul>
                  <ListSubheader sx={{textAlign: 'center', backgroundColor: '#2a2a2a', color: 'white' }}>Possible matches (scroll for more!):</ListSubheader>
                  {tracks.map((track, i) => {
                    console.log(track);
                    return (
                    <ListItemButton onClick={() => getTrackInfo(track.id)}> 
                      <ListItemAvatar>
                        <Avatar sx={{ width: 56, height: 56 }} alt="Song Album Image" 
                                      variant="rounded" src={track.album.images[0].url} />
                      </ListItemAvatar>
                      <ListItemText>
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{track.name}</div>
                        <div style={{color: '#8B8B8B'}}>{track.artists[0].name}</div>
                      </div>
                      </ListItemText>
                    </ListItemButton>
                    ) 
                    
                  })} 
                  </ul>
                  </li>
                </List>
                
              </Container>
              </div>
              <Container disableGutters="true" sx={{width: '455px', paddingTop: '5px', backgroundColor: 'black'}} className='compSongreal'> 
                  <Spirograph style={{padding: '0px', margin: '0px'}}
                    track={trackInfo2} 
                    disSize={450} 
                    acoust={trackInfo2.acousticness} 
                    dance={trackInfo2.danceability} 
                    duration={trackInfo2.duration_ms} 
                    energy={trackInfo2.energy} 
                    instrum={trackInfo2.instrumentalness}
                    key={trackInfo2.key} 
                    live={trackInfo2.liveness} 
                    loud={trackInfo2.loudness} 
                    mode={trackInfo2.mode} 
                    speech={trackInfo2.speechiness} 
                    tempo={trackInfo2.tempo} 
                    time_sig={trackInfo2.time_signature} 
                    valence={trackInfo2.valence} 
                  />
                  <TrackLabel trackObj={selectedTrack2} trackArtist={trackArtist2} trackImg={trackImg2}/>
              </Container>
           </div>
      </div>
    </div>
  );
}

export default App;
