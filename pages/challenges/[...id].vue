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
</script>

<template>
  <div class="challenge">
    <div class="challenge__container">
      <div class="challenge__body">
        <div class="challenge__left left">
          <TabsWrapper>
            <Tab title="Инструкция"> Инструкция </Tab>
            <Tab title="Решение"> Решение </Tab>
          </TabsWrapper>
        </div>
        <div class="challenge__right right">
          <TabsWrapper>
            <Tab title="Код"
              ><codemirror
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
                <FormButton
                  background="var(--color-warning)"
                  color="var(--color-text-primary)"
                  class="right__btn"
                  >Проверить</FormButton
                >
              </div>
            </Tab>
            <Tab title="Вывод"> asdf</Tab>
            <Tab title="Тесты"> </Tab>
          </TabsWrapper>
        </div>
      </div>
      <!-- {{ $route.params.id }} -->
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
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
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
  &__btns {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  &__btn {
    max-width: 200px;
  }
}
.tabs {
  border-bottom: 1px var(--color-text-link) solid;

  &__tab {
    padding: 1rem 1.2rem;
    font-size: 1.2rem;
    margin-bottom: -1px;
    border-bottom: 1px var(--color-text-link) solid;
    &.tab_active {
      color: var(--color-primary);
      // background: rgba(128, 128, 128, 0.225);
      border-bottom: 1px var(--color-primary) solid;
    }
  }
}
</style>
