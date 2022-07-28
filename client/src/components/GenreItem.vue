<template>
  <div class="genre">
    <div>
      <div><strong>Id:</strong> {{ genre.id }}</div>
      <div><strong>Name:</strong> {{ genre.name }}</div>
    </div>
    <div class="genre__btns">
      <button class="genre__btns__item">Edit</button>
      <button class="genre__btns__item" style="margin: 1px">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    genre: {
      type: Object,
      required: true,
      default: () => false,
    },
  },
};
</script>

<style lang="scss" scoped>
.genre {
  padding: 10px;
  border: 3px solid teal;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__btns {
    display: flex;
    &__item {
      padding: 5px;
      border: 1px solid;
      border-radius: 10px;
      margin: 1px;
    }
  }
}
</style>
