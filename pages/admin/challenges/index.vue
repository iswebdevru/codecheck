<script setup lang="ts">
import { Codemirror, install } from "vue-codemirror";
import { python } from "@codemirror/lang-python";

// import {
//   gutter,
//   lineNumbers,
//   lineNumberMarkers,
//   gutters,
//   GutterMarker,
// } from "@codemirror/";

import { basicSetup } from "codemirror";
import { darcula, darculaInit } from "@uiw/codemirror-theme-darcula";

import "@/assets/css/markdown.scss";
import hljs from "highlight.js";
import "highlight.js/styles/base16/github.css";
import Markdown from "markdown-it";

import {
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  highlightActiveLine,
  keymap,
} from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import {
  foldGutter,
  indentOnInput,
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  foldKeymap,
} from "@codemirror/language";
import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import {
  closeBrackets,
  autocompletion,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { lintKeymap } from "@codemirror/lint";

const nuxtApp = useNuxtApp();
nuxtApp.vueApp.use(install, { extensions: [] });
// app.use(install, { extensions: [] });

useHead({
  title: "Добавление задания",
});

definePageMeta({
  middleware: "admin",
});

const store = useChellengesStore();
const { currentLang, langs } = storeToRefs(store);
const { currentChallenge, initChallenges } = store;

await initChallenges();

const selecting = (item: any) => {
  currentLang.value = item.name;
};

// const code = ref(`def hello_world():`);
const codeExtensions = [
  python(),
  darculaInit({
    settings: {
      // fontFamily: "Consolas",
      // background: "#2b2b2b",
    },
  }),
  lineNumbers(),
  // highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  // foldGutter({}),
  drawSelection(),
  dropCursor(),
  indentOnInput(),
  EditorState.allowMultipleSelections.of(true),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  // highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
  ]),
];

const output = ref(`asdfdf`);
const outputExtensions = [
  darculaInit({
    settings: {
      // fontFamily: "Consolas",
    },
  }),
];

// const tests = ref(``);

const testsExtensions = [
  python(),
  darculaInit({
    settings: {
      // fontFamily: "Consolas",
    },
  }),
  lineNumbers(),
  // highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  // foldGutter({}),
  drawSelection(),
  dropCursor(),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  // highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
  ]),
];

// Codemirror EditorView instance ref
const view = shallowRef();
const handleReady = (payload: any) => {
  view.value = payload.view;
};

// // Status is available at all times via Codemirror EditorView
// const getCodemirrorStates = () => {
//   const state = view.value.state;
//   const ranges = state.selection.ranges;
//   const selected = ranges.reduce(
//     (r: any, range: any) => r + range.to - range.from,
//     0
//   );
//   const cursor = ranges[0].anchor;
//   const length = state.doc.length;
//   const lines = state.doc.lines;
//   // more state info ...
//   // return ...
// };

// const { data: langs } = await useFetch("/api/langs");

// const markdown = ref("");
const renderedMd = ref();
const parser = new Markdown({
  // html: true,

  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ""; // use external default escaping
  },
});

watch(
  () => {
    return currentChallenge().mdInstructrion;
  },
  () => {
    renderedMd.value = parser.render(currentChallenge().mdInstructrion);
  }
);
</script>

<template>
  <div class="challenge">
    <div class="challenge__container">
      <div class="challenge__body">
        <div class="challenge__left left">
          <TabsWrapper>
            <Tab title="Инструкция">
              <client-only>
                <AppTextarea
                  id="md"
                  v-model="currentChallenge().mdInstructrion"
                  placeholder="Markdown"
                  name="md"
                ></AppTextarea>
                <div v-html="renderedMd" class="markdown-body"></div>
              </client-only>
            </Tab>
            <Tab title="Решение"> Решение </Tab>
          </TabsWrapper>
        </div>
        <div class="challenge__right right">
          <TabsWrapper>
            <template v-slot:top>
              <LanguageSelect
                @selectedLanguage="selecting"
                class="challenge__languages"
                :languages="langs"
              ></LanguageSelect>
            </template>

            <template v-slot:default>
              <Tab title="Код"
                ><codemirror
                  v-model="currentChallenge().code"
                  placeholder="Здесь пишем код"
                  :style="{
                    height: '300px',
                    'font-size': '1rem',
                  }"
                  :autofocus="true"
                  :indent-with-tab="true"
                  :tab-size="2"
                  :extensions="codeExtensions"
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
              <Tab title="Вывод">
                <codemirror
                  v-model="output"
                  placeholder="Здесь пишем тесты"
                  :style="{
                    height: '300px',
                    'font-size': '1rem',
                  }"
                  :autofocus="true"
                  :indent-with-tab="true"
                  :tab-size="2"
                  :extensions="outputExtensions"
                  @ready="handleReady"
                  @change="console.log('change', $event)"
                  @focus="console.log('focus', $event)"
                  @blur="console.log('blur', $event)"
                />
              </Tab>
              <Tab title="Тесты">
                <codemirror
                  v-model="currentChallenge().test"
                  placeholder="Здесь пишем тесты"
                  :style="{
                    height: '300px',
                    'font-size': '1rem',
                  }"
                  :autofocus="true"
                  :indent-with-tab="true"
                  :tab-size="2"
                  :extensions="testsExtensions"
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

<style lang="scss">
// @use "@/assets/css/markdown" as *;

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
