const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, b) => (acc += b.likes), 0);
};

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return null;
  }

  let max = 0,
    favorite = blogs[0];
  blogs.forEach((b, i) => {
    if (b.likes > max) {
      max = b.likes;
      favorite = blogs[i];
    }
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (!blogs.length) {
    return null;
  }

  const authors = _.countBy(blogs.map((b) => b.author));
  const topAuthor = maxKey(authors);

  return {
    author: topAuthor,
    blogs: authors[topAuthor],
  };
};

const mostLikes = (blogs) => {
  if (!blogs.length) {
    return null;
  }

  const authors = {};
  blogs.forEach(
    (b) => (authors[b.author] = (authors[b.author] || 0) + b.likes),
  );
  const topAuthor = maxKey(authors);

  return {
    author: topAuthor,
    likes: authors[topAuthor],
  };
};

const maxKey = (obj) =>
  Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
