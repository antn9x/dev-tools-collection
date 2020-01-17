module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "electron": 7
        }
      }
    ],
    "@babel/preset-react"
  ],
  "plugins": [
    "add-module-exports"
  ],
  "env": {
    "production": {
      "presets": [
        "react-optimize"
      ],
      "plugins": [
        "dev-expression"
      ]
    },
    "development": {
      "plugins": [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-classes"
      ]
    }
  }
};
