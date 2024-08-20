const login = async (page, username, password) => {
  await page.getByText('Username:').getByRole('textbox').fill(username)
  await page.getByText('Password:').getByRole('textbox').fill(password)
  await page.getByRole('button', { name: 'Log in' }).click()
}

module.exports = {
  login,
}
