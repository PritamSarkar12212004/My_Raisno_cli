import { Image, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native'
import React, { PureComponent } from 'react'
import { useNavigation } from '@react-navigation/native'

const { width: screenWidth } = Dimensions.get('window')

export class Carshol extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  // Academic-related carousel data
  carouselData = [
    {
      id: 1,
      image: "https://i.pinimg.com/736x/2b/5a/54/2b5a5461f39be032530e61af98d37289.jpg",
      title: "Today's Classes",
      subtitle: "3 classes scheduled",
      stats: "09:00 AM - 04:00 PM",
      type: "schedule",
      icon: "📚"
    },
    {
      id: 2,
      image: "https://i.pinimg.com/736x/5a/8b/4f/5a8b4f7d8c95c95e59d6b37c5e5e5e5e.jpg",
      title: "Upcoming Exams",
      subtitle: "Mid-term next week",
      stats: "2 subjects",
      type: "exams",
      icon: "📝"
    },
    {
      id: 3,
      image: "https://i.pinimg.com/736x/8a/7b/9a/8a7b9a8c5e5e5e5e5e5e5e5e5e5e5e5e.jpg",
      title: "Assignment Due",
      subtitle: "Mathematics assignment",
      stats: "Due in 2 days",
      type: "assignments",
      icon: "📅"
    },
    {
      id: 4,
      image: "https://i.pinimg.com/736x/9a/8b/7c/9a8b7c5e5e5e5e5e5e5e5e5e5e5e5e5e.jpg",
      title: "Campus News",
      subtitle: "Latest updates & events",
      stats: "3 new announcements",
      type: "news",
      icon: "🎯"
    }
  ]

  handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x
    const index = Math.round(scrollPosition / (screenWidth * 0.8))
    this.setState({ activeIndex: index })
  }

  handleItemPress = (item) => {
    const { navigation } = this.props
    switch (item.type) {
      case 'schedule':
        navigation.navigate('Schedule')
        break
      case 'exams':
        navigation.navigate('Exams')
        break
      case 'assignments':
        navigation.navigate('Assignments')
        break
      case 'news':
        navigation.navigate('News')
        break
      default:
        break
    }
  }

  render() {
    return (
      <View className='w-full py-3'>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={screenWidth * 0.75 + 12}
          decelerationRate="fast"
          onScroll={this.handleScroll}
          scrollEventThrottle={16}
          // contentContainerStyle={{ paddingHorizontal: 16 }}
          className='flex-row'
        >
          {this.carouselData.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() => this.handleItemPress(item)}
              className={`relative  rounded-2xl overflow-hidden '
                }`}
              style={{
                width: screenWidth * 0.86,
                height: 400,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              {/* Background Image with Overlay */}
              <Image
                source={{ uri: item.image }}
                className='w-full h-full absolute'
                resizeMode='cover'
                blurRadius={1}
              />

              {/* Dark Overlay for better text readability */}
              <View className='absolute inset-0 bg-black/50' />

              {/* Content */}
              <View className='flex-1 p-4 justify-between'>
                <View className='flex-row justify-between items-start'>
                  <View className='flex-1'>
                    <View className='flex-row items-center mb-1'>
                      <Text className='text-lg mr-2'>{item.icon}</Text>
                      <Text className='text-white text-lg font-bold flex-1'>
                        {item.title}
                      </Text>
                    </View>
                    <Text className='text-gray-300 text-sm mb-2'>
                      {item.subtitle}
                    </Text>
                  </View>
                </View>

                {/* Stats Bar */}
                <View className='flex-row justify-between items-center'>
                  <View />
                  <View className='bg-white/20 rounded-full p-2'>
                    <Text className='text-white text-xs font-bold'>→</Text>
                  </View>
                </View>
              </View>

              {/* Status Indicator */}
              <View className={`absolute top-3 right-3 px-2 py-1 rounded-full ${item.type === 'exams' ? 'bg-red-500/80' :
                item.type === 'assignments' ? 'bg-orange-500/80' :
                  item.type === 'schedule' ? 'bg-green-500/80' : 'bg-blue-500/80'
                }`}>
                <Text className='text-white text-xs font-bold capitalize'>
                  {item.type}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Indicators */}
        <View className='flex-row justify-center items-center mt-3 space-x-1'>
          {this.carouselData.map((_, index) => (
            <View
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${index === this.state.activeIndex ? 'bg-blue-400 w-4' : 'bg-gray-600'
                }`}
            />
          ))}
        </View>
      </View>
    )
  }
}

// Wrapper component to provide navigation
export default function CarsholWithNavigation(props) {
  const navigation = useNavigation()
  return <Carshol {...props} navigation={navigation} />
}