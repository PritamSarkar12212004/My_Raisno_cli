import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import StorageToken from '../../../constants/token/StorageToken'
import deleteStorage from '../../../functions/helper/storage/deleteStorage'
import { userContext } from '../../../utils/provider/ContextProvider'

const LogutButton = ({
    setModalProvider,
    navigation
}: {
    setModalProvider: any
    navigation: any
}) => {

    const { setInitialRoute, setUnivarsalTokenData, setUserDta, setAppReady } = userContext()
    const logoutFunc = async () => {
        setModalProvider(true)
        await deleteStorage({
            key: StorageToken.AUTH_TOKEN.DATA
        })
        await deleteStorage({
            key: StorageToken.MAIN_TOKEN.DATA
        })
        await deleteStorage({
            key: StorageToken.MAIN_TOKEN.USER_DATA
        })
        await deleteStorage({
            key: StorageToken.PHONE_NUMBER.LINK_PHONE
        })
        await setUnivarsalTokenData(null)
        await setUnivarsalTokenData(null)
        await setUserDta(null)
        await setAppReady(null)
        await setInitialRoute(null)
        setModalProvider(false)
        navigation.reset({
            index: 0,
            routes: [{ name: 'auth' }]
        });
    }
    return (
        <TouchableOpacity onPress={() => logoutFunc()} activeOpacity={0.8} className='w-full flex h-14 bg-red-800/90 rounded-3xl items-center justify-center'>
            <Text className='text-lg font-semibold text-white'>LogutButton</Text>
        </TouchableOpacity>
    )
}

export default LogutButton