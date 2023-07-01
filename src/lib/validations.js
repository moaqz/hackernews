/**
 * @param {string} username
 * @param {string} password
 * @returns {?string}
 */
export function validateCredentials(username, password) {
  if (!username || !password) {
    return "missing username or password";
  }

  if (username.length > 50 || username.length < 2) {
    return "username must be between 2 and 50 characters";
  }

  if (password.length > 50 || password.length < 8) {
    return "password must be between 8 and 50 characters";
  }

  return null;
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * @param {object} story
 * @param {string} story.url
 * @param {string} story.content
 * @param {string} story.title
 * @returns {?string}
 */
export function validateStorySubmition({ url, content, title }) {
  if (!title || typeof title !== "string") {
    return "missing title";
  }

  if (title.length < 2 || title.length > 150) {
    return "title must be between 2 and 150 characters";
  }

  if (
    (!url || typeof url !== "string") &&
    (!content || typeof content !== "string")
  ) {
    return "either URL or content must be provided";
  }

  if (url && !isValidUrl(url)) {
    return "invalid URL";
  }

  if (content && content.length > 250) {
    return "content must be between 1 and 250 characters";
  }

  return null;
}
