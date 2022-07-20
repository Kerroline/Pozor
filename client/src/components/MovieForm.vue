<template>
    <div>
         <form @submit.prevent>
            <label>Title</label>
            <my-input
                v-model="movieModel.title"
                type="text" 
                placeholder="Title"
            />
            <label>Description</label>
            <my-input
                v-model="movieModel.description"
                type="text" 
                placeholder="Description"
            />
            <label>Link to watch</label>
            <my-input
                v-model="movieModel.link"
                type="text" 
                placeholder="Link to watch"
            />
            <label>Choose Genres</label>
            <select
                :size="selectGenres.length"
                v-model="movieModel.genres"
                name="genres"
                multiple   
            >
                <option
                    v-for="genre in selectGenres"
                    :key="genre.id" 
                    :value="genre.id"
                >
                    {{genre.name}}
                </option>
            </select>
            <p><strong> Hold down the Ctrl (windows) or Command (Mac) button to select multiple options. </strong></p>

            <label>Select a poster</label>
            <input 
                type="file" 
                @change="handlePosterUpload( $event )"
            />
            <label>Select galleries</label>
            <input 
                type="file" 
                multiple
                @change="handleGalleriesUpload( $event )"
            />
            <my-button 
                style="align-self:flex-end;  margin-top: 10px;"
                @click="movieRequest"
            > 
               {{ isEditForm }}
            </my-button>
        </form>
    </div>
</template>

<script>
import { HOST_API_URL } from "@/store";
import MyButton from './UI/MyButton.vue';
import MyInput from './UI/MyInput.vue'
export default {
    components: {
        MyInput,
        MyButton
    },
    props: {
        isEdit: {
            type: Boolean,
            required : true
        },
        movie: {
            type: Object,
        }
    },
    data() {
        return {
            selectGenres: [{}],
            movieModel: {
                title: "",
                description: "",
                link: "",
                genres: [],
                author_id: 0,
            },
            poster: "",
            galleries: "",
        };
    },
    computed: {
        isEditForm() {
            return this.isEdit ? "Save" : "Create";
        }
    },
    mounted() {
        this.getGenres();
        if(this.isEdit) {
            this.movieModel = this.movie;
        }
    },
    methods: {
      async getGenres() {
        try {
          const response = await fetch(`${HOST_API_URL}/getAllGenres`, {
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          });
          if (response.ok) {
            const content = await response.json();
            this.selectGenres = content.data;
          }
        }
        catch (err) {
          console.error(err);
        }
      },
      movieRequest() {
        const movieFormData = {
          "movieModel": this.movieModel,
          "poster": this.poster,
          "galleries": this.galleries
        };
        if(this.isEdit) {
          this.$emit('edit', movieFormData);
        }
        else {
          this.$emit('create', movieFormData);
        }
      },
      handlePosterUpload(event) {
        this.poster = event.target.files[0];
      },
      handleGalleriesUpload(event) {
        this.galleries = event.target.files;
      },
    },
}
</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;
}

</style>