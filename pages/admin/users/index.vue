<script setup lang="ts">
useHead({
  title: `Пользователи`,
});
definePageMeta({
  middleware: "admin",
});

const { data: users } = await useFetch("/api/users");
</script>

<template>
  <div>
    <table>
      <tr>
        <th>ФИО</th>
        <th>Логин</th>
        <th>Email</th>
        <th>Роль</th>
        <th>Группа</th>
        <th>Решений</th>
      </tr>
      <tr v-for="user in users">
        <td>{{ user.fio }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.group }}</td>
        <td>{{ user.solutions.length }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped lang="scss">
table {
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 0.9rem 1rem;
}
</style>
