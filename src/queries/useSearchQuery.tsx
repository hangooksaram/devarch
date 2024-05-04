import { useQuery } from '@tanstack/react-query';
import { fetchSearch } from '../api/search';
import { useEffect, useState } from 'react';

interface SearchItems {
  title: string;
  formattedUrl: string;
  htmlSnippet: string;
}

interface SearchData {
  items: SearchItems[];
  queries: SearchQuery;
}

interface SearchQuery {
  nextPage: Page[];
}

interface Page {
  totalResults: string;
}

const useSearchQuery = (searchButtonClicked: number, query: string, start: number, num: number) => {
  const searchQuery = `https://www.googleapis.com/customsearch/v1?key=AIzaSyCl-eeN8euxto4fARCE2VuEgrEhtClFsHg&cx=f4f911bbb5b634155&q=${query}&start=${start < 10 ? 0 : start}&num=${num}`;
  const { data, isSuccess } = useQuery<SearchData>({
    queryKey: ['search', start, searchButtonClicked],
    queryFn: () => fetchSearch(searchQuery),
    enabled: typeof query === 'string' && searchButtonClicked > 0,
  });
  const [searchResults, setSearchResults] = useState<SearchItems[]>([]);

  const getTotalPageCount = () => {
    if (parseInt(data?.queries?.nextPage[0]?.totalResults!) > 100) {
      return 10;
    }

    return parseInt(data?.queries?.nextPage[0]?.totalResults!) / 10;
  };
  const totalPageCount = getTotalPageCount();

  useEffect(() => {
    if (data) {
      setSearchResults(data.items);
    }
  }, [data]);

  return { searchResults, isSuccess, totalPageCount };
};

export default useSearchQuery;
