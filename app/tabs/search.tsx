import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { YStack, XStack, Text, Input } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Users, UserPlus, Clock } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import { useAppStore } from '@/shared/lib/stores/app-store';
import { Stack } from 'expo-router';

type SearchCategory = 'all' | 'friends' | 'groups' | 'sessions';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');
  const router = useRouter();
  const theme = useAppStore((s) => s.theme);

  const categories: { key: SearchCategory; label: string }[] = [
    { key: 'all', label: 'Hammasi' },
    { key: 'friends', label: "Do'stlar" },
    { key: 'groups', label: 'Guruhlar' },
    { key: 'sessions', label: 'Sessiyalar' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : '#fff' }}>
      <Stack.Screen options={{ headerShown: false }} />
      <YStack flex={1} padding="$4" gap="$4">
        
        {/* Header */}
        <Text fontSize={24} fontWeight="700">🔍 Qidiruv</Text>

        {/* Search Input */}
        <XStack
          backgroundColor="$gray3"
          borderRadius={12}
          padding="$3"
          alignItems="center"
          gap="$2"
        >
          <Search size={20} color="$gray10" />
          <Input
            flex={1}
            value={query}
            onChangeText={setQuery}
            placeholder="Qidirish..."
            borderWidth={0}
            backgroundColor="transparent"
            padding={0}
            fontSize={16}
          />
        </XStack>

        {/* Categories */}
        <XStack gap="$2" flexWrap="wrap">
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              onPress={() => setCategory(cat.key)}
            >
              <YStack
                backgroundColor={category === cat.key ? '#2ECC71' : '$gray3'}
                borderRadius={20}
                paddingHorizontal="$3"
                paddingVertical="$2"
              >
                <Text
                  color={category === cat.key ? 'white' : '$gray11'}
                  fontWeight="600"
                  fontSize={14}
                >
                  {cat.label}
                </Text>
              </YStack>
            </TouchableOpacity>
          ))}
        </XStack>

        {/* Results */}
        {query.length === 0 ? (
          <YStack flex={1} alignItems="center" justifyContent="center" gap="$3">
            <Search size={48} color="$gray7" />
            <Text color="$gray10" fontSize={16} textAlign="center">
              Qidirish uchun matn kiriting
            </Text>
          </YStack>
        ) : (
          <YStack flex={1} alignItems="center" justifyContent="center">
            <Text color="$gray10" fontSize={16} textAlign="center">
              "{query}" bo'yicha natijalar yo'q
            </Text>
          </YStack>
        )}

      </YStack>
    </SafeAreaView>
  );
}