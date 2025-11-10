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
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubWraper from '../../../../layouts/wraper/main/SubWraper';
import SubHeader from '../../../../components/main/Header/SubHeader';
import ColorConst from '../../../../constants/color/ColorConst';
import FlashMsg from '../../../../components/global/flash/FlashMsg';
import { userContext } from '../../../../utils/provider/ContextProvider';
import writeStorage from '../../../../functions/helper/storage/writeStorage';
import StorageToken from '../../../../constants/token/StorageToken';

const OtpBarifyScreen = () => {
    const { modalProvider, setModalProvider } = userContext()
    const [enteredOtp, setEnteredOtp] = useState('');
    const navigation = useNavigation<any>();
    const route = useRoute();

    const otpFromServer = route?.params?.otp;

    const handleVerify = async () => {
        if (enteredOtp.trim().length < 4) {
            FlashMsg({
                message: 'Invalid OTP',
                description: 'Please enter a valid 4-digit OTP.',
                type: 'danger',
            });
            return;
        }
        if (enteredOtp !== String(otpFromServer)) {
            FlashMsg({
                message: 'OTP Mismatch',
                description: 'Entered OTP is incorrect. Please try again.',
                type: 'danger',
            });
            return;
        }
        setModalProvider(true);
        const func = async () => {
            await writeStorage({
                key: StorageToken.PHONE_NUMBER.LINK_PHONE,
                value: true
            })
            return true
        }
        await func()
        setTimeout(() => {
            setModalProvider(false);
            FlashMsg({
                message: 'OTP Verified',
                description: 'Your number has been successfully verified!',
                type: 'success',
            });
            navigation.navigate("main", {
                screen: "ProfileScreen",
            })
        }, 1200);
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
                                    Verify Your OTP
                                </Text>
                                <Text className="text-base text-gray-400 text-center leading-7">
                                    Please enter the 4-digit OTP you received.
                                </Text>
                            </View>
                            <View className="bg-zinc-900/90 rounded-3xl px-4 pt-6 pb-8 mb-9 shadow-xl shadow-black/10">
                                <Text className="text-gray-300 font-semibold mb-4 ml-2 text-lg">
                                    Enter OTP
                                </Text>
                                <TextInput
                                    className="w-full h-14 bg-zinc-900/60 rounded-2xl px-6 text-white text-lg border-2 border-zinc-700/50 text-center tracking-widest"
                                    placeholder="____"
                                    placeholderTextColor="#6B7280"
                                    keyboardType="numeric"
                                    value={enteredOtp}
                                    onChangeText={setEnteredOtp}
                                    maxLength={4}
                                    cursorColor="transparent"
                                />

                            </View>
                            <TouchableOpacity
                                onPress={handleVerify}
                                disabled={modalProvider}
                                className='w-full h-14 bg-zinc-900/90 flex items-center justify-center rounded-2xl'
                            >
                                <Text className="text-white text-lg font-semibold">
                                    Verify OTP
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </SubWraper >
    );
};

export default OtpBarifyScreen;
