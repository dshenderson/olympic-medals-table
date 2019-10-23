import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import './Autosuggest.css';

class AutosuggestInput extends Component {
  state = {
    countries: [],
    value: '',
    suggestions: []
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all?fields=flag;name')
      .then(r => r.json())
      .then(countries => {
        this.setState({countries});
      });
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.state.countries.filter(country =>
      country.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  getSuggestionValue = suggestion => suggestion.name;

  renderSuggestion = suggestion => suggestion.name;

  onChange = (event, {newValue}) => {
    this.props.onChange(newValue);
  };

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const {suggestions} = this.state;
    const {value} = this.props;

    const inputProps = {
      type: 'search',
      ariaLabel: 'Country',
      placeholder: 'Enter the name of a country',
      value,
      onChange: this.onChange,
      required: true
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default AutosuggestInput;
