<template>
    <div class="page container grid-container">
      <div class="page container grid-container">
        <div class="project-grid-item" v-for="(project,index) in projects" :key="index" @click="onClick(index)">
          <ProjectItem
              :class="'item-'+index"
              :img-src="project.imgSrc"
              :title="project.title"
              :location="project.location"
              :subtitle="project.subtitle"
              :description="project.description"
          />
          <LightGallery v-if="currentSelected === index" :galleryPaths="project.galleryPaths" :idx="index"></LightGallery>
        </div>
      </div>
    </div>
</template>

<script>
import ProjectItem from "../components/ProjectItem"

export default {
  components: {
    ProjectItem,
    LightGallery: () => import(/* webpackChunkName: "lightgallery" */ "../components/LightGallery")
  },
  data: function() {
    return {
      currentSelected: null,
      projects: [
        {
          title: "T house",
          subtitle: "בית פרטי בנייה חדשה",
          description: 'סגנון מודרני טרופי',
          location: '-צפון הארץ-',
          imgSrc: require("../assets/projects/01-t-house/1.jpg"),
          galleryPaths: [
            "projects/01-t-house/1.jpg",
            "projects/01-t-house/2.jpg",
            "projects/01-t-house/3.jpg",
            "projects/01-t-house/4.jpg",
            "projects/01-t-house/5.jpg",
            "projects/01-t-house/6.jpg",
            "projects/01-t-house/7.jpg",
            "projects/01-t-house/8.jpg",
          ]
        },
        {
          title: "R house",
          subtitle: 'בית פרטי בנייה חדשה',
          description: "סגנון מודרני יוקרתי",
          location: '-הרצליה פיתוח-',
          imgSrc: require("../assets/projects/10-R-house/1.png"),
          galleryPaths: [
            "projects/10-R-house/1.png",
            "projects/10-R-house/2.png",
            "projects/10-R-house/3.jpg",
            "projects/10-R-house/4.jpg",
            "projects/10-R-house/5.png",
            "projects/10-R-house/6.png",
            "projects/10-R-house/7.png",
            "projects/10-R-house/8.jpg",
            "projects/10-R-house/9.jpg",
            "projects/10-R-house/11.jpg",
            "projects/10-R-house/12.jpg"
          ]
        },
        {
          title: "ZEN House",
          subtitle: "בית פרטי בנייה חדשה",
          description: "סגנון יפני מודרני",
          location: '-מוצא עלית-',
          imgSrc: require("../assets/projects/03-zen-house/1.png"),
          galleryPaths: [
            "projects/03-zen-house/1.png",
            "projects/03-zen-house/2.jpeg",
            "projects/03-zen-house/3.jpg",
            "projects/03-zen-house/4.jpeg",
            "projects/03-zen-house/5.jpg",
            "projects/03-zen-house/6.jpg",
            "projects/03-zen-house/7.jpeg",
            "projects/03-zen-house/8.jpg",
            "projects/03-zen-house/9.jpg",
          ]
        },
        {
          title: "AG House",
          subtitle: 'דירת גן 5 חדרים + גינה 150 מ״ר',
          description: "תכנון משולב פנים וחוץ",
          location: '-שוהם-',
          imgSrc: require("../assets/projects/04-ag-house/1.png"),
          galleryPaths: [
            "projects/04-ag-house/1.png",
            "projects/04-ag-house/2.png",
            "projects/04-ag-house/3.png",
            "projects/04-ag-house/4.png",
            "projects/04-ag-house/5.png",
            "projects/04-ag-house/6.png",
            "projects/04-ag-house/7.png",
            "projects/04-ag-house/8.png",
            "projects/04-ag-house/9.png",
            "projects/04-ag-house/10.png",
            "projects/04-ag-house/11.png",
            "projects/04-ag-house/12.png",
            "projects/04-ag-house/13.png",
            "projects/04-ag-house/14.png",
            "projects/04-ag-house/15.png",
          ]
        },
        {
          title: "EL house",
          subtitle: "בית פרטי בנייה חדשה",
          description: 'סגנון מודרני טבעי',
          location: '-עמק חפר-',
          imgSrc: require("../assets/projects/02-el-house/1.png"),
          galleryPaths: [
            "projects/02-el-house/1.png",
            "projects/02-el-house/2.png",
            "projects/02-el-house/3.png",
            "projects/02-el-house/4.png",
            "projects/02-el-house/5.png",
            "projects/02-el-house/6.png",
            "projects/02-el-house/7.png",
            "projects/02-el-house/8.png",
            "projects/02-el-house/9.png",
            "projects/02-el-house/10.png",
            "projects/02-el-house/11.png",
            "projects/02-el-house/12.png",
            "projects/02-el-house/13.png",
            "projects/02-el-house/14.png",
            "projects/02-el-house/15.png",
          ]
        },

        {
          title: "TS Apartment",
          subtitle: "עיצוב פנים מלא לדירת 5 חדרים",
          description: "50 גוונים של אפור",
          location: '-הרצליה הירוקה-',
          imgSrc: require("../assets/projects/06-ts-apartment/1.jpg"),
          galleryPaths: [
            "projects/06-ts-apartment/1.jpg",
            "projects/06-ts-apartment/2.jpg",
            "projects/06-ts-apartment/3.jpg",
            "projects/06-ts-apartment/4.jpg",
            "projects/06-ts-apartment/5.jpg",
            "projects/06-ts-apartment/6.jpg",
            "projects/06-ts-apartment/7.jpg",
            "projects/06-ts-apartment/8.jpg",
            "projects/06-ts-apartment/9.jpg",
            "projects/06-ts-apartment/10.jpg",
            "projects/06-ts-apartment/11.jpg",
            "projects/06-ts-apartment/12.jpg",
            "projects/06-ts-apartment/13.jpg",
            "projects/06-ts-apartment/14.jpg",
            "projects/06-ts-apartment/16.jpg",
            "projects/06-ts-apartment/17.jpg",
            "projects/06-ts-apartment/18.jpg",
            "projects/06-ts-apartment/19.jpg",
            "projects/06-ts-apartment/20.jpg",
          ]
        },

        {
          title: "RI Luxury Bedroom",
          subtitle: 'שיפוץ מלא לבית פרטי',
          description: "חדר שינה מאסטר כמו בית מלון",
          location: '-חולון-',
          imgSrc: require("../assets/projects/13-ri-bedroom/1.jpg"),
          galleryPaths: [
            "projects/13-ri-bedroom/1.jpg",
            "projects/13-ri-bedroom/2.jpg",
            "projects/13-ri-bedroom/3.jpg",
            "projects/13-ri-bedroom/4.jpg",
            "projects/13-ri-bedroom/5.jpg",
            "projects/13-ri-bedroom/6.jpg",
            "projects/13-ri-bedroom/7.jpg",
            "projects/13-ri-bedroom/8.jpg",
            "projects/13-ri-bedroom/9.jpg",
            "projects/13-ri-bedroom/10.jpg",
            "projects/13-ri-bedroom/11.jpg",
            "projects/13-ri-bedroom/13.jpg"
          ]
        },
        {
          title: "IC house",
          subtitle: 'שיפוץ מלא לבית פרטי',
          description: "טבעי מינימליסטי",
          location: '-נס ציונה-',
          imgSrc: require("../assets/projects/11-ic-house/1-.jpg"),
          galleryPaths: [
            "projects/11-ic-house/1-.jpg",
            "projects/11-ic-house/2-.png",
            "projects/11-ic-house/3.png",
            "projects/11-ic-house/4.jpg",
          ]
        },
        {
          title: "Golden Hour",
          subtitle: "עיצוב פנים דירת 6 חדרים",
          description: 'דירה על הים עיתוב בהשראת ״שעת הזהב״',
          location: '-ראשון לציון-',
          imgSrc: require("../assets/projects/09-golden-hour/1.jpg"),
          galleryPaths: [
            "projects/09-golden-hour/2.jpg",
            "projects/09-golden-hour/3.jpg",
            "projects/09-golden-hour/4.jpg",
            "projects/09-golden-hour/5.jpg",
            "projects/09-golden-hour/6.jpg",
            "projects/09-golden-hour/7.jpg",
            "projects/09-golden-hour/8.jpg",
            "projects/09-golden-hour/9.jpg",
            "projects/09-golden-hour/10.jpg"
          ]
        },
        {
          title: "GAMING Midtown",
          subtitle: 'עיצוב מתחם 300 מ״ר',
          description: "בר, משרדים ומשחקי גיימינג",
          location: '-מגדלי מידטאון תל אביב-',
          imgSrc: require("../assets/projects/07-midtown/1.jpg"),
          galleryPaths: [
            "projects/07-midtown/1.jpg",
            "projects/07-midtown/2.jpg",
            "projects/07-midtown/3.jpg",
            "projects/07-midtown/4.jpg",
            "projects/07-midtown/5.jpg",
            "projects/07-midtown/6.jpg",
            "projects/07-midtown/7.jpg",
            "projects/07-midtown/7B.jpg",
            "projects/07-midtown/8.jpg",
            "projects/07-midtown/8B.jpg",
            "projects/07-midtown/9.jpg",
            "projects/07-midtown/10.jpg",
            "projects/07-midtown/11.jpg",
            "projects/07-midtown/11B.jpg",
            "projects/07-midtown/12.jpg",
            "projects/07-midtown/13.jpg",
            "projects/07-midtown/14.jpg",
            "projects/07-midtown/15.jpg",
            "projects/07-midtown/16.jpg",
            "projects/07-midtown/17.jpg",
            "projects/07-midtown/18.jpg",
            "projects/07-midtown/19.jpg",
            "projects/07-midtown/20.jpg",
            "projects/07-midtown/21.jpg",
            "projects/07-midtown/22.jpg",
            "projects/07-midtown/23.jpg",
          ]
        },
        {
          title: "AY House",
          subtitle: "שיפוץ מלא לבית פרטי",
          description: "סגנון מודרני תעשייתי",
          location: '-נס ציונה-',
          imgSrc: require("../assets/projects/05-ay-house/1.png"),
          galleryPaths: [
            "projects/05-ay-house/1.png",
            "projects/05-ay-house/2.png",
            "projects/05-ay-house/3.jpg",
            "projects/05-ay-house/4.png",
            "projects/05-ay-house/4A.png",
            "projects/05-ay-house/5.png",
            "projects/05-ay-house/6.png",
            "projects/05-ay-house/7.png",
            "projects/05-ay-house/8.jpg",
            "projects/05-ay-house/9.png",
            "projects/05-ay-house/10.jpg",
            "projects/05-ay-house/11.png",
            "projects/05-ay-house/12.png",
          ]
        },
        {
          title: "Beyond Minds",
          subtitle: 'עיצוב משרדים 350 מ״ר',
          description: "מינימליסטי עם נוף אורבני",
          location: '-מגדלי הארבעה חג\'ג\' תל אביב-',
          imgSrc: require("../assets/projects/08-beyond-minds/1.jpg"),
          galleryPaths: [
            "projects/08-beyond-minds/1.jpg",
            "projects/08-beyond-minds/2.jpg",
            "projects/08-beyond-minds/3.jpg",
            "projects/08-beyond-minds/4.jpg",
            "projects/08-beyond-minds/5.jpg",
            "projects/08-beyond-minds/6.jpg",
            "projects/08-beyond-minds/7.jpg",
            "projects/08-beyond-minds/8.jpg",
            "projects/08-beyond-minds/9.jpg",
            "projects/08-beyond-minds/10.jpg",
            "projects/08-beyond-minds/11.jpg",
            "projects/08-beyond-minds/12.jpg",
            "projects/08-beyond-minds/13.jpg",
            "projects/08-beyond-minds/14.jpg",
            "projects/08-beyond-minds/15.jpg",
            "projects/08-beyond-minds/16.jpg",
            "projects/08-beyond-minds/17.jpg",
            "projects/08-beyond-minds/18.jpg",
          ]
        }
      ]
    }
  },
  methods: {
    onClick: function(index){
      this.currentSelected = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.grid-container {
  margin-top: 40px;
  display: grid;
  grid-row-gap: 35px;
  grid-column-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  .project-grid-item{
    cursor: pointer;
    margin: 0 15px 44px;
  }
}
</style>>