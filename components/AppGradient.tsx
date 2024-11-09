import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Content from '@/components/Content'

interface AppGradientProps {
    children: any
    colors: string[]
}

const AppGradient = ({ children, colors }: AppGradientProps) => {
    return (
        <LinearGradient
            className="flex-1"
            colors={colors}
        >
            <Content>{children}</Content>
        </LinearGradient>
    )
}

export default AppGradient
