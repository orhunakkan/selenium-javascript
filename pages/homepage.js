import { By } from 'selenium-webdriver';

class HomePage {
  constructor(driver) {
    this.driver = driver;
    this.chapter3Card = By.xpath("//*[contains(text(), 'Chapter 3')]");
    this.chapter4Card = By.xpath("//*[contains(text(), 'Chapter 4')]");
    this.chapter5Card = By.xpath("//*[contains(text(), 'Chapter 5')]");
    this.chapter7Card = By.xpath("//*[contains(text(), 'Chapter 7')]");
    this.chapter8Card = By.xpath("//*[contains(text(), 'Chapter 8')]");
    this.chapter9Card = By.xpath("//*[contains(text(), 'Chapter 9')]");
  }
}

export default HomePage;
