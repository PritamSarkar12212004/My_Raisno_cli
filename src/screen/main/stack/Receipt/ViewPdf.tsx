import { useRoute } from "@react-navigation/native";
import React from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const ViewPdf = () => {
    const route = useRoute()
    const { data } = route.params;

    if (!data) {
        return null;
    }

    const screenHeight = Dimensions.get('window').height;

    // For modal display, use flexible dimensions
    return (
        <View style={{ flex: 1, backgroundColor: '#525252' }}>
            <WebView
                originWhitelist={["*"]}
                source={{
                    uri: `data:application/pdf;base64,${data}`
                }}
                startInLoadingState
                renderLoading={() => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator
                            size="large"
                            color="#007bff"
                        />
                    </View>
                )}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.error('WebView error in modal: ', nativeEvent);
                }}
                style={{
                    flex: 1,
                    backgroundColor: '#525252'
                }}
                scalesPageToFit={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        </View>
    );
};

export default ViewPdf;