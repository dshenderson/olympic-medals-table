import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import './Autosuggest.css';

class AutosuggestInput extends Component {
  state = {
    value: '',
    suggestions: []
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.countries.filter(country => {
      return country.toLowerCase().slice(0, inputLength) === inputValue
    });
  }

  getSuggestionValue = suggestion => suggestion;

  renderSuggestion = suggestion => suggestion;

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
      'aria-label': 'Country',
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
