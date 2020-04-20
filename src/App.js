import React,{useEffect,useState} from 'react';
import './App.css';
import './indiaCases'
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import 'moment-timezone';
import Columns from "react-columns";
import Form from "react-bootstrap/Form";
function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return new Date(string).toLocaleDateString([],options);
}
function App() {
  const [latest, setLatest] = useState("");
  const[results,setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  useEffect(() => {
axios
  .all([
    axios.get("https://corona.lmao.ninja/v2/all"),
    axios.get("https://corona.lmao.ninja/v2/countries")
])
  .then(
    responseArray =>{
      setLatest(responseArray[0].data);
      setResults(responseArray[1].data);
    })
  .catch(err =>{
    console.log(err);
  });
},[]);
//filter country's countryInfo Begin
const filterCountries = results.filter(
  item =>{
    return searchCountries!=="" ? item.country.toLowerCase().includes(searchCountries.toLowerCase()) : item;
  }
);
//filter country's countryInfo End
const countries = filterCountries.map((data, index) => {
  if(data.country.toLowerCase() === "india")
  {
    return(
      <Card
      key = {index}
      bg="light"
      text={"dark"}
      className="text-center"
      style={{ margin: "10px" }}
      >
      <Card.Img variant = "top" src ={data.countryInfo.flag}/>
      <Card.Body>
        <Card.Title>{data.country.toUpperCase()}</Card.Title>
        <Card.Text>Total Cases: {data.cases}</Card.Text>
        <Card.Text>Deaths reported: {data.deaths}</Card.Text>
        <Card.Text>Recovered cases: {data.recovered}</Card.Text>
        <Card.Text>Today's Cases: {data.todayCases}</Card.Text>
        <Card.Text>Today's Deaths: {data.todayDeaths}</Card.Text>
        <Card.Text>Active Cases: {data.active}</Card.Text>
        <Card.Text>Critical Cases: {data.critical}</Card.Text>
        <Card.Text>Cases per OneMillion: {data.casesPerOneMillion}</Card.Text>
        <Card.Text>Deaths per OneMillion: {data.deathsPerOneMillion}</Card.Text>
        <Card.Text>Total Tests conducted: {data.tests}</Card.Text>
        <Card.Text>Tests Per OneMillion: {data.testsPerOneMillion}</Card.Text>
        <Card.Text>Visit(http://aadarsh2496.github.io/covidinindia/) to view state wise case.</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small>Last updated: {formatDate(data.updated)}.</small>
      </Card.Footer>
      </Card>
    );
  }
  else{
  return(
    <Card
    key = {index}
    bg="light"
    text={"dark"}
    className="text-center"
    style={{ margin: "10px" }}
    >
    <Card.Img variant = "top" src ={data.countryInfo.flag}/>
    <Card.Body>
      <Card.Title>{data.country.toUpperCase()}</Card.Title>
      <Card.Text>Total Cases: {data.cases}</Card.Text>
      <Card.Text>Deaths reported: {data.deaths}</Card.Text>
      <Card.Text>Recovered cases: {data.recovered}</Card.Text>
      <Card.Text>Today's Cases: {data.todayCases}</Card.Text>
      <Card.Text>Today's Deaths: {data.todayDeaths}</Card.Text>
      <Card.Text>Active Cases: {data.active}</Card.Text>
      <Card.Text>Critical Cases: {data.critical}</Card.Text>
      <Card.Text>Cases per OneMillion: {data.casesPerOneMillion}</Card.Text>
      <Card.Text>Deaths per OneMillion: {data.deathsPerOneMillion}</Card.Text>
      <Card.Text>Total Tests conducted: {data.tests}</Card.Text>
      <Card.Text>Tests Per OneMillion: {data.testsPerOneMillion}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated: {formatDate(data.updated)}.</small>
    </Card.Footer>
    </Card>
  );
}
});
var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];
  //var ViewCount = count.ViewCount;
  return (
    <div>
    <br/>
    <h2 style = {{ textAlign: "center" }}>Covid-19 Live Stats</h2>
    <CardDeck>
<Card
bg="secondary"
text={"white"}
className="text-center"
style={{ margin: "10px" }}
>
  <Card.Body>
    <Card.Title>World Cases</Card.Title>
    <Card.Text>
      Total: {latest.cases}
    </Card.Text>
    <Card.Text>
      Today's Cases Resported: {latest.todayCases}
    </Card.Text>
  </Card.Body>
  <Card.Footer>
    <small>Last updated: {formatDate(latest.updated)}.</small>
  </Card.Footer>
</Card>
<Card
bg="danger"
text={"white"}
className="text-center"
style={{ margin: "10px" }}
>
  <Card.Body>
    <Card.Title>World Deaths</Card.Title>
    <Card.Text>
      {latest.deaths}
    </Card.Text>
    <Card.Text>
      Today's Deaths Resported: {latest.todayDeaths}
    </Card.Text>
  </Card.Body>
  <Card.Footer>
    <small>Last updated: {formatDate(latest.updated)}.</small>
  </Card.Footer>
</Card>
<Card
bg="success"
text={"white"}
className="text-center"
style={{ margin: "10px" }}
>
  <Card.Body>
    <Card.Title>World Recovered</Card.Title>
    <Card.Text>
      {latest.recovered}
    </Card.Text>
  </Card.Body>
  <Card.Footer>
    <small>Last updated {formatDate(latest.updated)}.</small>
  </Card.Footer>
</Card>
</CardDeck>
<br/>
<Form>
  <Form.Group controlId="formGroupSearch">
    <Form.Control
    type="text"
    placeholder="Filter by Country's name"
    onChange = {e=> setSearchCountries(e.target.value.toLowerCase())}
    style={{ width: "230px" }}
    />
  </Form.Group>
</Form>
<br/>
<Columns queries={queries}>{countries}</Columns>
    </div>
  );
}
export default App;
