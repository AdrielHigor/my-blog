import React from "react";
import Post from "../../../components/Post";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

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