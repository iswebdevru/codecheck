<template>
  <footer class="footer">
    <div class="footer__container">
      <AppLogo></AppLogo>
      <a
        aria-label="Ссылка на репозиторий GitHub"
        target="_blank"
        href="https://github.com/iswebdevru/codecheck"
      >
        <svg
          height="2rem"
          aria-hidden="true"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          data-view-component="true"
        >
          <path
            d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
          ></path>
        </svg>
      </a>
      <a
        title="От студентов для студентов РКЭ"
        class="footer__developer"
        target="_blank"
        href="https://iswebdev.ru"
        ><span>Сделано с</span>
        <img
          class="footer__heart"
          src="@/assets/img/heart.png"
          alt="Сердечко"
        />
      </a>

      <!-- developed by greenbabyborn.ru -->
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: 2rem;
  background: var(--color-bg-third);
  padding: 2rem 0;
  &__developer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  &__heart {
    width: 1.5rem;
    height: 1.5rem;
  }
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
