import { forwardRef } from "react";
import { ScrollView, ScrollViewProps } from "react-native";

/**
 * BodyScrollView Component
 * Enhanced ScrollView with automatic content inset adjustments
 * Useful for consistent scrolling behavior across the app
 */
export const BodyScrollView = forwardRef<ScrollView, ScrollViewProps>(
  (props, ref) => {
    return (
      <ScrollView
        automaticallyAdjustsScrollIndicatorInsets
        contentInsetAdjustmentBehavior="automatic"
        contentInset={{ bottom: 0 }}
        scrollIndicatorInsets={{ bottom: 0 }}
        showsVerticalScrollIndicator={false}
        {...props}
        ref={ref}
      />
    );
  }
);

BodyScrollView.displayName = "BodyScrollView";