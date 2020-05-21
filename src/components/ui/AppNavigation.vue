<style lang="scss" scoped></style>

<template>
  <nav class="app-navigation-primary">
    <label class="mobile-toggle" for="nav-mobile-toggle"
      ><i class="fa fa-bars"></i
    ></label>
    <input type="checkbox" id="nav-mobile-toggle" />
    <div class="navigation-list">
      <ul class="">
        <li class="note">
          <i class="fa fa-info-circle"></i>Nav is for dev only
        </li>
        <li
          :class="{ active: routeRoot === splitRoute(route.path) }"
          v-for="(route, idx) in this.$router.options.routes"
          :key="idx"
        >
          <router-link class="" :to="route.path">
            {{ route.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavigation",
  methods: {
    splitRoute(r) {
      // get the "root" without any params
      return r.split("/")[1];
    },
  },
  computed: {
    // get the "root" without any params
    routeRoot: function () {
      return this.splitRoute(this.$route.path);
    },
  },
};
</script>
