export default {
	extends: ["@commitlint/config-conventional"],
	parserPreset: {
		parserOpts: {
			headerPattern: /^(\p{Emoji_Presentation}*)?\s?(\w+)(\(.+\))?:\s(.+)$/u,
			headerCorrespondence: ["emoji", "type", "scope", "subject"],
		},
	},
	rules: {
		"type-enum": [2, "always", ["feat", "fix", "docs", "perf", "chore(deps)"]],
		"subject-empty": [2, "never"],
		"type-empty": [2, "never"],
	},
};
