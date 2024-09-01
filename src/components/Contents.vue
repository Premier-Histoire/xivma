<template>
  <main class="">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'Contents'
}
</script>

<style scoped>
main {
  flex-grow: 1;
  overflow-y: auto;
  background-color: white;
  color: black;
  padding: 15px;
}
</style>
