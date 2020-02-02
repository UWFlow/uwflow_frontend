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
  ColoredResultText,
  Dash,
  ResultIcon,
  UnderlinedText,
  BoldText,
  ResultText,
  ExploreSideButton,
  EllipsisSpan,
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
      isLanding={isLanding}
    >
      <ResultIcon color={theme.primary}>
        <Layers />
      </ResultIcon>
      <ResultText>
        <EllipsisSpan>
          <ColoredResultText color={theme.primary}>
            {`Explore all ${code.toUpperCase()} courses and professors`}
          </ColoredResultText>
        </EllipsisSpan>
      </ResultText>
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
      isLanding={isLanding}
    >
      <ResultIcon color={theme.courses}>
        <Square />
      </ResultIcon>
      <ResultText>
        <ColoredResultText color={theme.courses}>
          {highlightText(formatCourseCode(course.code.toUpperCase()))}
        </ColoredResultText>
        <Dash>&mdash;</Dash>
        <EllipsisSpan>{highlightText(course.name, true)}</EllipsisSpan>
      </ResultText>
      <Tooltip content={`Explore professors that teach ${course.code}`}>
        <ExploreSideButton
          color={theme.professors}
          onClick={e => {
            e.stopPropagation();
            queryExploreCourses(course.code, false, true);
          }}
        >
          <Users />
        </ExploreSideButton>
      </Tooltip>
    </SearchResult>
  );

  const profResult = (prof, ref = null) => (
    <SearchResult
      onClick={() => goToProf(prof.code)}
      key={prof.code}
      ref={ref}
      isLanding={isLanding}
    >
      <ResultIcon color={theme.professors}>
        <User />
      </ResultIcon>
      <ResultText>
        <ColoredResultText color={theme.professors}>
          {highlightText(prof.name)}
        </ColoredResultText>
        <Dash>&mdash;</Dash>
        <EllipsisSpan>Professor</EllipsisSpan>
      </ResultText>
      <Tooltip content={`Explore courses taught by ${prof.name}`}>
        <ExploreSideButton
          color={theme.courses}
          onClick={e => {
            e.stopPropagation();
            queryExploreCourses(prof.name);
          }}
        >
          <Layers />
        </ExploreSideButton>
      </Tooltip>
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

  const options = isLanding
    ? {
        width: '100%',
        backgroundColor: `${theme.white}`,
        color: theme.primary,
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
        forwardRef={inputRef}
        onFocus={() => setOpen(true)}
      />
      {open && renderSearchResults()}
    </SearchBarWrapper>
  );
};

export default compose(withTheme, withRouter)(SearchBar);
