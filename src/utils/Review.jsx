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

// used to sort profs on course prof reviews and also sort courses on prof page
export const sortByReviews = (a, b, defaultSort = () => 0) =>
  a.reviews.length === b.reviews.length
    ? defaultSort(a, b)
    : b.reviews.length - a.reviews.length;

export const sortByLiked = (a, b, defaultSort = sortByReviews) =>
  a.liked === b.liked
    ? defaultSort(a, b)
    : a.liked === null
    ? 1
    : b.liked === null
    ? -1
    : b.liked - a.liked;
