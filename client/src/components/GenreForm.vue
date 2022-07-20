<template>
    <div>
        <form @submit.prevent> 
            <h4> Create genre</h4>
            <my-input
                v-model="genre.name"
                type="text" 
                placeholder="Name"
            />
            <my-button
                class="btn"
                @click="createGenre"
            > 
                Create
            </my-button>
        </form>
    </div>
</template>

<script>
import MyButton from './UI/MyButton.vue';
import MyInput from './UI/MyInput.vue'

export default {
    components: {
        MyInput,
        MyButton
    },
    data() {
        return {
            genre: this.getDefaultState(),
        };
    },
    methods: {
        createGenre() {
            if (this.name !== '') {
              this.$emit('create',this.genre);
              this.genre = this.getDefaultState();
            }
        },
        getDefaultState() {
          return {
            name: '',
          }
        }
    },
}
</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;
}
</style>
<style lang="scss" scoped>
  .btn {
    align-self:flex-end;
    margin-top: 10px;
  }
</style>