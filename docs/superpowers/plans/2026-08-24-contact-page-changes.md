# Contact Page Changes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Contact Page change spec (2026-08-24): a direct-contact-details block, new lead-in copy, a restructured 4-field form, a real button-styled submit control, and a switch from email submission to a WhatsApp deep link.

**Architecture:** Single-file change to `src/views/Contact.vue` (Vue 2 SFC). No new components, no new dependencies. The now-unused `src/services/emailService.js` is deleted since Contact.vue was its only caller.

**Tech Stack:** Vue 2.6 (matches the rest of the project).

## Global Constraints

- **WhatsApp number and email are already real, live values on this site — not guesses.** `src/components/Header.vue`'s existing icon links already use `tel:+972548166025` / `https://api.whatsapp.com/send?phone=972548166025&...` and `mailto:kerenleizarovitch@gmail.com`. These resolve the spec's open items #1 (email domain) and part of #4 (WhatsApp number) — use these exact values, not the spec's partially-cut-off versions.
- **Open items NOT resolved by existing site data** (draft/default choices made below, flagged for the user's sign-off, same pattern as the SEO plan's draft copy):
  - Hint text for the new "טקסט חופשי" field (spec's open item #3) — drafted below, needs real confirmation.
  - Exact copy placement order (spec's open item #2) — implemented exactly as the spec's own "best reading" order, which the spec itself already provides.
  - Button full-width vs. inline, exact radius (spec's open item #5, partially) — implemented as an inline (not full-width) button with a small 4px radius; the spec's own primary recommendation (solid `#EC493E` fill, white text, ~14px/32px padding, hover fill-to-outline swap) is otherwise followed exactly.
  - Whether to keep a manual "click here" WhatsApp link as a fallback after redirect — added as a small defensive UX addition (popup blockers occasionally interfere with `window.open`), not explicitly requested but low-risk and easy to remove if unwanted.
- **`window.open` must be called synchronously inside the submit handler**, with no `await`/async gap beforehand, so browsers treat it as a direct result of the user's click and don't block it as a popup.
- **The backend `/api/email` route in the separate `kl-architects` repo is left untouched.** This spec is about the frontend form only; removing a live backend route is a separate decision this plan doesn't make.
- **No automated test suite exists** in this project. Verification is manual: `npm run build`, eslint, and browser/DOM inspection (dev server + live JS execution via the AppleScript technique already used in this session, or direct visual check).

---

## Task 1: Rewrite the Contact page — content, fields, WhatsApp submit, and button restyle

This is scoped as a single task rather than split by sub-feature (content vs. behavior vs. styling) because every piece touches the same template, the same `data()` shape, and the same submit handler in one file — splitting it would mean either throwaway glue code in an intermediate state or an artificially incomplete first commit, neither of which is better than reviewing the whole file at once.

**Files:**
- Modify: `src/views/Contact.vue`
- Delete: `src/services/emailService.js`

**Interfaces:** none consumed from or produced for other files (Contact.vue has no other internal consumers; `emailService.js` had exactly one caller, this file).

- [ ] **Step 1: Replace `src/views/Contact.vue` in full**

```vue
<template>
  <div class="home flex">
    <div
      class="half left"
      :style="{'background-image': `url(${require('@/assets/under-construction.jpg')})`}"
    ></div>
    <div class="half right flex">
      <div class="form">
        <div class="content text-center">
          <div class="contact-details">
            <h2 class="contact-details-heading">ליצירת קשר:</h2>
            <p class="contact-details-line">נייד : <a href="tel:+972548166025">054-8166025</a></p>
            <p class="contact-details-line">אימייל : <a href="mailto:kerenleizarovitch@gmail.com">kerenleizarovitch@gmail.com</a></p>
          </div>
          <h5 class="subtitle" v-if="!submitted">צרו קשר</h5>
          <h1 class="title" v-if="!submitted">בואו נתחיל פרויקט יחד</h1>
          <p class="tagline" v-if="!submitted">רוצים גם להתחיל פרויקט יחד?</p>
          <p class="form-label" v-if="!submitted">להשארת הודעה :</p>
          <form @submit="sendForm" v-if="!submitted" novalidate>
            <div class="form-field">
              <label for="contact-email" class="visually-hidden">כתובת אימייל</label>
              <input
                id="contact-email"
                type="email"
                v-model="formData.email"
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
                v-model="formData.name"
                placeholder="שם מלא"
                autocomplete="name"
                required
              />
            </div>
            <div class="form-field">
              <label for="contact-purpose" class="visually-hidden">מטרת הפרויקט ומיקום</label>
              <input
                id="contact-purpose"
                type="text"
                v-model="formData.purpose"
                placeholder="מטרת הפרויקט ומיקום"
                required
              />
            </div>
            <div class="form-field">
              <label for="contact-free-text" class="visually-hidden">טקסט חופשי</label>
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
            <p class="subtitle">אנא מלאו את כל השדות המסומנים בטופס</p>
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
      if (!email || !name || !purpose || !emailValid) {
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
            margin-bottom: 20px;
            .contact-details-heading {
              font-size: 14px;
              font-weight: 700;
              margin: 0 0 6px;
            }
            .contact-details-line {
              font-size: 14px;
              font-weight: 300;
              line-height: 22px;
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
          .tagline {
            font-size: 16px;
            font-weight: 400;
            color: #111;
            margin: 0 0 8px;
          }
          .form-label {
            font-size: 14px;
            font-weight: 300;
            color: #111;
            margin: 0 0 15px;
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
          .form-error .subtitle {
            color: #c0392b;
          }
          .form-submit {
            .submit-button {
              display: inline-block;
              font-family: var(--primary-font);
              font-size: 13px;
              line-height: 18px;
              letter-spacing: 1.5px;
              font-weight: 700;
              text-transform: uppercase;
              background-color: #EC493E;
              color: #fff;
              border: 2px solid #EC493E;
              border-radius: 4px;
              padding: 14px 32px;
              cursor: pointer;
              -webkit-transition: background-color 0.2s ease, color 0.2s ease;
              transition: background-color 0.2s ease, color 0.2s ease;
              &:hover {
                background-color: transparent;
                color: #EC493E;
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
```

Notes on what changed from the original, for the reviewer's reference:
- `emailData` → `formData`; `msg` field replaced by `purpose` (short text input, matches spec's "מטרת הפרויקט ומיקום") and `freeText` (new textarea, matches spec's "טקסט חופשי").
- `emailSent`/`sendError` → `submitted`/`validationError`; the old `.mail-sent-successfully`/`.mail-send-error` blocks are renamed `.whatsapp-sent`/`.form-error` with updated copy.
- `<input type="submit">` → `<button type="submit">` (same submit behavior, more flexible for the new fill/hover styling).
- `emailService` import and the async `.then()/.catch()` call are gone entirely, replaced by synchronous client-side validation + `window.open` to a `wa.me` deep link.
- New `.contact-details` block, `.tagline`, and `.form-label` are additive — nothing existing was removed to make room for them.
- Existing `.visually-hidden`, `.home`/`.half`/`.form`/`.content` layout, and the `.form-field input/textarea` styling are unchanged.

- [ ] **Step 2: Delete the now-unused email service**

```bash
rm src/services/emailService.js
```

- [ ] **Step 3: Verify**

```bash
npm run build
```

Expected: builds successfully, no errors (the removed `emailService.js` and `axios` import are no longer referenced anywhere — confirm with `grep -rn "emailService" src/` returning nothing).

Then, with `npm run serve` running, check in a real browser (or via the AppleScript JS-execution technique used earlier in this session, if convenient):
- `/contact` shows, in order: the new "ליצירת קשר:" block with clickable `tel:`/`mailto:` links showing `054-8166025` and `kerenleizarovitch@gmail.com`, then "צרו קשר", then "בואו נתחיל פרויקט יחד", then "רוצים גם להתחיל פרויקט יחד?", then "להשארת הודעה :", then the 4-field form.
- The form has exactly 4 fields in order: אימייל, שם מלא, מטרת הפרויקט ומיקום (short input, not a textarea), טקסט חופשי (textarea, shows the gray hint text via its placeholder when empty).
- "שליחה" renders as a solid red-orange (`#EC493E`) filled button with white text, not plain text; hovering swaps it to an outline (transparent fill, colored text/border).
- Filling in email + name + purpose and submitting opens a new tab/window to a `wa.me` URL containing the form's values (check the URL's `text=` query param decodes to the expected message); the current tab shows the "תודה" / "נפתחה עבורך שיחת וואטסאפ" confirmation with a fallback link.
- Submitting with a missing required field or an invalid email shows the validation error message instead of opening WhatsApp.
- Exactly one `<h1>` still exists on the page in both the form state and the submitted state (per the earlier SEO plan's Task 6 requirement — don't reintroduce a second `<h1>` or drop it to zero).

- [ ] **Step 4: Commit**

```bash
git add src/views/Contact.vue
git rm src/services/emailService.js
git commit -m "feat: redesign contact page with direct contact details, restructured form, and WhatsApp submission"
```

---

## Open items for the user / Keren to confirm before this ships (carried over from the spec, not resolved by this plan)

- Hint text drafted for the "טקסט חופשי" field ("לדוגמה: ספרו לנו על הפרויקט - סוג הנכס, שטח משוער, סטייל מועדף ולוחות זמנים") is a placeholder guess — needs real copy.
- Button is implemented as inline (not full-width) with a 4px radius — confirm this matches intent, or adjust.
- The "click here" WhatsApp fallback link on the confirmation screen is an addition beyond the spec's literal text — remove if unwanted.
- The backend `/api/email` route in `kl-architects` is left running but now has zero callers from the frontend — decide separately whether to remove it, repurpose it, or leave it as a dormant fallback.
