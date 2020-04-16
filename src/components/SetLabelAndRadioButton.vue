<template>
  <label v-bind:key="label">
    <input type="radio" v-model="current" v-bind:value="value" />
    {{ label }}
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SetLabelAndRadioButton extends Vue {
  @Prop({ default: ''})
  public label!: string;
  @Prop({ default: 0})
  public value!: number; 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
