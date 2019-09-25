import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { Search } from 'react-feather';

/* Routes */
import { EXPLORE_PAGE_ROUTE } from '../../../Routes';
  
import {
  SearchResultsWrapper,
  SearchBarWrapper,
  SearchResult
} from './styles/SearchBar';

import Textbox from './Textbox';
import { useSearchContext } from '../../../search/SearchProvider';

/* Constants */
import KEYCODE from '../../../constants/KeycodeConstants';

const SearchBar = ({ history }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const { searchWorker } = useSearchContext();

  const handleSearch = (event, text) => {
    if (event.keyCode === KEYCODE.ENTER) {
      history.push(`${EXPLORE_PAGE_ROUTE}?q=${encodeURIComponent(text)}`);
    }
  };

  const handleKeyStroke = (value) => {
    setSearchText(value);
    searchWorker.postMessage({ type: 'search', query: value });
    searchWorker.addEventListener('message', event => {
      const { type } = event.data;
      if (type === 'search') {
        const results = event.data.results;
        setSearchResults(results);
      }
    });
  }

  const renderSearchResults = () => {
    if (!searchResults) {
      return <SearchResult>Explore all courses and professors</SearchResult>;
    }

    const courseCodeResults = searchResults.courseCodeResults ?
      searchResults.courseCodeResults.map(result => (
        <SearchResult>Explore all {result.code.toUpperCase()} courses and professors</SearchResult>
      )) : searchText !== '' ? <SearchResult>Explore all courses and professors</SearchResult> : null;

    const courseResults = searchResults.courseResults ?
      searchResults.courseResults.map(result => (
        <SearchResult>{result.code.toUpperCase()} &mdash; {result.name}</SearchResult>
      )) : null;

    const profResults = searchResults.profResults ?
      searchResults.profResults.map(result => (
        <SearchResult>{result.name} &mdash; Professor</SearchResult>
      )) : null;

    return (
      <SearchResultsWrapper>
        {courseCodeResults}
        {courseResults}
        {profResults}
      </SearchResultsWrapper>
    );
  }

  const autocompleteResult = () => {
    return null;
  }

  return (
    <SearchBarWrapper>
      <Textbox
        icon={Search}
        text={searchText}
        setText={handleKeyStroke}
        placeholder="Explore or search for courses, subjects or professors"
        handleKeyDown={handleSearch}
        maxLength={100}
        autocompletePlaceholder={autocompleteResult}
      />
      {renderSearchResults()}
    </SearchBarWrapper>
  );
}

export default withRouter(SearchBar);