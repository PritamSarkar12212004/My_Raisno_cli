import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Icon from '../../global/icon/Icon'
import ExamScoreDownloadApi from '../../../functions/api/main/ExamScoreDownloadApi'
import { PDFDownloader } from '../../../functions/downloader/PdfDownloader'

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

  const handleDownload = async (item: any) => {
    try {
      setDownloading(true);
      setLoading(true);
      
      const pdfData = await ExamScoreDownloadApi({
        token: token,
        id: item,
        setData: () => {}, // We don't need to set data for display
        setloading: setLoading
      });

      if (!pdfData) {
        throw new Error('No PDF data received');
      }

      // Generate file name
      const fileName = `ScoreCard_Sem${item.semesterName}_${item.dataList[0]?.sessionName || 'Session'}`;
      
      // Show download options
      Alert.alert(
        'Download Score Card',
        'Choose an option:',
        [
          {
            text: 'Download PDF',
            onPress: () => PDFDownloader.downloadPDF(pdfData, fileName)
          },
          {
            text: 'Share PDF',
            onPress: () => PDFDownloader.sharePDF(pdfData, fileName)
          },
          {
            text: 'Cancel',
            style: 'cancel'
          }
        ]
      );

    } catch (error) {
      console.error('Download failed:', error);
      Alert.alert('Error', 'Failed to download score card. Please try again.');
    } finally {
      setDownloading(false);
      setLoading(false);
    }
  }

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
          {downloading ? (
            <Icon name="loader" size={18} color="white" />
          ) : (
            <Icon name="download" size={18} color="white" />
          )}
          <Text className="text-white font-semibold ml-2">
            {downloading ? 'Downloading...' : 'Download'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ScoreCard