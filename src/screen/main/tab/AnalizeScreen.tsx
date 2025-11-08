import { View, Text, Image, Dimensions, TouchableOpacity, Animated, PanResponder, Modal } from 'react-native'
import React from 'react'
import MainWraper from '../../../layouts/wraper/main/MainWraper'
import { userContext } from '../../../utils/provider/ContextProvider'
import BarCode from "@kichiyaki/react-native-barcode-generator"
import { heightPercentageToDP as hp } from "react-native-responsive-screen"
import DataLoading from '../../../components/main/Loading/DataLoading'
import OpenBottomSheet from '../../../functions/bottomSheet/OpenBottomSheet'
import BottomShet from '../../../layouts/bottomSheet/BottomShet'

const AnalizeScreen = () => {
  const { userData, appReady, dataLoading, bottomSheetRef } = userContext()

  const profileImage = userData?.profileImage
  const userDetilesData = userData?.userDetilesData
  const personlInformationData = userData?.personlInformationData
  const studentAddressData = userData?.studentAddressData
  const corseData = userData?.corseData
  const screenWidth = Dimensions.get("window").width
  const func = () => { }
  return (
    <MainWraper>
      {
        appReady && userData ? (
          <View className="flex-1 flex-row items-center justify-center px-2 relative">
            <View className="w-[125vw] flex gap-2 items-center justify-between p-5 h-[37vh] bg-white rounded-2xl rotate-90">
              {/* Header */}
              <View className="w-full h-20 flex-row items-center justify-between">
                <View className="h-full flex-row items-center w-full gap-3">
                  <View className="h-full"></View>
                  <View className="h-full flex">
                    <Text className="text-2xl font-extrabold text-orange-600">
                      G H RAISNO UNIVERSITY, AMRAVATI
                    </Text>
                    <View>
                      <Text className="text-sm text-center font-semibold text-gray-700">
                        G H Raisoni, Anjangaon Bari Road, Amravati-444701 (MH)
                      </Text>
                      <Text className="text-sm text-center font-semibold text-gray-700">
                        Tel. : +91-721-2992966 / 67
                      </Text>
                      <Text className="text-xs text-center text-gray-700">
                        Web : https://ghrua.edu.in/amravati/ | E-mail :
                        info.amravati@ghrua.edu.in
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Student Info */}
              <View className="w-full flex-row gap-5 mt-2">
                <View className="h-full flex">
                  <Image
                    source={{ uri: profileImage }}
                    className="h-36 w-28"
                  />
                </View>
                <View className="h-full flex-auto">
                  <View>
                    <Text className="leading-tight tracking-wider font-semibold">
                      Name : {userDetilesData?.userFirstName} {userDetilesData?.middleName}{" "}
                      {userDetilesData?.lastName}
                    </Text>
                  </View>

                  <View className="flex-row justify-between">
                    <Text className="font-semibold tracking-wider leading-tight">
                      DOB :{" "}
                      {userDetilesData?.dateOfBirth
                        ? new Date(userDetilesData.dateOfBirth).toLocaleDateString("en-GB")
                        : ""}
                    </Text>
                    <Text className="leading-tight tracking-wider font-semibold">
                      Blood Grp : {personlInformationData?.bloodGroupName}
                    </Text>
                  </View>

                  <View>
                    <Text className="leading-tight tracking-wider font-semibold">
                      Program : {corseData?.degreeName} ({corseData?.degreeName})
                    </Text>
                  </View>

                  <View>
                    <Text className="leading-tight tracking-wider font-semibold">
                      Valid Till : 31/07/2026
                    </Text>
                  </View>

                  <View>
                    <Text className="leading-tight tracking-wider font-semibold text-wrap">
                      Address :{" "}
                      <Text className="text-xs tracking-wider ">
                        {studentAddressData?.address},
                      </Text>
                      <Text className="text-xs tracking-wider ">
                        {studentAddressData?.districtName},
                        {studentAddressData?.pincode}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <Text className="leading-tight tracking-wider font-semibold">
                      Phone : {userDetilesData?.mobileNumber}
                    </Text>
                  </View>
                </View>
              </View>
              <View className="w-full h-20 flex mt-1">
                <Text className="text-red-500 font-semibold">
                  {userDetilesData?.registrationNumber}
                </Text>
                <View className="mt-2">
                  {userDetilesData?.registrationNumber && (
                    <BarCode
                      value={userDetilesData.registrationNumber}
                      width={screenWidth * 0.0065}
                      height={hp("3%")}
                    />
                  )}
                </View>
              </View>
            </View>
            <TouchableOpacity activeOpacity={0.8} className=' absolute bottom-0 w-full bg-zinc-900/80 flex items-center justify-center py-4 rounded-3xl' onPress={() => OpenBottomSheet({
              bottomSheetRef
            })}>
              <Text className=' font-semibold text-zinc-300'>Download ICARD</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <DataLoading
            status={dataLoading?.status}
            func={func}
            loading={dataLoading}
          />
        )
      }
    </MainWraper>
  )
}

export default AnalizeScreen
