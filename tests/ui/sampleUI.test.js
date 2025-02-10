import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { Builder } from 'selenium-webdriver'
import { ExamplePage } from '../../pages/samplePage.js'

describe('Example Page UI Tests', () => {

    let driver;
    let examplePage;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build()
        examplePage = new ExamplePage(driver)
    })

    afterAll(async () => {
        await driver.quit()
    })

    it('should have correct page title', async () => {
        await examplePage.navigate()
        const title = await examplePage.getTitle()
        expect(title).toBe('Example Domain')
    })

    it('should have correct heading', async () => {
        expect(await examplePage.isHeadingPresent()).toBe(true)
        const headingText = await examplePage.getHeadingText()
        expect(headingText).toBe('Example Domain')
    })

    it('should contain expected body text', async () => {
        const bodyText = await examplePage.getBodyText()
        expect(bodyText).toContain('for use in illustrative examples')
    })
})

