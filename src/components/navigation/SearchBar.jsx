import React, { useState, useRef, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { compose } from 'redux';
import { Search, Layers, Square, User, Users } from 'react-feather';
import useOnClickOutside from 'use-onclickoutside';

/* Routes */
import { EXPLORE_PAGE_ROUTE, getCoursePageRoute, getProfPageRoute } from '../../Routes';

import { splitCourseCode } from '../../utils/Misc';

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
  ResultLeft,
} from './styles/SearchBar';

import Textbox from '../input/Textbox';
import { useSearchContext } from '../../search/SearchProvider';

/* Constants */
import KeycodeConstants from '../../constants/KeycodeConstants';

const SearchBar = ({ history, theme, isLanding = false, maximizeWidth = false }) => {
  const searchBarRef = useRef();
  const selectedResultRef = useRef();
  const inputRef = useRef();

  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState({
    courseCodeResults: [],
    courseResults: [],
    profResults: []
  });
  const { searchWorker } = useSearchContext();

  const handleUserKeyPress = useCallback(event => {
    const { keyCode } = event;
    if (keyCode === KeycodeConstants.ESCAPE) {
      setOpen(false);
    } else if (keyCode === KeycodeConstants.UP) {
      event.preventDefault();
      setSelectedResultIndex(Math.max(-1, selectedResultIndex - 1));
    } else if (keyCode === KeycodeConstants.DOWN) {
      event.preventDefault();
      const length = searchResults.courseResults.length + searchResults.profResults.length;
      setSelectedResultIndex(Math.min(length, selectedResultIndex + 1));
    }
  }, [selectedResultIndex]);
  
  const performSearch = event => {
    const { type } = event.data;
    if (type === 'autocomplete') {
      const results = event.data.results;
      setSearchResults(results);
      setSelectedResultIndex(-1);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  useEffect(() => {
    searchWorker.addEventListener('message', event => performSearch(event));
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      searchWorker.removeEventListener('message', event => performSearch(event));
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress, searchWorker]);

  useEffect(() => {
    if (selectedResultIndex === -1 && inputRef.current) {
      inputRef.current.focus();
    } else if (selectedResultRef.current) {
      selectedResultRef.current.focus();
    }
  }, [selectedResultIndex, selectedResultRef, inputRef]);

  useOnClickOutside(searchBarRef, () => setOpen(false));

  const queryExploreCourses = (query, codeSearch = false, profSearch = false) => {
    const codeTerm = codeSearch ? '&c=t' : '';
    const profTerm = profSearch ? '&t=p' : '';
    setOpen(false);
    history.push(`${EXPLORE_PAGE_ROUTE}?q=${encodeURIComponent(query)}${codeTerm}${profTerm}`);
  };

  const goToCourse = code => {
    setOpen(false);
    history.push(getCoursePageRoute(code));
  };

  const goToProf = code => {
    setOpen(false);
    history.push(getProfPageRoute(code));
  };

  const handleSearch = (event, text) => {
    if (event.keyCode === KeycodeConstants.ENTER) {
      queryExploreCourses(text);
    }
  };

  const handleKeyStroke = value => {
    setSearchText(value);
    setOpen(value !== '');
    searchWorker.postMessage({ type: 'autocomplete', query: value });
  };

  const exploreResult = (code = '', ref = null) => (
    <SearchResult onClick={() => queryExploreCourses(code, true)} key={code} ref={ref}>
      <ExploreText>
        <Layers />
        Explore all {code.toUpperCase()} courses and professors
      </ExploreText>
    </SearchResult>
  );

  const courseResult = (course, ref = null) => (
    <SearchResult
      onClick={() =>
        goToCourse(
          course.code
            .split(' ')
            .join('')
            .toLowerCase(),
        )
      } // convert back to raw code
      key={course.id}
      ref={ref}
    >
      <ResultLeft>
        <CourseText>
          <Square />
          {splitCourseCode(course.code.toUpperCase())}
        </CourseText>
        <Dash>&mdash;</Dash>
        {course.name}
      </ResultLeft>
      <ExploreCourseProfs
        onClick={e => {
          e.stopPropagation();
          queryExploreCourses(course.code, false, true);
        }}
      >
        <Users />
      </ExploreCourseProfs>
    </SearchResult>
  );

  const profResult = (prof, ref = null) => (
    <SearchResult onClick={() => goToProf(prof.code)} key={prof.id} ref={ref}>
      <ResultLeft>
        <ProfText>
          <User />
          {prof.name}
        </ProfText>
        <Dash>&mdash;</Dash>
        Professor
      </ResultLeft>
      <ExploreProfCourses
        onClick={e => {
          e.stopPropagation();
          queryExploreCourses(prof.name);
        }}
      >
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

    const courseCodeResults = searchResults.courseCodeResults.length > 0
      ? searchResults.courseCodeResults.map(result =>
          exploreResult(result.code, selectedResultIndex  === 0 ? selectedResultRef : null),
        )
      : [exploreResult('', selectedResultIndex  === 0 ? selectedResultRef : null)];

    const courseResults = searchResults.courseResults.map((result, i) => {
        return courseResult(result, selectedResultIndex === i + 1 ? selectedResultRef : null)
      });

    const profResults = searchResults.profResults.map((result, i) => {
      return profResult(result,
        selectedResultIndex === i + 1 + searchResults.courseResults.length ?
        selectedResultRef : null);
    });

    const allResults = [...courseCodeResults, ...courseResults, ...profResults];

    return (
      <SearchResultsWrapper maximizeWidth={maximizeWidth}>
        {allResults}
      </SearchResultsWrapper>
    );
  };

  const autocompleteResult = () => {
    return null;
  };

  const options = isLanding ? {
    width: '100%',
    backgroundColor: 'white',
    color: theme.primary,
    border: `2px solid ${theme.primary}`
  } : { width: '100%' }

  return (
    <SearchBarWrapper ref={searchBarRef} isLanding={isLanding}>
      <Textbox
        icon={<Search color={isLanding ? theme.primary : theme.dark3} />}
        text={searchText}
        setText={handleKeyStroke}
        placeholder="Explore or search for courses, subjects or professors"
        handleKeyDown={handleSearch}
        options={options}
        maxLength={100}
        autocompletePlaceholder={autocompleteResult()}
        forwardRef={inputRef}
      />
      {open && renderSearchResults()}
    </SearchBarWrapper>
  );
};

export default compose(withTheme, withRouter)(SearchBar);
