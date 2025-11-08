const OpenBottomSheet = ({ bottomSheetRef }: { bottomSheetRef: any }) => {
  if (bottomSheetRef?.current) {
    bottomSheetRef.current.expand();
  }
};

export default OpenBottomSheet;
