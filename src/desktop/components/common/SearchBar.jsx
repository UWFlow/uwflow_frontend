import React from 'react';

import { withSearch } from '../../../search/withSearch';

const SearchBar = ({ searchClient }) => {
  return (
    <div>
      <Textbox
        value={'hi'}
      />
    </div>
  );
}

export default withSearch(SearchBar);