<template>
    <div 
        class="card"
        @click="goToCard"
    >
        <div class="card__poster">
            <img 
                :src="postersArray[0]"
                alt="Movie poster" 
            >
        </div>
        <div class="card__main__text">
            <div class="card__main__text__item"> 
                <strong>Title:</strong> {{ movie.title }}
            </div>
                <div class="card__main__text__item"> 
                <strong>Description:</strong> {{ movie.description }}
            </div>
        </div>
    </div>
</template>

<script>
import { HOST_URL, HOST_API_URL, STATUSES_ID } from "@/store";
import { isProxy, toRaw } from 'vue';
import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
     export default {
        props: {
            movie: {
                type: Object,
                required : true
            }
        },
        data() {
            return {
                isAdmin: false,
                MovieStatusId : {},
                postersArray : [],
            }
        },
        methods: {
            ...mapGetters({
                getUserToken: 'auth/getUserToken',
            }),
            generatePostersPath() {
                if(isProxy(this.movie.posters)) { 
                    const moviePosters = toRaw(this.movie.posters)
                    moviePosters.forEach(element => {
                        const posterPath = HOST_URL + element.path;
                        this.postersArray.push(posterPath);
                    });
                }
            },
            goToCard() {
              this.$router.push({name: 'movieCard', params: { id: this.movie.id }})
            }
        },
        mounted() {
            this.generatePostersPath();
        }
    }
</script>

<style scoped>
.card {
    flex: 0 1 33%;
    padding: 0 15px;
    margin: 0 -15px;
}

.card__poster {
    overflow: hidden;
    position: relative;
    padding-bottom: 100%;
}
.card__poster > img {
     position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        object-fit: cover;
}

.card__main__text {
    padding: 5px;
    display: flex;
    flex-direction: column;
}
.card__main__text__item {
    align-items: flex-start;
    flex-wrap: wrap;
    padding: auto;
    
}

</style>