import React from 'react'
import MainWraper from '../../layouts/wraper/main/MainWraper'
import DataLoading from '../../components/main/Loading/DataLoading'

const MainScreen = () => {
    return (
        <MainWraper>
            <DataLoading />
        </MainWraper>

    )
}

export default MainScreen