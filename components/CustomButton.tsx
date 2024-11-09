import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomButtonProps {
    onPress: () => void
    title: string
    textStyles?: string
    container?: string
}

const CustomButton = ({ onPress, title, textStyles = '', container = '' }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`bg-white rounded-xl min-h-[62px] justify-center items-center ${container}`}
            onPress={onPress}
        >
            <Text className={`font-semibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton
