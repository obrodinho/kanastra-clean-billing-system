module.exports = {
  mongodbMemoryServer: {
    version: 'latest'
  },
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'billing-system'
    },
    binary: {
      version: '6.0.3',
      skipMD5: true
    },
    autoStart: false
  }
}
