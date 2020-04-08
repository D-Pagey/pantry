/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import chroma from 'chroma-js';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const colour = chroma(data.colour || 'black');
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? data.colour
          : isFocused
          ? colour.alpha(0.1).css()
          : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(colour, 'white') > 2
            ? 'white'
            : 'black'
          : data.colour,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && (isSelected ? data.colour : colour.alpha(0.3).css()),
        },
      };
    },
    multiValue: (styles, { data }) => {
      const colour = chroma(data.colour || 'black');
      return {
        ...styles,
        backgroundColor: colour.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.colour,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.colour,
      ':hover': {
        backgroundColor: data.colour,
        color: 'white',
      },
    }),
  };