import { Stack } from "expo-router";
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const slides = [
  {
    id: 1,
    emoji: "📷",
    title: "Chekni skaner qil",
    description: "Kamera orqali chekni skaner qiling, AI avtomatik o'qiydi",
  },
  {
    id: 2,
    emoji: "👥",
    title: "Do'stlar bilan bo'lish",
    description: "Do'stlaringizni qo'shing va chekni ulashing",
  },
  {
    id: 3,
    emoji: "💰",
    title: "Avtomatik hisoblaydi",
    description: "Kim qancha to'lashi kerakligini ilova o'zi hisoblab beradi",
  },
  {
    id: 4,
    emoji: "🎉",
    title: "Boshlash vaqti!",
    description: "Endi do'stlar bilan chekni bo'lishni boshlang",
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);

  const finish = async () => {
    await AsyncStorage.setItem("onboarding_done", "true");
    router.replace("/");
  };

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      finish();
    }
  };

  const slide = slides[current];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <TouchableOpacity style={styles.skip} onPress={finish}>
        <Text style={styles.skipText}>O'tkazib yuborish</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.emoji}>{slide.emoji}</Text>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
      </View>

      <View style={styles.dots}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === current && styles.activeDot]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {current === slides.length - 1 ? "Boshlash" : "Keyingi"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  skip: {
    alignSelf: "flex-end",
  },
  skipText: {
    color: "#999",
    fontSize: 16,
  },
  content: {
    alignItems: "center",
    gap: 20,
  },
  emoji: {
    fontSize: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1a1a1a",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    lineHeight: 24,
  },
  dots: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  activeDot: {
    backgroundColor: "#2ECC71",
    width: 24,
  },
  button: {
    backgroundColor: "#2ECC71",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});