import { userContext } from '../../utils/provider/ContextProvider';

const FullPageReloader = async () => {
  const { setReloader, reloader } = userContext();
  const reload = reloader.fullPageReloader;
  setReloader(!reload);
};

export default FullPageReloader;
