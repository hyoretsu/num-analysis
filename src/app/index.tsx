import { Feather } from "@expo/vector-icons";
import { vh, vw } from "@units";
import { Text, View } from "react-native";

const Home: React.FC = () => {
	return (
		<>
			<View style={{ backgroundColor: "#3700B3", paddingLeft: 9 * vw, paddingVertical: 3 * vh }}>
				<Text style={{ color: "#FFFFFF", fontFamily: "Inter_500Medium", fontSize: 24 }}>Métodos</Text>
			</View>

			<View
				style={{
					borderRadius: 4,
					borderWidth: 1,
					flexDirection: "row",
					justifyContent: "space-between",
					margin: 2 * vh,
					marginBottom: 0,
					paddingHorizontal: 7 * vw,
					paddingVertical: 2.5 * vh,
				}}
			>
				<Text style={{ color: "#4E4E4E", fontSize: 20 }}>Autorais</Text>
				<Feather name="chevron-down" size={26} color="black" />
			</View>
			<View
				style={{
					borderRadius: 4,
					borderWidth: 1,
					flexDirection: "row",
					justifyContent: "space-between",
					margin: 2 * vh,
					marginBottom: 0,
					paddingHorizontal: 7 * vw,
					paddingVertical: 2.5 * vh,
				}}
			>
				<Text style={{ color: "#4E4E4E", fontSize: 20 }}>Integração</Text>
				<Feather name="chevron-down" size={26} color="black" />
			</View>
			<View
				style={{
					borderRadius: 4,
					borderWidth: 1,
					flexDirection: "row",
					justifyContent: "space-between",
					margin: 2 * vh,
					marginBottom: 0,
					paddingHorizontal: 7 * vw,
					paddingVertical: 2.5 * vh,
				}}
			>
				<Text style={{ color: "#4E4E4E", fontSize: 20 }}>Interpolação</Text>
				<Feather name="chevron-down" size={26} color="black" />
			</View>
			<View
				style={{
					borderRadius: 4,
					borderWidth: 1,
					flexDirection: "row",
					justifyContent: "space-between",
					margin: 2 * vh,
					marginBottom: 0,
					paddingHorizontal: 7 * vw,
					paddingVertical: 2.5 * vh,
				}}
			>
				<Text style={{ color: "#4E4E4E", fontSize: 20 }}>Matrizes</Text>
				<Feather name="chevron-down" size={26} color="black" />
			</View>
			<View
				style={{
					borderRadius: 4,
					borderWidth: 1,
					flexDirection: "row",
					justifyContent: "space-between",
					margin: 2 * vh,
					marginBottom: 0,
					paddingHorizontal: 7 * vw,
					paddingVertical: 2.5 * vh,
				}}
			>
				<Text style={{ color: "#4E4E4E", fontSize: 20 }}>Zeros de função</Text>
				<Feather name="chevron-down" size={26} color="black" />
			</View>
		</>
	);
};

export default Home;
