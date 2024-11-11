import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import MEDITATION_IMAGES from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import { router, useLocalSearchParams } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import CustomButton from '@/components/CustomButton'
import { Audio } from 'expo-av'
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData'

const Meditate = () => {
    const { id } = useLocalSearchParams()
    const [secondsRemaining, setSecondsRemaining] = useState(10)
    const [isMeditating, setIsMeditating] = useState(false)
    const [audioSound, setSound] = useState<Audio.Sound>()
    const [isPlayingAudio, setIsPlayingAudio] = useState(false)

    useEffect(() => {
        let timerId: NodeJS.Timeout

        //Exit
        if (secondsRemaining == 0) {
            setIsMeditating(false)
            return
        }

        if (isMeditating) {
            timerId = setTimeout(() => {
                setSecondsRemaining(secondsRemaining - 1)
            }, 1000)
        }
        timerId = setTimeout(() => {
            setSecondsRemaining(secondsRemaining - 1)
        }, 1000)

        return () => {
            clearTimeout(timerId)
        }
    }, [secondsRemaining, isMeditating])

    const toggleSound = async () => {
        const sound = audioSound ? audioSound : await initializeSound()

        const status = await sound?.getStatusAsync()

        if (!status?.isLoaded && !isPlayingAudio) {
            await sound.playAsync()
            setIsPlayingAudio(true)
        } else {
            await sound.pauseAsync()
            setIsPlayingAudio(false)
        }
    }

    const initializeSound = async () => {
        const audioFileName = MEDITATION_DATA[Number(id) - 1].audio
        const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName])

        setSound(sound)
        return sound
    }

    // format the minutes to ensure the two digits are shown
    const formattedMinutes = String(Math.floor(secondsRemaining / 60)).padStart(2, '0')
    const formattedSeconds = String(secondsRemaining % 60).padStart(2, '0')

    const toggleMeditationSessionStatus = async () => {
        if (secondsRemaining == 0) {
            setSecondsRemaining(10)
        }
        setIsMeditating(!isMeditating)
        await toggleSound()
    }

    useEffect(() => {
        return () => {
            audioSound?.unloadAsync()
        }
    }, [audioSound])

    return (
        <View className="flex-1">
            <ImageBackground
                source={MEDITATION_IMAGES[Number(id) - 1]}
                resizeMode="cover"
                className="flex-1"
            >
                <AppGradient colors={['transparent', 'rgba(0,0,0,0.8)']}>
                    <Pressable
                        className="absolute top-16 left-6 z-10"
                        onPress={() => router.back()}
                    >
                        <AntDesign
                            name="leftcircleo"
                            size={50}
                            color="white"
                        />
                    </Pressable>
                    <View className="flex-1 justify-center">
                        <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
                            <Text className="text-4xl text-blue-800 font-rmono">
                                {formattedMinutes}:{formattedSeconds}
                            </Text>
                        </View>
                    </View>
                    <View className="mb-5">
                        <CustomButton
                            title="Start meditation"
                            onPress={toggleMeditationSessionStatus}
                        />
                    </View>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default Meditate
