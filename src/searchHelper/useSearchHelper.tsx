import { useEffect, useState } from 'react';

const useSearchHelper = () => {
  const [firstSearchText, setFirstSearchText] = useState<string | null>(null);
  const [secondSearchText, setSecondSearchText] = useState<string | null>(null);
  const [finalSearchText, setFinalSearchText] = useState<string | null>(null);

  const [currentSearchHelperContentType, setCurrentSearchHelperContentType] = useState<SearchHelperType | null>(
    'single',
  );

  useEffect(() => {
    if (currentSearchHelperContentType !== 'multiple') {
      setFinalSearchText(firstSearchText);
    }
  }, [firstSearchText, secondSearchText]);

  const setCombinateWithSearchHelperContent = (type: string, content: Function) => {
    let finalSearchHelperContent;
    if (type === 'multiple') {
      finalSearchHelperContent = content(firstSearchText!, secondSearchText!);
    } else finalSearchHelperContent = content(firstSearchText!);

    setFinalSearchText(finalSearchHelperContent);
  };

  return {
    firstSearchText,
    setFirstSearchText,
    setFinalSearchText,
    secondSearchText,
    setSecondSearchText,
    finalSearchText,
    currentSearchHelperContentType,
    setCurrentSearchHelperContentType,
    setCombinateWithSearchHelperContent,
  };
};

export default useSearchHelper;
