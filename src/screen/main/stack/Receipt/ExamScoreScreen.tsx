import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubWraper from '../../../../layouts/wraper/main/SubWraper'
import SubHeader from '../../../../components/main/Header/SubHeader'
import ExamScoreApi from '../../../../functions/api/main/scroe/ExamScoreApi'
import { userContext } from '../../../../utils/provider/ContextProvider'
import DataLoading from '../../../../components/main/Loading/DataLoading'
import ScoreCard from '../../../../components/main/cards/ScoreCard'
import { useNavigation } from '@react-navigation/native'

const ExamScoreScreen = () => {
  const { univarsalTokenData, userData, setModalProvider } = userContext()
  const navigation = useNavigation<any>()
  const [loading, setLoading] = useState<boolean | any | {
    status: boolean,
    load: boolean
  }>({
    status: true,
    load: true
  })
  const [data, setData] = useState<
    | null
    | {
      semesterId: string
      semesterName: number
      dataList: {
        sessionId: number
        sessionName: string
        sessionStartDate: string
      }[]
    }[]
  >(null);

  const func = () => {

  }
  useEffect(() => {
    ExamScoreApi({
      setData: setData,
      setloading: setLoading,
      token: univarsalTokenData?.Token,
      id: userData?.userDetilesData?.registrationNumber
    })
  }, [])
  return (
    <SubWraper>
      <SubHeader path='Score Card' />
      <View className='flex-1'>
        {
          loading.load ? <DataLoading
            status={loading.status}
            func={func}
            loading={loading}
          /> : <View className='flex-1 relative'>
            {
              data?.map((item, index) => {
                return <ScoreCard key={index} item={item} index={index} token={univarsalTokenData?.Token} setLoading={setModalProvider} navigation={navigation} />
              })
            }
          </View>
        }

      </View>
    </SubWraper>
  )
}

export default ExamScoreScreen