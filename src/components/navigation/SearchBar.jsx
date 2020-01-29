import React, { useState, useRef, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { withTheme } from 'styled-components';
import { compose } from 'redux';
import queryString from 'query-string';
import { Search, Layers, Square, User, Users } from 'react-feather';
import useOnClickOutside from 'use-onclickoutside';
import Highlighter from 'react-highlight-words';

/* Child Components */
import Tooltip from '../../components/display/Tooltip';

/* Routes */
import {
  EXPLORE_PAGE_ROUTE,
  getCoursePageRoute,
  getProfPageRoute,
} from '../../Routes';

import { formatCourseCode } from '../../utils/Misc';

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
  UnderlinedText,
  BoldText,
} from './styles/SearchBar';

import Textbox from '../input/Textbox';
import { useSearchContext } from '../../search/SearchProvider';

/* Constants */
import KeycodeConstants from '../../constants/KeycodeConstants';

const Highlight = ({ children }) => <UnderlinedText>{children}</UnderlinedText>;

const BoldHighlight = ({ children }) => (
  <BoldText>
    <UnderlinedText>{children}</UnderlinedText>
  </BoldText>
);

const SearchBar = ({
  location,
  history,
  theme,
  isLanding = false,
  maximizeWidth = false,
}) => {
  const { q: query } = queryString.parse(location.search);

  const searchBarRef = useRef();
  const selectedResultRef = useRef();
  const inputRef = useRef();

  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState(query ? query : '');
  const [searchResults, setSearchResults] = useState({
    courseCodeResults: [],
    courseResults: [],
    profResults: [],
  });
  const { searchWorker } = useSearchContext();

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

  const handleUserKeyPress = useCallback(
    event => {
      const { keyCode } = event;
      if (keyCode === KeycodeConstants.ESCAPE) {
        setOpen(false);
      } else if (keyCode === KeycodeConstants.UP) {
        event.preventDefault();
        setSelectedResultIndex(Math.max(-1, selectedResultIndex - 1));
      } else if (keyCode === KeycodeConstants.DOWN) {
        event.preventDefault();
        const length =
          Math.max(searchResults.courseCodeResults.length, 1) +
          searchResults.courseResults.length +
          searchResults.profResults.length;
        setSelectedResultIndex(Math.min(length - 1, selectedResultIndex + 1));
      }
    },
    [selectedResultIndex, searchResults],
  );

  useEffect(() => {
    searchWorker.addEventListener('message', event => performSearch(event));
    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      searchWorker.removeEventListener('message', event =>
        performSearch(event),
      );
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

  useEffect(() => {
    if (inputRef.current) {
      setOpen(false);
      inputRef.current.blur();
    }
  }, [inputRef]);

  useOnClickOutside(searchBarRef, () => setOpen(false));

  const queryExploreCourses = (
    query,
    codeSearch = false,
    profSearch = false,
  ) => {
    if (query === '' || !query) {
      history.push(EXPLORE_PAGE_ROUTE);
    }

    const codeTerm = codeSearch ? '&c=t' : '';
    const profTerm = profSearch ? '&t=p' : '';
    setOpen(false);
    history.push(
      `${EXPLORE_PAGE_ROUTE}?q=${encodeURIComponent(
        query,
      )}${codeTerm}${profTerm}`,
    );
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
    setOpen(true);
    searchWorker.postMessage({ type: 'autocomplete', query: value });
  };

  const queryTokens = searchText
    .split(' ')
    .map(term => formatCourseCode(term))
    .join(' ')
    .split(' ');

  const highlightText = (text, bold = false) => (
    <Highlighter
      highlightTag={bold ? BoldHighlight : Highlight}
      autoEscape={true}
      searchWords={queryTokens}
      textToHighlight={text}
    />
  );

  const exploreResult = (code = '', ref = null) => (
    <SearchResult
      onClick={() => queryExploreCourses(code, code !== '')}
      key={code}
      ref={ref}
    >
      <ResultLeft>
        <ExploreText>
          <Layers />
          {`Explore all ${code.toUpperCase()} courses and professors`}
        </ExploreText>
      </ResultLeft>
    </SearchResult>
  );

  const courseResult = (course, ref = null) => (
    <SearchResult
      onClick={() =>
        // convert back to raw code
        goToCourse(
          course.code
            .split(' ')
            .join('')
            .toLowerCase(),
        )
      }
      key={course.code}
      ref={ref}
    >
      <Tooltip id={`${course.code}`} />
      <ResultLeft>
        <CourseText>
          <Square />
          {highlightText(formatCourseCode(course.code.toUpperCase()))}
        </CourseText>
        <Dash>&mdash;</Dash>
        {highlightText(course.name, true)}
      </ResultLeft>
      <ExploreCourseProfs
        data-tip={`Explore professors that teach ${course.code}`}
        data-for={`${course.code}`}
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
    <SearchResult onClick={() => goToProf(prof.code)} key={prof.code} ref={ref}>
      <Tooltip id={`${prof.code}`} />
      <ResultLeft>
        <ProfText>
          <User />
          {highlightText(prof.name)}
        </ProfText>
        <Dash>&mdash;</Dash>
        Professor
      </ResultLeft>
      <ExploreProfCourses
        data-tip={`Explore courses taught by ${prof.name}`}
        data-for={`${prof.code}`}
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
    const courseResults = searchResults.courseResults.map((result, i) => {
      return courseResult(
        result,
        selectedResultIndex === i ? selectedResultRef : null,
      );
    });

    let offset = courseResults.length;
    const profResults = searchResults.profResults.map((result, i) => {
      return profResult(
        result,
        selectedResultIndex === i + offset ? selectedResultRef : null,
      );
    });

    offset += profResults.length;
    const courseCodeResults =
      searchResults.courseCodeResults.length > 0
        ? searchResults.courseCodeResults.map((result, i) =>
            exploreResult(
              result.code,
              selectedResultIndex === i + offset ? selectedResultRef : null,
            ),
          )
        : [
            exploreResult(
              '',
              selectedResultIndex === offset ? selectedResultRef : null,
            ),
          ];

    const allResults = [...courseResults, ...profResults, ...courseCodeResults];

    return (
      <SearchResultsWrapper maximizeWidth={maximizeWidth}>
        {allResults}
      </SearchResultsWrapper>
    );
  };

  // TODO(Edwin)
  const autocompleteResult = () => {
    return null;
  };

  const options = isLanding
    ? {
        width: '100%',
        backgroundColor: `${theme.white}`,
        color: theme.primary,
        border: `2px solid ${theme.primary}`,
        borderRadius: open ? '4px 4px 0 0' : '4px',
      }
    : { width: '100%', borderRadius: open ? '4px 4px 0 0' : '4px' };

  return (
    <SearchBarWrapper ref={searchBarRef} isLanding={isLanding}>
      <Textbox
        icon={
          <Search size={20} color={isLanding ? theme.primary : theme.dark3} />
        }
        text={searchText}
        setText={handleKeyStroke}
        placeholder="Search for courses, subjects or professors"
        handleKeyDown={handleSearch}
        options={options}
        maxLength={100}
        autocompletePlaceholder={autocompleteResult()}
        forwardRef={inputRef}
        onFocus={() => setOpen(true)}
      />
      {open && renderSearchResults()}
    </SearchBarWrapper>
  );
};

export default compose(withTheme, withRouter)(SearchBar);
