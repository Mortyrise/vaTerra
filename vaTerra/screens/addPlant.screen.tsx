import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { firebase } from '../utils/config';
import * as ImagePicker from 'expo-image-picker';
import SearchBar from '../components/SearchBar';
import { addPlantToUser } from '../utils/service';
import Slider from '@react-native-community/slider';
import addDaystoDate from '../utils/helperFunctions';
import { ImageInfo } from 'expo-image-picker';

function AddPlant() {
  const [nickNameText, onChangeNickNameText] = React.useState('');
  const [plantImgURI, setPlantImgURI] = React.useState(null);
  const [uploading, setUploading] = useState(false);
  const [plantUri, setPlantUri] = useState(null);
  const [plantObject, setPlantObject] = useState(null);
  const [waterReminder, setWaterReminder] = useState(5);
  const [selectedImage, setSelectedImage] = useState(false);

  const submitPlant = async () => {
    if (!plantImgURI) {
      Alert.alert(
        'please upload an Image before adding the plant to your hibernacle :)'
      );
    } else {
      if (!plantObject) {
        Alert.alert(
          'Please select a Plant before adding it to your hibernacle :)'
        );
      } else {
        const plantSchema = {
          ...plantObject,
          imagePath: await uploadImage(),
          nickName: nickNameText,
          wateringReminderInterval: waterReminder,
          nextReminderDate: addDaystoDate(waterReminder),
        };
        addPlantToUser(plantSchema);
        console.log('PLANT SHCEMA', plantSchema);
        Alert.alert('Your plant has been added to your hibernacle :)');
        setPlantUri(null);
        setPlantObject(null);
        setWaterReminder(null);
        setSelectedImage(false);
      }
    }
  };

  const hasMediaLibraryPermissionGranted = async () => {
    let granted = false;
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.canAskAgain || permission.status === 'denied') {
      granted = false;
    }
    if (permission.granted) {
      granted = true;
    }
    return granted;
  };
  const pickImage = async () => {
    const storagePermissionGranted = await hasMediaLibraryPermissionGranted();
    if (!storagePermissionGranted) return plantImgURI;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      const { uri } = result as ImageInfo;
      const source = { uri: uri };
      setPlantImgURI(result);
      setSelectedImage(true);
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(plantImgURI.uri);
    const blob = await response.blob();
    const filename = plantImgURI.uri.substring(
      plantImgURI.uri.lastIndexOf('/') + 1
    );
    try {
      let snapshot = await firebase.storage().ref().child(filename).put(blob);
      let url = snapshot.ref.getDownloadURL();
      setUploading(true);
      setPlantUri(url);
      return url;
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.uploadimage} behavior="position">
      {/* <SafeAreaView> */}
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Add a new plant to your hibernacle</Text>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Pressable onPress={pickImage} style={styles.imgButton}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    textAlign: 'center',
                  }}
                >
                  Pick an Image from your gallery
                </Text>
              </Pressable>
            </View>
            {!plantImgURI ? (
              <Image
                style={styles.plantImage}
                source={require('../assets/plant.gif')}
              />
            ) : (
              plantImgURI && (
                <Image
                  source={{ uri: plantImgURI.uri }}
                  style={styles.plantImage}
                />
              )
            )}
          </View>
          <TextInput
            placeholder="Add your new plant nickname"
            onChangeText={onChangeNickNameText}
            value={nickNameText}
            style={styles.input}
          ></TextInput>
          <SearchBar setPlantObject={setPlantObject} />
          <View style={{ width: 280 }}>
            {plantObject && (
              <Text>Watering advice: {plantObject.watering}</Text>
            )}
          </View>
          <View>
            <Text style={{}}>
              Depending on your local weather, set the interval of the reminders
              for this plant
            </Text>
            <Slider
              style={{ width: 300, height: 40 }}
              minimumValue={1}
              maximumValue={15}
              minimumTrackTintColor={'#009c97'}
              onValueChange={(value) => {
                setWaterReminder(Math.floor(value));
              }}
              thumbTintColor={'#009c97'}
            />
            <Text>{waterReminder}</Text>
          </View>
          <Pressable onPress={submitPlant} style={styles.imgButton}>
            <View>
              <Text style={styles.buttonText}>ADD PLANT</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  imgButton: {
    padding: 5,
    backgroundColor: '#009c97',
    marginTop: 20,
    borderRadius: 5,
    width: 160,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 13,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    padding: 10,
  },
  title: {
    marginTop: 70,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Thin' : 'Roboto',
    color: '#009c97',
    letterSpacing: 3,
  },
  searchBar: {
    borderRadius: 80,
    height: 40,
    width: 280,
    fontSize: 12,
  },
  input: {
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    alignContent: 'center',
    textAlign: 'right',
    borderColor: '#009c97',
    marginTop: 60,
  },
  plantImage: {
    height: 213,
    width: 160,
    borderWidth: 1,
    padding: 5,
    marginTop: 10,
    borderRadius: 60,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  uploadimage: { alignItems: 'center', justifyContent: 'center', flex: 1 },
});
export default AddPlant;
