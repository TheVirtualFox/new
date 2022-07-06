import React from 'react'

export const PageSize = ({value, onChange}) => {
    const onChangePageSize = (event) => {
        onChange(+event.target.value);
    }

    return (
        <select
            onChange={onChangePageSize}
            value={value}
        >
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="1000">1000</option>
            <option value="10000">10000</option>
            <option value="50000">50000</option>
        </select>
    )
}