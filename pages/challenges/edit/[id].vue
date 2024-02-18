<script setup lang="ts">
import { Codemirror, install } from "vue-codemirror";
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
  title: "Редактирование задания",
});

definePageMeta({
  middleware: "admin",
});

const route = useRoute();

const store = useUpdateVariantsStore();
const { currentLang, chellengeLangs, challenges, challenge } =
  storeToRefs(store);
const { initChallengeVariants, currentChallenge, initLangs } = store;

await initLangs();
await initChallengeVariants(route.params.id as string);

const selecting = (item: any) => {
  currentLang.value = item.name;
};

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

const outputExtensions = [EditorView.lineWrapping, darculaInit({})];

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
renderedMd.value = parser.render(currentChallenge().mdInstructrion);
watch(
  () => {
    return currentChallenge().mdInstructrion;
  },
  () => {
    renderedMd.value = parser.render(currentChallenge().mdInstructrion);
  }
);

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
  output.value = resCheck.stdout;
  btnLoading.value = true;
};

const challengeName = ref("");
challengeName.value = challenge.value.name;

const challengeDescription = ref("");
challengeDescription.value = challenge.value.description;

const { data: tags } = useFetch("/api/tags");
const selectedTags = ref(challenge.value.tags);

const updateChallenge = async () => {
  const data = await $fetch(`/api/challenges/${challenge.value.id}`, {
    method: "PATCH",
    body: {
      name: challengeName.value,
      description: challengeDescription.value,
      tags: selectedTags.value,
      variants: Array.from(
        Object.entries(challenges.value),
        ([name, value]) => ({
          name,
          value,
        })
      ),
    },
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
                :languages="chellengeLangs"
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
                  @click="updateChallenge"
                  background="var(--color-success)"
                  color="var(--color-text-priamary)"
                  class="right__btn"
                  >Обновить задачу</FormButton
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
// @use "@/assets/css/markdown" as *;

:deep(.cm-editor) {
  border-radius: 5px;
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
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1rem;
  }
  &__btn {
    max-width: 200px;
  }
}
</style>
