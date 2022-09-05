import React from "react";
import Dashboard from "../../components/Dashboard";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme";
import { Link } from "react-router-dom";

configure({ adapter: new Adapter() });

describe("Dashboard Test Suite", () => {
    test("Dashboard rendering correctly", () => {
        let component

        jest
            .spyOn(React, 'useState')
            .mockImplementationOnce(() => ["Test User", jest.fn()])
            .mockImplementationOnce(() => ["user", jest.fn()])
            .mockImplementationOnce(() => ["testemail@teste.com", jest.fn()])

        component = shallow(<Dashboard.WrappedComponent />)

        expect(component.text()).toContain("testemail@teste.com")
        expect(component.text()).toContain("Test User")

        expect(component.html()).toMatchSnapshot();
    })

    test("Dashboard showing add post for admin", () => {
        let component

        jest
            .spyOn(React, 'useState')
            .mockImplementationOnce(() => ["Test Admin", jest.fn()])
            .mockImplementationOnce(() => ["admin", jest.fn()])
            .mockImplementationOnce(() => ["testemail@teste.com", jest.fn()])

        component = shallow(<Dashboard.WrappedComponent />)

        expect(component.find(Link).length).toEqual(1);
    })

    test("Dashboard hiding add post for normal user", () => {
        let component

        jest
            .spyOn(React, 'useState')
            .mockImplementationOnce(() => ["Test User", jest.fn()])
            .mockImplementationOnce(() => ["user", jest.fn()])
            .mockImplementationOnce(() => ["testemail@teste.com", jest.fn()])

        component = shallow(<Dashboard.WrappedComponent />)

        expect(component.find(Link).length).toEqual(0);
    })
})