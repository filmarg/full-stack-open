const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameInput = page.getByText('Username:').getByRole('textbox')
    const passwordInput = page.getByText('Password:').getByRole('textbox')
    const loginButton = page.getByRole('button', { name: 'Log in' })
    
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginButton).toBeVisible()
  })
})
