<template>
  <header class="header">
    <div class="header__container">
      <div class="header__body">
        <AppLogo />
        <Navbar />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1002;
  background: var(--color-bg-primary);
  @media (max-width: 768px) {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  &__container {
    margin: 0 auto;
    max-width: var(--width-container);
    padding-right: 1rem;
    padding-left: 1rem;
  }
  &__body {
    display: flex;
    justify-content: space-between;
  }
}
</style>
