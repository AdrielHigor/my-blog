import React from "react";
import Home from "../../components/Home";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import "../../setupTests";

describe("Home Test Suite", () => {
    let component

    jest.mock('../../firebase', () => {
        return {
            app: {
                ref: jest.fn(() => ({
                    on: jest.fn()
                }))
            }
        };
    });

    beforeEach(() => {
        component = shallow(<Home />)
        component.setState({ posts: [] })
    })

    test("Home rendering correctly", () => {
        expect(component.html()).toMatchSnapshot();
    })

    test("Home with empty posts state", () => {
        expect(component.find("section").children().length).toEqual(0);
        expect(component.find(Link).length).toEqual(0);
    })

    test("Home with data in posts state", () => {
        component.setState({
            posts: [{
                key: 1,
                description: "post",
                author: "Test Author",
                title: "Test Post",
                image: "http://testimage.com/test_image.jpg",
            }]
        })

        expect(component.find("section").children().length).toBeGreaterThan(0);
        expect(component.find(Link).length).toBeGreaterThan(0);
    })
})
