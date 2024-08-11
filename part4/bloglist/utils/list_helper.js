const ld = require('lodash') // @TODO: ???

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, b) => acc += b.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) {
    return null
  }
  
  let max = 0, favorite = blogs[0]
  blogs.forEach((b, i) => {
    if (b.likes > max) {
      max = b.likes
      favorite = blogs[i]
    }
  })
  
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }
}

const mostBlogs = (blogs) => {
  if(!blogs.length) {
    return null
  }
  
  const authors = ld.countBy(blogs.map(b => b.author))
  let max = 0, topAuthor = blogs[0]
  for (a in authors) {
    if (authors[a] > max) {
      max = authors[a]
      topAuthor = a
    }
  }
  
  return {
    author: topAuthor,
    blogs: max,
  }  
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
