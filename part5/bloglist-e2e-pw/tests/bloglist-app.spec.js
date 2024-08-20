const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login } = require('./helper')

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
})
