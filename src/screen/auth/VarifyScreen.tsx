import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useRef } from 'react'
import MainWraper from '../../layouts/wraper/MainWraper'
import SplashHeader from '../../components/splash/header/SplashHeader'
import handleOtpChange from '../../functions/auth/varifyPage/handleOtpChange'
import handleVerify from '../../functions/auth/varifyPage/handleVerify'

const VarifyScreen = ({ navigation, route }: any) => {
    const [otp, setOtp] = useState(['', '', '', ''])
    const [isFocused, setIsFocused] = useState(false)
    const inputRefs = useRef<Array<TextInput | null>>([])

    // Get phone number from previous screen or use default
    const phoneNumber = route?.params?.phoneNumber || '+1 (234) 567-8900'
    const otpHandle = (text: string, index: number) => {
        handleOtpChange({
            index: index,
            inputRefs: inputRefs,
            otp: otp,
            setOtp: setOtp,
            text: text
        })
    }
    const varifyHandle = () => {
        handleVerify({ otp: otp, navigation: navigation })
    }

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }


    const handleResendCode = () => {
        // Handle resend logic here
        console.log('Resending code...')
    }

    const isOtpComplete = otp.every(digit => digit !== '')

    return (
        <MainWraper>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className='flex-1'
            >
                <SplashHeader />
                <View className='flex-1 pt-10 px-2'>
                    <View className='mb-10'>
                        <Text className='text-4xl font-bold text-white mb-3 leading-12'>
                            Verify Your Number
                        </Text>
                        <Text className='text-gray-300 text-base font-medium'>
                            We've sent a 4-digit code to {phoneNumber}
                        </Text>
                    </View>

                    <View className='bg-white/5 rounded-2xl p-6 border border-white/10'>
                        <Text className='text-white text-lg font-semibold mb-4'>
                            Enter Verification Code
                        </Text>

                        <View className='flex-row justify-between mb-6'>
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={ref => inputRefs.current[index] = ref}
                                    className={`w-16 h-16 bg-white/10 rounded-xl text-white text-2xl font-bold text-center border-2 ${isFocused && digit !== ''
                                        ? 'border-blue-500'
                                        : 'border-white/20'
                                        }`}
                                    keyboardType='number-pad'
                                    maxLength={1}
                                    value={digit}
                                    onChangeText={(text) => otpHandle(text, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    selectionColor="#3B82F6"
                                />
                            ))}
                        </View>

                        <TouchableOpacity onPress={handleResendCode}>
                            <Text className='text-blue-400 text-center text-base font-medium'>
                                Resend Code
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className={`mt-8 bg-blue-500 rounded-xl h-14 justify-center items-center shadow-lg ${isOtpComplete ? 'opacity-100' : 'opacity-50'
                            }`}
                        disabled={!isOtpComplete}
                        onPress={varifyHandle}
                        activeOpacity={0.8}
                    >
                        <Text className='text-white text-lg font-bold'>
                            Verify & Continue
                        </Text>
                    </TouchableOpacity>

                    <View className='flex-1 justify-end pb-6'>
                        <Text className='text-gray-400 text-center text-sm'>
                            Didn't receive the code?{' '}
                            <Text className='text-blue-400' onPress={handleResendCode}>
                                Resend in 0:30
                            </Text>
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </MainWraper>
    )
}

export default VarifyScreen