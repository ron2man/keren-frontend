<template>
  <section aria-label="גלריית תמונות רקע" aria-roledescription="carousel">
    <p class="visually-hidden" aria-live="polite" aria-atomic="true">
      תמונה {{ activeSlideIdx + 1 }} מתוך {{ numOfSlides }}
    </p>
    <ul id="all_slides" aria-label="שקופיות">
      <li
        class="slide"
        v-for="(slide, idx) in numOfSlides"
        :key="idx"
        :class="{ active: activeSlideIdx === idx }"
        :aria-hidden="activeSlideIdx !== idx ? 'true' : undefined"
      >
        <ResponsiveImage
          v-if="renderedSlides[idx]"
          :src="`background/${idx + 1}.jpg`"
          :alt="slideCaptions[idx]"
          size="large"
          sizes="100vw"
          :loading="idx < 3 ? 'eager' : 'lazy'"
          img-class="slide-img"
          :disable-picture-sources="true"
        />
      </li>
    </ul>
    <button
      class="slider-pause-btn"
      @click="togglePause"
      :aria-label="isPaused ? 'הפעל מצגת' : 'השהה מצגת'"
      :aria-pressed="isPaused"
    >
      <i :class="isPaused ? 'fa fa-play' : 'fa fa-pause'" aria-hidden="true"></i>
    </button>
  </section>
</template>

<script>
import ResponsiveImage from "./ResponsiveImage.vue";

export default {
  name: "Slider",
  components: { ResponsiveImage },
  data: function() {
    return {
      numOfSlides: 31,
      activeSlideIdx: 0,
      interval: null,
      isPaused: false,
      renderedSlides: [
        true, true, true, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false, false, false, false, false, false, false, false, false, false,
        false
      ],
      slideCaptions: [
        "וילה מודרנית עם בריכת אינפיניטי, גינה ירוקה ותאורה חיצונית בשעת בין ערביים",
        "וילה מודרנית עם בריכה, פינת אוכל מוצלת ודקל גדול בגינה מטופחת",
        "סלון מרווח עם ספה אפורה, טלוויזיה קירית ומדרגות עץ לצד עץ זית פנימי",
        "וילה מודרנית נוספת עם בריכה, דק עץ ופינת ישיבה מוצלת בגינה טרופית",
        "סלון ופינת אוכל פתוחים עם דופן עץ, כיסאות ירוקים ואמנות קיר, וחלונות גדולים אל הגינה",
        "פינת אוכל מוקפת קירות זכוכית עם מנורות תלייה קלועות ונוף לגינה ירוקה",
        "סלון פתוח עם דלתות זכוכית לפטיו, עצי זית ונישת אבן מרופדת בכריות",
        "סלון עם ספה בהירה, קיר גלריה ומסך טלוויזיה גדול מול חלונות עץ תריסים",
        "וילה טרופית עם עמודי דקל, בריכה פרטית ומרפסת זכוכית בקומה השנייה",
        "מטבח עם אי שיש, כיסאות בר וקיר יינות זכוכית מואר",
        "חזית וילה מודרנית עם קיר אבן, דקלים ושתי מכוניות בכניסה",
        "וילה בת שתי קומות בשעת בין ערביים, מרפסת פתוחה ודקלים בכניסה",
        "חלל מדרגות עם מעקה זכוכית וגימור זהב, פינת אוכל בשילוב שיש ובר יינות",
        "בריכה צרה עם נישת אבן מרופדת בכריות ועציצי קקטוסים בגינה",
        "וילה עם מטבח חוץ, כיסאי אוכל בגוון טרה קוטה ומדשאה ירוקה",
        "חזית וילה מודרנית עם דקלים גבוהים ומרפסת גג פתוחה",
        "סלון פתוח עם קיר טלוויזיה, אי שיש עם כיסאות בר, ושטיח מנוקד בגוונים חמים",
        "סלון עם קיר אבן מוארת, מדפי תצוגה ודלתות הזזה לחצר",
        "חזית וילה לבנה מודרנית עם דקלים ורכבים בחניה הפרטית",
        "חלל פתוח עם מדרגות זכוכית צפות, פינת אוכל ומטבח ברקע",
        "חלל מגורים פתוח עם מנורות תלייה מעוצבות, מחיצת עץ אנכית ופתח לפטיו חיצוני",
        "פטיו חוץ עם בריכת אינפיניטי, ריהוט ישיבה ונוף להרים ולעיר",
        "סלון מינימליסטי עם מסך טלוויזיה בין שני חלונות קמורים ונוף דקלים",
        "חלל מגורים פתוח עם מדרגות, קיר זכוכית וחלון קמור גדול",
        "פרגולת חוץ מעץ עם מאוורר תקרה, בריכה קטנה וריהוט גן מוקף צמחייה טרופית",
        "חדר שינה מאסטר יוקרתי עם קיר שיש ירוק, מראה עגולה, ספסל מרופד ופרקט אריח דגים",
        "בריכת שחייה צרה לאורך חצר צדדית עם דשא גבוה ועצי דקל",
        "סלון עם ספה כהה, קיר גלריית תמונות ומדרגות עץ מול דלתות זכוכית לפטיו",
        "מטבח מודרני עם ארונות אפורים, גב שיש ושלושה גופי תאורה תלויים מעל אי הבר",
        "חזית בית מודרני בשעת דמדומים עם דופן עץ, בריכה מוארת ופינת אוכל בחצר",
        "שביל גינה צדדי לאורך חזית הבית עם קיר לבנים אדום, עצי דקל וישיבת חוץ",
      ]
    }
  },
  methods: {
    goToNextSlide() {
      this.activeSlideIdx = (this.activeSlideIdx + 1) % this.numOfSlides;
      const preloadIdx = (this.activeSlideIdx + 1) % this.numOfSlides;
      if (!this.renderedSlides[preloadIdx]) {
        this.$set(this.renderedSlides, preloadIdx, true);
      }
    },
    togglePause() {
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        clearInterval(this.interval);
      } else {
        this.interval = setInterval(this.goToNextSlide, 2100);
      }
    }
  },
  created() {
    this.interval = setInterval(this.goToNextSlide, 2100);
  },
  destroyed() {
    clearInterval(this.interval);
  }
};
</script>

<style scoped lang="scss">
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

section {
  position: relative;
  width: 100%;
  flex: 1;
}

.slider-pause-btn {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.8);
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
}

#all_slides {
  position: relative;
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.slide {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;
  -webkit-transition: opacity 1.5s;
  -moz-transition: opacity 1.5s;
  -o-transition: opacity 1.5s;
  transition: opacity 1.5s;
  ::v-deep(.slide-img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
.active {
  opacity: 1;
  z-index: 2;
}
</style>
