import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AutosuggestInput from './AutosuggestInput';

const SubHeading = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
  color: #333;
  text-shadow: 1px 1px 0 silver, -1px -1px 0 silver, 1px -1px 0 silver, -1px 1px 0 silver, 1px 1px 0 silver;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  margin: 2px auto;
  max-width: 26rem;
`;

const Fieldset = styled.fieldset`
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid silver;
  border-radius: 0.5rem;
`;

const Legend = styled.legend`
  font-size: 1.5rem;
  color: #333;
  text-shadow: 1px 1px 0 gold, -1px -1px 0 gold, 1px -1px 0 gold, -1px 1px 0 gold, 1px 1px 0 gold;
`;

const InputOuterWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const InputInnerWrapper = styled.div`
  text-align: left;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-style: italic;
`;

const Input = styled.input`
  border: 1px solid #e7e7e7;
  border-radius: 0.5rem;
`;

const MedalInput = styled(Input)`
  display: block;
  padding: 0.5rem;
  max-width: 3rem;
  text-align: right;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  display: inline-block;
  min-width: 25%;
  margin: 0 1rem;
  padding: 0.5rem;
  border: 1px solid #333;
  border-radius: 0.5rem;
  box-shadow: 0 0 1px rgba(192, 192, 192, 0);
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
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

const SubmitButton = styled(Button)`
    background-color: gold;
`;

const CancelButton = styled(Button)`
    background-color: silver;
    text-decoration: none;
`;

const RemoveButton = styled(Button)`
    background-color: silver;
    border-color: red;
    color: #333;
`;

class AddCountry extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  componentDidMount() {
    if (this.props.location.state) {
      const {name, gold, silver, bronze} = this.props.location.state.country;
      this.setState({
        country: name,
        gold,
        silver,
        bronze,
        editing: true
      })
    }
  }

  state = {
    country: '',
    gold: 0,
    silver: 0,
    bronze: 0,
    toHome: false,
    editing: false
  }

  processForm = e => {
    e.preventDefault();

    const {country: name, gold, silver, bronze} = this.state;
    const total = gold + silver + bronze;

    this.props.onSubmit({name, gold, silver, bronze, total});
    this.setState({toHome: true});
  }

  removeRecord = () => {
    this.props.onDelete(this.state.country);
    this.setState({toHome: true});
  }

  handleCountry = country => {
    this.setState({country});
  }

  handleMedals = e => {
    const target = e.target;
    const medal = target.id.replace('medals-', '');
    const count = Math.floor(target.value);

    this.setState({[medal]: count});
  }

  render() {
    if (this.state.toHome) {
      return <Redirect to="/"/>;
    }

    return (
      <>
        <SubHeading>
          {this.state.editing ? `Edit ${this.state.country}'s medal count` : 'Add a country and its medal count'}
        </SubHeading>

        <Form onSubmit={this.processForm}>
          {!this.state.editing && (
            <AutosuggestInput onChange={this.handleCountry} value={this.state.country}/>
          )}

          <Fieldset>
            <Legend>Medals</Legend>
            <InputOuterWrapper>
              <InputInnerWrapper>
                <Label htmlFor="medals-gold">Gold</Label>
                <MedalInput
                  type="number"
                  min="0"
                  step="1"
                  id="medals-gold"
                  value={this.state.gold}
                  onChange={this.handleMedals}
                />
              </InputInnerWrapper>
              <InputInnerWrapper>
                <Label htmlFor="medals-silver">Silver</Label>
                <MedalInput
                  type="number"
                  min="0"
                  step="1"
                  id="medals-silver"
                  value={this.state.silver}
                  onChange={this.handleMedals}
                />
              </InputInnerWrapper>
              <InputInnerWrapper>
                <Label htmlFor="medals-bronze">Bronze</Label>
                <MedalInput
                  type="number"
                  min="0"
                  step="1"
                  id="medals-bronze"
                  value={this.state.bronze}
                  onChange={this.handleMedals}
                />
              </InputInnerWrapper>
            </InputOuterWrapper>
          </Fieldset>
          <ButtonWrapper>
            <SubmitButton>{this.state.editing ? 'Edit' : 'Add'}</SubmitButton>
            {this.state.editing && (
              <RemoveButton onClick={this.removeRecord}>Delete</RemoveButton>
            )}
            <CancelButton as={Link} to="/">Cancel</CancelButton>
          </ButtonWrapper>
        </Form>
      </>
    );
  }
};

export default AddCountry;
