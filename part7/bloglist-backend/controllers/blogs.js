const blogsRouter = require('express').Router();
const midware = require('../utils/middleware');
const Blog = require('../models/blog');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post('/', midware.userExtractor, async (req, res) => {
  const user = req.user;

  const blog = new Blog({
    ...req.body,
    user: user._id,
  });

  let result = await blog.save();
  result = await result.populate('user', { username: 1, name: 1 });
  user.blogs = user.blogs.concat(result._id);
  await user.save();

  res.status(201).json(result);
});

blogsRouter.delete('/:id', midware.userExtractor, async (req, res) => {
  // Verify the user
  const blog = await Blog.findById(req.params.id);
  const user = req.user;
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(req.params.id);
    user.blogs = user.blogs.filter((b) => b.toString() !== req.params.id);
    await user.save();

    res.status(204).end();
  } else {
    res.status(401).json({ error: 'no permission: invalid user' });
  }
});

blogsRouter.put('/:id', async (req, res) => {
  const opts = { new: true };
  const result = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    opts,
  ).populate('user', { username: 1, name: 1 });

  res.json(result);
});

module.exports = blogsRouter;
