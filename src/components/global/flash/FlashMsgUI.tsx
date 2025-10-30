import React from "react";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const FlashMsgUI = ({ message }: any) => {
    // Extract message data
    const { type, message: title, description } = message;

    // Dynamic styling based on type
    const colors =
        type === "success"
            ? ["#00C851", "#007E33"]
            : type === "danger"
                ? ["#ff4444", "#CC0000"]
                : type === "warning"
                    ? ["#ffbb33", "#FF8800"]
                    : type === "info"
                        ? ["#33b5e5", "#0099CC"]
                        : ["#1F1C2C", "#928DAB"]; // default blue-purple gradient

   
    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
                borderRadius: 16,
                marginHorizontal: 10,
                marginTop: 10,
                paddingVertical: 14,
                paddingHorizontal: 16,
                flexDirection: "row",
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 6,
            }}
        >
            <View style={{ flex: 1 }} className="pt-2">
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 17,
                        fontWeight: "700",
                        marginBottom: description ? 3 : 0,
                    }}
                >
                    {title}
                </Text>
                {description && (
                    <Text style={{ color: "#E0E0E0", fontSize: 14, fontWeight: "500" }}>
                        {description}
                    </Text>
                )}
            </View>
        </LinearGradient>
    );
};

export default FlashMsgUI;
