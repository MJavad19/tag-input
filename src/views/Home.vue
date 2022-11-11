<template>
  <div class="container">
    <TagInput />
  </div>
</template>

<script>
import TagInput from "@/components/TagInput/index.vue";
export default {
  components: {
    TagInput,
  },
};
</script>

<style lang="scss">
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12.5rem;
  margin: auto;
}
</style>
