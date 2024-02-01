<script setup lang="ts">
useHead({
  title: "Админ",
});
definePageMeta({
  middleware: "admin",
});
</script>

<template>
  <div class="admin">
    <div class="admin__container">
      <input type="text" />
      <textarea name="" id="" cols="30" rows="10"></textarea>
      <div class="challenge__body">
        <div class="challenge__left left">
          <TabsWrapper>
            <Tab title="Инструкция"> Инструкция </Tab>
            <Tab title="Решение"> Решение </Tab>
          </TabsWrapper>
        </div>
        <div class="challenge__right right">
          <TabsWrapper>
            <Tab title="Код">
              <!-- <codemirror
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
              /> -->
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
              <!-- <codemirror
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
              /> -->
            </Tab>
          </TabsWrapper>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
