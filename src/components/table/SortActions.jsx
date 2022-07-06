import { memo } from 'react';

export const ASC = 'asc';
export const DESC = 'desc';

export const SortActions = memo(({onChangeSort, sort}) => <div>{
    sort.state === ASC ?
        <button onClick={() => onChangeSort({...sort, state: DESC})}>asc</button> :
        <button onClick={() => onChangeSort({...sort, state: ASC})}>desc</button>
}</div>);