<script setup lang="ts">
import Paginator from "primevue/paginator";

useHead({
  title: `Пользователи`,
});

definePageMeta({
  middleware: "admin",
});

let page = ref(0);
const { data, refresh }: any = await useFetch(
  () => `/api/users?page=${page.value}`
);
const authUser = useUser();

const changePage = async (e: any) => {
  page.value = e.page;
  refresh();
};
</script>

<template>
  <div class="users">
    <div class="users__container">
      <table>
        <thead class="ltr:text-left rtl:text-right">
          <tr>
            <th>ФИО</th>
            <th>Логин</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Группа</th>
            <th>Решений</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in data.users" :key="user.id">
            <td>{{ user.fio }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role ? "Админ" : "Пользователь" }}</td>
            <td>{{ user?.group }}</td>
            <td>{{ user?._count.solutions }}</td>
            <td>
              <div
                v-if="authUser?.username !== user.username"
                class="users__actions"
              >
                <FormButton :background="'var(--color-warning)'"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="var(--color-text-primary)"
                    width="1.2rem"
                    height="1.2rem"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </FormButton>
                <FormButton :background="'var(--color-danger)'"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="var(--color-text-primary)"
                    width="1.2rem"
                    height="1.2rem"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </FormButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Paginator
      @page="changePage"
      :rows="10"
      :totalRecords="data.count"
    ></Paginator>
  </div>
</template>

<style scoped lang="scss">
.users {
  &__container {
    margin: 0 auto;
    max-width: var(--width-container);
    padding-right: 1rem;
    padding-left: 1rem;
    overflow: auto;
  }
  &__actions {
    display: flex;
    gap: 1rem;
    button {
      width: auto;
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
  padding: 0.9rem 1rem;
}
</style>
