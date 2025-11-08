import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubWraper from '../../../../layouts/wraper/main/SubWraper';
import SubHeader from '../../../../components/main/Header/SubHeader';
import ColorConst from '../../../../constants/color/ColorConst';
import FlashMsg from '../../../../components/global/flash/FlashMsg';
import RoutesConst from '../../../../constants/routes/RoutesConst';

const OtpBarifyScreen = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const phone = route?.params?.phone || '';

    const handleVerify = () => {
        if (otp.trim().length < 4) {
            FlashMsg({
                message: 'Invalid OTP',
                description: 'Please enter a valid 4-digit OTP.',
                type: 'danger',
            });
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            FlashMsg({
                message: 'OTP Verified',
                description: `Welcome! Phone number ${phone || ''} verified successfully.`,
                type: 'success',
            });
            navigation.navigate(RoutesConst.MAIN_ROUTE.DASHBOARD);
        }, 1500);
    };

    const handleResend = () => {
        FlashMsg({
            message: 'OTP Resent',
            description: `A new OTP has been sent to ${phone || 'your phone'}.`,
            type: 'info',
        });
    };

    return (
        <SubWraper>
            <SubHeader path="Verify OTP" />
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
                                    <Text className="text-2xl font-bold text-white">OTP</Text>
                                </View>
                                <Text className="text-3xl font-bold text-white mb-3 text-center">
                                    Verify Your Number
                                </Text>
                                <Text className="text-base text-gray-400 text-center leading-7">
                                    Enter the 4-digit OTP sent to{' '}
                                    <Text className="text-blue-400 font-semibold">
                                        {phone || 'your phone'}
                                    </Text>
                                    .
                                </Text>
                            </View>
                            <View className="bg-zinc-900/90 rounded-3xl px-4 pt-6 pb-8 mb-9 shadow-xl shadow-black/10">
                                <Text className="text-gray-300 font-semibold mb-4 ml-2 text-lg">
                                    Enter OTP
                                </Text>
                                <TextInput
                                    className="w-full h-14 bg-zinc-900/60 rounded-2xl px-6 text-white text-lg border-2 border-zinc-700/50 focus:border-blue-500 text-center tracking-widest"
                                    placeholder="____"
                                    placeholderTextColor="#6B7280"
                                    keyboardType="numeric"
                                    value={otp}
                                    onChangeText={setOtp}
                                    maxLength={4}
                                />
                            </View>

                            {/* Verify Button */}
                            <TouchableOpacity
                                className="w-full h-14 mt-4 bg-zinc-900/90 flex items-center justify-center rounded-full"
                                onPress={() => (loading ? null : handleVerify())}>
                                {loading ? (
                                    <ActivityIndicator size="small" color="gray" />
                                ) : (
                                    <Text className="text-white font-bold text-xl">Verify OTP</Text>
                                )}
                            </TouchableOpacity>

                            {/* Resend OTP */}
                            <TouchableOpacity onPress={handleResend} className="mt-6">
                                <Text className="text-blue-400 text-center text-base font-medium">
                                    Resend OTP
                                </Text>
                            </TouchableOpacity>

                            {/* Back */}
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                className="mt-4">
                                <Text className="text-gray-400 text-center text-base">
                                    ← Back to Phone Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SubWraper>
    );
};

export default OtpBarifyScreen;
