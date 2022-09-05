import React from "react";
import Login from "../../../components/Login";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

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
})