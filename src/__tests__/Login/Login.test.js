import React from "react";
import Login from "../../components/Login";
import webdriver from "selenium-webdriver";
import { shallow } from "enzyme";
import "../../setupTests";

describe("Login Test Suite", () => {
    test("Login rendering correctly", () => {
        const component = shallow(<Login.WrappedComponent />)

        expect(component).toMatchSnapshot();
    })

    test("Login submit form correctly", () => {
        let component
        jest
            .spyOn(React, 'useState')
            .mockImplementationOnce(() => ["testemail@teste.com", jest.fn()])
            .mockImplementationOnce(() => ["passw0rd", jest.fn()])

        const mockLogin = jest
            .spyOn(React, 'useCallback')
            .mockImplementation(() => { })

        component = shallow(<Login.WrappedComponent />);

        component.find("button").simulate("click");

        expect(mockLogin).toHaveBeenCalled();
    })

    test("Login correctly", () => {
        var browser = new webdriver.Builder().withCapabilities(webdriver.Capabilities.edge()).build();

        browser.get("http://localhost:3000/login");
        var email = browser.findElement(webdriver.By.xpath("//input[@type='email']"))
        var password = browser.findElement(webdriver.By.xpath("//input[@type='password']"))
        var submit = browser.findElement(webdriver.By.xpath("//input[@type='submit']"))

        email.sendKeys("test_user@teste.com")
        password.sendKeys("passw0rd")
        submit.click()

        expect(browser.getCurrentUrl()).toBe("http://localhost:3000/dashboard")

        browser.quit()
    })
})