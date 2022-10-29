/// <reference types="vite/client" />

declare module "lodash-es";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
