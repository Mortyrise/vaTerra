import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import Constants from 'expo-constants';

import { AntDesign, Feather } from '@expo/vector-icons';

const ImagePicking = (props) => {
  const [imgURI, setImageURI] = React.useState(null);

  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [remoteURL, setRemoteURL] = React.useState('');

  const [error, setError] = React.useState(null);
  const { width } = useWindowDimensions();

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

  return (
    <View style={styles}>
      <Text style={styles}>Attach and upload image</Text>
      {Boolean(imgURI) && (
        <View>
          <Image
            source={{ uri: imgURI }}
            resizeMode="contain"
            style={{ width, height: width }}
          />
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
