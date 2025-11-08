import { View, Text, Modal } from 'react-native'
import React from 'react'

const BottomShet = ({ status, children }: {
  status: boolean,
  children: any
}) => {
  return (
    <Modal visible={status} style={
      {
        flex: 1,
        height: "100%",
        width: "100%"
      }
    } transparent animationType='slide' >
      <View className='flex-1'>
        {
          children
        }
      </View>
    </Modal>
  )
}

export default BottomShet