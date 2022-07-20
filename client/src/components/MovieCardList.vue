<template>
    <div v-if="movies.length > 0" class="cardsTable">
        <movie-card-item 
            v-for="movie in movies" 
            :movie="movie" 
            :key="movie.id"
        />
    </div>
    <h2 v-else class="isH2">
        Список одобренных фильмов пуст
    </h2>
</template>

<script>
    import MovieCardItem from "@/components/MovieCardItem.vue"
    export default {
        components: {
            MovieCardItem,
        },
        props: {
            movies: {
                type: Array,
                required : true
            }
        }
    }
</script>

<style scoped>
.cardsTable {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
}
.isH2 {
  color: red
}
</style>