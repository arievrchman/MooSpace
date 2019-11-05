import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {iOSColors, robotoWeights} from 'react-native-typography';

import {validateImageUrl} from '../utils/validate';

const static_image =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCUCu9NJgHjM1PQOZYEL9KguZpYhzTlNUBJXk04V80OrQ76yyg';

export const StretchCard = ({data, role, eventTrigger}) => {
  const image = data.image ? data.image : static_image;
  return (
    <TouchableWithoutFeedback
      onPress={role == 'customer' ? () => eventTrigger(data) : null}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: validateImageUrl(image)}} style={{width: 60, height: 60}} />
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.mainTitleText}>
            {role == 'customer' ? data.name : data.user}
          </Text>
          {role == 'customer' && (
            <>
              <Text style={styles.subTitleText}>
                Identity Number: {data.identityNumber}
              </Text>
              <Text style={styles.subTitleText}>
                Phone Number: {data.phoneNumber}
              </Text>
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 60,
    borderWidth: 0.5,
    borderColor: iOSColors.midGray,
    overflow: 'hidden',
    borderRadius: 50,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  mainTitleText: {
    ...robotoWeights.light,
    fontWeight: 'bold',
    fontSize: 15,
    color: iOSColors.black,
    marginBottom: 5,
  },
  subTitleText: {
    ...robotoWeights.thin,
    fontWeight: 'bold',
    marginBottom: 2,
    color: iOSColors.gray,
    fontSize: 12,
  },
});
