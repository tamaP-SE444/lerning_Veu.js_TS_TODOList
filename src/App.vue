<template>
  <div id="app">
    <h1>チュートリアルToDoリスト</h1>

    <label v-for="label in options" v-bind:key="label.label">
      <input type="radio" v-model="current" v-bind:value="label.value" />
      {{ label.label }}
    </label>

    <!-- <show-label
      v-for="label in options"
      v-bind:key="label.label"
      v-bind:value="lavel.value"
    ></show-label> -->

    ({{ computedTodos.length }} 件を表示)

    <table>
      <thead v-pre>
        <tr>
          <th class="id">ID</th>
          <th class="comment">コメント</th>
          <th class="state">状態</th>
          <th class="button">-</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in computedTodos" v-bind:key="item.id" v-bind:class="{done:item.state}">
          <th>{{ item.id }}</th>
          <td>{{ item.comment }}</td>
          <td class="state">
            <!-- 状態変更ボタン -->
            <button v-on:click="doChangeState(item)">{{ labels[item.state] }}</button>
          </td>
          <td class="button">
            <!-- 削除ボタン -->
            <button v-on:click.ctrl="doRemove(item)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p>※削除ボタンはコントロールキーを押しながらクリックして下さい</p>

    <h2>新しい作業の追加</h2>
    <form class="add-form" v-on:submit.prevent="doAdd">
      <!-- コント入力フォーム -->
      コメント
      <input type="text" ref="comment" />
      <!-- 追加ボタン -->
      <button type="submit">追加</button>
    </form>
    <div id="components-demo">
　    <button-counter></button-counter>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Todo } from "@/todo";
import { todoStorage } from "@/todo-storage";
import HelloWorld from "./components/HelloWorld.vue";

@Component({
  components: {
    HelloWorld
  }
})

//test
//Vue.component('show-label', {
//  props: ['value'],
//  template: '<h3>{{ value }}</h3>'
//})

Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

new Vue({ el: '#components-demo' })

export default class App extends Vue {
  public todos: Todo[] = []
  public options = [
    { value: -1, label: "すべて" },
    { value: 0, label: "作業中" },
    { value: 1, label: "完了" }
  ];
  public current = -1;
  public get computedTodos() {
    return this.todos.filter(el => {
      return this.current < 0 ? true : this.current === el.state;
    });
  }
  public get labels() {
    return this.options.reduce(function(a, b) {
      return Object.assign(a, { [b.value]: b.label });
    }, {});
  }
  @Watch("todos", { deep: true })
  public todosChanged(todos: Todo[]) {
    todoStorage.save(todos);
  }
  public created() {
    this.todos = todoStorage.fetch();
  }
  public doAdd() {
    //refで名前をつけておいた要素を参照
    const comment = this.$refs.comment as HTMLInputElement;
    if (!comment.value.length) {
      return;
    }
    this.todos.push({
      id: todoStorage.uid++,
      comment: comment.value,
      state: 0
    });
    comment.value = "";
  }
  public doChangeState(item: Todo) {
    item.state = item.state ? 0 : 1;
  }
  public doRemove(item: Todo) {
    const index = this.todos.indexOf(item);
    this.todos.splice(index, 1);
  }
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
#app {
  max-width: 640px;
  margin: 0 auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead {
  th {
    border-bottom: 2px solid #0099e4; /*#d31c4a */
    color: #0099e4;
  }
  th.id {
    width: 50px;
  }
  th.state {
    width: 100px;
  }
  th.button {
    width: 60px;
  }
}
th,
th {
  padding: 0 8px;
  line-height: 40px;
}
tbody {
  td.button,
  td.state {
    text-align: center;
  }
  tr {
    td,
    th {
      border-bottom: 1px solid #ccc;
      transition: all 0.4s;
    }
  }
  tr.done {
    td,
    th {
      background: #f8f8f8;
      color: #bbb;
    }
  }
  tr:hover {
    td,
    th {
      background: #f4fbff;
    }
  }
}
button {
  border: none;
  border-radius: 20px;
  line-height: 24px;
  padding: 0 8px;
  background: #0099e4;
  color: #fff;
  cursor: pointer;
}
</style>
