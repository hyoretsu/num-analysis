import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { vh, vw } from "@units";

const methodCategories = ["Autorais", "Integração", "Interpolação", "Matrizes", "Zeros de função"];

const Home: React.FC = () => {
	return (
		<>
			<View style={{ backgroundColor: "#3700B3", paddingLeft: 9 * vw, paddingVertical: 3 * vh }}>
				<Text style={{ color: "#FFFFFF", fontFamily: "Inter_500Medium", fontSize: 24 }}>Métodos</Text>
			</View>

			{methodCategories.map(category => (
				<View
					key={category}
					style={{
						borderRadius: 4,
						borderWidth: 1,
						flexDirection: "row",
						justifyContent: "space-between",
						margin: 2 * vh,
						marginBottom: 0,
						paddingHorizontal: 7 * vw,
						paddingVertical: 2.35 * vh,
					}}
				>
					<Text style={{ color: "#4E4E4E", fontFamily: "Inter_500Medium", fontSize: 19 }}>{category}</Text>
					<Feather name="chevron-down" size={26} color="black" />
				</View>
			))}
		</>
	);
};

export default Home;
