import React from "react";
import Header from "../../components/Header";
import { shallow } from "enzyme";
import "../../setupTests";

describe("Header Test Suite", () => {
    let component

    beforeEach(() => {
        component = shallow(<Header.WrappedComponent />)
    })

    test("Header rendering correctly", () => {
        expect(component).toMatchSnapshot();
    })
})