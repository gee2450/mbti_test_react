const SetMetaTags = ( title, description, imageUrl, url ) => {
  //set title
  document
    .querySelector('meta[property="og:title"]')
    .setAttribute("content", title);
  document
    .querySelector('meta[name="twitter:title"]')
    .setAttribute("content", title);
  //set description
  document
    .querySelector('meta[property="og:description"]')
    .setAttribute("content", description);
  document
    .querySelector('meta[name="twitter:description"]')
    .setAttribute("content", description);
  //set images
  document
    .querySelector('meta[property="og:image"]')
    .setAttribute("content", imageUrl);
  document
    .querySelector('meta[name="twitter:image"]')
    .setAttribute("content", imageUrl);
  //set url
  document
    .querySelector('meta[property="og:url"]')
    .setAttribute("content", url);
  document
    .querySelector('meta[name="twitter:url"]')
    .setAttribute("content", url);
}

export { SetMetaTags as setMetaTags };