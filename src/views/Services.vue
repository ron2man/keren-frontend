<template>
  <div class="main-content main-layout">
    <div class="services-container">
      <div class="service" v-for="service in servicesList" :key="service.name">
        <img :src="service.icon" :alt="service.name" width="100" height="100" />
        <h2>{{service.data.title}}</h2>
        <a href="exterior.html" class="prague-services-link a-btn-2 creative anima" target="_self">
          <span class="a-btn-line"></span>
          READ
        </a>
        <!-- <p v-for="(paragraph,index) in service.data.content" :key="index">{{paragraph}}</p> -->
      </div>
    </div>

    <div class="grid-container">
      <div class="item item1">
        <img
          src="https://icon-library.com/images/interior-design-icon/interior-design-icon-18.jpg"
          alt="אייקון ייעוץ"
          width="100"
          height="100"
        />
        <h3 class="services-item-title">ייעוץ</h3>
        <div class="services-item-description">
          <p>
            Working together with your architect, you will share your
            project needs, dreams and goals.
          </p>
        </div>
        <a href="exterior.html" class="prague-services-link a-btn-2 creative anima" target="_self">
          <span class="a-btn-line"></span>
          READ
        </a>
      </div>
      <div class="item item2">
        <img
          src="https://icon-library.com/images/interior-design-icon/interior-design-icon-18.jpg"
          alt="אייקון עיצוב חוץ"
          width="100"
          height="100"
        />
        <h3 class="services-item-title">Exterior</h3>
        <div class="services-item-description">
          <p>
            Working together with your architect, you will share your
            project needs, dreams and goals.
          </p>
        </div>
        <a href="exterior.html" class="prague-services-link a-btn-2 creative anima" target="_self">
          <span class="a-btn-line"></span>
          READ
        </a>
      </div>

      <div class="item item3">
        <img
          src="https://icon-library.com/images/interior-design-icon/interior-design-icon-18.jpg"
          alt="אייקון עיצוב חוץ 1"
          width="100"
          height="100"
        />
        <h3 class="services-item-title">Exterior1</h3>
        <div class="services-item-description">
          <p>
            Working together with your architect, you will share your
            project needs, dreams and goals.
          </p>
        </div>
        <a href="exterior.html" class="prague-services-link a-btn-2 creative anima" target="_self">
          <span class="a-btn-line"></span>
          READ
        </a>
      </div>

      <div class="item item4">
        <img
          src="https://icon-library.com/images/interior-design-icon/interior-design-icon-18.jpg"
          alt="אייקון עיצוב חוץ 2"
          width="100"
          height="100"
        />
        <h3 class="services-item-title">Exterior2</h3>
        <div class="services-item-description">
          <p>
            Working together with your architect, you will share your
            project needs, dreams and goals.
          </p>
        </div>
        <a href="exterior.html" class="prague-services-link a-btn-2 creative anima" target="_self">
          <span class="a-btn-line"></span>
          READ
        </a>
      </div>

      <div class="item item5">
        <img
          src="https://icon-library.com/images/interior-design-icon/interior-design-icon-18.jpg"
          alt="אייקון עיצוב חוץ 3"
          width="100"
          height="100"
        />
        <h3 class="services-item-title">Exterior3</h3>
        <div class="services-item-description">
          <p>
            Working together with your architect, you will share your
            project needs, dreams and goals.
          </p>
        </div>
        <a href="exterior.html" class="prague-services-link a-btn-2 creative anima" target="_self">
          <span class="a-btn-line"></span>
          READ
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      servicesList: [
        {
          name: "consultation",
          icon: "https://static.thenounproject.com/png/3012380-200.png",

          data: {
            title: "יעוץ",
            content: [
              "ליווי אדריכל מוסמך ,מוכיח את חשיבותו עוד בשלבים מוקדמים של תכנון הבית אני מזמינה אתכם לבוא ליום ייעוץ כדי שננתח ביחד ונמצה את הזכויות המגיעות לכם בנכס, נציג תכנון אדריכלי רעיוני לפנים הבית וסביבתו, נעיין בסגנונות שונים של חומרים וריהוט כדי שנגבש תהליך המתאים למה שאתם אוהבים ובמסגרת תקציב ריאלי.",
              "רוצים לתת חיים חדשים לבית או למשרד ?, מבקשים לרכוש נכס חדש ? מעוניינים להתחיל מדף חלק ? המשרד כאן על מנת לסייע בכל שלב תוך מתן שירות אדריכלי מקצה לקצה."
            ]
          }
        },
        {
          name: "home-styling",
          icon: "https://image.flaticon.com/icons/png/128/899/899222.png",
          data: {
            title: "הום סטיילינג",
            content: [
              `המשרד מציע שירותי הום סטיילינג )"הלבשת הבית"(, עיצוב שמטרתו להכניס רוח חדשה לחלל ניתן לעצב ולהלביש החל מחלל אחד בבית ועד לריהוט והום סטיילינג קומפלט ל : בתים , דירות, משרדים , חלל לובי ובתי-מלון.`,
              ``
            ]
          }
        },
        {
          name: "consultation3",
          data: {
            title: "יעוץ",
            icon: false,
            content: [
              "ליווי אדריכל מוסמך ,מוכיח את חשיבותו עוד בשלבים מוקדמים של תכנון הבית אני מזמינה אתכם לבוא ליום ייעוץ כדי שננתח ביחד ונמצה את הזכויות המגיעות לכם בנכס, נציג תכנון אדריכלי רעיוני לפנים הבית וסביבתו, נעיין בסגנונות שונים של חומרים וריהוט כדי שנגבש תהליך המתאים למה שאתם אוהבים ובמסגרת תקציב ריאלי.",
              "רוצים לתת חיים חדשים לבית או למשרד ?, מבקשים לרכוש נכס חדש ? מעוניינים להתחיל מדף חלק ? המשרד כאן על מנת לסייע בכל שלב תוך מתן שירות אדריכלי מקצה לקצה."
            ]
          }
        },
        {
          name: "consultation4",
          data: {
            title: "יעוץ",
            icon: false,
            content: [
              "ליווי אדריכל מוסמך ,מוכיח את חשיבותו עוד בשלבים מוקדמים של תכנון הבית אני מזמינה אתכם לבוא ליום ייעוץ כדי שננתח ביחד ונמצה את הזכויות המגיעות לכם בנכס, נציג תכנון אדריכלי רעיוני לפנים הבית וסביבתו, נעיין בסגנונות שונים של חומרים וריהוט כדי שנגבש תהליך המתאים למה שאתם אוהבים ובמסגרת תקציב ריאלי.",
              "רוצים לתת חיים חדשים לבית או למשרד ?, מבקשים לרכוש נכס חדש ? מעוניינים להתחיל מדף חלק ? המשרד כאן על מנת לסייע בכל שלב תוך מתן שירות אדריכלי מקצה לקצה."
            ]
          }
        },
        {
          name: "consultation5",
          data: {
            title: "יעוץ",
            icon: false,
            content: [
              "ליווי אדריכל מוסמך ,מוכיח את חשיבותו עוד בשלבים מוקדמים של תכנון הבית אני מזמינה אתכם לבוא ליום ייעוץ כדי שננתח ביחד ונמצה את הזכויות המגיעות לכם בנכס, נציג תכנון אדריכלי רעיוני לפנים הבית וסביבתו, נעיין בסגנונות שונים של חומרים וריהוט כדי שנגבש תהליך המתאים למה שאתם אוהבים ובמסגרת תקציב ריאלי.",
              "רוצים לתת חיים חדשים לבית או למשרד ?, מבקשים לרכוש נכס חדש ? מעוניינים להתחיל מדף חלק ? המשרד כאן על מנת לסייע בכל שלב תוך מתן שירות אדריכלי מקצה לקצה."
            ]
          }
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.main-content {
  height: calc(100% - 100px);
  .services-container {
    display: flex;
    margin-top: 50px;

    .service {
      border: 1px black solid;
      margin: 0 20px;
      background-color: white;
      padding: 0 20px;
      text-align: center;
      box-shadow: 0 30px 50px rgba(0, 0, 0, 0.2);
      h2 {
        margin-top: -10px;
        font-size: 33px;
        line-height: 33px;
        margin-bottom: 15px;
      }
      .a-btn-2 {
        font-family: var(--primary-font);
        font-size: 11px;
        line-height: 18px;
        letter-spacing: 2px;
        font-weight: 500;
        display: inline-block;
        text-decoration: none;
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 15px 46px;
        background-color: transparent;
        border: 1px black solid;
        color: #111111;
        -webkit-transition: color 0.3s ease-in, background-color 0.3s ease-in;
        -o-transition: color 0.3s ease-in, background-color 0.3s ease-in;
        transition: color 0.3s ease-in, background-color 0.3s ease-in;
      }
    }
  }

  .grid-container {
    margin-top: 50px;
    // height: 100%;
    font-family: var(--primary-font);
    display: grid;
    display: none;

    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: repeat(10, 1fr);
    .item {
      margin: 0 20px;
      background-color: white;
      padding: 0 20px;
      text-align: center;
      box-shadow: 0 30px 50px rgba(0, 0, 0, 0.2);
      h3 {
        margin-top: -10px;
        font-size: 33px;
        line-height: 33px;
        margin-bottom: 15px;
      }
      p {
        font-family: var(--primary-font);
        font-size: 16px;
        line-height: 32px;
        font-weight: 400;
        color: #7e7d7d;
        margin-bottom: 15px;
      }
      .a-btn-2 {
        font-family: var(--primary-font);
        font-size: 11px;
        line-height: 18px;
        letter-spacing: 2px;
        font-weight: 500;
        display: inline-block;
        text-decoration: none;
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 15px 46px;
        background-color: transparent;
        border: 1px black solid;
        color: #111111;
        -webkit-transition: color 0.3s ease-in, background-color 0.3s ease-in;
        -o-transition: color 0.3s ease-in, background-color 0.3s ease-in;
        transition: color 0.3s ease-in, background-color 0.3s ease-in;
      }
      &.item1 {
        transition: 0.3s all;

        grid-column: 1 /2;
        grid-row: 1 /12;
      }
      &.item2 {
        grid-column: 3 / 4;
        grid-row: 1 /12;
      }
      &.item3 {
        grid-column: 5 / 6;
        grid-row: 1 /12;
      }
      &.item4 {
        grid-column: 7 /8;
        grid-row: 1 / 12;
      }
      &.item5 {
        grid-column: 9 / 10;
        grid-row: 1 / 12;
      }

      &:hover {
        z-index: 3;
        grid-column: 1 / 10;
        grid-row: 1 / 12;
      }
    }
  }
}
</style>>