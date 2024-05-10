import { useEffect, useRef, useState } from 'react';
import useSearchQuery from './queries/useSearchQuery';
import { searchHelperContentList } from './searchHelper/searchHelperContentList';
import useSearchHelper from './searchHelper/useSearchHelper';

function App() {
  const {
    finalSearchText,
    firstSearchText,
    secondSearchText,
    setFirstSearchText,
    setSecondSearchText,
    currentSearchHelperContentType,
    setCurrentSearchHelperContentType,
    setCombinateWithSearchHelperContent,
  } = useSearchHelper();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchButtonClicked, setSearchButtonClicked] = useState(0);
  const { searchResults, isSuccess, totalPageCount } = useSearchQuery(
    searchButtonClicked,
    finalSearchText!,
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
        첫번째 입력:
        <input value={firstSearchText!} onChange={(e) => setFirstSearchText(e.target.value)} />
      </div>
      <div>
        두번째 입력:
        <input
          value={secondSearchText!}
          onChange={(e) => setSecondSearchText(e.target.value)}
          disabled={currentSearchHelperContentType === 'single'}
        />
      </div>

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
      <button
        onClick={() => setCurrentSearchHelperContentType((prev) => (prev === 'multiple' ? 'single' : 'multiple'))}
      >
        {currentSearchHelperContentType === 'multiple' ? '단일' : '다수'}
      </button>
      <div style={{ display: 'flex' }}>
        {searchHelperContentList.map(({ type, content }, index) => (
          <button
            onClick={() => {
              setCombinateWithSearchHelperContent(type, content);
            }}
            key={index}
            disabled={
              typeof finalSearchText !== 'string' ||
              (typeof finalSearchText === 'string' && type !== currentSearchHelperContentType)
            }
          >
            {content('A', 'B')}
          </button>
        ))}
      </div>
      {finalSearchText}

      <button
        onClick={() => {
          setSearchButtonClicked((prev) => prev + 1);
        }}
        disabled={typeof finalSearchText !== 'string'}
      >
        검색
      </button>
    </div>
  );
}

export default App;
