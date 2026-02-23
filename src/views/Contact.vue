<template>
  <div class="home flex">
    <div
      class="half left"
      :style="{'background-image': `url(${require('@/assets/under-construction.jpg')})`}"
    ></div>
    <div class="half right flex">
      <div class="form">
        <div class="content text-center">
          <h5 class="subtitle" v-if="!emailSent">צרו קשר</h5>
          <h3 class="title" v-if="!emailSent">בואו נתחיל פרויקט יחד</h3>
          <form @submit="sendForm" v-if="!emailSent" novalidate>
            <div class="form-field">
              <label for="contact-email" class="visually-hidden">כתובת אימייל</label>
              <input
                id="contact-email"
                type="email"
                v-model="emailData.email"
                placeholder="אימייל"
                autocomplete="email"
                required
              />
            </div>
            <div class="form-field">
              <label for="contact-name" class="visually-hidden">שם מלא</label>
              <input
                id="contact-name"
                type="text"
                v-model="emailData.name"
                placeholder="שם מלא"
                autocomplete="name"
                required
              />
            </div>
            <div class="form-field">
              <label for="contact-message" class="visually-hidden">הודעה</label>
              <textarea
                id="contact-message"
                v-model="emailData.msg"
                rows="5"
                placeholder="הודעה"
                required
              ></textarea>
            </div>
            <div class="form-submit">
              <input type="submit" value="שליחה" aria-label="שלח את הטופס" />
            </div>
          </form>
          <div class="mail-sent-successfully" v-if="emailSent">
            <h3 class="title">תודה</h3>
            <h5 class="subtitle">
              אני מעריכה שיצרת איתי קשר. אחזור אליך בהקדם <br>
              יום טוב, קרן
            </h5>
          </div>
          <div class="mail-send-error" v-if="sendError">
            <h5 class="subtitle">משהו השתבש. נסו שוב או פנו אלינו ישירות</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emailService from "@/services/emailService.js";

export default {
  name: "Contact",
  methods: {
    sendForm(e) {
      e.preventDefault();
      const email = { ...this.emailData };
      if (email.name && email.msg && email.email) {
        emailService.sendEmail(email)
          .then(() => {
            this.emailSent = true;
          })
          .catch(() => {
            this.sendError = true;
          });
      }
    }
  },
  data: function() {
    return {
      emailSent: false,
      sendError: false,
      emailData: {
        email: "",
        name: "",
        msg: ""
      }
    };
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
            color: rgba(17, 17, 17, 0.5);
            -webkit-transition: border-bottom-color 0.3s ease-in,
              color 0.3s ease-in;
            -o-transition: border-bottom-color 0.3s ease-in, color 0.3s ease-in;
            transition: border-bottom-color 0.3s ease-in, color 0.3s ease-in;
            background: #f2f2f2;
            width: 100%;
            margin-bottom: 20px;
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
          }
          .form-field textarea {
            height: 130px;
            padding: 16px 25px;
            &:focus,
            :active {
              outline-color: transparent;
            }
          }
          .mail-send-error .subtitle {
            color: #c0392b;
          }
          .form-submit {
            input {
              font-family: var(--primary-font);
              width: 100%;
              font-size: 11px;
              line-height: 18px;
              letter-spacing: 1.5px;
              font-weight: 700;
              background-color: transparent;
              border: none;
              color: #111111;
              border-radius: 0;
              -webkit-box-shadow: none;
              box-shadow: none;
              margin: 0;
              position: relative;
              -webkit-appearance: button;
              cursor: pointer;
              text-transform: uppercase;
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