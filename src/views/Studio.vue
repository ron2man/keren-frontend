<template>
  <div class="main-layout">
    <div class="grid-container">
      <div class="item text">
        <h2 class="title">על הסטודיו</h2>
        <p>
          ה"אני מאמין" של הסטודיו, הינו עיצוב טוטאלי לחלל וסביבתו, מרמת הפרט הקטן ועד לחזית הבית או הבניין והסביבה בה הוא נמצא. המשרד עובד על מגוון רחב של פרויקטים: בנייה מאפס, עיצוב פנים ושיפוץ של בתים פרטיים צמודי קרקע ודירות. כמו כן – מבנים וחללים ציבוריים, משרדים , חללי עבודה שיתופיים, וחללים מסחריים. 
        </p>
        <p>
          הקו העיצובי של הסטודיו הינו קווים מודרניים בשילוב אלמנטים מהטבע וחומרים קלאסיים . 
שילוב בין ישן וחדש, בצורה הרמונית. זאת מתוך אמונה שחלל מצד אחד הוא יצירת מופת מותאמת אישית אך צריכה להישאר על זמנית.

        </p>
        <p>
הערך העליון של המשרד , אותו חרטתי על דגלי – הוא האנשים אשר מתאהבים במקצוע יחד איתי בתהליך. כל תהליך תכנון הוא אינדיבידואלי, חשוב לי להבין את הצרכים והערכים של כל אדם, משפחה או עסק. המשרד מציע ליווי צמוד ומקצועי בכל שלבי התהליך, תוך חוויה מהנה וחיבור מעמיק ואישי.

        </p>
        <p>
          אשמח אם תבואו להגשים את החלום שלכם איתי...    
        </p>
      </div>
      <div class="item image"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.grid-container {
  height: calc(100% - 100px);
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  .text {
    direction: rtl;
    padding: 0 50px;
    .title {
      margin-top: 18px;
      margin-bottom: 18px;
      letter-spacing: 0.9px;
      font-size: 40px;
      line-height: 44px;
    }
    p {
      margin-bottom: 32px;
      font-size: 16px;
      line-height: 32px;
      font-weight: 400;
    }
  }
  .image {
    background-image: url('~@/assets/studio.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>>