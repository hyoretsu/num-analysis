const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks");
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
    const config = getDefaultConfig(__dirname);

	const { resolver } = config;

    /** @type {import('expo/metro-config').MetroConfig} */
	return {
        ...config,
        resolver:{
            ...resolver,
            resolveRequest: MetroSymlinksResolver(),
        }
    };
})();
