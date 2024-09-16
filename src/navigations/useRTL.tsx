import { useEffect, useState } from 'react';
import { I18nManager, LayoutAnimation } from 'react-native';

const useRTL = (isRTL) => {
  const [layoutDirection, setLayoutDirection] = useState(I18nManager.isRTL ? 'rtl' : 'ltr');

  useEffect(() => {
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.forceRTL(isRTL);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Animate layout change
      setLayoutDirection(isRTL ? 'rtl' : 'ltr');
    }
  }, [isRTL]);

  return layoutDirection;
};

export default useRTL;
