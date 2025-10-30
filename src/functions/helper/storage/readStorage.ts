import { storage } from '../../../utils/storage/Storage';

const readStorage = async ({ key }: { key: any }) => {
  const data: any = storage.getString(key);
  if (data) {
    const mainValue = await JSON.parse(data);
    return mainValue;
  } else {
    return false;
  }
};

export default readStorage;
