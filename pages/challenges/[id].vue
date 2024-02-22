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

const route = useRoute();

const store = useChellengeVariantsStore();
const { currentLang, langs, challenges, challenge } = storeToRefs(store);
const { initChallengeVariants, currentChallenge } = store;
await initChallengeVariants(route.params.id as string);

useHead({
  title: `${challenge.value.name}`,
});

useState("tabsChallengeLeft").value = "Инструкция";
useState("tabsChallengeRight").value = "Код";

const output = ref(
  `Это - вывод. Нажмите кнопку "Проверить код", и здесь появятся резултаты тестов. Сами тесты находятся во вкладке "Тесты`
);

const outputExtensions = [EditorView.lineWrapping, darculaInit()];

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

const btnLoading = ref(true);

const { start, finish } = useLoadingIndicator();

const checkStatus = ref<boolean | null>(null);
const btnCheckClicked = ref(false);

const user = useUser();

const { data: userChallengeSolutions, refresh: refreshStatus } = await useFetch(
  `/api/solutions/${user.value?.username}/${route.params.id}`
);

const currentSolutionStatus = computed(() => {
  let data: any = {};
  userChallengeSolutions.value.variants.forEach((item: any) => {
    if (item.id === currentChallenge().id) {
      data = item;
    }
  });

  return data.Solutions[0];
});

const setStatusSoltion = () => {
  langs.value.forEach((lang) => {
    userChallengeSolutions.value.variants.forEach((item: any) => {
      if (
        lang.name === item.lang.name &&
        (item.Solutions[0]?.status === 1 || item.Solutions[0]?.status === 0)
      ) {
        lang.status = true;
      }
    });
  });
};

setStatusSoltion();

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
  if (!resCheck) {
    btnLoading.value = true;
    finish();
    return;
  }
  // resCheck.status.id === 3
  //   ? (checkStatus.value = true)
  //   : (checkStatus.value = false);
  checkStatus.value = resCheck.status.id === 3;

  btnCheckClicked.value = true;
  output.value = new TextDecoder().decode(
    Uint8Array.from(
      atob(resCheck.stdout)
        .split("")
        .map((x) => x.charCodeAt(0))
    )
  );

  if (checkStatus.value) {
    await refreshStatus();
    await $fetch(`/api/solutions/${user.value?.username}`, {
      method: "POST",
      body: {
        code: currentChallenge().code,
        variantId: currentChallenge().id,
        status: currentSolutionStatus.value?.status === 2 ? 1 : undefined,
      },
    });
    useState("tabsChallengeLeft").value = "Решение";
    await refreshStatus();
    // refreshStatus();
  }
  await refreshSolutions();
  setStatusSoltion();
  useState("tabsChallengeRight").value = "Вывод";
  finish();
  btnLoading.value = true;
};

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

const dateFormat = new Intl.DateTimeFormat("ru", {
  timeZone: "Europe/Moscow",
  timeStyle: "medium",
  dateStyle: "short",
});

const { data: solutions, refresh: refreshSolutions } = await useFetch(
  () => `/api/solutions/all/${currentChallenge().id}`
);

const clickSolutionTab = (title: string) => {
  if (title === "Решение") {
    refreshSolutions();
  }
};

const showSolutions = async () => {
  await $fetch(`/api/solutions/${user.value?.username}`, {
    method: "POST",
    body: {
      code: currentChallenge().code,
      variantId: currentChallenge().id,
      status: 2,
    },
  });
  await refreshStatus();
};
</script>

<template>
  <div class="challenge">
    <div class="challenge__container">
      <div class="challenge__body">
        <div class="challenge__left left">
          <TabsWrapper @tab="clickSolutionTab" name="tabsChallengeLeft">
            <Tab title="Инструкция">
              <h1 class="left__name">{{ challenge.name }}</h1>
              <div v-if="challenge.tags" class="left__tags">
                <span
                  v-for="tag in challenge.tags"
                  :key="tag.id"
                  class="left__tag"
                  >{{ tag.name }}</span
                >
              </div>
              <div
                v-html="parser.render(currentChallenge().mdInstructrion)"
                class="markdown-body"
              ></div>
            </Tab>
            <Tab title="Решение">
              <div v-if="!currentSolutionStatus && user" class="solution-info">
                <h4 class="solution-info__title">
                  Показать решения этой задачи (количество решений:
                  {{ solutions.Solutions.length }})?
                </h4>
                <p class="solution-info__text">
                  Если вы посмотрите решения других пользователей до того как
                  сами решите задачу, ваше решение не будет отображаться другим
                  пользователям на этой вкладке.
                </p>
                <button class="solution-info__btn" @click="showSolutions()">
                  Показать решения
                </button>
              </div>

              <div v-if="!user" class="unauthorized">
                <span class="unauthorized__msg"
                  >Для просмотра решений необходимо
                  <NuxtLink to="/login"><u>авторизоваться</u></NuxtLink>
                </span>
              </div>
              <div
                class="left__solutions"
                v-if="
                  currentSolutionStatus || currentSolutionStatus?.status === 0
                "
              >
                <div
                  v-for="solution in solutions.Solutions"
                  :key="solution.id"
                  class="solution"
                >
                  <div class="solution__body">
                    <h3>{{ solution.user.fio }}</h3>
                    <div class="solution__bottom">
                      <span>
                        {{ dateFormat.format(new Date(solution.updatedAt)) }}
                      </span>
                      <span>{{ solution.user?.group }}</span>
                    </div>
                  </div>

                  <codemirror
                    v-model="solution.code"
                    :style="{
                      height: '300px',
                      'font-size': '1rem',
                      'border-radius': 'var(--border-radius)',
                    }"
                    disabled
                    :autofocus="true"
                    :indent-with-tab="true"
                    :tab-size="2"
                    :extensions="codeExtensions"
                  />
                </div>
              </div>
            </Tab>
          </TabsWrapper>
        </div>
        <div class="challenge__right right">
          <TabsWrapper name="tabsChallengeRight">
            <template v-slot:top>
              <LanguageSelect
                @selectedLanguage="
                  (item) => {
                    currentLang = item.name;
                  }
                "
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
                  :style="{
                    height: '300px',
                    'font-size': '1rem',
                    'border-radius': 'var(--border-radius)',
                  }"
                  disabled
                  :autofocus="true"
                  :indent-with-tab="true"
                  :tab-size="2"
                  :extensions="testsExtensions"
                />
              </Tab>
            </template>
            <template v-slot:bottom>
              <div v-if="!user" class="unauthorized">
                <span class="unauthorized__msg"
                  >Для запуска тестов необходима
                  <NuxtLink to="/login"><u>авторизоваться</u></NuxtLink>
                </span>
              </div>
              <div class="right__status status">
                <span
                  v-show="btnCheckClicked"
                  :class="{ success: checkStatus, error: !checkStatus }"
                  class="status__msg"
                  >{{
                    checkStatus
                      ? "Ошибок нет, тесты прошли!"
                      : `Ошибка. Посмотрите вывод. Для возврата к редактору кода переключитесь на вкладку "Код" выше.`
                  }}</span
                >
              </div>
              <div class="right__btns">
                <FormButton
                  @click="check()"
                  background="var(--color-warning)"
                  color="var(--color-text-primary)"
                  class="right__btn"
                  :loading="btnLoading"
                  :disabled="!user"
                  >Проверить код</FormButton
                >
              </div>
            </template>
          </TabsWrapper>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.cm-editor) {
  border-radius: 5px;
}

.solution-info {
  &__btn {
    margin-top: 1rem;
    width: 100%;
    background: none;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    border: solid 1px var(--color-border-primary);
  }
  &__title {
    background: #824d2e;
    color: var(--color-text-secondary);
    font-weight: 500;
    padding: 0.5rem 1rem;
    margin: 0;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
  }
  &__text {
    margin: 0;
    padding: 1.2rem;
    background: #ffedd5;
    color: #431407;
  }
}

.solution {
  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
    h3 {
      margin: 0;
    }
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
  }
}

.unauthorized {
  &__msg {
    width: 100%;
    display: inline-block;
    padding: 1rem;
    border-radius: var(--border-radius);
    border-left: 0.375rem solid #78350f;
    background: #ffedd5;
    color: #431407;
  }
}

.status {
  margin-top: 1erm;
  &__msg {
    width: 100%;
    display: inline-block;
    padding: 1rem;
    border-radius: var(--border-radius);
    &.success {
      border-left: 0.375rem solid #14532d;
      background: #bbf7d0;
      color: #14532d;
    }
    &.error {
      border-left: 0.375rem solid #7f1d1d;
      background: var(--color-danger);
      color: #7f1d1d;
    }
  }
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

    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    @media (max-width: 768px) {
      grid-template-columns: 100%;
    }
  }
}

.left {
  &__name {
    margin: 0;
  }
  &__solutions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__body {
    margin-top: 2rem;
  }
  &__tag {
    background: #52525b;
    color: white;
    font-size: 0.9rem;
    padding: 0.4rem;
    border-radius: 0.3rem;
    font-weight: 300;
  }
  &__tags {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
    justify-content: flex-end;
    flex-wrap: wrap;
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
