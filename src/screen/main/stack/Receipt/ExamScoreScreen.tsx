import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SubWraper from '../../../../layouts/wraper/main/SubWraper'
import SubHeader from '../../../../components/main/Header/SubHeader'
import ExamScoreApi from '../../../../functions/api/main/ExamScoreApi'
import { userContext } from '../../../../utils/provider/ContextProvider'
import DataLoading from '../../../../components/main/Loading/DataLoading'
import ScoreCard from '../../../../components/main/cards/ScoreCard'

const ExamScoreScreen = () => {
  const { univarsalTokenData, userData } = userContext()
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
          /> : <View className='flex-1'>
            {
              data?.map((item, index) => {
                return <ScoreCard key={index} item={item} index={index} />
              })
            }
          </View>
        }

      </View>
    </SubWraper>
  )
}

export default ExamScoreScreen