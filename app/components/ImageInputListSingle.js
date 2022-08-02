import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import ImageInput from "./ImageInput";
import ImageInputSingle from "./ImageInputSingle";

export default function ImageInputListSingle({
  imageUris = [],
  onRemoveImage,
  onAddImage,
  imageStatus,
  imagePath,
}) {
  const scrollView = useRef();

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <ImageInputSingle
              imageUri={uri}
              key={uri}
              onChangeImage={() => onRemoveImage(uri)}
              imageStatus={imageStatus}
              imagePath={imagePath}
            />
          ))}
          <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", margin: 5 },
});
