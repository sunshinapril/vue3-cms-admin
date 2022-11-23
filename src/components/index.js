import svgIcon from "@/components/SvgIcon/index.vue";
import "virtual:svg-icons-register";
export function setupComponents(app) {
  app.component("svg-icon", svgIcon);
}
