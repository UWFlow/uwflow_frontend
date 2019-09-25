import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { compose } from 'redux';
import { Search } from 'react-feather';

/* Routes */
import { EXPLORE_PAGE_ROUTE } from '../../../Routes';

import { SPLIT_COURSE_CODE_REGEX } from '../../../utils/Misc';

import {
  SearchResultsWrapper,
  SearchBarWrapper,
  SearchResult,
  ExploreText,
  CourseText,
  ProfText,
  Dash
} from './styles/SearchBar';

import Textbox from './Textbox';
import { useSearchContext } from '../../../search/SearchProvider';

/* Constants */
import KEYCODE from '../../../constants/KeycodeConstants';

const SearchBar = ({ history, theme }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const { searchWorker } = useSearchContext();

  const queryExploreCourses = (text) => {
    history.push(`${EXPLORE_PAGE_ROUTE}?q=${encodeURIComponent(text)}`);
  };

  const handleSearch = (event, text) => {
    if (event.keyCode === KEYCODE.ENTER) {
      queryExploreCourses(text);
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

  const exploreResult  = (code = '') => (
    <SearchResult onClick={() => queryExploreCourses(searchText)} hoverColor={theme.primary}>
      <ExploreText>
        Explore all {code.toUpperCase()} courses and professors
      </ExploreText>
    </SearchResult>
  );

  const courseResult  = (course) => (
    <SearchResult onClick={() => queryExploreCourses(searchText)} hoverColor={theme.courses}>
      <CourseText>
        {course.code.toUpperCase().match(SPLIT_COURSE_CODE_REGEX).join(' ')}
      </CourseText>
      <Dash>&mdash;</Dash>
      {course.name}
    </SearchResult>
  );

  const profResult  = (prof) => (
    <SearchResult onClick={() => queryExploreCourses(searchText)} hoverColor={theme.professors}>
      <ProfText>{prof.name}</ProfText>
      <Dash>&mdash;</Dash>
      Professor
    </SearchResult>
  );

  const renderSearchResults = () => {
    if (searchText === '') {
      return null;
    }

    if (!searchResults) {
      return exploreResult();
    }

    const courseCodeResults = searchResults.courseCodeResults && searchResults.courseCodeResults.length > 0 ?
      searchResults.courseCodeResults.map(result => exploreResult(result.code)) : exploreResult();

    const courseResults = searchResults.courseResults ?
      searchResults.courseResults.map(course => courseResult(course)) : null;

    const profResults = searchResults.profResults ?
    searchResults.profResults.map(prof => profResult(prof)) : null;

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
        options={{ fontSize: '18px', width: '640px' }}
        maxLength={100}
        autocompletePlaceholder={autocompleteResult}
      />
      {renderSearchResults()}
    </SearchBarWrapper>
  );
}

export default compose(withRouter, withTheme)(SearchBar);