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
import RoutesConst from '../../constants/routes/RoutesConst'

const { width, height } = Dimensions.get('window')

const AuthScreen = () => {
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false,
    })

    const handleInputChange = (field: string, value: string) => {
        if (field === 'phone') {
            let cleaned = value.replace(/[^0-9]/g, '');
            if (cleaned.length > 10) {
                cleaned = cleaned.slice(0, 10);
            }
            if (cleaned.startsWith('0')) {
                cleaned = cleaned.replace(/^0+/, '');
            }
            setFormData((prev) => ({
                ...prev,
                [field]: cleaned,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };
    const handleLogin = () => {
        if (!formData.username || !formData.password) {
            Alert.alert('Error', 'Please fill all fields')
            return
        }
        console.log('Username Login:', formData.username)
    }
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
                    <View className="items-center mb-14">
                        <View className="w-20 h-20 bg-blue-500 rounded-2xl items-center justify-center mb-4 shadow-2xl shadow-blue-500/30">
                            <Text className="text-2xl font-bold text-white">RS</Text>
                        </View>
                        <Text className="text-4xl font-bold text-white mb-3 text-center">
                            My RaiSoni
                        </Text>
                        <Text className="text-xl font-semibold text-gray-300 text-center mb-3">
                            Welcome Back, Student! 👋
                        </Text>
                        <Text className="text-base text-gray-400 text-center leading-7">
                            Access your student portal to track progress, explore resources,
                            and manage your academic journey.
                        </Text>
                    </View>
                    <View className="flex-row items-center bg-zinc-800/60 rounded-3xl p-2 mb-8 shadow-lg shadow-black/20">
                        <TouchableOpacity
                            className="flex-1 flex-row items-center justify-center py-4 rounded-2xl bg-white shadow-lg"
                        >
                            <Text className="ml-3 font-semibold text-gray-900">
                                Username
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 flex-row items-center justify-center py-4 rounded-2xl"
                            onPress={() => navigation.navigate(RoutesConst.AUTH_ROUTE.PHONE_SCREEN)}
                        >
                            <Text className="ml-3 font-semibold text-gray-400">
                                Phone
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="bg-zinc-800/30 rounded-3xl px-4 pt-4 pb-4 mb-9 shadow-xl shadow-black/10">
                        <View className="mb-6">
                            <Text className="text-gray-300 font-semibold mb-4 ml-2 text-lg">
                                Username
                            </Text>
                            <TextInput
                                className="w-full h-14 bg-zinc-900/60 rounded-2xl px-6 text-white text-lg border-2 border-zinc-700/50 focus:border-blue-500"
                                placeholder="Enter your username"
                                placeholderTextColor="#6B7280"
                                value={formData.username}
                                onChangeText={(text) => handleInputChange('username', text)}
                            />
                        </View>
                        <View className="mb-6">
                            <Text className="text-gray-300 font-semibold mb-4 ml-2 text-lg">
                                Password
                            </Text>
                            <View className="relative">
                                <TextInput
                                    className="w-full h-14 bg-zinc-900/60 rounded-2xl px-6 pr-14 text-white text-lg border-2 border-zinc-700/50 focus:border-blue-500"
                                    placeholder="Enter your password"
                                    placeholderTextColor="#6B7280"
                                    secureTextEntry={!showPassword}
                                    value={formData.password}
                                    onChangeText={(text) => handleInputChange('password', text)}
                                />
                                <TouchableOpacity
                                    className="absolute right-6 top-0 bottom-0 justify-center"
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Text className="text-gray-400">
                                        {showPassword ? '🙈' : '👁️'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
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
