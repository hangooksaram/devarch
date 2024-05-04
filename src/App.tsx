import { useEffect, useRef, useState } from 'react';
import useSearchQuery from './queries/useSearchQuery';

type HelperType = 'multiple' | 'single';
interface HelperContent {
  type: HelperType;
  content: (a: string, b?: string) => string;
}

const helperContentList: HelperContent[] = [
  { type: 'multiple', content: (a, b) => `What is difference between ${a} and ${b}?` },
  { type: 'multiple', content: (a, b) => `${a} vs ${b} which is better?` },
  { type: 'single', content: (a) => `${a} best practices` },
  { type: 'single', content: (a) => `What is advantage of ${a}?` },
  { type: 'single', content: (a) => `What is disadvantage of ${a}?` },
  { type: 'single', content: (a) => `Best ${a} 2024` },
  { type: 'single', content: (a) => `Top 10 ${a} 2024` },
];

function App() {
  const [firstSearchText, setFirstSearchText] = useState<string | null>(null);
  const [secondSearchText, setSecondSearchText] = useState<string | null>(null);
  const [finalSearchText, setFinalSearchText] = useState<string | null>(null);
  const [currentHelperContentType, setCurrentHelperContentType] = useState<HelperType | null>('single');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchButtonClicked, setSearchButtonClicked] = useState(0);
  const { searchResults, isSuccess, totalPageCount } = useSearchQuery(
    searchButtonClicked,
    finalSearchText!,
    currentPage,
    10,
  );

  const setCombinateWithHelperContent = (type: string, content: Function) => {
    let finalHelperContent;
    if (type === 'multiple') {
      finalHelperContent = content(firstSearchText!, secondSearchText!);
    } else finalHelperContent = content(firstSearchText!);

    setFinalSearchText(finalHelperContent);
  };

  useEffect(() => {
    if (currentHelperContentType !== 'multiple') {
      setFinalSearchText(firstSearchText);
    }
  }, [firstSearchText, secondSearchText]);

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
          disabled={currentHelperContentType === 'single'}
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
      <button onClick={() => setCurrentHelperContentType((prev) => (prev === 'multiple' ? 'single' : 'multiple'))}>
        {currentHelperContentType === 'multiple' ? '단일' : '다수'}
      </button>
      <div style={{ display: 'flex' }}>
        {helperContentList.map(({ type, content }, index) => (
          <button
            onClick={() => {
              setCombinateWithHelperContent(type, content);
            }}
            key={index}
            disabled={
              typeof finalSearchText !== 'string' ||
              (typeof finalSearchText === 'string' && type !== currentHelperContentType)
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
