/**
 * Check if the token has expired
 * 
 * @param {Number} tokenExpiresIn 
 * @returns {Boolean} true | false
 */
export default function hasTokenExpired(tokenExpiresIn) {
  return Date.now() / 1000 > tokenExpiresIn;
}
