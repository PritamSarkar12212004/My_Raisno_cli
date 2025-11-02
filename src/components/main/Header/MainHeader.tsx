import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "../../global/icon/Icon";

const MainHeader = ({ profileImage, userDetails }: {
    profileImage: any,
    userDetails: any
}) => {

    return (
        <View className="w-full flex items-center justify-between flex-row pb-2">
            <TouchableOpacity
                className="flex-row items-center justify-center gap-4"
                activeOpacity={0.8}
            >
                <View className="">
                    <Image
                        source={{
                            uri:
                                profileImage && profileImage.startsWith('data:image/')
                                    ? profileImage
                                    : profileImage
                                        ? `data:image/png;base64,${profileImage}`
                                        : "https://i.pinimg.com/736x/44/95/12/4495124f97de536535464aa6558b4452.jpg",
                        }}
                        className="h-12 w-12 rounded-full"
                        resizeMode="cover"
                    />

                </View>
                <View className="flex">
                    <Text className="text-lg  text-gray-400 tracking-tighter">
                        Welcome back
                    </Text>
                    <Text className="text-white font-bold text-lg">
                        {userDetails.userFirstName}
                    </Text>
                </View>
            </TouchableOpacity>
            <View className="flex-row items-center justify-center gap-3">
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        null
                    }}
                    className="h-12 w-12 border-[2px] border-gray-400 rounded-full flex items-center justify-center"
                >
                    <Icon name="notifications-sharp" size={24} color="#FAFDFF" />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                        null
                    }}
                    className="h-12 w-12 border-[2px] border-gray-400 rounded-full flex items-center justify-center"
                >
                    <Icon name="calendar" size={24} color="#FAFDFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MainHeader;
