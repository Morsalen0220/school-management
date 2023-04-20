/**
 * Check a string is a email or not
 * @param {string} email
 * @returns {boolean} is email
 */
export default function isEmail(email) {
  /**
   **Explanation:
   *
   *^ matches the beginning of the string
   *[\w.%+-]+ matches one or more word characters, or %, ., + or -
   *@ matches the @ symbol
   *[A-a0-9.-]+ matches one or more characters that are letters (either lowercase or uppercase), digits, ., or -
   *\. matches a literal dot (since . is a special character in regex)
   *[a-zA-Z]{2,} matches two or more letters (either lowercase or uppercase)
   *$ matches the end of the string
   */

  let match = email.trim().match(/^[\w.%+-]+@[A-z0-9.-]+\.[a-zA-Z]{2,}$/);
  return match !== null;
}
