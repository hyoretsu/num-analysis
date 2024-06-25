module.exports = function (api) {
	api.cache(true);

	return {
		plugins: ["@svgr/babel-plugin-transform-react-native-svg"],
		presets: ["babel-preset-expo"],
	};
};
