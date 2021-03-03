<script lang="ts">
import { DirectiveBinding } from "vue";

export default {
  mounted(el: any, binding: DirectiveBinding) {
    if (process.env.NODE_ENV === "development") {
      el.dataset.test = binding.value;
    }
  }
};
</script>
