import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

// We assume the connection to redux is already correct
// export class BurgerBuilder too so that we can access it in test file, and default export wrapped with connect()
// What remains is to pass all the required props and test whatever you want to test
describe("<BurgerBuilder />", () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
    });

    it("should render <BuildControls /> when receiving ingredients", () => {
        wrapper.setProps({ ings: { salad: 0 } });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
