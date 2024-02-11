<template>
  <div class="wrapper">
    <AppHeader />
    <main class="main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss">
.main {
  margin-top: 60px;
  flex-grow: 1;
}

.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
