import React from "react";
import Header from "../../../components/Header";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("Header Test Suite", () => {
    let component

    beforeEach(() => {
        component = shallow(<Header.WrappedComponent />)
    })

    test("Header rendering correctly", () => {
        expect(component).toMatchSnapshot();
    })
})