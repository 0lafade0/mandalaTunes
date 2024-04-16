import './App.css';
import Search from './Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import {useState, useEffect} from 'react';

const CLIENT_ID = "e0b4074fdb834217995fd79096a6138f";
const CLIENT_SECRET = "6f92a1671c7a437f8d150807ee9ae61b";

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

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

  // Search
  async function search() {
    console.log("Search for " + searchInput);
    // TEMP, WILL CHANGE SOON
    // Get request using serch to get artist ID
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }
    var artistID = await fetch('https://api.spotify.com/v1/search?q=' + 
      searchInput + '&type=artist', searchParameters)
      .then(response => response.json())
      .then(data => {return data.artists.items[0].id})
    // get request with artist ID grab all albums from that artist
    console.log("Artist ID is: " + artistID);
    //display those albums to user
    var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + 
      artistID + '/albums' + '?include_groups=album&market=US&limit=50', searchParameters)
    // Get 
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAlbums(data.items)
      });
  }
  console.log(albums);
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
      <Container>
        <Row className="mx-2 row row-cols-4">
          {albums.map((album, i) => {
            console.log(album);
            return (
            <Card>
              <Card.Img src={album.images[0].url} />
                <Card.Body>
                  <Card.Title>{album.name}</Card.Title>
                </Card.Body>
            </Card>
            )
          })}
        
        </Row>
       
      </Container>
    </div>
  );
}

export default App;
