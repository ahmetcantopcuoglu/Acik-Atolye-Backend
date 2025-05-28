import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const wheelSize = width * 0.9;
const numberOfSegments = 10;

const positions = [
  { name: 'Missionary', description: 'Classic and intimate position.', image: require('../assets/positions/Missionary.png') },
  { name: 'Doggy Style', description: 'Rear-entry position.', image: require('../assets/positions/Doggy.png') },
  { name: 'Cowgirl', description: 'Partner on top.' },
  { name: 'Spooning', description: 'Side-by-side cuddle position.', image: require('../assets/positions/Spooning.png') },
  { name: 'Standing', description: 'Standing face-to-face.'},
  { name: 'Reverse Cowgirl', description: 'Partner on top, facing away.' },
  { name: 'Seated', description: 'Sitting face-to-face.', image: require('../assets/positions/Seated.png') },
  { name: 'Wheelbarrow', description: 'One partner supports other by hands.' },
  { name: 'Lotus', description: 'Sitting intertwined.'},
  { name: 'Side-by-side', description: 'Lying next to each other.'},
];

const colors = ['#ff9aa2', '#ffb7b2'];

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function WheelScreen({ route }) {
  const rotation = useSharedValue(0);
  const [result, setResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const segmentAngle = 360 / numberOfSegments;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResult(null);

    const randomIndex = Math.floor(Math.random() * numberOfSegments);
    const randomTurns = Math.floor(Math.random() * 4) + 1; // 1-4 tur arası

    const segmentOffset = 360 - randomIndex * segmentAngle - segmentAngle / 2;

    // rotation.value'ı sıfıra resetle (animasyonsuz)
    rotation.value = 0;

    // Sonra hedef açıya dön
    rotation.value = withTiming(
      randomTurns * 360 + segmentOffset,
      {
        duration: 4000,
        easing: Easing.out(Easing.cubic),
      },
      () => {
        runOnJS(setResult)(positions[randomIndex]);
        runOnJS(setIsSpinning)(false);
      }
    );
  };

  return (
    <View style={styles.container}>
      {/* Partner ikonları */}
      <Text style={styles.lovers}>
        {route?.params?.user === 'female' ? '👩' : '👨'} ❤️ {route?.params?.partner === 'female' ? '👩' : '👨'}
      </Text>

      <View style={styles.wheelContainer}>
        {/* Dönen çark */}
        <AnimatedSvg
          width={wheelSize}
          height={wheelSize}
          viewBox={`0 0 ${wheelSize} ${wheelSize}`}
          style={animatedStyle}
        >
          <G>
            {positions.map((pos, index) => {
              const radius = wheelSize / 2;
              const startAngle = segmentAngle * index;
              const endAngle = startAngle + segmentAngle;
              const startRadians = (Math.PI / 180) * startAngle;
              const endRadians = (Math.PI / 180) * endAngle;
              const x1 = radius + radius * Math.cos(startRadians);
              const y1 = radius + radius * Math.sin(startRadians);
              const x2 = radius + radius * Math.cos(endRadians);
              const y2 = radius + radius * Math.sin(endRadians);
              const path = `
                M${radius},${radius}
                L${x1},${y1}
                A${radius},${radius} 0 0,1 ${x2},${y2}
                Z
              `;

              return (
                <Path
                  key={index}
                  d={path}
                  fill={colors[index % colors.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              );
            })}
            {positions.map((pos, index) => {
              const radius = wheelSize / 2;
              const angle = segmentAngle * index + segmentAngle / 2;
              const radians = (Math.PI / 180) * angle;
              const labelRadius = radius * 0.7;
              const x = radius + labelRadius * Math.cos(radians);
              const y = radius + labelRadius * Math.sin(radians);

              return (
                <SvgText
                  key={'label' + index}
                  x={x}
                  y={y}
                  fill="#333"
                  fontSize="14"
                  fontWeight="bold"
                  rotation={angle}
                  originX={x}
                  originY={y}
                  textAnchor="middle"
                >
                  {pos.name}
                </SvgText>
              );
            })}
          </G>
        </AnimatedSvg>

        {/* Sabit pointer */}
        <View style={styles.pointer}>
          <Text
            style={{
              fontSize: 70,
              color: '#ff2e63',
              transform: [{ rotate: '90deg' }],
            }}
          >
            ▼
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, isSpinning && { backgroundColor: '#ccc' }]}
        onPress={spinWheel}
        disabled={isSpinning}
      >
        <Text style={styles.buttonText}>{isSpinning ? 'Spinning...' : 'Spin the Wheel'}</Text>
      </TouchableOpacity>

      {/* Modal popup olarak sonuç kartı */}
      {result && (
        <View style={styles.modalOverlay}>
          <View style={styles.resultCard}>
            <Image
              source={result.image}
              style={styles.positionImage}
              resizeMode="contain"
            />
            <Text style={styles.positionName}>{result.name}</Text>
            <Text style={styles.positionDesc}>{result.description}</Text>

            <TouchableOpacity
              onPress={() => setResult(null)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffe4ec', alignItems: 'center', justifyContent: 'center', padding: 20 },
  lovers: { fontSize: 40, marginBottom: 20 },
  wheelContainer: { marginVertical: 20, width: wheelSize, height: wheelSize, alignItems: 'center', justifyContent: 'center' },
  pointer: {
    position: 'absolute',
    top: 135, // Çarkın üstüne çok yakın
    left: '70%',
    marginLeft: 80,
    zIndex: 20,
  },
  button: { backgroundColor: '#ff2e63', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30, marginTop: 10, elevation: 4 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // yarı saydam koyu arka plan
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  resultCard: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },

  positionImage: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },

  positionName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  positionDesc: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },

  closeButton: {
    marginTop: 15,
    backgroundColor: '#ff2e63',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },

  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
