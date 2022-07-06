import { memo } from 'react';

export const ALL = '__ALL__';
export const SelectorActions = memo(({onChangeSelector, selector}) => {
    const onChange = (e) => {
        const value = e.target.value;
        onChangeSelector({name: selector.name, value});
    }

    return (
        <select
            onChange={onChange}
            value={selector.value}
        >
            <option key={ALL} value={ALL}>ALL {selector.name}</option>
            { selector?.values?.map((value) => <option key={value} value={value}>{value}</option>) }
        </select>
    )
});