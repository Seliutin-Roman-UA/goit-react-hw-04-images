const { SearchContext } = require('components/context/context');
const { useContext } = require('react');

export function useSearchContext() {
  return useContext(SearchContext);
}
