const CloseBottomSheet = ({ bottomSheetRef }: { bottomSheetRef: any }) => {
  if (bottomSheetRef?.current) {
    bottomSheetRef.current.close();
  }
};

export default CloseBottomSheet;
