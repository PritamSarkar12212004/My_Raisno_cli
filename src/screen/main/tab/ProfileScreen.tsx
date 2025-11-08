import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { userContext } from '../../../utils/provider/ContextProvider'
import DataLoading from '../../../components/main/Loading/DataLoading'
import Icon from '../../../components/global/icon/Icon'
import MainWraper from '../../../layouts/wraper/main/MainWraper'
import { useNavigation } from '@react-navigation/native'
import RoutesConst from '../../../constants/routes/RoutesConst'

const ProfileScreen = () => {
  const navigation = useNavigation()
  const { userData, appReady, dataLoading } = userContext()
  const func = () => {
  }
  const profileImage = userData?.profileImage
  const userDetilesData = userData?.userDetilesData
  const personlInformationData = userData?.personlInformationData
  const corseData = userData?.corseData
  const [status, setStatus] = useState<boolean>(false)
  if (!appReady) {
    return (
      <DataLoading
        status={dataLoading.status}
        func={func}
        loading={dataLoading}
      />
    )
  }


  const InfoCard = ({ title, children, icon, delay = 0 }: any) => {
    return (
      <View
      >
        <View className="flex-row items-center mb-4">
          <View className="bg-bl p-2 rounded-xl">
            {icon}
          </View>
          <Text className="text-white font-bold text-xl ml-3">{title}</Text>
        </View>
        {children}
      </View>
    )
  }

  const InfoItem = ({ label, value, icon }: any) => (
    <View className="flex-row items-center py-3 border-b border-white/5 last:border-b-0">
      <View className="w-10 h-10 bg-orange-500/10 rounded-lg items-center justify-center">
        {icon}
      </View>
      <View className="flex-1 ml-4">
        <Text className="text-gray-400 text-sm font-medium">{label}</Text>
        <Text className="text-white font-semibold text-base mt-1">{value || 'Not Available'}</Text>
      </View>
    </View>
  )
  return (
    <MainWraper>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View
          className=""
        >
          <View className="flex gap-4 items-center">
            <View className='flex-row items-center'>
              <View className="relative">
                <Image
                  source={{ uri: profileImage || "https://i.pinimg.com/736x/44/95/12/4495124f97de536535464aa6558b4452.jpg" }}
                  className="h-20 w-20 rounded-2xl border-2 border-orange-500/50"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-white font-bold text-xl leading-6">
                  {userDetilesData?.userFirstName} {userDetilesData?.middleName} {userDetilesData?.lastName}
                </Text>
                <View className="flex-row flex-wrap mt-2 gap-2">
                  <View className="bg-white/5 px-3 py-1 rounded-full">
                    <Text className="text-gray-300 text-xs font-medium">
                      Reg: {userDetilesData?.registrationNumber}
                    </Text>
                  </View>
                  <View className="bg-white/5 px-3 py-1 rounded-full">
                    <Text className="text-gray-300 text-xs font-medium">
                      Roll: {userDetilesData?.rollNumber}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("stack", {
              screen: RoutesConst.STACK_SCREEN.PHONE_NUMBER_LINK
            })}
              activeOpacity={0.9} className='w-full bg-[#836beb] rounded-2xl py-3 flex items-center justify-center'>
              <Text className='text-white font-semibold'>Link Phone Number</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className=" mt-6 flex gap-3">
          <InfoCard
            title="Personal Information"
            icon={<Icon name="user" size={20} color="orange" />}
            delay={100}
          >
            <InfoItem
              label="Date of Birth"
              value={userDetilesData?.dateOfBirth}
              icon={<Icon name="birthday-cake" size={18} color="orange" />}
            />
            <InfoItem
              label="Marital Status"
              value={userDetilesData?.maritalStatus}
              icon={<Icon name="heart" size={18} color="orange" />}
            />
            <InfoItem
              label="Batch Time"
              value={personlInformationData?.admissionBatchName}
              icon={<Icon name="clock-o" size={18} color="orange" />}
            />
            <InfoItem
              label="Admission Date"
              value={corseData?.dateOfAdmission}
              icon={<Icon name="calendar" size={18} color="orange" />}
            />
          </InfoCard>

          <InfoCard
            title="Contact Information"
            icon={<Icon name="phone" size={20} color="orange" />}
            delay={200}
          >
            <InfoItem
              label="Mobile Number"
              value={userDetilesData?.mobileNumber}
              icon={<Icon name="mobile" size={18} color="orange" />}
            />
            <InfoItem
              label="Email Address"
              value={userDetilesData?.personalEmail}
              icon={<Icon name="envelope" size={18} color="orange" />}
            />
          </InfoCard>

          <InfoCard
            title="Identity & Medical"
            icon={<Icon name="id-card" size={20} color="orange" />}
            delay={300}
          >
            <InfoItem
              label="Aadhaar Number"
              value={personlInformationData?.aadhaarNumber}
              icon={<Icon name="id-badge" size={18} color="orange" />}
            />
            <InfoItem
              label="Blood Group"
              value={personlInformationData?.bloodGroupName}
              icon={<Icon name="tint" size={18} color="orange" />}
            />
            <InfoItem
              label="Birth Place"
              value={personlInformationData?.birthPlace}
              icon={<Icon name="map-marker" size={18} color="orange" />}
            />
          </InfoCard>

          <InfoCard
            title="Background Information"
            icon={<Icon name="globe" size={20} color="orange" />}
            delay={400}
          >
            <InfoItem
              label="Domicile State"
              value={personlInformationData?.domicileStateName}
              icon={<Icon name="map" size={18} color="orange" />}
            />
            <InfoItem
              label="Mother Tongue"
              value={personlInformationData?.motherTongueName}
              icon={<Icon name="microphone" size={18} color="orange" />}
            />
          </InfoCard>

          <InfoCard
            title="Academic Details"
            icon={<Icon name="graduation-cap" size={20} color="orange" />}
            delay={500}
          >
            <InfoItem
              label="Academic Year"
              value={corseData?.yearName}
              icon={<Icon name="calendar-o" size={18} color="orange" />}
            />
            <InfoItem
              label="Current Semester"
              value={corseData?.semesterName}
              icon={<Icon name="book" size={18} color="orange" />}
            />
            <InfoItem
              label="Class Section"
              value={corseData?.sectionName}
              icon={<Icon name="users" size={18} color="orange" />}
            />
          </InfoCard>
        </View>
      </ScrollView>
    </MainWraper >

  )
}

export default ProfileScreen