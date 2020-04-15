Vue.component('show-lavel', {
  template: '<label v-for="label in options" v-bind:key="label.label">
      <input type="radio" v-model="current" v-bind:value="label.value" />
      {{ label.label }}
    </label>'
})
