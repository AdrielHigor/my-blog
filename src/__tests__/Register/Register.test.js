import React from "react";
import Register from "../../components/Register";
import webdriver from "selenium-webdriver";
import { shallow } from "enzyme";
import "../../setupTests";

describe("Register Test Suite", () => {
    test("Register rendering correctly", () => {
        const component = shallow(<Register.WrappedComponent />)
        expect(component.html()).toMatchSnapshot();
    })

    test("Register submit form correctly", () => {
        let component

        jest
            .spyOn(React, 'useState')
            .mockImplementationOnce(() => ["Test User", jest.fn()])
            .mockImplementationOnce(() => ["testemail@teste.com", jest.fn()])
            .mockImplementationOnce(() => ["passw0rd", jest.fn()])

        const mockRegister = jest
            .spyOn(React, 'useCallback')
            .mockImplementation(() => { })

        component = shallow(<Register.WrappedComponent />);

        component.find("button").simulate("click");

        expect(mockRegister).toHaveBeenCalled();
    })

    test("Register correctly", () => {
        var browser = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build();

        browser.get("http://localhost:3000/register");
        var name = browser.findElement(webdriver.By.xpath("//input[@type='text']"))
        var email = browser.findElement(webdriver.By.xpath("//input[@type='email']"))
        var password = browser.findElement(webdriver.By.xpath("//input[@type='password']"))
        var submit = browser.findElement(webdriver.By.xpath("//input[@type='submit']"))

        name.sendKeys("Test Users")
        email.sendKeys("test_user@teste.com")
        password.sendKeys("passw0rd")
        submit.click()

        expect(browser.getCurrentUrl()).toBe("http://localhost:3000/dashboard")

        browser.quit()
    })
})