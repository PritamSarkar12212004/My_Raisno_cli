import React, { Fragment } from 'react'
import RootWraper from '../layouts/wraper/root/RootWraper'
import HelperRoute from '../routes/helper/HelperRoute'
import { ContextProvider } from '../utils/provider/ContextProvider'
import ColorConst from '../constants/color/ColorConst'
import { StatusBar } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import FlashMsgUI from '../components/global/flash/FlashMsgUI'

const ConfigApp = () => {
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
            <RootWraper >
                <ContextProvider>
                    <HelperRoute />
                </ContextProvider>
            </RootWraper>
        </Fragment>
    )
}

export default ConfigApp