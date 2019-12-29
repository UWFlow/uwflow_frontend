import moment from 'moment';

export const sortReviews = (reviews, sortByTime) =>
  reviews.sort((a, b) => {
    if (b.user) {
      return 1;
    } else if (a.user) {
      return -1;
    }

    const timeSort =
      moment(b.created_at).format('YYYYMMDD') -
      moment(a.created_at).format('YYYYMMDD');
    return sortByTime
      ? timeSort
      : b.upvotes === a.upvotes
      ? timeSort
      : b.upvotes - a.upvotes;
  });
