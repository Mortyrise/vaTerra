import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  useWindowDimensions,
} from 'react-native';
import Constants from 'expo-constants';
// import firebase from './config/firebase';
import { AntDesign, Feather } from '@expo/vector-icons';
import uplodImageFromDevice from '../utils/uploadImageFromDevice';
import getBlobFromUri from '../utils/fetchUploadableImageBinaryData';
import manageFileUpload from '../utils/uploadBinaryDataToFirebaseStorage';

const ImagePicking = (props) => {
  const [imgURI, setImageURI] = React.useState(null);

  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [remoteURL, setRemoteURL] = React.useState('');

  const [error, setError] = React.useState(null);
  const { width } = useWindowDimensions();

  const handleLocalImageUpload = async () => {
    const fileURI = await uplodImageFromDevice();

    if (fileURI) {
      setImageURI(fileURI);
    }
  };

  const onStart = () => {
    setIsUploading(true);
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };
  const onComplete = (fileUrl) => {
    setRemoteURL(fileUrl);
    setIsUploading(false);
    setImageURI(null);
  };

  const onFail = (error) => {
    setError(error);
    setIsUploading(false);
  };
  const handleCloudImageUpload = async () => {
    if (!imgURI) return;

    let fileToUpload = null;

    const blob = await getBlobFromUri(imgURI);

    await manageFileUpload(blob, { onStart, onProgress, onComplete, onFail });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Attach and upload image</Text>
      {Boolean(imgURI) && (
        <View>
          <Image
            source={{ uri: imgURI }}
            resizeMode="contain"
            style={{ width, height: width }}
          />
        </View>
      )}

      {!isUploading && (
        <View style={styles.row}>
          <AntDesign
            name="addfile"
            size={36}
            color={imgURI ? 'green' : 'black'}
            onPress={handleLocalImageUpload}
          />

          {Boolean(imgURI) && (
            <Feather
              name="upload-cloud"
              size={36}
              color="black"
              onPress={handleCloudImageUpload}
            />
          )}
        </View>
      )}

      {isUploading && (
        <View style={styles.uploadProgressContainer}>
          <Text> Upload {progress} of 100% </Text>
        </View>
      )}

      {Boolean(remoteURL) && (
        <View style={{ paddingVertical: 20 }}>
          <Text>
            Image has been uploaded at
            <Text style={{ color: 'blue' }}> {remoteURL} </Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default ImagePicking;

const styles = StyleSheet.create({});
