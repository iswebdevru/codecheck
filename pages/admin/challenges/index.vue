<script setup lang="ts">
import { Codemirror, install } from "vue-codemirror";
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
  EditorView,
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

useHead({
  title: "Добавление задания",
});

definePageMeta({
  middleware: "admin",
});

useState("leftTabs").value = "Инструкция";
useState("rightTabs").value = "Код";

const store = useAdminChellengeVariantsStore();
const { currentLang, langs, challenges } = storeToRefs(store);
const { currentChallenge, initChallenges } = store;

await initChallenges();

const selecting = (item: any) => {
  currentLang.value = item.name;
};

// const code = ref(`def hello_world():`);
const codeExtensions = computed(() => {
  let result = [
    darculaInit({}),
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    history(),
    foldGutter({}),
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
    highlightActiveLine(),
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
  result.push(langExtension(currentLang.value));
  return result;
});

const output = ref(
  `Это - вывод. Нажмите кнопку "Проверить код", и здесь появятся резултаты тестов. Сами тесты находятся во вкладке "Тесты`
);

const outputExtensions = [
  EditorView.lineWrapping,

  darculaInit({
    settings: {
      // fontFamily: "Consolas",
    },
  }),
];

// const tests = ref(``);

const testsExtensions = computed(() => {
  let result = [
    darculaInit({}),
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightSpecialChars(),
    history(),
    foldGutter({}),
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
    highlightActiveLine(),
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
  result.push(langExtension(currentLang.value));
  return result;
});

// Codemirror EditorView instance ref
const view = shallowRef();
const handleReady = (payload: any) => {
  view.value = payload.view;
};

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

currentChallenge().test = `import unittest

from solution_code import *

class TestMethods(unittest.TestCase):

    def test_function(self):
        self.assertEqual(addition(1), 2)


if __name__ == "__main__":
    unittest.main()`;

currentChallenge().code = `def addition(n):
 `;

const btnLoading = ref(true);

const { start, finish } = useLoadingIndicator();

const check = async () => {
  start();
  btnLoading.value = false;
  const resCheck: any = await $fetch("/api/check", {
    method: "POST",
    body: {
      lang: currentLang.value,
      code: currentChallenge().code,
      test: currentChallenge().test,
    },
  });
  useState("rightTabs").value = "Вывод";
  finish();
  output.value = new TextDecoder().decode(
    Uint8Array.from(
      atob(resCheck.stdout)
        .split("")
        .map((x) => x.charCodeAt(0))
    )
  );
  btnLoading.value = true;
};

const challengeName = ref("");
const challengeDescription = ref("");

const { data: tags } = useFetch("/api/tags");
const selectedTags = ref();

const addChallenge = async () => {
  const data = await $fetch("/api/challenges", {
    method: "POST",
    body: {
      name: challengeName.value,
      description: challengeDescription.value,
      tags: selectedTags.value,
      variants: Array.from(challenges.value, ([name, value]) => ({
        name,
        value,
      })),
    },
  });
  if (!data) return;
  navigateTo(`/challenges/${data.id}`);
};

const parseinp = ref("https://api.codechick.io/tasks/");

const handleParse = async () => {
  const data: any = await $fetch("/api/parse", {
    method: "POST",
    body: {
      url: parseinp.value,
    },
  });
  if (!data.title) return;
  challengeName.value = data.title;
  challengeDescription.value = data.description;
  data.subtasks.forEach((element: any) => {
    if (element.language.title === currentLang.value) {
      currentChallenge().mdInstructrion = element.description;
      currentChallenge().code = element.start_code;
      currentChallenge().test = element.test_code;
    }
  });
};
</script>

<template>
  <div class="challenge">
    <div class="challenge__container">
      <div class="challenge__body">
        <div class="challenge__left left">
          <TabsWrapper name="leftTabs">
            <Tab class="challenge__instruction" title="Инструкция">
              <TextInput
                v-model="challengeName"
                name="challengeName"
                id="challengeName"
                placeholder="Название задания"
              ></TextInput>
              <MultiSelect
                empty-message="Теги не найдены"
                selected-items-label="{0} тэгов выбрано"
                v-model="selectedTags"
                :options="tags"
                optionLabel="name"
                placeholder="Выбрать тэги"
                :maxSelectedLabels="5"
                display="chip"
              />
              <AppTextarea
                placeholder="Описание задания"
                v-model="challengeDescription"
                name="challengeDescription"
                id="challengeDescription"
              ></AppTextarea>
              <client-only>
                <AppTextarea
                  id="md"
                  v-model="currentChallenge().mdInstructrion"
                  placeholder="Инструкция по выполнению задания (Markdown)"
                  name="md"
                ></AppTextarea>
                <div v-html="renderedMd" class="markdown-body"></div>
              </client-only>
            </Tab>
          </TabsWrapper>
        </div>
        <div class="challenge__right right">
          <TabsWrapper name="rightTabs">
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
                    'border-radius': 'var(--border-radius)',
                  }"
                  :autofocus="true"
                  :indent-with-tab="true"
                  :tab-size="2"
                  :extensions="codeExtensions"
                />
              </Tab>
              <Tab title="Вывод">
                <codemirror
                  v-model="output"
                  :style="{
                    height: '300px',
                    'font-size': '14px',
                    'border-radius': 'var(--border-radius)',
                  }"
                  :autofocus="true"
                  :indent-with-tab="true"
                  :tab-size="2"
                  :extensions="outputExtensions"
                  disabled
                />
              </Tab>
              <Tab title="Тесты">
                <codemirror
                  v-model="currentChallenge().test"
                  placeholder="Здесь пишем тесты"
                  :style="{
                    height: '300px',
                    'font-size': '1rem',
                    'border-radius': 'var(--border-radius)',
                  }"
                  :autofocus="true"
                  :indent-with-tab="true"
                  :tab-size="2"
                  :extensions="testsExtensions"
                />
              </Tab>
            </template>
            <template v-slot:bottom>
              <div class="right__btns">
                <FormButton
                  @click="check()"
                  background="var(--color-warning)"
                  color="var(--color-text-primary)"
                  class="right__btn"
                  :loading="btnLoading"
                  >Проверить код</FormButton
                >
                <FormButton
                  @click="addChallenge"
                  background="var(--color-success)"
                  color="var(--color-text-priamary)"
                  class="right__btn"
                  >Добавить задачу</FormButton
                >
              </div>
              <div class="parse">
                <TextInput
                  placeholder="Ссылка на задачу, которую надо спарсить"
                  name="parseinp"
                  v-model="parseinp"
                  id="parseinp"
                ></TextInput>
                <FormButton
                  @click="handleParse"
                  background="var(--color-primary)"
                  color="var(--color-text-primary)"
                  class="right__btn"
                  >Спарсить задачу</FormButton
                >
              </div>
            </template>
          </TabsWrapper>
        </div>
      </div>
      <!-- {{ $route.params.id }} -->
    </div>
  </div>
</template>

<style lang="scss">
:deep(.cm-editor) {
  border-radius: 5px;
}

.parse {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
}

.challenge {
  margin-top: 2rem;
  &__instruction {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
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
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
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
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  &__btn {
    max-width: 200px;
  }
}
</style>
