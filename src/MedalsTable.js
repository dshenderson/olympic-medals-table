import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import icon from './icon-edit.svg';

const Table = styled.table`
  margin: 1rem auto;
  width: 100%;
  max-width: 26rem;
  border: 1px solid silver;
  border-collapse: collapse;
`;

const THead = styled.thead`
  background-color: silver;
  font-weight: bold;
  border-bottom-width: 2px;
`;

const TBody = styled.tbody``;

const TRow = styled.tr`
  border-top: 1px solid #e7e7e7;
  &:first-child {
    border-top: none;
  }
`;

const THeading = styled.th`
  font-weight: bold;
  padding: 0.5rem;
  &:first-child {
    text-align: left;
  }
`;

const TCell = styled.td`
  padding: 0.5rem;
  &:first-child {
    text-align: left;
  }
`;

const Abbrev = styled.abbr`
  text-decoration: none;
  &:hover {
    color: #333;
    -webkit-text-fill-color: #333;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: silver;
  }
`;

const EditButton = styled(Link)`
  display: inline-block;
  padding: 0.25rem;
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

  &:before {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    content: ' ';
    background-image: url(${icon});
    background-position: 0 0;
    background-repeat: no-repeat;
  }
`;

const EditButtonSpan = styled.span`
  padding-left: 0.25rem;
  @media(max-width: 414px) {
    display: inline-block;
    width: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const MedalsTable = ({countries}) => {
  return !!countries.length && (
    <Table>
      <THead>
        <TRow>
          <THeading scope="col">Country</THeading>
          <THeading scope="col">
            <Abbrev title="Gold">G</Abbrev>
          </THeading>
          <THeading scope="col">
            <Abbrev title="Silver">S</Abbrev>
          </THeading>
          <THeading scope="col">
            <Abbrev title="Bronze">B</Abbrev>
          </THeading>
          <THeading scope="col">
            <Abbrev title="Total">T</Abbrev>
          </THeading>
          <TCell>&nbsp;</TCell>
        </TRow>
      </THead>
      <TBody>
        {countries.map(country => {
          const {name, gold, silver, bronze, total} = country;
          return (
            <TRow key={name}>
              <TCell>{name}</TCell>
              <TCell>{gold}</TCell>
              <TCell>{silver}</TCell>
              <TCell>{bronze}</TCell>
              <TCell>{total}</TCell>
              <TCell>
                <EditButton to={{
                  pathname: '/edit',
                  state: {country}
                }}>
                  <EditButtonSpan>Edit</EditButtonSpan>
                </EditButton>
              </TCell>
            </TRow>
          );
        })}
      </TBody>
    </Table>
  );
};

MedalsTable.propTypes = {
  countries: PropTypes.array.isRequired
};

export default MedalsTable;
