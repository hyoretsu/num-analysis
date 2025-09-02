import React, { useRef } from "react";
import { Animated, ScrollView } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

export type TablePanProps = {
	table: React.ReactNode;
};

export default function TablePan({ table }: TablePanProps) {
	const scrollX = useRef(new Animated.Value(0)).current;
	const scrollY = useRef(new Animated.Value(0)).current;

	return (
		<PanGestureHandler
			onGestureEvent={e => {
				// manually update scroll positions
				// usually use Animated.event([...], { useNativeDriver: false })
			}}
		>
			<Animated.View style={{ flex: 1 }}>
				<ScrollView
					horizontal
					scrollEventThrottle={16}
					onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
						useNativeDriver: false,
					})}
				>
					<ScrollView
						scrollEventThrottle={16}
						onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
							useNativeDriver: false,
						})}
					>
						{table}
					</ScrollView>
				</ScrollView>
			</Animated.View>
		</PanGestureHandler>
	);
}
