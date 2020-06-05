import React from 'react';
import { titleCase } from 'title-case';
import CreatableSelect from 'react-select/creatable';

const addLabel = (value) => {
    if (Array.isArray(value)) return value.map((item) => ({ label: titleCase(item), value: item }));

    return { label: titleCase(value), value };
};

export const CreatableDropdown = ({ options, setSelected, value }) => {
    const handleChange = (newValue, actionMeta) => {
        const isSelected = actionMeta.action === 'select-option' || actionMeta.action === 'create-option';

        if (isSelected) {
            const formatted = { label: newValue.label, value: newValue.value.toLowerCase() };

            setSelected(formatted);
        }
    };

    return (
        <CreatableSelect
            isClearable
            onChange={handleChange}
            options={addLabel(options)}
            value={value && addLabel(value)}
        />
    );
};
