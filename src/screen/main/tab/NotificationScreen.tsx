import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { userContext } from "../../../utils/provider/ContextProvider";
import TimeTableApi from "../../../functions/api/main/timetable/TimeTableApi";
import MainWraper from "../../../layouts/wraper/main/MainWraper";
import DataLoading from "../../../components/main/Loading/DataLoading";
import Icon from "../../../components/global/icon/Icon";

const TimeTableScreen = () => {
    const month = new Date().toLocaleString("default", { month: "long" });
    const { univarsalTokenData, dataLoading } = userContext();

    const [timeTableData, setTimeTableData] = useState<any>(null);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [currentTime, setCurrentTime] = useState<string | null>(null);
    useEffect(() => {
        const currentDate = new Date().toISOString().split("T")[0];
        setCurrentTime(currentDate);

        if (univarsalTokenData?.Token && univarsalTokenData?.Id) {
            TimeTableApi({
                token: univarsalTokenData?.Token,
                Id: univarsalTokenData?.Id,
                setData: setTimeTableData,
            });
        }
    }, [univarsalTokenData]);
    useEffect(() => {
        if (timeTableData?.timeTableDetailes?.length > 0 && currentTime) {
            const todayLectures = timeTableData.timeTableDetailes.filter((item: any) => {
                if (!item.dateTime) return false;
                const [day, month, year] = item.dateTime.split(" : ")[0].split("/");
                const formattedDate = `${year}-${month}-${day}`;
                return formattedDate === currentTime;
            });
            setFilteredData(todayLectures);
        }
    }, [timeTableData, currentTime]);
    const retryFunc = () => {
        if (univarsalTokenData?.Token && univarsalTokenData?.Id) {
            TimeTableApi({
                token: univarsalTokenData?.Token,
                Id: univarsalTokenData?.Id,
                setData: setTimeTableData,
            });
        }
    };

    return (
        <MainWraper>

            {!timeTableData ? (
                <DataLoading
                    status={dataLoading?.status}
                    func={retryFunc}
                    loading={dataLoading}
                />
            ) : (
                <ScrollView className="w-full flex" showsVerticalScrollIndicator={false}>
                    <View className="w-full py-5 flex-1 flex gap-3 mb-44">
                        <Text className="text-4xl font-bold text-[#336DF6]">{month}</Text>

                        <View className="w-full mt-5 flex">
                            <Text className="text-[#336DF6] font-bold text-2xl">Lecture</Text>

                            <View className="flex w-full gap-10 mt-3">
                                {filteredData.length > 0 ? (
                                    filteredData.map((lecture, index) => (
                                        <View
                                            className="w-full bg-[#313640] py-3 px-3 rounded-3xl flex gap-4"
                                            key={index}
                                        >
                                            {/* Lecture Header */}
                                            <View className="w-full flex-row items-center justify-between">
                                                <View className="flex-row items-center gap-3">
                                                    <View className="h-12 w-12 bg-[#336DF6] flex items-center justify-center rounded-lg">
                                                        <Text className="text-xl font-bold text-white">{index + 1}</Text>
                                                    </View>
                                                    <View>
                                                        <Text className="text-lg font-bold text-wrap text-white">
                                                            {lecture.courseName}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>

                                            {/* Faculty Name */}
                                            <View className="w-full flex-row items-center justify-between px-1">
                                                <View className="flex-row items-center gap-3">
                                                    <Icon name="book-open" size={24} color="#FF6500" />
                                                    <Text className="text-lg text-wrap text-white">
                                                        {lecture.facultyName}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text className="text-lg font-bold text-wrap text-white">
                                                        {lecture.start?.split(" ")[1]?.slice(0, 5)}
                                                        <Text> To </Text>
                                                        {lecture.end?.split(" ")[1]?.slice(0, 5)}
                                                    </Text>
                                                </View>
                                            </View>

                                            {/* Course Code */}
                                            <View className="w-full flex-row items-center justify-between px-1">
                                                <View className="flex-row items-center gap-3">
                                                    <Icon name="code" size={24} color="#7A1CAC" />
                                                    <Text className="text-lg text-wrap text-white">
                                                        <Text>Course Code</Text> :{" "}
                                                        <Text className="text-white">{lecture.courseCode}</Text>
                                                    </Text>
                                                </View>
                                            </View>

                                            {/* Course Type */}
                                            <View className="w-full flex-row items-center justify-between px-1">
                                                <View className="flex-row items-center gap-3">
                                                    <Icon name="type" size={24} color="#FF204E" />
                                                    <Text className="text-lg text-wrap text-[#336DF6]">
                                                        <Text>Course Type</Text> :{" "}
                                                        <Text className="text-[#FF204E]">
                                                            {lecture.courseCompName}
                                                        </Text>
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <View className="w-full flex items-center justify-center">

                                        <Text className="px-10 text-center text-lg font-semibold text-white">
                                            There's probably no lecture today; maybe it's a{" "}
                                            <Text className="text-blue-500 font-bold text-xl">H</Text>
                                            oliday.
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </MainWraper>
    );
};

export default TimeTableScreen;
