import React from "react";
import NewPost from "../../components/NewPost";
import { shallow } from "enzyme";
import "../../setupTests";

describe("NewPost Test Suite", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("NewPost rendering correctly", () => {
        const component = shallow(<NewPost.WrappedComponent />);
        expect(component).toMatchSnapshot();
    })

    test("NewPost Submit form correctly", () => {
        let component

        jest
            .spyOn(React, 'useState')
            .mockImplementationOnce(() => ["test description", jest.fn()])
            .mockImplementationOnce(() => ["http://testimage.com/teste_image.jpg", jest.fn()])
            .mockImplementationOnce(() => ["test", jest.fn()])
            .mockImplementationOnce(() => ["Test User", jest.fn()])

        const mockRegister = jest
            .spyOn(React, 'useCallback')
            .mockImplementation(() => { })

        component = shallow(<NewPost.WrappedComponent />);

        component.find("button").simulate("click");

        expect(mockRegister).toHaveBeenCalled();
    })

    test("NewPost Submit form incorrectly", () => {
        let component

        const mockRegister = jest
            .spyOn(React, 'useCallback')
            .mockImplementation(() => {
                alert("Todos os campos são obrigatórios");
            })

        const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => { });

        component = shallow(<NewPost.WrappedComponent />);

        component.find("button").simulate("click");

        expect(mockRegister).toHaveBeenCalled();
        expect(mockAlert).toHaveBeenCalled();
    })
})