import "jest";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/hello-world/hello-world.vue";

describe("HelloWorld.vue", () => {
  test("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
