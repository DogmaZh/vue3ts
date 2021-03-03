import { mount } from "@vue/test-utils";
import baseSelect from "@/components/base/base-select/base-select.vue";

describe("base-select.vue", () => {
  test("renders passed items in options", () => {
    const wrapper = mount(baseSelect, {
      props: { items: ["item1", "item2"] }
    });
    expect(wrapper.findAll("option")).toHaveLength(2);
  });
});
