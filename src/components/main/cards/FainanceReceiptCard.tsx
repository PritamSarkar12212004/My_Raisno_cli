import { View, Text, TouchableOpacity, ActivityIndicator, Animated, PanResponder, Modal } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from '../../global/icon/Icon'
import FlashMsg from '../../global/flash/FlashMsg'
import downloadPDF from '../../../functions/FileAction/downloadPDF'
import sharePDF from '../../../functions/FileAction/sharePDF'
import FainanceDoxDownloadApi from '../../../functions/api/main/fainance/FainanceDoxDownloadApi'
import { userContext } from '../../../utils/provider/ContextProvider'

const FainanceReceiptCard = ({ item }: {
    item: {
        bankRefNo: string
        paymentDate: string
        paymentHdrId: number
        paymentType: string
        paymentTypeName: string
        remark: string
        totalCollectedAmt: string
        transactionType: string
        voucherNo: string
        voucherType: string
        feesHeadDetailsDTOList: {
            debitCredit: string
            feesHeadName: string
            feesType: string
        }[]
        paymentOnlineHistoryDTO: {
            bankRefNo: string
            id: string
            name: string
            orderId: string
            status: string
        }[]
    }
}) => {
    const { univarsalTokenData, setModalProvider, modalProvider } = userContext()

    const [expanded, setExpanded] = useState<boolean>(false)
    const isOnlinePayment = item.paymentType === "ONLINE_PAYMENT"
    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'success': return '#10b981'
            case 'pending': return '#f59e0b'
            case 'failed': return '#ef4444'
            default: return '#6b7280'
        }
    }
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
            setModalProvider(true)
            const pdfData = await FainanceDoxDownloadApi({
                token: univarsalTokenData?.Token,
                id: item.voucherNo,
                setData: () => { },
                setloading: setModalProvider
            })
            if (!pdfData) {
                FlashMsg({
                    message: 'Error',
                    description: 'No PDF data received.',
                    type: 'danger',
                })
            }
            const fileName = `Finance_Receipt_${item.voucherNo}_${item.totalCollectedAmt}`;
            openActionSheet()
            setCurrentPdfData({ data: pdfData, fileName })

        } catch (error) {
            FlashMsg({
                message: 'Error',
                description: 'Failed to download PDF file. Please try again.',
                type: 'danger',
            })
        } finally {
            setModalProvider(false)
        }
    }

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
    const [currentPdfData, setCurrentPdfData] = useState<{ data: any; fileName: string } | null>(null)
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
        <View className='w-full bg-zinc-900/90 overflow-hidden mb-4 border-[1px] border-zinc-900 p-3 rounded-3xl '>
            <View className='flex-row justify-between items-start mb-4'>
                <View className='flex-1'>
                    <View className={`px-3 py-1 rounded-full self-start mb-2 ${isOnlinePayment ? 'bg-purple-500/20' : 'bg-pink-500/20'
                        }`}>
                        <Text className={`text-sm font-bold ${isOnlinePayment ? 'text-purple-200' : 'text-pink-200'
                            }`}>
                            {item.paymentType.replace('_', ' ')}
                        </Text>
                    </View>
                    <Text className='text-white text-lg font-semibold'>
                        {item.paymentTypeName}
                    </Text>
                </View>

                <View className='items-end'>
                    <Text className='text-gray-300 text-sm mb-1'>Date</Text>
                    <Text className='text-white font-bold text-base'>
                        {item.paymentDate}
                    </Text>
                </View>
            </View>
            <View className='mb-6'>
                <Text className='text-gray-300 text-sm mb-2'>Total Amount</Text>
                <Text className='text-white text-4xl font-bold tracking-tight'>
                    ₹{item.totalCollectedAmt}
                </Text>
            </View>
            <View className='flex-row flex-wrap gap-4 mb-4'>
                <View className='flex-1 min-w-[120]'>
                    <Text className='text-gray-400 text-xs mb-1'>Voucher No</Text>
                    <Text className='text-white font-semibold text-sm'>{item.voucherNo}</Text>
                </View>
                <View className='flex-1 min-w-[120]'>
                    <Text className='text-gray-400 text-xs mb-1'>Reference</Text>
                    <Text className='text-white font-semibold text-sm' numberOfLines={1}>
                        {item.bankRefNo || 'N/A'}
                    </Text>
                </View>
            </View>
            {expanded && (
                <View className='mt-4 bg-black/20 rounded-2xl p-4'>
                    <Text className='text-white font-bold mb-3'>Fees Breakdown</Text>
                    {item.feesHeadDetailsDTOList?.map((fee, index) => (
                        <View key={index} className='flex-row justify-between items-center py-2 border-b border-white/10'>
                            <View className='flex-1'>
                                <Text className='text-white text-sm'>{fee.feesHeadName}</Text>
                                <Text className='text-gray-400 text-xs'>{fee.feesType}</Text>
                            </View>
                            <View className={`px-2 py-1 rounded ${fee.debitCredit === 'DEBIT' ? 'bg-red-500/20' : 'bg-green-500/20'
                                }`}>
                                <Text className={`text-xs font-bold ${fee.debitCredit === 'DEBIT' ? 'text-red-300' : 'text-green-300'
                                    }`}>
                                    {fee.debitCredit}
                                </Text>
                            </View>
                        </View>
                    ))}
                    {item.paymentOnlineHistoryDTO?.length > 0 && (
                        <View className='mt-4'>
                            <Text className='text-white font-bold mb-3'>Payment History</Text>
                            {item.paymentOnlineHistoryDTO.map((history, index) => (
                                <View key={index} className='flex-row justify-between items-center py-2'>
                                    <View className='flex-1'>
                                        <Text className='text-white text-sm'>{history.name}</Text>
                                        <Text className='text-gray-400 text-xs'>Order: {history.orderId}</Text>
                                    </View>
                                    <View style={{
                                        backgroundColor: getStatusColor(history.status) + '20',
                                        paddingHorizontal: 8,
                                        paddingVertical: 4,
                                        borderRadius: 6
                                    }}>
                                        <Text style={{
                                            color: getStatusColor(history.status),
                                            fontSize: 12,
                                            fontWeight: 'bold'
                                        }}>
                                            {history.status}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            )}
            <View className='flex-row justify-between items-center mt-4'>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setExpanded(!expanded)}
                    className='flex-row items-center'
                >
                    <Text className='text-gray-300 mr-2'>
                        {expanded ? 'Show Less' : 'View Details'}
                    </Text>
                    <Icon
                        name={expanded ? 'chevron-up' : 'chevron-down'}
                        size={16}
                        color="#9ca3af"
                    />
                </TouchableOpacity>
                {isOnlinePayment && (
                    <TouchableOpacity
                        onPress={() => handleDownload(item)}
                        activeOpacity={0.8}
                        className={`flex-row items-center px-4 py-3 rounded-2xl ${isOnlinePayment ? 'bg-purple-500' : 'bg-pink-500'
                            } shadow-lg`}
                    >
                        <Icon name="download" size={18} color="white" />
                        <Text className='text-white font-semibold ml-2'>Download</Text>
                    </TouchableOpacity>
                )}
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

export default FainanceReceiptCard