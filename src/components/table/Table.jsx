import { memo } from 'react';
import { SelectorActions } from './SelectorActions';
import { SortActions } from './SortActions';


const renderColumn = (line, column) => <td key={column.name}>{line[column.name]}</td>;


export const Table = memo(({
           config = {
               caption: 'Caption',
               columns: []
           },
           data = [],
           sort = { columnName: 'id', state: 'desc' },
           onChangeSort = () => {},
           selectors = {},
           onChangeSelector = () => {}
}) => {
    const {caption, columns} = config;

    return (
        <table border="1">
            <caption>{caption}</caption>
            <thead>
                <tr>
                    { columns.map(({caption, name, selectorButtons, selectorValues}, index) => (<th key={index}>
                        <div className="flex">
                            {caption}
                            {sort.columnName === name && <SortActions onChangeSort={onChangeSort} sort={sort} />}
                            {selectorButtons && <SelectorActions onChangeSelector={onChangeSelector} selector={{...selectors[name], name, values: selectorValues}} />}
                        </div>
                    </th>)) }
                </tr>
            </thead>
            <tbody>
                { data.map((line) => {
                    return (
                        <tr key={line.id}>
                            {columns.map((column) => {
                                return column.render?.(line, column) || renderColumn(line, column);
                            })}
                        </tr>
                    );
                }) }
            </tbody>
        </table>
    );
});