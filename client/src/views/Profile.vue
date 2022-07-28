<template>
    <div>
        <div>Email: {{$store.state.auth?.user?.email}}</div>
        <div>Role: {{$store.state.auth?.user?.role?.name}}</div>
        <div>Registration date: {{$store.state.auth?.user?.created_at}}</div>
        <br/>
        <button>Change password</button>
        <br/>
        <div v-if="isAdmin">
            <br/>
            <router-link to="/genres"> 
                Genres
            </router-link>
            <br/>
            <br/>
            <router-link to="/movies"> 
                All movies
            </router-link>
            <br/>
        </div>
        <div v-else>
            <router-link to="/movies"> 
                My movies
            </router-link>
        <br/>
            <router-link to="/create-movie">
                Create a new movie
            </router-link>
        <br/>
        </div>
        <br/>
        <button 
            @click="logout"
        >
            Logout
        </button>
        <br/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isAdmin: false
            }
        },
        methods: {
            async logout() {
                await this.$store.dispatch('auth/logout',JSON.stringify(this.$data));
                await this.$router.push('/');
            },
            
        },
        mounted() {
           this.isAdmin = this.$store.getters['auth/isAdmin'];
        }
    }
</script>

<style scoped>

</style>