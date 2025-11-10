import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import ColorConst from '../../constants/color/ColorConst'
import { useNavigation } from '@react-navigation/native'
import FlashMsg from '../../components/global/flash/FlashMsg'
import { userContext } from '../../utils/provider/ContextProvider'
import CallOtpAuth from '../../functions/api/auth/CallOtpAuth'

const { width, height } = Dimensions.get('window')

const AuthScreen = () => {
    const { setModalProvider } = userContext()
    const navigation = useNavigation()
    const [formData, setFormData] = useState('');


    const handleInputChange = (value: string) => {
        let cleaned = value.replace(/[^0-9]/g, '');
        if (cleaned.startsWith('0')) {
            cleaned = cleaned.substring(1);
        }
        if (cleaned.length > 10) {
            cleaned = cleaned.substring(0, 10);
        }
        setFormData(cleaned);
    };

    const handleLogin = () => {
        if (!formData) {
            FlashMsg({
                message: 'Missing Field',
                description: 'Please enter your phone number.',
                type: 'danger',
            });
            return;
        }

        if (formData.length !== 10) {
            FlashMsg({
                message: 'Invalid Number',
                description: 'Phone number must be exactly 10 digits.',
                type: 'danger',
            });
            return;
        }
        setModalProvider(true);
        CallOtpAuth({
            phone: formData,
            setModalProvider: setModalProvider,
            navigation: navigation,
        })
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: ColorConst.ROOT_COLOR }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View className="flex-1 pt-14 px-4 pb-8">
                    {/* Header Section */}
                    <View className="items-center mb-14">
                        <View className="w-20 h-20 bg-blue-500 rounded-2xl items-center justify-center mb-4 shadow-2xl shadow-blue-500/30">
                            <Text className="text-2xl font-bold text-white">RS</Text>
                        </View>
                        <Text className="text-4xl font-bold text-white mb-3 text-center">
                            My RaiSoni
                        </Text>
                        <Text className="text-xl font-semibold text-gray-300 text-center mb-3">
                            Login with your Phone 📱
                        </Text>
                        <Text className="text-base text-gray-400 text-center leading-7">
                            Enter your registered mobile number to access your account.
                        </Text>
                    </View>

                    {/* Tabs (Back to Username Login) */}
                    <View className="flex-row items-center bg-zinc-800/60 rounded-3xl p-2 mb-8 shadow-lg shadow-black/20">
                        <TouchableOpacity activeOpacity={0.8}
                            className="flex-1 flex-row items-center justify-center py-4 rounded-2xl"
                            onPress={() => navigation.goBack()}
                        >
                            <Text className="ml-3 font-semibold text-gray-400">
                                Username
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="flex-1 flex-row items-center justify-center py-4 rounded-2xl bg-white shadow-lg"
                        >
                            <Text className="ml-3 font-semibold text-gray-900">
                                Phone
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Phone Input */}
                    <View className="bg-zinc-800/30 rounded-3xl px-4 pt-4 pb-4 mb-9 shadow-xl shadow-black/10">
                        <View className="mb-6">
                            <Text className="text-gray-300 font-semibold mb-4 ml-2 text-lg">
                                Phone Number
                            </Text>
                            <TextInput
                                className="w-full h-14 bg-zinc-900/60 rounded-2xl px-6 text-white text-lg border-2 border-zinc-700/50 focus:border-blue-500"
                                placeholder="Enter your phone number"
                                placeholderTextColor="#6B7280"
                                value={formData}
                                onChangeText={(text) => handleInputChange(text)}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity activeOpacity={0.8}
                        className="w-full h-14 mt-4 bg-zinc-900/90 flex items-center justify-center rounded-full"
                        onPress={handleLogin}
                    >
                        <Text className="text-white font-bold text-xl">Sign In</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AuthScreen
