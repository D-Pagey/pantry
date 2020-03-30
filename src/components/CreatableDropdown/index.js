import React from 'react';
import { arrayOf, func, string } from 'prop-types';
import { titleCase } from 'title-case';
import CreatableSelect from 'react-select/creatable';
import * as S from './styles';

const addLabel = (value) => {
  if (Array.isArray(value)) return value.map((item) => ({ label: titleCase(item), value: item }));

  return { label: titleCase(value), value };
};

export const CreatableDropdown = ({
  error, label, options, setSelected, value,
}) => {
  const handleChange = (newValue, actionMeta) => {
    const isSelected = actionMeta.action === 'select-option' || actionMeta.action === 'create-option';

    if (isSelected) {
      const formatted = { label: newValue.label, value: newValue.value.toLowerCase() };

      setSelected(formatted);
    }
  };

  return (
    <S.Wrapper>
      {label && <S.Label>{label}</S.Label>}

      <CreatableSelect
        isClearable
        onChange={handleChange}
        options={addLabel(options)}
        value={value && addLabel(value)}
      />

      {error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  );
};

CreatableDropdown.propTypes = {
  error: string,
  label: string,
  options: arrayOf(string).isRequired,
  setSelected: func.isRequired,
  value: string,
};

CreatableDropdown.defaultProps = {
  error: '',
  label: '',
  value: null,
};

