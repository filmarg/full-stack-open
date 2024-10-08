const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // Empty DB and create user
    await request.post('/api/testing/reset')
    await request.post('/api/users/', {
      data: {
        username: '1stein',
        password: 'spacetime',
        name: 'Albert Einstein',
      }
    })
    await request.post('/api/users/', {
      data: {
        username: 'ideas_man',
        password: 'ilovesocrates',
        name: 'Plato',
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameInput = await page.getByText('Username:').getByRole('textbox')
    const passwordInput = await page.getByText('Password:').getByRole('textbox')
    const loginButton = await page.getByRole('button', { name: 'Log in' })

    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, '1stein', 'spacetime')
      await expect(page.getByText('Albert Einstein logged in', { exact: true })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, '1stein', 'pizzatime')

      const notification = await page.getByText('Failed: username or password invalid')

      await expect(notification).toBeVisible()
      await expect(notification).toHaveCSS('border-style', 'solid')
      await expect(notification).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Albert Einstein logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    const blog = {
      title: 'Teach Yourself Programming in Ten Years',
      author: 'Peter Norvig',
      url: 'https://www.norvig.com/21-days.html',
    }

    beforeEach(async ({ page }) => {
      await login(page, '1stein', 'spacetime')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, blog)
      await expect(page.getByText(`${blog.title}—${blog.author}`)).toBeVisible()
    })

    describe('And several blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, blog)
        await createBlog(page, { ...blog, title: '2nd blog' })
        await createBlog(page, { ...blog, title: '3rd blog' })
      })

      test('blog can be liked', async ({ page }) => {
        const div = await page.getByText(blog.title).locator('..')

        await div.getByRole('button', { name: 'View' }).click()
        await div.getByRole('button', { name: 'Like' }).click()

        await expect(page.getByText('Likes: 1')).toBeVisible()
      })

      test('blog can be deleted by its poster', async ({ page }) => {
        const div = await page.getByText(blog.title).locator('..')

        await div.getByRole('button', { name: 'View' }).click()
        page.on('dialog', dialog => dialog.accept())
        await div.getByRole('button', { name: 'Delete' }).click()

        await expect(page.getByText(blog.title)).not.toBeVisible()
      })

      test('only poster of blog can see its "Delete" button', async ({ page }) => {
        // Log out and in as someone else
        await page.getByRole('button', { name: 'Log out' }).click()
        await login(page, 'ideas_man', 'ilovesocrates')
        
        const div = await page.getByText(blog.title).locator('..')
        await div.getByRole('button', { name: 'View' }).click()

        await expect(div.getByRole('button', { name: 'Delete' })).not.toBeVisible()
      })

      test('blogs are arranged by likes in descending order', async ({ page }) => {
        // I had to use codegen to alleviate my suffering.  Looks
        // inconsistent but it works, so whatever.
        // 
        // Press "View" buttons
        await page.locator('div').filter({ hasText: /^ViewTeach Yourself Programming in Ten Years—Peter Norvig$/ }).getByRole('button', { name: 'View' }).click();
        await page.locator('div').filter({ hasText: /^View2nd blog—Peter Norvig$/ }).getByRole('button', { name: 'View' }).click()
        await page.getByRole('button', { name: 'View' }).click();
        // Press "Like" buttons: 2 for "2nd" and 1 for "3rd"
        await page.getByRole('button', { name: 'Like' }).nth(1).click();
        await page.locator('div').filter({ hasText: /^Likes: 1Like$/ }).getByRole('button', { name: 'Like' }).click()
        await page.getByRole('button', { name: 'Like' }).nth(2).click();

        const blogs = await page.locator('div').filter({ has: page.getByRole('button', { name: 'Hide' }) }).all()
        await expect(blogs[0]).toContainText('2nd blog')
        await expect(blogs[0]).toContainText('Likes: 2')
        await expect(blogs[1]).toContainText('3rd blog')
        await expect(blogs[0]).toContainText('Likes: 1')
        await expect(blogs[2]).toContainText('Teach Yourself Programming')
        await expect(blogs[0]).toContainText('Likes: 0')
      })
    })
  })
})
