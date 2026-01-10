/* ==========================================================================
   SANITIZE INPUT
   ========================================================================== */
function sanitizeInput(value) {
  // Remove emojis
  value = value.replace(/[\p{Extended_Pictographic}]/gu, "");

  // Remove control characters + invisible zero-width chars
  value = value.replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200F\uFEFF]/g, "");

  // Remove characters that are rarely valid in real systems, except "|", ":", "/"
  value = value.replace(/[^\p{L}\p{N}@._\- '|:\/]/gu, "");

  return value;
}


/* ==========================================================================
   ATTACH SANITIZE INPUT
   ========================================================================== */
export default function attachInputSanitizers() {
  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", e => {
      const clean = sanitizeInput(e.target.value);
      if (clean !== e.target.value) {
        e.target.value = clean;
      }
    });
  });
}

