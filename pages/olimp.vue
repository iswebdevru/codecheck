<script setup lang="ts">
useSeoMeta({
  title: "Олимп",
  ogTitle: "Олимп",
  description:
    "Поприветсвуйте наш ТОП-50! Давайте приветствовать наших героев! Они из числа тех, кто наслаждается трудом и считает бездействие гибельным.",
  ogDescription:
    "Поприветсвуйте наш ТОП-50! Давайте приветствовать наших героев! Они из числа тех, кто наслаждается трудом и считает бездействие гибельным.",
  ogImage: "https://кодчек.ркэ.рф/logo.png",
  ogType: "website",
});
const { data: users } = useFetch("/api/users/top");
</script>

<template>
  <div class="olimp">
    <div class="olimp__container">
      <div class="olimp__body">
        <div class="olimp__info">
          <h1 class="olimp__title">КодЧек Олимп</h1>
          <p class="olimp__text">
            Поприветсвуйте наш <b>ТОП-50</b>! Давайте приветствовать наших
            героев! Они из числа тех, кто наслаждается трудом и считает
            бездействие гибельным.
          </p>
        </div>
        <table class="olimp__table">
          <thead>
            <tr>
              <th>Место</th>
              <th>ФИО</th>
              <th title="Без подсматриваний у других">Решено задач</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Место</th>
              <th>ФИО</th>
              <th title="Без подсматриваний у других">Решено задач</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
              <td
                :class="{
                  first: index + 1 === 1,
                  second: index + 1 === 2,
                  third: index + 1 === 3,
                }"
              >
                {{ index + 1 }}
              </td>
              <td>{{ user.fio }}</td>
              <td>{{ user.solutions }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.olimp {
  &__title {
    margin-bottom: 1rem;
  }
  &__text {
    line-height: 150%;
  }
  &__body {
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
  &__container {
    margin: 0 auto;
    max-width: var(--width-container);
    padding-right: 1rem;
    padding-left: 1rem;
    overflow: auto;
  }
  &__table {
    .first {
      font-size: 1.2rem;
      font-weight: 800;
      color: rgb(235, 235, 43);
    }
    .second {
      font-size: 1.1rem;
      font-weight: 700;
      color: rgb(112, 184, 210);
    }
    .third {
      font-size: 1rem;
      font-weight: 700;
      color: rgb(210, 181, 112);
    }
  }
}

table {
  border-collapse: collapse;
  text-align: left;
  width: 100%;
}

th,
td {
  border-top: 1px solid var(--color-border-primary);
  border-bottom: 1px solid var(--color-border-primary);
  padding: 0.9rem 1rem;
}
</style>
