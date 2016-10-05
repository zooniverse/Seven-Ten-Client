module.exports = {
  "extends": "airbnb",
  "rules": {
    "comma-dangle": ["error", "never"],
    "object-curly-spacing": ["error", "always", { "objectsInObjects": false }],
    "array-callback-return": "off"
  },
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ]
};
