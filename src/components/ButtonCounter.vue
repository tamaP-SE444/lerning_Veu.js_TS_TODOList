<template>
  <button v-on:click="count++">You clicked me {{ count }} times.</button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ButtonCounter extends Vue {
  public counter = 0
  public get counterNum() {
    return this.counter;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
