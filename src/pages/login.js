export class Login {
  constructor(page) {
    this.state = {
      page,
      url: 'https://the-internet.herokuapp.com/login',
      selectors: {
        username: '#username',
        password: '#password',
        submit: 'button[type="submit"]',
        message: '#flash',
        messageContent: '#content'
      }
    }
  }

  async puppeteerPage() {
    await this.state.page.goto(this.state.url);
  }

  async login(username, password) {
    await this.state.page.click(this.state.selectors.username);
    await this.state.page.type(this.state.selectors.username, username);

    await this.state.page.click(this.state.selectors.password);
    await this.state.page.type(this.state.selectors.password, password);

    await this.state.page.click(this.state.selectors.submit);
  }

  async message() {
    const messageText = await this.state.page.$eval(this.state.selectors.message, element => element.innerText.trim());

    return messageText.replace(/[^a-zA-Z ]/g, "");
  }
}
