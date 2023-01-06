export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/billing-system',
  port: process.env.PORT || 5988
}
