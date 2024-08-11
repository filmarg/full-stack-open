const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of list with 0 blogs: is 0', () => {
    assert.strictEqual(listHelper.totalLikes(blogsZero),
                       0)
  })

  test('of list with 1 blog: is number of likes of that blog', () => {
    assert.strictEqual(listHelper.totalLikes(blogsOne),
                       5)
  })

  test('of list with >1 blogs: is sum of likes of those blogs', () => {
    assert.strictEqual(listHelper.totalLikes(blogs),
                       36)
  })
})

describe('favorite blog', () => {
  test('of list with 0 blogs: is null', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogsZero),
                           null)
  })

  test('of list with 1 blog: is that blog', () => {
    const favoriteBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    }

    assert.deepStrictEqual(listHelper.favoriteBlog(blogsOne),
                           favoriteBlog)
  })

  test('of list with >1 blogs: is one blog with most likes', () => {
    const favoriteBlog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    }

    assert.deepStrictEqual(listHelper.favoriteBlog(blogs),
                           favoriteBlog)
  })
})

describe('most blogs', () => {
  test('of list with 0 blogs: is null', () => {
    assert.strictEqual(listHelper.mostBlogs(blogsZero),
                       null)
  })

  test('of list with 1 blog: is author of that blog', () => {
    const topAuthor = {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    }

    assert.deepStrictEqual(listHelper.mostBlogs(blogsOne),
                           topAuthor)
  })

  test('of list with >1 blogs: is author of greatest number of blogs', () => {
    const topAuthor = {
      author: 'Robert C. Martin',
      blogs: 3,
    }

    assert.deepStrictEqual(listHelper.mostBlogs(blogs),
                           topAuthor)
  })
})

describe('most likes', () => {
  test('of list with 0 blogs: is null', () => {
    assert.strictEqual(listHelper.mostLikes(blogsZero),
                       null)
  })

  test('of list with 1 blog: is author of that blog', () => {
    const topAuthor = {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    }

    assert.deepStrictEqual(listHelper.mostLikes(blogsOne),
                           topAuthor)
  })

  test('of list with >1 blogs: is author with greatest number of likes', () => {
    const topAuthor = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    }

    assert.deepStrictEqual(listHelper.mostLikes(blogs),
                           topAuthor)
  })
})

const blogsZero = []

const blogsOne = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }, {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }, {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }, {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  }, {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  }, {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]
