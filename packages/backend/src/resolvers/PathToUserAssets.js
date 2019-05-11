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

const profilePictureUrlForId = userId => {
  const hash = Math.abs(generateHashFromId(userId));
  return `${baseUrl}images/profile-pictures/${hash}-${userId}`;
};

module.exports = {
  profilePictureUrlForId,
  baseUrl,
  s3Bucket,
};
