import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import styled from 'styled-components';
import MedalsTable from './MedalsTable';
import AddCountry from './AddCountry';

const AppWrapper = styled.main`
  padding: 1rem;
  text-align: center;
  position: relative;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.5rem;
  border: 1px solid #333;
  border-radius: 0.5rem;
  background-color: gold;
  box-shadow: 0 0 1px rgba(192, 192, 192, 0);
  text-decoration: none;
  transform: perspective(1px) translateZ(0);
  transition-duration: 0.3s;
  transition-property: box-shadow, transform;
  color: #333;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    box-shadow: 0 10px 10px -10px rgba(192, 192, 192, 192.5);
    transform: scale(1.1);
  }
`;

const MainHeading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  -webkit-text-fill-color: gold;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #333;
  text-shadow: 3px 3px 0 silver, -1px -1px 0 silver, 1px -1px 0 silver, -1px 1px 0 silver, 1px 1px 0 silver;
`;

class App extends Component {
  state = {
    countries: []
  }

  addCountry = country => {
    this.setState(currentState => ({
      countries: [
        ...currentState.countries.filter(c => c.name !== country.name),
        country
      ].sort((a, b) => {
        // first sort by gold medals
        if (a.gold > b.gold) {
          return -1;
        }

        if (a.gold < b.gold) {
          return 1;
        }

        // then sort by silver
        if (a.silver > b.silver) {
          return -1;
        }

        if (a.silver < b.silver) {
          return 1;
        }

        // then by bronze
        if (a.bronze > b.bronze) {
          return -1;
        }

        if (a.bronze < b.bronze) {
          return 1;
        }

        // and if further sorting is needed, do it alphabetically
        if (a.name > b.name) {
          return 1;
        }

        return -1;
      })
    }));
  }

  deleteCountry = name => {
    this.setState(currentState => ({
      countries: currentState.countries.filter(country => country.name !== name)
    }));
  }

  render() {
    return (
      <AppWrapper>
        <MainHeading>Olympic Medals Count</MainHeading>
        <Switch>
          <Route exact path="/" render={() => (
            <>
              <Button to="/edit">Add a country</Button>
              <MedalsTable countries={this.state.countries}/>
            </>
          )}/>
          <Route path="/edit" render={(props) => (
            <AddCountry onDelete={this.deleteCountry} onSubmit={this.addCountry} {...props}/>
          )}/>
        </Switch>
      </AppWrapper>
    );
  }
}

export default App;
