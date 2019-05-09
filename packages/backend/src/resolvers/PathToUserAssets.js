// sorta kinda random
const generateHashFromId = s =>
  String(s * 13 + 1)
    .split('')
    .reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

const s3Bucket = 'peacock';
const baseUrl = `https://${s3Bucket}.s3.amazonaws.com/`;

const profilePicturePathForId = userId => {
  const hash = Math.abs(generateHashFromId(userId));
  return `images/profile-pictures/${hash}-${userId}`;
};

module.exports = {
  profilePicturePathForId,
  baseUrl,
  s3Bucket,
};
