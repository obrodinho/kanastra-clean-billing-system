export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/billing-system',
  port: process.env.PORT || 5988
}
