<template>
  <div class="page container projects-page">
    <h1 class="page-title">פרויקטים</h1>
    <div class="grid-container">
      <div
        class="project-grid-item"
        v-for="(project, index) in projects"
        :key="index"
        role="button"
        tabindex="0"
        :aria-label="'פתח גלריה: ' + project.title"
        :aria-expanded="currentSelected === index"
        @click="onClick(index)"
        @keydown.enter.prevent="onClick(index)"
        @keydown.space.prevent="onClick(index)"
      >
        <ProjectItem
          :class="'item-' + index"
          :img-src="project.imgSrc"
          :title="project.title"
          :location="project.location"
          :subtitle="project.subtitle"
          :description="project.description"
        />
        <LightGallery v-if="currentSelected === index" :galleryPaths="project.galleryPaths" :idx="index" :projectTitle="project.title" />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectItem from "../components/ProjectItem"
import projects from "../data/projects"

export default {
  components: {
    ProjectItem,
    LightGallery: () => import(/* webpackChunkName: "lightgallery" */ "../components/LightGallery")
  },
  data() {
    return {
      currentSelected: null,
      projects
    }
  },
  methods: {
    onClick(index) {
      this.currentSelected = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.page-title {
  margin: 40px 15px 0;
  font-size: 40px;
  line-height: 44px;
  letter-spacing: 0.9px;
}

.grid-container {
  margin-top: 40px;
  display: grid;
  grid-row-gap: 35px;
  grid-column-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  .project-grid-item {
    cursor: pointer;
    margin: 0 15px 44px;
    &:focus {
      outline: 2px solid #111;
      outline-offset: 4px;
      border-radius: 2px;
    }
  }
}
</style>
