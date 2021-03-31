<template>
  <div class="main-layout">
    <div class="grid-container">
      <div class="item text">
        <h2 class="title">אודות</h2>
        <p>
          תחילת דרכי הייתה אי שם בגיל 5, כשהסתובבתי בתוך בתים שהיו בבנייה ודמיינתי מה יהיה בכל חלל. אז הגיעה התוכנית האדריכלית הראשונה שלי של חדר ילדותי, על דף משבצות, לפני שידעתי שיש מקצוע כזה והבנתי את מורכבותו ויופיו. למדתי את האומנות דרך ידיי ועיניי על כל רבדיה - ציור, פיסול, עבודות נגרות והגיעה עד לבנייה ושיפוצים.
        </p>
        <p>
          את המשך דרכי, בחרתי לעשות באוניברסיטאות אשר הרגשתי שיתנו לי את הכלים הכי טובים - הכלים הטכניים וההנדסאים וגם העיצוביים והאומנותיים.
        </p>
        <p>
          הנני בוגרת אוניברסיטת הטכניון TECHNION  ובעלת תואר אדריכלית B.Arch  לאדריכלות ותכנון ערים. במסגרת לימודיי בטכניון בשל הצטיינות בלימודים, יצאתי ללמוד במילאנו , באחד מבתי הספר הטובים בעולם לעיצוב ואדריכלות, הפוליטכניקו Politecnico di Milan. מאז אני מגיעה כמעט כל שנה לשבוע העיצוב במילאנו. 
        </p>
        <p>
          עד היום אני רואה את עולם האדריכלות כעולם רחב - אמנות, תרבות, ידע, אופנה ועיצוב הם חלק בלתי נפרד ממני ומהתהליך שאני עוברת עם לקוחותיי. זה מה שהופך אותי לבעלת מקצוע ייחודית - בעלת יכולות תכנון ועיצוב גבוהות וראייה מרחבית. זהו ידע וניסיון ,שהוא לא רק טכני, אלא אהבה לתחום, יד אומנותית, כישרון טבעי ודרך חיים.
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
  font-family: Roboto, sans-serif;
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
    background-image: url('~@/assets/about-kl.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>>