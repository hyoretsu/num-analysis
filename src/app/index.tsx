import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

import { vh, vw } from "@units";

const methodCategories = ["Zeros de função", "Interpolação", "Integração", "Matrizes", "Autorais"];
const methodTitles: Record<string, string[]> = {
	"Zeros de função": ["Bisseção", "Falsa posição", "Newton-Raphson", "Secante"],
};

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
						margin: 2 * vh,
						marginBottom: 0,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							paddingHorizontal: 7 * vw,
							paddingVertical: 2.35 * vh,
						}}
					>
						<Text style={{ color: "#4E4E4E", fontFamily: "Inter_500Medium", fontSize: 19 }}>{category}</Text>
						<Feather name="chevron-down" size={26} color="black" />
					</View>

					<View
						style={{
							borderLeftColor: "#4B00D1",
							borderLeftWidth: 4,
						}}
					>
						{methodTitles[category]?.map(title => (
							<Text
								key={title}
								style={{
									borderTopColor: "#D9D9D9",
									borderTopWidth: 2,
									color: "#4E4E4E",
									fontFamily: "Inter_500Medium",
									fontSize: 19,
									paddingHorizontal: 7 * vw,
									paddingVertical: 2.35 * vh,
								}}
							>
								{title}
							</Text>
						))}
					</View>
				</View>
			))}
		</>
	);
};

export default Home;
