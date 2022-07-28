<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"> Смотри и точка </router-link>
      <div>
        <MyInput v-model="searchQuery" placeholder="Search movie..." />
      </div>
      <div class="searchResult" v-if="false">
        <div v-for="movie in searchedMovies" :key="movie.id">
          {{ movie.title }}
        </div>
      </div>
      <div v-if="!$store.state.auth.isAuth">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link to="/login" class="nav-link active">
              Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link active">
              Register
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <div class="nav-link active">
              <div class="dropdown">
                <router-link
                  to="/profile"
                  class="nav-link active"
                  style="border: 3px solid teal"
                >
                  {{ $store.state.auth.user.email }}
                </router-link>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { GetApprovedMovie } from "@/api/getApprovedMovie";
import MyInput from "./UI/MyInput.vue";
export default {
  name: "Navbar",
  data() {
    return {
      isOpen: false,
      movies: [],
      isMoviesLoaging: false,
      searchQuery: "",
    };
  },
  methods: {
    async getApprovedMovie() {
      this.isMoviesLoaging = true;
      try {
        this.movies = await GetApprovedMovie();
        this.isMoviesLoaging = false;
      } catch (err) {
        console.error(err);
      } finally {
        this.isMoviesLoaging = false;
      }
    },
  },
  computed: {
    searchedMovies() {
      return this.movies.filter((m) =>
        m.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  created() {
    this.getApprovedMovie();
  },

  components: { MyInput },
};
</script>
