import { useEffect, useRef, useState } from 'react';
import useSearchQuery from './queries/useSearchQuery';
import { searchHelperContentList } from './searchHelper/searchHelperContentList';
import useSearchHelper from './searchHelper/useSearchHelper';

function App() {
  const {
    currentSearchHelperContentType,
    setCurrentSearchHelperContentType,
    setCombinateWithSearchHelperContent,
    searchText,
    dispatch,
  } = useSearchHelper();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchButtonClicked, setSearchButtonClicked] = useState(0);
  const { searchResults, isSuccess, totalPageCount } = useSearchQuery(
    searchButtonClicked,
    searchText.final!,
    currentPage,
    10,
  );

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  console.log('is Success?', isSuccess);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        첫번째 검색어 :
        <input value={searchText.first!} onChange={(e) => dispatch({ type: 'addFirst', first: e.target.value })} />
      </div>
      <div>
        두번째 검색어 :
        <input
          value={searchText.second!}
          onChange={(e) => dispatch({ type: 'addSecond', second: e.target.value })}
          disabled={currentSearchHelperContentType === 'single'}
        />
      </div>
      <div>최종 검색어 : {searchText.final}</div>

      <div style={{ display: 'flex' }}>
        <div>검색어 타입 : </div>
        <button
          onClick={() => setCurrentSearchHelperContentType((prev) => (prev === 'multiple' ? 'single' : 'multiple'))}
        >
          {currentSearchHelperContentType === 'multiple' ? '단일' : '다수'}
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        <div>검색 헬퍼 : </div>
        {searchHelperContentList.map(({ type, content }, index) => (
          <button
            onClick={() => {
              setCombinateWithSearchHelperContent(type, content);
            }}
            key={index}
            disabled={
              typeof searchText.final !== 'string' ||
              (typeof searchText.final === 'string' && type !== currentSearchHelperContentType)
            }
          >
            {content('A', 'B')}
          </button>
        ))}
      </div>

      <button
        onClick={() => {
          setSearchButtonClicked((prev) => prev + 1);
        }}
        disabled={typeof searchText.final !== 'string'}
        style={{ marginTop: '16px' }}
      >
        검색
      </button>

      {isSuccess && (
        <>
          <ul>
            {searchResults.map(({ title, formattedUrl }) => (
              <a key={`${title}-${formattedUrl}`} href={formattedUrl}>
                <li>{title}</li>
              </a>
            ))}
          </ul>
          {Array.from({ length: totalPageCount }).map((_, index) => (
            <button key={index} onClick={() => setCurrentPage(index * 10 + 1)}>
              {index + 1}
            </button>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
