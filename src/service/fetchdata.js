
export function fetchData(
  { searchString, media, category },
  imgPerPage,
  currentPage
) {
  const baseURL =
    media === 'photo'
      ? 'https://pixabay.com/api/?'
      : 'https://pixabay.com/api/videos/?';
  const API_KEY = 'key=30360417-ab3f4917951fb9c0069edf9ea';
  const byCategory = category === '' ? '' : `&category=${category}`;
  const bySearchString = searchString === '' ? '' : `&q=${searchString}`;
  const type = media === 'photo' ? '&image_type=photo' : '';
  imgPerPage = `&per_page=${imgPerPage}`;
  currentPage = `&page=${currentPage}`;
  console.log(
    baseURL + API_KEY + byCategory + bySearchString + imgPerPage + currentPage
  );

  return fetch(
    baseURL +
      API_KEY +
      type +
      byCategory +
      bySearchString +
      imgPerPage +
      currentPage
  )
    .then(response => response.json())
    .then(data => {
      if (media === 'photo')
        return {
          totalHits: data.totalHits,
          arrayImg: data.hits.map(
            ({ id, webformatURL: small, largeImageURL: large, tags }) => ({
              id,
              small,
              large,
              tags,
            })
          ),
        };
      if (media === 'video') {
        console.log('video', data.hits[0].videos.tiny.url);
        return {
          totalHits: data.totalHits,
          arrayImg: data.hits.map(({ id, videos, tags }) => ({
            id,
            small: videos.tiny.url,
            large: videos.medium.url,
            tags,
          })),
        };
      }
    });
}
