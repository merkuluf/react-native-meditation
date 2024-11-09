import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'

import { GalleryPreviewData } from '@/constants/models/AffirmationCategory'
import { Link } from 'expo-router'
import { Image } from 'react-native'

interface GuidedAffirmationsGalleryProps {
    title: string
    previews: GalleryPreviewData[]
}

const GuidedAffirmationGallery = ({ title, previews }: GuidedAffirmationsGalleryProps) => {
    return (
        <View className="my-5">
            <View className="mb-2">
                <Text className="text-white font-bold text-3xl">{title}</Text>
            </View>
            <View>
                <FlatList
                    data={previews}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Link
                            href={`/affirmations/${item.id}`}
                            asChild
                        >
                            <Pressable>
                                <View className="h-36 w-32 rounded-md mr-4">
                                    <Image
                                        source={item.image}
                                        resizeMode="cover"
                                        className="w-full h-full"
                                    />
                                </View>
                            </Pressable>
                        </Link>
                    )}
                    horizontal
                />
            </View>
        </View>
    )
}

export default GuidedAffirmationGallery
