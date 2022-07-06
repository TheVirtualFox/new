export const Query = ({query, onChange}) => {

    const onChangeQuery = (e) => {
        onChange(e.target.value);
    }

    return (<input placeholder="Query string" type="text" value={query} onChange={onChangeQuery}  />)
}