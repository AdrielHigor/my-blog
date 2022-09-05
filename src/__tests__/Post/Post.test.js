import React from "react";
import Post from "../../components/Post";
import { shallow } from "enzyme";
import "../../setupTests";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => ({
        postId: 'post-id1',
    }),
    useRouteMatch: () => ({ url: '/post/post-id1' }),
}));

test("Post rendering correctly", () => {
    const component = shallow(<Post />)

    expect(component.html()).toMatchSnapshot();
}) 