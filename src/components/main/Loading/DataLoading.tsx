import { View } from 'react-native'
import React from 'react'
import AnimationLotti from '../../global/Animation/AnimationLotti'
import AnimationConst from '../../../constants/animation/AnimationConst'

const DataLoading = () => {
    return (
        <View className='flex-1 flex items-center justify-center '>
            <AnimationLotti path={AnimationConst.Auth_Loading} bg={"transparent"} height={250} width={250} />
        </View>
    )
}

export default DataLoading