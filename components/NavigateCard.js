import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import tw from "tailwind-react-native-classnames";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourite from "./NavFavourite";
import { KeyboardAvoidingView } from "react-native";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning, Satyam</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            // style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <GooglePlacesAutocomplete
              placeholder="Where to?"
              styles={toInputBoxStyles}
              fetchDetails={true}
              enablePoweredByContainer={false}
              returnKeyType={"search"}
              minLength={2}
              onPress={(data, details = null) => {
                dispatch(
                  setDestination({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );
                navigation.navigate("RideOptionCard");
              }}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: "en",
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={200}
            />
          </KeyboardAvoidingView>
        </View>
        <NavFavourite />
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
