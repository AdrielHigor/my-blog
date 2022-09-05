import React from "react";
import Register from "../../components/Register";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

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
})