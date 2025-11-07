import StorageToken from "../../../../constants/token/StorageToken";
import readStorage from "../../../helper/storage/readStorage";
import DataGeter from "../exeutor/DataGeter";
import TokenGeter from "../exeutor/TokenGeter";


const MainDataFetcher = async ({
  setUserDta,
  setDataLoading,
  setUnivarsalTokenData,
}: {
  setUserDta: any;
  setDataLoading: any;
  setUnivarsalTokenData: any;
}) => {
  const userData = await readStorage({
    key: StorageToken.MAIN_TOKEN.USER_DATA,
  });
  const Token = await TokenGeter({
    password: userData.PassWord,
    username: userData.UserName,
    setDataLoading: setDataLoading,
  });
  setUnivarsalTokenData({
    Token: Token.token,
    Id: Token.id,
  });
  await DataGeter({
    data: Token,
    setLoading: setDataLoading,
    setUserDta: setUserDta,
  });
};
export default MainDataFetcher;
