module.exports = {
  "devServer": {
    "port": 8080,
    "proxy": {
      "^/api": {
        "target": "http://94.130.160.189:3000",
        "changeOrigin": true
      }
    }
  }
}
