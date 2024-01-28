<script setup>
import { Codemirror } from "vue-codemirror";
import { python } from "@codemirror/lang-python";
// import { oneDark } from "@codemirror/theme-one-dark";
import { darcula, darculaInit } from "@uiw/codemirror-theme-darcula";

const code = ref(`def hello_world():`);
const extensions = [python(), darcula];

// Codemirror EditorView instance ref
const view = shallowRef();
const handleReady = (payload) => {
  view.value = payload.view;
};

// Status is available at all times via Codemirror EditorView
const getCodemirrorStates = () => {
  const state = view.value.state;
  const ranges = state.selection.ranges;
  const selected = ranges.reduce((r, range) => r + range.to - range.from, 0);
  const cursor = ranges[0].anchor;
  const length = state.doc.length;
  const lines = state.doc.lines;
  // more state info ...
  // return ...
};

// export default defineComponent({
//   components: {
//     Codemirror,
//   },
//   setup() {

//

//     return {
//       code,
//       extensions,
//       handleReady,
//       log: console.log,
//     };
//   },
// });
</script>

<template>
  <div class="challenge">
    <div class="challenge__container">
      <div class="challenge__body">
        <div class="challenge__left left">
          <div class="left__tabs tabs">
            <button class="tabs__tab">Инструкции</button>
          </div>
          <div class="left__body">
            <div class="left__top">
              <h2 class="left__title"></h2>
              <div class="left__tags">
                <span class="left__tag">ffff</span>
              </div>
            </div>
            <div class="left__bottom"></div>
          </div>
        </div>
        <div class="challenge__right right">
          <div class="right__tabs tabs">
            <button class="tabs__tab">Код</button>
            <button class="tabs__tab">Вывод</button>
            <button class="tabs__tab">Тесты</button>
          </div>
          <div class="right__body">
            <codemirror
              v-model="code"
              placeholder="Здесь пишем код"
              :style="{
                height: '300px',
                'font-size': '1rem',
              }"
              :autofocus="true"
              :indent-with-tab="true"
              :tab-size="2"
              :extensions="extensions"
              @ready="handleReady"
              @change="console.log('change', $event)"
              @focus="console.log('focus', $event)"
              @blur="console.log('blur', $event)"
            />
            <div class="right__btns">
              <button class="right__btn">Проверить</button>
            </div>
          </div>
        </div>
      </div>
      {{ $route.params.id }}
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.cm-editor) {
  border-radius: 5px;
}
.challenge {
  margin-top: 2rem;
  &__container {
    margin: 0 auto;
    max-width: var(--width-container);
    padding-right: 1rem;
    padding-left: 1rem;
  }
  &__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }
}

.left {
  &__body {
    margin-top: 2rem;
  }
}
.right {
  &__body {
    margin-top: 2rem;
  }
}
.tabs {
  border-bottom: 1px rgba(128, 128, 128, 0.334) solid;
  &__tab {
    padding: 1rem 1.2rem;
    font-size: 1.2rem;
    &:hover {
      color: var(--color-primary);
      // background: rgba(128, 128, 128, 0.225);
      border-bottom: 1px var(--color-primary) solid;
    }
  }
}
</style>
