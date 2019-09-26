import React, { useState, useRef, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { Search, Layers, Square, User, Users } from 'react-feather';
import useOnClickOutside from 'use-onclickoutside'

/* Routes */
import { EXPLORE_PAGE_ROUTE } from '../../../Routes';

import { splitCourseCode } from '../../../utils/Misc';

import {
  SearchResultsWrapper,
  SearchBarWrapper,
  SearchResult,
  ExploreText,
  CourseText,
  ProfText,
  Dash,
  ExploreCourseProfs,
  ExploreProfCourses,
  ResultLeft
} from './styles/SearchBar';

import Textbox from './Textbox';
import { useSearchContext } from '../../../search/SearchProvider';

/* Constants */
import KeycodeConstants from '../../../constants/KeycodeConstants';

const SearchBar = ({ history }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const { searchWorker } = useSearchContext();

  const handleUserKeyPress = useCallback(event => {
    const { keyCode } = event;
    if (keyCode === KeycodeConstants.ESCAPE) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    searchWorker.addEventListener('message', event => {
      const { type } = event.data;
      if (type === 'search') {
        const results = event.data.results;
        setSearchResults(results);
      }
    });

    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress, searchWorker]);

  useOnClickOutside(ref, () => setOpen(false));

  const queryExploreCourses = (text) => {
    history.push(`${EXPLORE_PAGE_ROUTE}?q=${encodeURIComponent(text)}`);
    setOpen(false);
  };

  const goToCourse = (id) => {
    history.push(`/course/${id}`);
    setOpen(false);
  };

  const goToProf = (id) => {
    history.push(`/prof/${id}`);
    setOpen(false);
  }

  const handleSearch = (event, text) => {
    if (event.keyCode === KeycodeConstants.ENTER) {
      queryExploreCourses(text);
    }
  };

  const handleKeyStroke = (value) => {
    setSearchText(value);
    setOpen(value !== '');
    searchWorker.postMessage({ type: 'search', query: value });
  }

  const exploreResult  = (code = '') => (
    <SearchResult
      onClick={() => queryExploreCourses(searchText)}
      key={code}
    >
      <ExploreText>
        <Layers />
        Explore all {code.toUpperCase()} courses and professors
      </ExploreText>
    </SearchResult>
  );

  const courseResult  = (course) => (
    <SearchResult
      onClick={() => goToCourse(course.id)}
      key={course.id}
    >
      <ResultLeft>
        <CourseText>
          <Square />
          {splitCourseCode(course.code.toUpperCase())}
        </CourseText>
        <Dash>&mdash;</Dash>
        {course.name}
      </ResultLeft>
      <ExploreCourseProfs>
        <Users />
      </ExploreCourseProfs>
    </SearchResult>
  );

  const profResult  = (prof) => (
    <SearchResult
      onClick={() => goToProf(prof.id)}
      key={prof.id}
    >
      <ResultLeft>
        <ProfText>
          <User />
          {prof.name}
        </ProfText>
        <Dash>&mdash;</Dash>
        Professor
      </ResultLeft>
      <ExploreProfCourses>
        <Layers />
      </ExploreProfCourses>
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
    <SearchBarWrapper ref={ref}>
      <Textbox
        icon={<Search />}
        text={searchText}
        setText={handleKeyStroke}
        placeholder="Explore or search for courses, subjects or professors"
        handleKeyDown={handleSearch}
        options={{
          padding: '8px 24px',
          fontSize: '14px',
          width: '640px',
          borderRadius: open ? '4px 4px 0 0' : '4px',
          fontWeight: '600'
        }}
        maxLength={100}
        autocompletePlaceholder={autocompleteResult()}
      />
      {open && renderSearchResults()}
    </SearchBarWrapper>
  );
}

export default withRouter(SearchBar);