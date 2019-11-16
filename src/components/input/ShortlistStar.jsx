import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { useMutation } from 'react-apollo';

/* Styled Components */
import { ShortlistStarWrapper } from './styles/ShortlistStar';

/* Selectors */
import { getIsLoggedIn } from '../../data/reducers/AuthReducer';
import { authModalOpen } from '../../data/actions/AuthActions';

/* GraphQL */
import { DELETE_USER_SHORTLIST, INSERT_USER_SHORTLIST } from '../../graphql/mutations/user/Shortlist';
import { GET_USER_SHORTLIST } from '../../graphql/queries/user/User';

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});

const ShortlistStar = ({ theme, courseID, isLoggedIn, initialState = false, size = 32 }) => {
  const userID = localStorage.getItem('user_id');

  const dispatch = useDispatch();
  const [checked, setChecked] = useState(initialState);
  const [insertShortlist] = useMutation(INSERT_USER_SHORTLIST, {
    update(cache, { data }) {
      const { user } = cache.readQuery({ query: GET_USER_SHORTLIST, variables: { id: userID } });
      const shortlist = user[0].shortlist;
      const shortlistCourse = data.insert_user_shortlist.returning[0];
      console.log(user, shortlist, shortlistCourse);

      cache.writeQuery({
        query: GET_USER_SHORTLIST,
        data: {
          user: [{ shortlist: shortlist.concat([shortlistCourse]) }],
          __typename: "user"
        },
        variables: { id: userID }
      });
    }
  });
  const [deleteShortlist] = useMutation(DELETE_USER_SHORTLIST);

  const onStarClicked = () => {
    if (!isLoggedIn) {
      dispatch(authModalOpen());
    } else {
      const mutationVariables = { variables: { user_id: userID, course_id: courseID } };
      if (checked) {
        deleteShortlist(mutationVariables);
      } else {
        insertShortlist(mutationVariables,);
      }
      setChecked(!checked);
    }
  }

  return (
    <ShortlistStarWrapper
      onClick={onStarClicked}
      checked={checked}
      width={size}
      color={checked ? theme.dark3 : theme.light4}
      strokeWidth={2}
    />
  );
};

ShortlistStar.propTypes = {
  theme: PropTypes.object.isRequired,
  courseID: PropTypes.number.isRequired,
  initialState: PropTypes.bool,
  size: PropTypes.number,
  onClick: PropTypes.func,
};

export default withTheme(connect(mapStateToProps)(ShortlistStar));
