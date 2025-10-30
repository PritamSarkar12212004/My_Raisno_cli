import React, { Fragment, useEffect, useState } from 'react'
import AuthRouteFunc from '../../functions/routes/AuthRouteFunc'
import RouteHandler from '../handler/RouteHandler';
import { userContext } from '../../utils/provider/ContextProvider';
import MainLoader from '../../components/global/Loader/MainLoader';

const HelperRoute = () => {
    const { reloader } = userContext()
    const [route, setRoute] = useState<string | null>(null)
    useEffect(() => {
        const func = async () => {
            const data = await AuthRouteFunc()
            setRoute(data)
        }
        func()
    }, [reloader.fullPageReloader])

    if (route == null) {
      return <MainLoader />
    }

    return (
        <Fragment>
            <RouteHandler route={route} />
        </Fragment>
    )
}

export default HelperRoute