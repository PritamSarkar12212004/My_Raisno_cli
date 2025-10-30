import writeStorage from '../helper/storage/writeStorage';

const PageDataSave = async ({ key }: any) => {
  await writeStorage({
    key: key,
    value: true,
  });
  return true;
};
export default PageDataSave;
