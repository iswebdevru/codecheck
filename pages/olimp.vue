<script setup lang="ts">
const { data: users } = useFetch("/api/users/top");
</script>

<template>
  <div class="olimp">
    <div class="olimp__container">
      <div class="olimp__body">
        <table class="table">
          <thead>
            <tr>
              <th>Место</th>
              <th>Имя</th>
              <th>Решено задач</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Место</th>
              <th>Имя</th>
              <th>Решено задач</th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td></td>
              <td>{{ user.fio }}</td>
              <td>{{ user.solutions.length }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
