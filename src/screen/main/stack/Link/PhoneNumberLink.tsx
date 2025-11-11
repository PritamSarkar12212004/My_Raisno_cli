import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubWraper from '../../../../layouts/wraper/main/SubWraper';
import SubHeader from '../../../../components/main/Header/SubHeader';
import ColorConst from '../../../../constants/color/ColorConst';
import FlashMsg from '../../../../components/global/flash/FlashMsg';
import { userContext } from '../../../../utils/provider/ContextProvider';
import CallOtp from '../../../../functions/api/link/CallOtp';

const PhoneNumberLink = () => {
    const { modalProvider, setModalProvider } = userContext()
    const [formData, setFormData] = useState('');
    const navigation = useNavigation<any>();
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
        CallOtp({
            phone: formData,
            setModalProvider: setModalProvider,
            navigation: navigation
        })
    };

    return (
        <SubWraper>
            <SubHeader path="Phone Number Link" />
            <SafeAreaView style={{ flex: 1, backgroundColor: ColorConst.ROOT_COLOR }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ flexGrow: 1 }}>
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
                                    Enter your phone number to receive an OTP and continue.
                                </Text>
                            </View>
                            <View className="bg-zinc-900/90 rounded-3xl px-4 pt-6 pb-8 mb-9 shadow-xl shadow-black/10">
                                <Text className="text-gray-300 font-semibold mb-4 ml-2 text-lg">
                                    Phone Number
                                </Text>
                                <TextInput
                                    className="w-full h-14 bg-zinc-900/60 rounded-2xl px-6 text-white text-lg border-2 border-zinc-700/50 focus:border-blue-500"
                                    placeholder="Enter your phone number"
                                    placeholderTextColor="#6B7280"
                                    keyboardType="phone-pad"
                                    value={formData}
                                    onChangeText={handleInputChange}
                                    maxLength={10}
                                />
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                className="w-full h-14 mt-4 bg-zinc-900/90 flex items-center justify-center rounded-full"
                                onPress={() => (modalProvider ? null : handleLogin())}>
                                <Text className="text-white font-bold text-xl">Send OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SubWraper>
    );
};

export default PhoneNumberLink;
