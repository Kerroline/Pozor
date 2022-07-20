<template>
    <div v-if="isNotEmpty">
        <h3>Список Жанров</h3>
        <transition-group name="genre-list">
            <genre-item 
                v-for="genre in genres" 
                :genre="genre" 
                :key="genre.id"
            />
        </transition-group>
    </div>
    <h2 v-else class="empty-genres">
            Список жанров пуст!
    </h2>
</template>

<script>
import GenreItem from "@/components/GenreItem.vue"
export default {
    props: {
        genres: {
            type: Array,
            required : true
        }
    },
    computed: {
        isNotEmpty() {
            return this.genres.length > 0;
        }
    },
    components: {
      GenreItem,
    },
}
</script>

<style lang="scss" scoped>
.empty-genres {
  color: red;
}
</style>