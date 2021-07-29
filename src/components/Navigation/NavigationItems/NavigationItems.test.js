import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import NavigationItems from "./NavigationItems";
import NavigationItem from "../NavigationItem/NavigationItem";

// Enzyme allows to render only single component
configure({ adapter: new Adapter() }); // Configuring Enzyme to work with react

// Describe what your test does
// describe("<NavigationItems />", () => {
//     it("should render two <NavigationItem /> elements if not authenticated", () => {
//         // shallow does not render child components and have only placeholders for them
//         // helps in testing only single component and not the whole component tree
//         const wrapper = shallow(<NavigationItems />);
//         expect(wrapper.find(NavigationItem)).toHaveLength(2);
//     });

//     it("should render three <NavigationItem /> elements if not authenticated", () => {
//         const wrapper = shallow(<NavigationItems isAuthenticated />);
//         expect(wrapper.find(NavigationItem)).toHaveLength(3);
//     });
// });

// Describe what your test does
describe("<NavigationItems />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it("should render two <NavigationItem /> elements if not authenticated", () => {
        // shallow does not render child components and have only placeholders for them
        // helps in testing only single component and not the whole component tree
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it("should render three <NavigationItem /> elements if not authenticated", () => {
        wrapper.setProps({ isAuthenticated: true }); // Each test runs independent of each other, so only for this test props are set
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it("should contain <NavigationItem /> for /logout route", () => {
        wrapper.setProps({ isAuthenticated: true });
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(
            true
        );
    });
});
