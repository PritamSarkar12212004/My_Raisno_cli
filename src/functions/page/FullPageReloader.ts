const FullPageReloader = async ({
  navigation: navigation,
  CommonActions: CommonActions,
}: any) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'auth' }],
    }),
  );
};

export default FullPageReloader;
