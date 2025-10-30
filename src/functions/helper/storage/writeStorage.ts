import { storage } from '../../../utils/storage/Storage';

const writeStorage = async ({ value, key }: { value: any; key: string }) => {
  const data = JSON.stringify(value);
  try {
    storage.set(key, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default writeStorage;
