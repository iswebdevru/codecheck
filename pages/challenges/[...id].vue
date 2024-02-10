<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { python } from "@codemirror/lang-python";
// import { oneDark } from "@codemirror/theme-one-dark";
import { darcula, darculaInit } from "@uiw/codemirror-theme-darcula";

useHead({
  title: "Задание",
});

const code = ref(`def hello_world():`);
const extensions = [python(), darcula];

// Codemirror EditorView instance ref
const view = shallowRef();
const handleReady = (payload: any) => {
  view.value = payload.view;
};

const route = useRoute();

const { data: challenge } = await useFetch(
  `/api/challenges/${route.params.id}`
);
let langs: any = [];
challenge.value.variants.forEach((item: any) => {
  langs.push(item.lang);
});
</script>

<template>
  <div class="challenge">
    <div class="challenge__container">
      <div class="challenge__body">
        <div class="challenge__left left">
          <TabsWrapper name="tabsChallengeLeft">
            <Tab title="Инструкция"> Инструкция </Tab>
            <Tab title="Решение"> Решение </Tab>
          </TabsWrapper>
        </div>
        <div class="challenge__right right">
          <TabsWrapper name="tabsChallengeRight">
            <template v-slot:top>
              <LanguageSelect
                @selectedLanguage="
                  (n) => {
                    console.log(n);
                  }
                "
                class="challenge__languages"
                :languages="langs"
              ></LanguageSelect>
            </template>

            <template v-slot:default>
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
              <Tab title="Тесты">
                <codemirror
                  v-model="code"
                  placeholder="Здесь пишем код"
                  :style="{
                    height: '300px',
                    'font-size': '1rem',
                  }"
                  :autofocus="true"
                  disabled
                  :indent-with-tab="true"
                  :tab-size="2"
                  :extensions="extensions"
                  @ready="handleReady"
                  @change="console.log('change', $event)"
                  @focus="console.log('focus', $event)"
                  @blur="console.log('blur', $event)"
                />
              </Tab>
            </template>
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
  &__languages {
    display: flex;
    justify-content: flex-end;
  }
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
</style>
