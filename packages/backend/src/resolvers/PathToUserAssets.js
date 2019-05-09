// sorta kinda random
const generateHashFromId = s =>
  String(s * 13 + 1)
    .split('')
    .reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

// export const formatFilename = filename => {
//   const date = moment().format('YYYYMMDD');
//   const randomString = Math.random()
//     .toString(36)
//     .substring(2, 7);
//   const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, '-');
//   const newFilename = `images/${date}-${randomString}-${cleanFileName}`;
//   return newFilename.substring(0, 60);
// };

const profilePictureUrlForId = userId => {
  const hash = Math.abs(generateHashFromId(userId));
  return `images/profile-pictures/${hash}-${userId}`;
};

module.exports = {
  profilePictureUrlForId,
};
