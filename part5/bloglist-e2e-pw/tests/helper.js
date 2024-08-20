const login = async (page, username, password) => {
  await page.getByText('Username:').getByRole('textbox').fill(username)
  await page.getByText('Password:').getByRole('textbox').fill(password)
  await page.getByRole('button', { name: 'Log in' }).click()
}

const createBlog = async (page, blog) => {
  await page.getByRole('button', { name: 'Create new blog' }).click()
  await page.getByPlaceholder('Title').fill(blog.title)
  await page.getByPlaceholder('Author').fill(blog.author)
  await page.getByPlaceholder('URL').fill(blog.url)
  await page.getByRole('button', { name: 'Post' }).click()
  await page.getByText(`${blog.title}—${blog.author}`).waitFor()
}

module.exports = {
  login,
  createBlog,
}
