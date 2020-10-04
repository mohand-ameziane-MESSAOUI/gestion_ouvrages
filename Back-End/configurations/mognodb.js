
let authenticationMongo = "";
if (process.env.MONGODB_USER !== "") {
    authenticationMongo = `${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@`;
}

let mongodbUri = `${process.env.MONGODB_PROTOCOL}://${authenticationMongo}${process.env.MONGODB_HOST}:`;
mongodbUri += process.env.MONGODB_PORT !== "" ? + process.env.MONGODB_PORT + "/" + process.env.MONGODB_DATA : "/" + process.env.MONGODB_DATA;

module.exports = {
    mongoUri: "mongodb+srv://mohand:jWrBycTVQACSGEpb@cluster0.zfrt8.gcp.mongodb.net/infoDecision?retryWrites=true&w=majority",
    option: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
}