const ApiPath = {
  GHRUA: {
    AUTH_LOGIN_PATH: 'https://ghrua.cybervidya.net/api/auth/login',
    AUTH_API: {
      FETH_PHONE_DATA_PATH: '/phone/link-Phone-fetch_data',
    },
    OTP: {
      MIN_OTP: '/otp/myRaisoni',
    },
    MAIN_TOKEN: {
      FETCH_MAINDATA_PATH: '/main',
      FETCH_ATTENDANCE: '/attendance',
      FETCH_CGPA: '/examScore',
      FETCH_EXAM_SCORE_DOX: '/download/examOne',
      DOWNLOAD_EXAM_SCORE_PDF: '/download/exam/maindownload',
      PHONE_LINK: {
        LINK_PHONE_NUMBER_ID: '/phone/link-Phone',
      },
      FAINANCE: {
        FETCH_FAINANCE: '/fees',
        FETCH_FAINANCE_RECEIPT: '/download/fainanceOne',
        DOWNLOAD_FAINANCE_PDF: '/download/fainace/maindownload',
      },
    },
  },
};
export default ApiPath;
