import React, { useMemo } from 'react';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { userContext } from '../../utils/provider/ContextProvider';

const BottomShet = ({
  func1,
  func2,
  children
}: {
  func1: any;
  func2: any;
  children: any
}) => {
  const { bottomSheetRef } = userContext();
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={{ flex: 1 }}>
        {
          children
        }
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomShet;
