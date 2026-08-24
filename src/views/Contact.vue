<template>
  <div class="home flex">
    <div
      class="half left"
      :style="{'background-image': `url(${require('@/assets/contact-hero.jpg')})`}"
    ></div>
    <div class="half right flex">
      <div class="form">
        <div class="content text-center">
          <div class="contact-details">
            <p class="contact-details-heading">ליצירת קשר:</p>
            <p class="contact-details-line">נייד : <a href="tel:+972548166025">054-8166025</a></p>
            <p class="contact-details-line">אימייל : <a href="mailto:kerenleizarovitch@gmail.com">kerenleizarovitch@gmail.com</a></p>
          </div>
          <h1 class="title" v-if="!submitted">רוצים גם להתחיל פרויקט יחד?</h1>
          <form @submit="sendForm" v-if="!submitted" novalidate>
            <div class="form-field">
              <label for="contact-email">
                כתובת אימייל <span class="required-mark" aria-hidden="true">*</span><span class="visually-hidden">(שדה חובה)</span>
              </label>
              <input
                id="contact-email"
                type="email"
                v-model="formData.email"
                placeholder="אימייל"
                autocomplete="email"
                required
                :class="{ invalid: fieldErrors.email }"
                :aria-invalid="fieldErrors.email ? 'true' : 'false'"
              />
            </div>
            <div class="form-field">
              <label for="contact-name">
                שם מלא <span class="required-mark" aria-hidden="true">*</span><span class="visually-hidden">(שדה חובה)</span>
              </label>
              <input
                id="contact-name"
                type="text"
                v-model="formData.name"
                placeholder="שם מלא"
                autocomplete="name"
                required
                :class="{ invalid: fieldErrors.name }"
                :aria-invalid="fieldErrors.name ? 'true' : 'false'"
              />
            </div>
            <div class="form-field">
              <label for="contact-purpose">
                מטרת הפרויקט ומיקום <span class="required-mark" aria-hidden="true">*</span><span class="visually-hidden">(שדה חובה)</span>
              </label>
              <input
                id="contact-purpose"
                type="text"
                v-model="formData.purpose"
                placeholder="מטרת הפרויקט ומיקום"
                required
                :class="{ invalid: fieldErrors.purpose }"
                :aria-invalid="fieldErrors.purpose ? 'true' : 'false'"
              />
            </div>
            <div class="form-field">
              <label for="contact-free-text">טקסט חופשי</label>
              <textarea
                id="contact-free-text"
                v-model="formData.freeText"
                rows="6"
                placeholder="לדוגמה: ספרו לנו על הפרויקט - סוג הנכס, שטח משוער, סטייל מועדף ולוחות זמנים"
              ></textarea>
            </div>
            <div class="form-submit">
              <button type="submit" class="submit-button" aria-label="שלח את הטופס">שליחה</button>
            </div>
          </form>
          <div class="whatsapp-sent" v-if="submitted">
            <h1 class="title">תודה</h1>
            <h5 class="subtitle">
              נפתחה עבורך שיחת וואטסאפ בחלון חדש. <br>
              לא נפתח? <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer">לחצו כאן</a>
            </h5>
          </div>
          <div class="form-error" v-if="validationError">
            <p class="subtitle">אנא מלאו את השדות המסומנים באדום</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const WHATSAPP_PHONE = "972548166025";

export default {
  name: "Contact",
  data: function() {
    return {
      submitted: false,
      validationError: false,
      whatsappUrl: "",
      fieldErrors: {
        email: false,
        name: false,
        purpose: false
      },
      formData: {
        email: "",
        name: "",
        purpose: "",
        freeText: ""
      }
    };
  },
  methods: {
    sendForm(e) {
      e.preventDefault();
      const { email, name, purpose, freeText } = this.formData;
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      this.fieldErrors = {
        email: !email || !emailValid,
        name: !name,
        purpose: !purpose
      };

      if (this.fieldErrors.email || this.fieldErrors.name || this.fieldErrors.purpose) {
        this.validationError = true;
        return;
      }
      this.validationError = false;

      const lines = [
        `שם: ${name}`,
        `אימייל: ${email}`,
        `מטרת הפרויקט ומיקום: ${purpose}`
      ];
      if (freeText) {
        lines.push(freeText);
      }
      const message = lines.join("\n");
      this.whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

      window.open(this.whatsappUrl, "_blank", "noopener,noreferrer");
      this.submitted = true;
    }
  }
};
</script>

<style lang="scss" scoped>
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

.home {
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  .half {
    box-sizing: border-box;
    height: 100%;
    &.left {
      //DISPLAY NONE - BECAUSE OF THE MENU
      display: none;
      background-size: cover;
      background-position-x: 50%;
      background-repeat: no-repeat;
      height: calc(100% - 110px);
    }
    &.right {
      align-items: center;
      flex-direction: column;
      @media only screen and (min-width: 600px) {
        justify-content: center;
      }
      .form {
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        .content {
          margin: 0 auto;
          max-width: 560px;
          .contact-details {
            margin-top: 32px;
            margin-bottom: 20px;
            .contact-details-heading {
              font-size: 16px;
              font-weight: 700;
              margin: 0 0 8px;
            }
            .contact-details-line {
              font-size: 16px;
              font-weight: 300;
              line-height: 26px;
              margin: 0;
              a {
                color: inherit;
                text-decoration: none;
                &:hover,
                &:focus {
                  text-decoration: underline;
                }
              }
            }
          }
          .subtitle {
            font-size: 14px;
            line-height: 18px;
            font-weight: 300;
            color: #111;
            padding-top: 15px;
          }
          .title {
            margin-top: 15px;
            font-size: 24px;
            font-weight: 700;
            text-transform: uppercase;
            line-height: 1.35;
            margin-bottom: 15px;
          }

          .form-field {
            text-align: right;
            label {
              display: block;
              font-size: 13px;
              font-weight: 400;
              color: #111;
              margin-bottom: 6px;
              .required-mark {
                color: #D6402F;
              }
            }
          }
          .form-field input,
          .form-field textarea {
            box-sizing: border-box;
            font-family: var(--primary-font);
            font-size: 12px;
            line-height: 26px;
            font-weight: 300;
            -webkit-box-shadow: none;
            box-shadow: none;
            border-radius: 0;
            border: none;
            border-bottom-style: solid;
            border-bottom-width: 3px;
            border-bottom-color: transparent;
            padding: 16px 25px;
            height: 57px;
            background-color: #f2f2f2;
            color: rgba(17, 17, 17, 0.7);
            -webkit-transition: border-bottom-color 0.3s ease-in,
              color 0.3s ease-in;
            -o-transition: border-bottom-color 0.3s ease-in, color 0.3s ease-in;
            transition: border-bottom-color 0.3s ease-in, color 0.3s ease-in;
            background: #f2f2f2;
            width: 100%;
            margin-bottom: 20px;
            &::placeholder {
              color: rgba(17, 17, 17, 0.7);
            }
            &:focus {
              outline: 2px solid #111111;
              outline-offset: 2px;
              background-color: #f2f2f2;
              border: none;
              border-bottom-style: solid;
              border-bottom-width: 3px;
              border-bottom-color: #111111;
              color: #111111;
              -webkit-box-shadow: none;
              box-shadow: none;
            }
            &.invalid {
              border-bottom-color: #D6402F;
            }
          }
          .form-field textarea {
            height: 130px;
            padding: 16px 25px;
            &:focus,
            :active {
              outline-color: transparent;
            }
          }
          .form-error .subtitle {
            color: #c0392b;
          }
          .form-submit {
            padding-bottom: 40px;
            .submit-button {
              display: inline-block;
              font-family: var(--primary-font);
              font-size: 13px;
              line-height: 18px;
              letter-spacing: 1.5px;
              font-weight: 700;
              text-transform: uppercase;
              background-color: #D6402F;
              color: #fff;
              border: 2px solid #D6402F;
              border-radius: 4px;
              padding: 14px 32px;
              cursor: pointer;
              -webkit-transition: background-color 0.2s ease, color 0.2s ease;
              transition: background-color 0.2s ease, color 0.2s ease;
              &:hover {
                background-color: transparent;
                color: #D6402F;
              }
              &:focus {
                outline: 2px solid #111111;
                outline-offset: 2px;
              }
            }
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 769px) {
  .home {
    flex-direction: row;
    height: calc(100% - 80px);
    .half {
      flex: 1;
      &.left {
        display: inherit;
        height: unset;
      }
      &.right {
        .form {
          .content {
            .title {
              font-size: 40px;
              margin-bottom: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
