import { forwardRef, useImperativeHandle, useRef } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { WIDTH } from "../../tools/Constants";


const Carousel = forwardRef(({ content, align }, ref) => {
    const flatlistRef = useRef();
  
    const scrollToIndex = (index) => {
      flatlistRef.current.scrollToIndex({ animated: true, index });
    };
  
    useImperativeHandle(ref, () => ({
      scrollToIndex,
    }));
  
    return (
      <FlatList
        data={content}
        renderItem={({ item }) => (<View style={styles.wrapper(align)}>{item}</View>)}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        ref={flatlistRef}
        scrollEnabled={false}
      />
    );
  });


export default Carousel;

const styles = StyleSheet.create({
    wrapper: align => ({
        flex: 1,
        marginTop: 30,
        justifyContent: 'flex-start',
        width: WIDTH,
        paddingHorizontal: 25,
        alignItems: align ?? null
    }),
})