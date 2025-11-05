import { View, Text, Dimensions, TouchableOpacity, Animated } from 'react-native'
import React, { useRef, useEffect } from 'react'
import Icon from '../../global/icon/Icon'
import ColorConst from '../../../constants/color/ColorConst'

const MainInfoCard = ({
    title,
    subTitle,
    disc,
    func,
    color
}: {
    title: string
    subTitle: string
    disc: string
    func: any
    color: string
}) => {
    const { width: screenWidth } = Dimensions.get('window')
    const scaleAnim = useRef(new Animated.Value(1)).current
    const rotateAnim = useRef(new Animated.Value(0)).current

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start()
    }

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start()
    }

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(rotateAnim, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        ).start()
    }, [])

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    return (
        <Animated.View
            style={{
                transform: [{ scale: scaleAnim }],
                shadowColor: color,
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
            }}
        >
            <TouchableOpacity
                onPress={() => func()}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.9}
                className='rounded-3xl relative overflow-hidden'
                style={{
                    width: screenWidth * 0.45,
                    aspectRatio: 1,
                    backgroundColor: 'rgba(24, 24, 27, 0.95)',
                }}
            >
                {/* Background Gradient Overlay */}
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '40%',
                        backgroundColor: color,
                        opacity: 0.1
                    }}
                />

                {/* Animated Background Pattern */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: -30,
                        right: -30,
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: color,
                        opacity: 0.05,
                        transform: [{ rotate: rotateInterpolate }],
                    }}
                />

                {/* Content */}
                <View className='flex-1 p-5 flex items-start justify-between'>
                    {/* Title Section */}
                    <View className='w-full'>
                        <Text
                            className='text-2xl font-black text-white mb-1'
                            style={{
                                textShadowColor: 'rgba(255,255,255,0.1)',
                                textShadowOffset: { width: 0, height: 1 },
                                textShadowRadius: 2,
                            }}
                        >
                            {title}
                        </Text>

                        {/* Decorative Line */}
                        <View
                            style={{
                                height: 3,
                                width: 30,
                                backgroundColor: color,
                                borderRadius: 2,
                                marginBottom: 12,
                            }}
                        />
                    </View>

                    {/* Info Section */}
                    <View className='w-full space-y-3'>
                        <Text
                            className='text-lg font-bold text-white'
                            style={{
                                textShadowColor: 'rgba(255,255,255,0.05)',
                                textShadowOffset: { width: 0, height: 1 },
                                textShadowRadius: 1,
                            }}
                        >
                            {subTitle}
                        </Text>
                        <Text className='text-gray-300 text-sm leading-5 font-medium'>
                            {disc}
                        </Text>
                    </View>
                </View>

                {/* Fixed Floating Action Button */}
                <Animated.View
                    className='absolute flex items-center justify-center rounded-full border-[3px]'
                    style={{
                        height: 50,
                        width: 50,
                        right: 8,
                        top: 8,
                        borderColor: ColorConst.ROOT_COLOR,
                        backgroundColor: color,
                        shadowColor: color,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.4,
                        shadowRadius: 8,
                        elevation: 6,
                        transform: [{ rotate: '-45deg' }],
                    }}
                >
                    <View style={{ transform: [{ rotate: '45deg' }] }}>
                        <Icon color={"white"} name={"arrow-right"} size={20} />
                    </View>
                </Animated.View>

                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        width: 0,
                        height: 0,
                        backgroundColor: 'transparent',
                        borderStyle: 'solid',
                        borderLeftWidth: 16,
                        borderRightWidth: 0,
                        borderBottomWidth: 16,
                        borderLeftColor: 'transparent',
                        borderRightColor: 'transparent',
                        borderBottomColor: color,
                        opacity: 0.1,
                    }}
                />
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 0,
                        height: 0,
                        backgroundColor: 'transparent',
                        borderStyle: 'solid',
                        borderRightWidth: 12,
                        borderLeftWidth: 0,
                        borderTopWidth: 12,
                        borderRightColor: 'transparent',
                        borderLeftColor: 'transparent',
                        borderTopColor: color,
                        opacity: 0.05,
                    }}
                />
            </TouchableOpacity>
        </Animated.View>
    )
}


export default MainInfoCard