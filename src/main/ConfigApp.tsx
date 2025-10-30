import React, { Fragment } from 'react'
import RootWraper from '../layouts/wraper/root/RootWraper'
import HelperRoute from '../routes/helper/HelperRoute'
import { ContextProvider } from '../utils/provider/ContextProvider'
import ColorConst from '../constants/color/ColorConst'
import { StatusBar } from 'react-native'

const ConfigApp = () => {
    return (
        <Fragment>
            <StatusBar
                barStyle="light-content"
                backgroundColor={ColorConst.ROOT_COLOR}
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