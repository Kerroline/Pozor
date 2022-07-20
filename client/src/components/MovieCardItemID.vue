<template>
    <div class="card">
        <div class="card__main">
            <div class="card__main__posters">
                <div class="card__main__posters_item">
                    <img 
                        :src="postersArray[0]"
                        alt="Movie poster" 
                    >
                </div>
            </div>

            <div class="card__main__text">
                <div class="card__main__text__item"> 
                    <strong>Title:</strong> {{ movie.title }}
                </div>
                 <div class="card__main__text__item"> 
                    <strong>Description:</strong> {{ movie.description }}
                </div>
            </div>
            <div class="card__main__info">
                <div><strong>Author:</strong>  {{ movie.author?.email }}</div>
                <div><strong>Status:</strong>  {{ movie.status?.name }}</div>
                <div v-if="movie.status?.id ==  MovieStatusId?.APPROVED_ID">
                    <strong>Approver:</strong>  {{ movie.approver?.email }}
                </div>
                <div class="card__main__info__btns">
                    <div v-if="!isAdmin">
                        <div v-if="movie.status?.id == MovieStatusId?.DRAFT_ID">
                            <button>Edit</button>
                            <button @click="publishingMovie">Publish</button>    
                            <button @click="deleteMovie(false)">Delete</button>
                        </div>
                        <div v-else-if="movie.status?.id ==  MovieStatusId?.PUBLISHED_ID">
                            <button @click="canceledPublishMovie">Cancel</button>
                        </div>
                        <div v-else-if="movie.status?.id ==  MovieStatusId?.TRASHED_ID">
                            <button @click="restoreMovie">Restore</button>
                            <button @click="deleteMovie(true)">Destroy</button>
                        </div>

                    </div>
                    <div v-else>
                        <div v-if="movie.status?.id ==  MovieStatusId?.PUBLISHED_ID">
                            <button @click="approvingMovie(true)">Approve</button>
                            <button @click="approvingMovie(false)">Reject</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card__sub">
            <div class="card__sub__galleries">
                <div
                    v-for="gallery in galleriesArray"
                    :key="gallery.id" 
                    class="card__sub__galleries__item"
                >
                <div class="card__sub__galleries__item__gallery">
                    <img 
                        :src="gallery"
                        alt="Movie poster" 
                    >
                </div>
                </div>
            </div>

            <div class="card__sub__genres">
                    <strong>Genres: </strong>
                    <div
                        class="card__sub__genres__item"
                        v-for="genre in movie.genres"
                        :key="genre.name"
                    >
                        {{ genre.name }}
                    </div> 
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
            galleriesArray : [],
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
        generateGalleriesPaths() {
            if(isProxy(this.movie.galleries)) {
                const movieGalleries = toRaw(this.movie.galleries)
                movieGalleries.forEach(element => {
                    const galleryPath = HOST_URL + element.path;
                    this.galleriesArray.push(galleryPath);
                });
            }
        },
        //TODO: ВОТ НАЧИНАЯ ОТСЮДА И ДО ОБЕДА
        //TODO: ВЫНЕСТИ ЭТО ВСЕ В ОТДЕЛЬНЫЙ ФАЙЛ НАДО БУДЕТ
        async approvingMovie(decision) {
            const requestData = { "movieId":this.movie.id, "decision":decision }
            try {
                const response = await fetch(`${HOST_API_URL}/approveMovie`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + await this.getUserToken(),
                    },
                    body: JSON.stringify(requestData)
                });

                if(response.ok) {
                    const content = await response.json();
                    //TODO: УБРАТЬ ЭТО ГОВНО
                    //TODO: И УБРАТЬ ЛИБО ЧЕРЕЗ РОУТЕР, ЛИБО ИСПОЛЬЗОВАТЬ ТО ЧТО РЕРЕНДЕРИТ
                    window.location.reload();
                }
            } catch (error) {
                console.log("ERRRR:: ", error);
            }
        },
        async publishingMovie() {
            try {
                const response = await fetch(`${HOST_API_URL}/publishMyMovie/${this.movie.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + await this.getUserToken(),
                    },
                });
                if(response.ok) {
                    const content = await response.json();
                    //TODO : УБРАТЬ ЭТО ГОВНО
                    //TODO: И УБРАТЬ ЛИБО ЧЕРЕЗ РОУТЕР, ЛИБО ИСПОЛЬЗОВАТЬ ТО ЧТО РЕРЕНДЕРИТ
                    window.location.reload();
                }
            } catch (error) {
                console.log("ERRRR:: ", error);
            }
        },
        async canceledPublishMovie() {
            try {
                const response = await fetch(`${HOST_API_URL}/canceledPublishMyMovie/${this.movie.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + await this.getUserToken(),
                    },
                });
                if(response.ok) {
                    const content = await response.json();
                    //TODO : УБРАТЬ ЭТО ГОВНО
                    //TODO: И УБРАТЬ ЛИБО ЧЕРЕЗ РОУТЕР, ЛИБО ИСПОЛЬЗОВАТЬ ТО ЧТО РЕРЕНДЕРИТ
                    window.location.reload();
                }
            } catch (error) {
                console.log("ERRRR:: ", error);
            }
        },
        async restoreMovie() {
            try {
                const response = await fetch(`${HOST_API_URL}/restoreMyMovie/${this.movie.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + await this.getUserToken(),
                    },
                });
                if(response.ok) {
                    const content = await response.json();
                    //TODO : УБРАТЬ ЭТО ГОВНО
                    //TODO: ДА СКОЛЬКО Ж ИХ ТУТ
                    window.location.reload();
                }
            } catch (error) {
                console.log("ERRRR:: ", error);
            }
        },
        async deleteMovie(isTrashing) {
            const endpoint = isTrashing ? '/deleteMyMovie' : '/trashingMyMovie';
            try {
                const response = await fetch(`${HOST_API_URL}${endpoint}/${this.movie.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + await this.getUserToken(),
                    },
                });
                if(response.ok) {
                    //TODO : УБРАТЬ ЭТО ГОВНО
                    //TODO: ОМГ
                    if(isTrashing) {
                        await this.$router.push('/');
                    }
                    window.location.reload();
                }
            } catch (error) {
                console.log("ERRRR:: ", error);
            }
        },
    },
    computed: {
    },
    mounted() {
        this.isAdmin = this.$store.getters['auth/isAdmin'];
        this.generatePostersPath();
        this.generateGalleriesPaths();
        this.MovieStatusId = STATUSES_ID;
    },
}
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
}
.card__main, .card__sub {
    display: flex;
    flex-direction: row;
    height: 50%;
}

.card__main__posters {
    padding: 5px;
    display: flex;
    flex-direction: column;
    width: 40%;
}
.card__main__posters_item {
    overflow: hidden;
    position: relative;
    padding-bottom: 100%;
}
.card__main__posters_item > img {
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
    width: 40%;
    flex-direction: column;
}
.card__main__text__item {
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 10px;
    
}
.card__main__info {
    padding: 5px;
    display: flex;
    flex-direction: column;
    width: 20%;
}

.card__sub__galleries {
    width: 60%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
}

.card__sub__galleries__item {
    flex: 0 1 20%;
    padding: 0 15px;
    margin: 0 -15px;
}
.card__sub__galleries__item__gallery {
    overflow: hidden;
    position: relative;
    padding-bottom: 100%;
}
.card__sub__galleries__item__gallery > img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
}

.card__sub__genres {
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
}
.card__sub__genres__item {
    margin: 5px;
    padding: 5px;
    border: 1px solid teal;
    border-radius: 15px;
}


</style>