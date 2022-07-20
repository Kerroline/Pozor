<template>
    <div class="movie">
        <div>
            <div><strong>Id:</strong> {{movie.id}}</div>
            <div><strong>Title:</strong> {{movie.title}}</div>
        </div>
        <div class="movie__btns">
            <div class="movie__status">
                {{movie.status.name}}
            </div>
            <button
                @click="$router.push(`/movie-card/${movie.id}`)"
                style="margin: 1px"
            > 
                View 
            </button>

        </div>
    </div>
</template>

<script>
    export default {
         props: {
             movie: {
                type: Object,
                required : true
            }
        },
    }
</script>

<style scoped>
.movie {
    padding: 7px;
    border: 3px solid teal;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.movie__status {
    margin-right: 3px;
    padding: 5px;
    border: 1px solid;
    border-radius: 10px;
}
.movie__btns {
    display: flex;
}
</style>