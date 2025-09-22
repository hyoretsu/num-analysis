import { useMemo, useRef } from "react";
import { Animated, type DimensionValue, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const styles = StyleSheet.create({
	cell: {
		borderColor: "#ccc",
		borderLeftWidth: 2,
		borderTopWidth: 2,
		padding: 10,
	},
	container: {
		backgroundColor: "#fff",
	},
	headText: {
		fontWeight: "bold",
		textAlign: "center",
	},
	row: {
		flexDirection: "row",
	},
});

export interface TableProps {
	data: any[][];
	header?: string[];
	height?: DimensionValue;
	width?: DimensionValue;
}

export default function Table({ data, header, height, width }: TableProps) {
	const scrollX = useRef(new Animated.Value(0)).current;
	const scrollY = useRef(new Animated.Value(0)).current;

	const horizontalRef = useRef<ScrollView>(null);
	const verticalRef = useRef<ScrollView>(null);

	const colWidths = useMemo(() => {
		if (!header) return [];
		const cols = header.length;
		const maxLengths = new Array(cols).fill(0);

		header.forEach((h, j) => {
			maxLengths[j] = Math.max(maxLengths[j], String(h).length);
		});

		data.forEach(row => {
			row.forEach((cell, j) => {
				maxLengths[j] = Math.max(maxLengths[j], String(cell).length);
			});
		});

		return maxLengths.map(len => len * 10);
	}, [data, header]);

	return (
		<ScrollView
			ref={verticalRef}
			scrollEventThrottle={16}
			simultaneousHandlers={horizontalRef}
			style={{
				borderColor: "#ccc",
				borderWidth: 2,
				height,
				width,
			}}
		>
			<ScrollView
				horizontal
				ref={horizontalRef}
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator
				simultaneousHandlers={verticalRef}
			>
				<View style={styles.container}>
					{header && (
						<View style={styles.row}>
							{header.map((cell, j) => (
								<View
									key={j}
									style={[styles.cell, { borderTopWidth: 0, width: colWidths[j] }, j === 0 && { borderLeftWidth: 0 }]}
								>
									<Text style={styles.headText}>{cell}</Text>
								</View>
							))}
						</View>
					)}

					{[...data, ...data, ...data].map((row, i) => (
						<View key={i} style={styles.row}>
							{row.map((cell, j) => (
								<View
									key={j}
									style={[
										styles.cell,
										{ width: colWidths[j] },
										j === 0 && { borderLeftWidth: 0 },
										!header && { borderTopWidth: 0 },
									]}
								>
									<Text style={{ textAlign: "center" }}>{cell}</Text>
								</View>
							))}
						</View>
					))}
				</View>
			</ScrollView>
		</ScrollView>
	);
}
