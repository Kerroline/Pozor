<template>
  <div class="app">
    <div class="content">
      <router-view />
    </div>
    <header class="header">
      <Navbar />
    </header>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {
    Navbar,
    Footer,
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      preloadUser: "auth/getUser",
      logout: "auth/logout",
    }),
  },
  created() {
    try {
      this.preloadUser();
    } catch (err) {}
  },
  mounted() {},
};
</script>

<style>
*,
*:before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  line-height: 100%;
}

.header {
  order: -1;
}

.content {
  padding: 10px;

  width: 100%;
  max-width: 1400px;

  min-height: 100%;

  margin: auto;

  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
}
</style>
