// export const PhotoEditorNewPath = path =>
// path.startsWith("file://")
//     ? `${path}?${new Date().getTime()}`
//     : `file://${path}?${new Date().getTime()}`;
import RNFS from 'react-native-fs';

export const PhotoEditorNewPath = async uri => {
  try {
    const randomString = Math.random().toString(36).substring(2, 15);
    // Optionally, include a timestamp for added uniqueness
    const timestamp = new Date().getTime();
    const uniqueName = `Ube${randomString}${timestamp}`;


    let arr = uri.split('/');
    // const newImagePath = `${RNFS.ExternalStorageDirectoryPath}/Pictures/Ube${arr[arr.length-1]}`;
    const newImagePath = `${RNFS.ExternalStorageDirectoryPath}/Pictures/${uniqueName}`;

    await RNFS.copyFile(`${uri}`, newImagePath);
    console.log('Image saved to', newImagePath);
    return newImagePath;
  } catch (error) {
    console.error('Failed to save the image. Error:', error.message);
  }
};
