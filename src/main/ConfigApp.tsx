import React, { Fragment } from 'react'
import RootWraper from '../layouts/wraper/root/RootWraper'
import HelperRoute from '../routes/helper/HelperRoute'
import { userContext } from '../utils/provider/ContextProvider'
import ColorConst from '../constants/color/ColorConst'
import { ActivityIndicator, Modal, StatusBar, View } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import FlashMsgUI from '../components/global/flash/FlashMsgUI'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const ConfigApp = () => {

    const { modalProvider } = userContext()
    return (
        <Fragment>
            <StatusBar
                barStyle="light-content"
                backgroundColor={ColorConst.ROOT_COLOR}
            />
            <FlashMessage
                position="top"
                animated
                floating
                MessageComponent={FlashMsgUI}
                animationDuration={250}
                statusBarHeight={StatusBar.currentHeight}
            />
            <GestureHandlerRootView style={{
                flex: 1
            }}>
                <RootWraper >
                    <Modal className='flex-1' transparent animationType='fade' visible={modalProvider} >
                        <View className='flex-1 bg-black/50 blur-2xl  flex items-center justify-center '>
                            <View className='p-3 bg-zinc-800/90 rounded-full'>
                                <ActivityIndicator color={"white"} size={"large"} />
                            </View>
                        </View>
                    </Modal>
                    <HelperRoute />
                </RootWraper>
            </GestureHandlerRootView>
        </Fragment>
    )
}

export default ConfigApp