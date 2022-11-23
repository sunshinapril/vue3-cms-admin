<template>
  <svg aria-hidden="true" :class="svgClass">
    <use :href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`;
  }
  return "svg-icon";
});
</script>
<style scoped lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.1em;
  fill: currentColor;
  overflow: hidden;
}
</style>
