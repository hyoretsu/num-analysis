const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks");
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
	const config = getDefaultConfig(__dirname);
	const { resolver } = config;

	config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
	config.resolver.assetExts = resolver.assetExts.filter(ext => ext !== "svg");
	config.resolver.sourceExts.push("svg");
	config.resolver.resolveRequest = MetroSymlinksResolver();

	return config;
})();
