import { useEffect, useReducer, useState } from 'react';
import { SearchHelper, SearchHelperContent, SearchHelperContentType, SearchText } from './searchHelper';

interface SearchTextAction {
  type: 'addFirst' | 'addSecond' | 'setFinal';
  first?: string;
  second?: string;
  final?: string;
}

const searchTextReducer = (searchHelper: SearchText, action: SearchTextAction) => {
  switch (action.type) {
    case 'addFirst': {
      return {
        ...searchHelper,
        first: action.first,
      };
    }
    case 'addSecond': {
      return {
        ...searchHelper,
        second: action.second,
      };
    }
    case 'setFinal': {
      return {
        ...searchHelper,
        final: action.final,
      };
    }
  }
};

const useSearchHelper = () => {
  const [searchText, dispatch] = useReducer(searchTextReducer, { first: '', second: '', final: '' });

  const [currentSearchHelperContentType, setCurrentSearchHelperContentType] = useState<SearchHelperContentType | null>(
    'single',
  );

  useEffect(() => {
    if (currentSearchHelperContentType !== 'multiple') {
      dispatch({ type: 'setFinal', first: searchText.first! });
    }
  }, [searchText.first, searchText.second]);

  const setCombinateWithSearchHelperContent = (type: string, content: Function) => {
    let finalSearchHelperContent;
    if (type === 'multiple') {
      finalSearchHelperContent = content(searchText.first!, searchText.second!);
    } else finalSearchHelperContent = content(searchText.first!);

    dispatch({ type: 'setFinal', final: finalSearchHelperContent });
  };

  return {
    currentSearchHelperContentType,
    setCurrentSearchHelperContentType,
    setCombinateWithSearchHelperContent,
    searchText,
    dispatch,
  };
};

export default useSearchHelper;
