module.exports = {
  extends: ["react-app"],
  plugins: ["react-hooks"],
  rules: {
    "arrow-body-style": [0, "as-needed"],
    "arrow-parens": ["error", "always"],
    "react-hooks/exhaustive-deps": [
      1,
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
      },
    ],
    "react-hooks/rules-of-hooks": 2
  },
};
