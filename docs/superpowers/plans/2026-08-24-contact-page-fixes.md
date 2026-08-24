# Contact Page Fix Spec Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the content duplication, layout overlaps, and accessibility gaps found in the 2026-08-24 design/UX review of `/contact`, working from the current `src/views/Contact.vue` (already includes the direct-contact-details block, 4-field form, and WhatsApp submit from the prior Contact page plan).

**Architecture:** Single-file change to `src/views/Contact.vue`. No new components, no new dependencies.

**Tech Stack:** Vue 2.6 (matches the rest of the project).

## Global Constraints

- **Spec conflict, resolved here — flagging the reasoning rather than silently picking a side:** §1's "Resulting copy order" explicitly keeps the contact-details block (containing "ליצירת קשר:") *before* the page's `<h1>`. §3's "Heading order" item separately complains that "ליצירת קשר:" is an `<h2>` appearing before the page's `<h1>`, which breaks heading hierarchy. Both are satisfied simultaneously by demoting "ליצירת קשר:" from `<h2>` to a plain paragraph — it was never really a section heading (it's a two-line label over a phone number and an email address), so removing the heading semantics fixes the hierarchy complaint without violating the explicit content order in §1. If this isn't the intended resolution, the content order or the heading choice would need to change instead — flag before shipping if so.
- **§3 items are not covered by the spec's own acceptance checklist** (only §1 and §2 are) but are included in this plan since the spec says they're "worth including in the same pass." Treat them as a distinct, lower-bar addition when reviewing — the checklist below marks which items come from the mandatory checklist vs. §3's recommendations.
- **No automated test suite exists** in this project. Verification is manual: `npm run build`, eslint, and live browser/DOM inspection — this plan's acceptance checklist explicitly requires checking specific pixel widths (1126px, 1280px, 390×844), so a real browser check (not just code reading) is required before calling this done.
- Do not touch the nav menu item "צור קשר" (`src/components/Menu.vue`) — different string, different purpose, explicitly out of scope per §1.3.

---

## Task 1: Fix Contact page content duplication, layout overlaps, and accessibility gaps

**Files:**
- Modify: `src/views/Contact.vue`

**Interfaces:** none (template/script/style changes within this one file only).

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
```

Notes on what changed from the previous version, for the reviewer's reference:

**§1 (content):**
- `<h5 class="subtitle">צרו קשר</h5>` — deleted entirely.
- `<h1 class="title">בואו נתחיל פרויקט יחד</h1>` — text changed to `רוצים גם להתחיל פרויקט יחד?`; this is now the page's only occurrence of this phrase.
- `<p class="tagline">רוצים גם להתחיל פרויקט יחד?</p>` — deleted entirely (was the duplicate).
- `<p class="form-label">להשארת הודעה :</p>` — deleted entirely.
- `.tagline`/`.form-label` style rules removed along with their markup (dead CSS would otherwise linger).

**§2.1 (contact-details overlap + type scale):**
- `.contact-details` gets `margin-top: 32px` (was `0`/unset) — clears the header's icon row with margin to spare at the spec's flagged widths (1126px, 1280px), verify live and adjust if still tight.
- `.contact-details-heading`/`.contact-details-line` font size raised from `14px` to `16px` to match the page's body-text scale (matches the `.tagline` size that existed before removal, and the `16px` used for body copy on other pages, e.g. About.vue's `p`).
- `.contact-details-heading` demoted from `<h2>` to `<p>` (see Global Constraints — resolves the §3 heading-order complaint without violating §1's explicit content order).

**§2.2 (mobile submit button clearance):**
- `.form-submit` gets `padding-bottom: 40px` (was none) so the button clears the fixed `.menu-bottom` nav with margin to spare on mobile. This is scoped to Contact.vue only (not the global `.main-view` padding), matching the spec's instruction to fix it locally. Verify live at 390×844 and adjust if still tight — harmless extra whitespace on desktop where there's no fixed bottom nav.

**§3 (recommended, not on the mandatory checklist):**
- Field labels: `class="visually-hidden"` removed from the 4 field labels; they're now visible, styled via a new `.form-field label` rule, right-aligned to match the RTL form.
- Required indicator: red `*` (`.required-mark`) added to the 3 required fields' labels (email, name, purpose), each with a screen-reader-only "(שדה חובה)" annotation for the icon-only asterisk; "טקסט חופשי" has no asterisk since it stays optional.
- Contrast: button color darkened from `#EC493E` to `#D6402F` (white-on-`#D6402F` ≈ 4.5:1, meets WCAG AA for normal-size text; the old `#EC493E` was ≈3.75:1). Field text/placeholder color opacity raised from `rgba(17,17,17,0.5)` to `rgba(17,17,17,0.7)` (≈6.7:1 against the `#f2f2f2` field background, comfortably over 4.5:1), applied to both typed text and an explicit `&::placeholder` rule (previously relied on the browser's own default placeholder styling, which is what produced the ~3.6:1 the spec measured).
- Validation specificity: `fieldErrors: { email, name, purpose }` tracks which required fields failed on the last submit attempt; each gets an `.invalid` class (red bottom border, reusing the existing `border-bottom-color` mechanism already used for focus state) plus `aria-invalid`. The generic error message text changed from "אנא מלאו את כל השדות המסומנים בטופס" to "אנא מלאו את השדות המסומנים באדום" to match the new per-field red highlighting.

- [ ] **Step 2: Verify — build and static checks**

```bash
npm run build
```

Expected: builds successfully, no errors.

```bash
grep -n "בואו נתחיל פרויקט יחד\|צרו קשר\|להשארת הודעה" src/views/Contact.vue
```

Expected: no matches (all three removed/replaced; "צרו קשר" must not appear in Contact.vue at all — confirm separately via `grep -n "צור קשר" src/components/Menu.vue` that the *nav* string, which is spelled differently, is untouched).

- [ ] **Step 3: Verify — live browser check (required, not optional)**

The spec's acceptance checklist is stated in terms of exact pixel measurements at specific viewport widths, so this cannot be signed off from code alone. With `npm run serve` running:

- At browser window widths 1126px, 1280px, and one width in between (e.g. 1200px): confirm the phone number `054-8166025` is fully visible with no visual overlap with the header's icon row above it. If using the AppleScript JS-execution technique from earlier in this session, get bounding rects for `.icons` (in the Header) and `.contact-details` and confirm `.contact-details`'s top edge is below `.icons`'s bottom edge with at least 16px clearance.
- At 390×844 (or similar mobile size): confirm the submit button is fully visible and that a hit-test at its bottom edge coordinates resolves to the button itself, not `nav.menu-bottom`. (`document.elementFromPoint(x, y)` at the button's bottom-center point should return the button or a descendant of it.)
- Confirm exactly one `<h1>` exists on the page in both the pre-submit and post-submit (`submitted`) states, and that its text reads "רוצים גם להתחיל פרויקט יחד?" before submission.
- Confirm `document.querySelectorAll('h2')` returns none inside Contact.vue's content (the former "ליצירת קשר:" `<h2>` is now a `<p>`) — the page's heading order should be a single `<h1>` with no `<h2>` before it.
- Submit the form empty and confirm the specific empty required fields (email, name, purpose) get a visible red bottom border and `aria-invalid="true"`, and the error message reads "אנא מלאו את השדות המסומנים באדום".

If any measurement is still short of the spec's numbers, increase the corresponding margin/padding value in Step 1 and rebuild — the exact pixel values in this plan are a first attempt, not guaranteed to be sufficient on the first try since they weren't derived from a live measurement of this specific fix.

- [ ] **Step 4: Commit**

```bash
git add src/views/Contact.vue
git commit -m "fix: remove duplicate contact-page headings, fix header/nav overlaps, improve form accessibility"
```
