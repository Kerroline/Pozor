<template>
    <div class="createmovie">
        <h1>Создание нового фильма</h1>
        <MovieForm
        :isEdit="false"
        :movie="movieModel"
        @create="createMoviePipeline"
        />
        <hr/>
    </div>
</template>

<script>
import { HOST_API_URL } from "@/store";
import { mapState, mapGetters, mapMutations, mapActions} from 'vuex'
import MovieForm from "@/components/MovieForm.vue";
    export default {
    name: "createmovie",
    components:{
        MovieForm
    },
    data() {
        return {
        };
    },
    methods: {
        ...mapGetters({
            getUserToken: 'auth/getUserToken',
        }),
        handleFileUpload(event) {
            this.poster = event.target.files[0];
        },
        async createMoviePipeline(movieFormData) {
            const createdMovie = await this.createMovieRequest(movieFormData.movieModel);
            if (createdMovie) {
                const ok_poster = await this.uploadPosterRequest(createdMovie.id, movieFormData.poster);
                const ok_galleries = await this.uploadGalleriesPipeline(createdMovie.id, movieFormData.galleries);
                if(ok_poster && ok_galleries ) {
                    this.$router.push({ name: 'movie-card', params: { id: createdMovie.id } });
                }
            }
        },
        async createMovieRequest(movieModel) {
            try {
                movieModel.author_id = this.$store.state.auth.user.id;
                const response = await fetch(`${HOST_API_URL}/createMovie`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": "Bearer " + await this.getUserToken(),
                    },
                    body: JSON.stringify(movieModel)
                });
                if (response.ok) {
                    const content = await response.json();
                    const movie = content.data;
                    return movie;
                }
                return null;
            }
            catch (error) {
                console.log("ERRRR:: ", error);
                return null;
            }
        },
        async uploadPosterRequest(movieID, poster) {
            let formData = new FormData();
            formData.append("image", poster);
            try {
                const response = await fetch(`${HOST_API_URL}/uploadPosterForMovie?id=${movieID}`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": "Bearer " + await this.getUserToken(),
                    },
                    body: formData
                });
                if (response.ok) {
                    const content = await response.json();
                    const createdPoster = content.data;
                    return createdPoster;
                }
                return null;
            }
            catch (error) {
                console.log("ERRRR:: ", error);
                return null;
            }
        },
        async uploadGalleriesPipeline(movieID, galleries) {
            for(const elem of galleries) {
                const ok = await this.uploadGalleryRequest(movieID, elem);
                if(!ok) {
                    return false;
                }
            };
            return true;
        },
        async uploadGalleryRequest(movieID, gallery) {
            let formData = new FormData();
            formData.append("image", gallery);
            try {
                const response = await fetch(`${HOST_API_URL}/uploadGalleryForMovie/${movieID}`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": "Bearer " + await this.getUserToken(),
                    },
                    body: formData
                });
                if (response.ok) {
                    const content = await response.json();
                    const createdGallery = content.data;
                    return createdGallery;
                }
                return null;
            }
            catch (error) {
                console.log("ERRRR:: ", error);
                return null;
            } 
        }
    },
    mounted() {
    },
}
</script>

<style scoped>
.createmovie {
    padding: 20px;
}
</style>