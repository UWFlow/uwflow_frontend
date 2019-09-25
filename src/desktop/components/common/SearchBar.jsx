import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { Search } from 'react-feather';

/* Routes */
import { EXPLORE_PAGE_ROUTE } from '../../../Routes';
  
import Textbox from './Textbox';
import { useSearchContext } from '../../../search/SearchProvider';

/* Constants */
import KEYCODE from '../../../constants/KeycodeConstants';

const SearchBar = ({ history }) => {
  const [searchText, setSearchText] = useState('');
  const { searchWorker } = useSearchContext();

  const handleSearch = (event, text) => {
    if (event.keyCode === KEYCODE.ENTER) {
      history.push(`${EXPLORE_PAGE_ROUTE}?q=${encodeURIComponent(text)}`);
    }
  };

  const handleKeyStroke = (value) => {
    setSearchText(value);
    const results = searchWorker.postMessage({ data: value });
    console.log(searchWorker, results);
  }

  return (
    <div>
      <Textbox
        icon={Search}
        text={searchText}
        setText={handleKeyStroke}
        placeholder="Explore or search for courses, subjects or professors"
        handleKeyDown={handleSearch}
        maxLength={100}
      />
    </div>
  );
}

export default withRouter(SearchBar);