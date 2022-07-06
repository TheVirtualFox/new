import './App.css';
import { generateTableDate } from './data/generator';
import { companies } from './data/generatorDB';
import { Table, Pagination, PageSize, Query, ALL } from './components';
import {useCallback, useEffect, useState, useTransition} from 'react';
import { useDebounce } from './helpers/useDebounce';

const config = {
    caption: 'Сводный отчет',
    columns: [
        {
            caption: 'id',
            name: 'id',
            sortButtons: true
        },
        {
            caption: 'First Name',
            name: 'firstName',
            render: (line) => <td key={'firstName'}>{line.firstName}</td>
        },
        {
            caption: 'Last Name',
            name: 'lastName',
            render: (line) => <td key={'lastName'}>{line.lastName}</td>
        },
        {
            caption: 'Email',
            name: 'email',
            render: (line) => <td key={'email'}>{line.email}</td>
        },
        {
            caption: 'Company',
            name: 'company',
            render: (line) => <td key={'company'}>{line.company}</td>,
            selectorButtons: true,

            selectorValues: companies
        }
    ]
};

const sorter =  ({state, columnName}) => (a, b) => state === 'asc' ? a[columnName] - b[columnName] : b[columnName] - a[columnName];

const N = 1000000;

function App() {

  const [rawData, setRawData] = useState(() => {
      return generateTableDate(N);
  });
  const onGenerateClick = () => {
      setRawData(generateTableDate(N));
  }

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);

  const onChangePageSize = useCallback((pageSize) => {
      setPageSize(pageSize);
  }, []);


  const [sort, setSort] = useState({ columnName: 'id', state: 'asc' });
  const [selectors, setSelectors] = useState({});

  const [query, setQuery] = useState('');
    const deferredQuery = useDebounce(query, 500);

    const [isPending, startTransition] = useTransition();

  useEffect(() => {
      setData(rawData.slice(0, pageSize));
  }, []);

    useEffect(() => {
        console.log(deferredQuery);
        const from = (page - 1) * pageSize;
        const to = from + pageSize;


        startTransition(() => {
            let data = [].concat(rawData);

            if (Object.keys(selectors).length) {
                data = data.filter((obj) => {
                    for (let selector in selectors) {
                        const {value} = selectors[selector];
                        if (obj[selector] === value) {


                            return true;
                        }
                    }
                    return false;
                });
            }

            data = data.filter(({firstName, lastName}) => {
                return firstName.toLowerCase().includes(deferredQuery) || lastName.toLowerCase().includes(deferredQuery);
            });
            data.sort(sorter(sort));
            const length = data.length;
            data = data.slice(from, to);
            setData(data);

            const pages = Math.floor(length / pageSize);

            setPages(pages);
        });

    }, [pageSize, page, sort, deferredQuery, selectors, rawData]);


    const onChangeSort = useCallback((sort) => {
        setSort(sort);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [pageSize, deferredQuery, selectors, rawData]);


    const onQueryChange = useCallback((query) => {
        setQuery(query);
    }, []);

    const onChangeSelector = useCallback(({name, value}) => {

        if (value === ALL) {
            setSelectors((selectors) => {
                return {};
            });
            return;
        }

        setSelectors((selectors) => {
            return {...selectors, [name]: {value}};
        });
    }, []);

  return (
    <div className="App">

        <Query query={query} onChange={onQueryChange} />

        <button onClick={onGenerateClick}>Generate</button>

        { isPending && <div>Loadin...</div> }
        { !isPending && <Table sort={sort} data={data} config={config} onChangeSort={onChangeSort} selectors={selectors} onChangeSelector={onChangeSelector} />}

        {pages} {page}
      <PageSize value={pageSize} onChange={onChangePageSize} />
      <Pagination current={page} totalPages={pages} onChange={(page) => { setPage(page) }} />
    </div>
  );
}

export default App;


