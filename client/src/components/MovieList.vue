<template>
  <div v-if="isNotEmpty">
    <h3>Список фильмов</h3>
    <transition-group name="movie-list">
      <movie-item v-for="movie in movies" :movie="movie" :key="movie.id" />
    </transition-group>
  </div>
  <h2 v-else class="isH2">Список фильмов пуст!</h2>
</template>

<script>
import MovieItem from "@/components/MovieItem.vue";
export default {
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isNotEmpty() {
      return this.movies.length > 0;
    },
  },
  components: {
    MovieItem,
  },
};
</script>

<style scoped>
.movie-list-item {
  display: inline-block;
  margin-right: 10px;
}
.movie-list-enter-active,
.movie-list-leave-active {
  transition: all 0.5s ease;
}
.movie-list-enter-from,
.movie-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.movie-list-move {
  transition: transform 0.5s ease;
}
.isH2 {
  color: red;
}
</style>
