import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [userGender, setUserGender] = useState(null);
  const [partnerGender, setPartnerGender] = useState(null);

  const handleSelect = (type) => {
    if (!userGender) {
      setUserGender(type);
    } else if (!partnerGender) {
      setPartnerGender(type);
      navigation.navigate('Wheel', {
        user: userGender,
        partner: type,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {!userGender ? 'Who are you?' : !partnerGender ? 'Who is your partner?' : ''}
      </Text>

      <View style={styles.choices}>
        <TouchableOpacity onPress={() => handleSelect('female')}>
          <Image
            source={require('../assets/female.png')}
            style={[
              styles.icon,
              (userGender === 'female' || partnerGender === 'female') && { tintColor: '#FFC0CB' },
            ]}
          />
          {(userGender === 'female' || partnerGender === 'female') && (
            <Text style={styles.selectedLabel}>Selected</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSelect('male')}>
          <Image
            source={require('../assets/male.png')}
            style={[
              styles.icon,
              (userGender === 'male' || partnerGender === 'male') && { tintColor: '#ADD8E6' },
            ]}
          />
          {(userGender === 'male' || partnerGender === 'male') && (
            <Text style={styles.selectedLabel}>Selected</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  choices: {
    flexDirection: 'row',
    gap: 40,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  selectedLabel: {
    textAlign: 'center',
    color: '#555',
    fontWeight: 'bold',
    marginTop: 5,
  },
});
