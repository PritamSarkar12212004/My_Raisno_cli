import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Icon from '../../global/icon/Icon'

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
    const [loading, setLoading] = useState<boolean>(false)
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
                        onPress={() => null}
                        activeOpacity={0.8}
                        className={`flex-row items-center px-4 py-3 rounded-2xl ${isOnlinePayment ? 'bg-purple-500' : 'bg-pink-500'
                            } shadow-lg`}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                            <>
                                <Icon name="download" size={18} color="white" />
                                <Text className='text-white font-semibold ml-2'>Download</Text>
                            </>
                        )}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FainanceReceiptCard