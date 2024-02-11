<template>
  <footer class="footer">
    <div class="footer__container">
      <AppLogo></AppLogo>
      <a target="_blank" href="https://iswebdev.ru"
        >Сделано с ❤️ <u>iswebdeb</u></a
      >
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: 2rem;
  background: var(--color-bg-third);
  padding: 2rem;
  &__container {
    margin: 0 auto;
    max-width: var(--width-container);
    padding-right: 1rem;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>
