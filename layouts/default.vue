<template>
  <AppHeader />
  <main class="main">
    <slot />
  </main>
  <AppFooter />
</template>

<style lang="scss">
.main {
  margin-top: 60px;
}
</style>
