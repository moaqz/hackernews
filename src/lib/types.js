/**
 * @exports @typedef Comment
 * @property {number} id
 * @property {string} content
 * @property {number | null} parent_id
 * @property {number} story_id
 * @property {Date | string} created_at
 * @property {Object} author
 * @property {string} author.username
 * @property {string} author.id
 */

/**
 * @typedef Votes
 * @property {string} user_id
 * @property {number} story_id
 */

/**
 * @typedef Story
 * @property {number} id
 * @property {string} title
 * @property {string} content
 * @property {string | null} url
 * @property {number} score
 * @property {string | Date} created_at
 * @property {string} author
 * @property {Votes} [votes]
 */

/**
 * @typedef Submission
 * @property {number} id
 * @property {string} title
 * @property {string | null} url
 * @property {Date} created_at
 * @property {number} score
 * @property {Object} author
 * @property {string} author.username
 * @property {string} author.id
 */

export const Types = {};
