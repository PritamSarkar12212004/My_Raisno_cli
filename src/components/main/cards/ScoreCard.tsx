import { View, Text, TouchableOpacity, Alert, Modal, Animated, PanResponder } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from '../../global/icon/Icon'
import downloadPDF from '../../../functions/FileAction/downloadPDF'
import sharePDF from '../../../functions/FileAction/sharePDF'
import FlashMsg from '../../global/flash/FlashMsg'
import ExamScoreDownloadApi from '../../../functions/api/main/scroe/ExamScoreDownloadApi'


const ScoreCard = ({
  item,
  index,
  token,
  setLoading,
  navigation
}: {
  item: {
    semesterId: string
    semesterName: number
    dataList: {
      sessionId: number
      sessionName: string
      sessionStartDate: string
    }[]
  }
  index: number
  token: any
  setLoading: any
  navigation: any
}) => {
  const [downloading, setDownloading] = useState(false)
  const [showActionSheet, setShowActionSheet] = useState(false)
  const slideAnim = useRef(new Animated.Value(300)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 0,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideAnim.setValue(gestureState.dy)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeActionSheet()
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
        }
      },
    })
  ).current

  const openActionSheet = () => {
    setShowActionSheet(true)
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const closeActionSheet = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),

    ]).start(() => {
      setShowActionSheet(false)
    })
  }

  const handleDownload = async (item: any) => {
    try {
      setDownloading(true)
      setLoading(true)
      const pdfData = await ExamScoreDownloadApi({
        token: token,
        id: item,
        setData: () => { },
        setloading: setLoading
      })
      if (!pdfData) {
        throw new Error('No PDF data received')
      }
      const fileName = `ScoreCard_Sem${item.semesterName}_${item.dataList[0]?.sessionName || 'Session'}`
      openActionSheet()
      setCurrentPdfData({ data: pdfData, fileName })

    } catch (error) {
      FlashMsg({
        message: 'Error',
        description: 'Failed to download PDF file. Please try again.',
        type: 'danger',
      })
    } finally {
      setDownloading(false)
      setLoading(false)
    }
  }

  const [currentPdfData, setCurrentPdfData] = useState<{ data: any; fileName: string } | null>(null)

  const handleDownloadPDF = () => {
    if (currentPdfData) {
      downloadPDF(currentPdfData.data, currentPdfData.fileName)
      closeActionSheet()
    }
  }

  const handleSharePDF = () => {
    if (currentPdfData) {
      sharePDF(currentPdfData.data, currentPdfData.fileName)
      closeActionSheet()
    }
  }
  const ActionButton = ({ icon, title, subtitle, onPress, color }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center p-4 rounded-2xl mb-3 active:opacity-80"
      style={{ backgroundColor: `${color}15` }}
      activeOpacity={0.7}
    >
      <View
        className="w-12 h-12 rounded-xl justify-center items-center mr-4"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon name={icon} size={24} color={color} />
      </View>
      <View className="flex-1">
        <Text className="text-white font-semibold text-base">{title}</Text>
        <Text className="text-gray-400 text-sm mt-1">{subtitle}</Text>
      </View>
      <View
        className="w-10 h-10 rounded-lg justify-center items-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon name="chevron-right" size={16} color={color} />
      </View>
    </TouchableOpacity>
  )
  return (
    <View
      className={`rounded-2xl p-5 mb-4 bg-gray-900/90`}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <View className="bg-blue-500/20 p-2 rounded-lg mr-3">
              <Icon name="file" size={20} color="#3B82F6" />
            </View>
            <View>
              <Text className="text-white text-lg font-bold">
                {item?.dataList[0]?.sessionName || 'Session Name'}
              </Text>
              <Text className="text-gray-400 text-xs font-medium">
                Semester {item?.semesterName} • ID: {item?.semesterId}
              </Text>
            </View>
          </View>
        </View>
        <View className="bg-green-500/20 px-3 py-1 rounded-full">
          <Text className="text-green-400 text-xs font-semibold">
            Available
          </Text>
        </View>
      </View>
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <Icon name="calendar" size={16} color="#9CA3AF" />
          <Text className="text-gray-400 text-sm ml-2">
            {item?.dataList[0]?.sessionStartDate ?
              new Date(item.dataList[0].sessionStartDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              }) : 'N/A'
            }
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-gray-400 text-sm ml-2">
            ID: {item?.dataList[0]?.sessionId || 'N/A'}
          </Text>
        </View>
      </View>
      <View className="border-t border-gray-700 mb-4" />
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Text className="text-gray-300 text-sm font-medium">
            PDF Document • {downloading ? 'Downloading...' : 'Ready to download'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleDownload(item)}
          disabled={downloading}
          className="flex-row items-center px-4 py-3 rounded-xl bg-blue-500/20"
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold ml-2">
            {downloading ? 'Downloading...' : 'Download'}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showActionSheet}
        transparent
        animationType="none"
        onRequestClose={closeActionSheet}
      >
        <View className="flex-1 justify-end">
          <Animated.View
            style={{ opacity: fadeAnim }}
            className="absolute inset-0 bg-black/60"
          >
            <TouchableOpacity
              className="flex-1"
              onPress={closeActionSheet}
              activeOpacity={1}
            />
          </Animated.View>
          <Animated.View
            {...panResponder.panHandlers}
            style={{
              transform: [{ translateY: slideAnim }]
            }}
            className="bg-gray-800 rounded-t-3xl p-6"
          >
            <View className="items-center mb-2">
              <View className="w-12 h-1 bg-gray-500 rounded-full" />
            </View>
            <View className="items-center mb-6">
              <View className="w-14 h-14 bg-blue-500/20 rounded-2xl justify-center items-center mb-3">
                <Icon name="file" size={28} color="#3B82F6" />
              </View>
              <Text className="text-white text-xl font-bold text-center">
                Download Score Card
              </Text>
              <Text className="text-gray-400 text-center mt-2">
                Choose how you want to save your score card
              </Text>
            </View>
            <ActionButton
              icon="download"
              title="Download PDF"
              subtitle="Save to your device"
              onPress={handleDownloadPDF}
              color="#3B82F6"
            />
            <ActionButton
              icon="share"
              title="Share PDF"
              subtitle="Share with others directly"
              onPress={handleSharePDF}
              color="#10B981"
            />
            <TouchableOpacity
              onPress={closeActionSheet}
              className="flex-row items-center justify-center p-4 rounded-2xl mt-2 border border-gray-600 active:opacity-80"
              activeOpacity={0.7}
            >
              <Text className="text-gray-300 font-semibold text-base">Cancel</Text>
            </TouchableOpacity>
            <View className="h-4" />
          </Animated.View>
        </View>
      </Modal>
    </View>
  )
}

export default ScoreCard