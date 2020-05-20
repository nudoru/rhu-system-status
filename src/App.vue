<style lang="scss" scoped></style>

<template>
  <main class="app">
    <Header><h1><i class="far fa-lightbulb"></i>RHU</h1><h2>System Availability</h2></Header>
<!--    <Hero/>-->
    <Content>
      <router-view />
    </Content>
    <Footer/>
  </main>
</template>

<script>
import Header from './components/layout/Header.vue';
import Hero from "./components/layout/Hero";
import Content from "./components/layout/Content";
import Footer from "./components/layout/Footer";

export default {
  name: 'App',
  components: {
    Content,
    Hero,
    Header,
    Footer
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log('App mounted');
  }
};
</script>
