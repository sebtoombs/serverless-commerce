// Emulate (HTTP) API Gateway

const express = require("express");
const path = require("path");
const debug = require("debug")("app");
const cors = require("cors");

const { format } = require("date-fns");

process.env.DEBUG = "*";

const lambdaEvent = (req) => ({
  body: Object.keys(req.body).length === 0 ? null : JSON.stringify(req.body),
  headers: req.headers,
  httpMethod: req.method,
  isBase64Encoded: false,
  multiValueHeaders: {},
  multiValueQueryStringParameters: null,
  path: req.path,
  pathParameters: req.params,
  queryStringParameters: req.query,
  requestContext: {
    accountId: "offlineContext_accountId",
    apiId: "offlineContext_apiId",
    authorizer: {
      claims: undefined,
      principalId: "offlineContext_authorizer_principalId",
    },
    domainName: "offlineContext_domainName",
    domainPrefix: "offlineContext_domainPrefix",
    extendedRequestId: "ckbgc9ibu0009cxlz96n9eoa0",
    httpMethod: req.method,
    identity: {
      accessKey: null,
      accountId: "offlineContext_accountId",
      apiKey: "offlineContext_apiKey",
      caller: "offlineContext_caller",
      cognitoAuthenticationProvider:
        "offlineContext_cognitoAuthenticationProvider",
      cognitoAuthenticationType: "offlineContext_cognitoAuthenticationType",
      cognitoIdentityId: "offlineContext_cognitoIdentityId",
      cognitoIdentityPoolId: "offlineContext_cognitoIdentityPoolId",
      principalOrgId: null,
      sourceIp: req.ip,
      user: "offlineContext_user",
      userAgent: req.get("user-agent"),
      userArn: "offlineContext_userArn",
    },
    path: req.path,
    protocol: "HTTP/1.1",
    requestId: "ckbgc9ibu000acxlz3pkgaqdt",
    requestTime: format(new Date(), "dd/MMM/yyyy:HH:mm:ss xxxx"), //"15/Jun/2020:20:12:25 +1000",
    requestTimeEpoch: format(new Date(), "T"), //1592215945481,
    resourceId: "offlineContext_resourceId",
    resourcePath: `/dev/test/{id}`,
    stage: "dev",
  },
  resource: `/dev/test/{id}`,
  stageVariables: null,
});
/*const context = {
  awsRequestId: "ckbgc9ibu000bcxlz8h6jdlk7",
  callbackWaitsForEmptyEventLoop: true,
  clientContext: null,
  functionName: "auth-server-dev-test",
  functionVersion: "$LATEST",
  identity: undefined,
  invokedFunctionArn: "offline_invokedFunctionArn_for_auth-server-dev-test",
  logGroupName: "offline_logGroupName_for_auth-server-dev-test",
  logStreamName: "offline_logStreamName_for_auth-server-dev-test",
  memoryLimitInMB: "1024",
  getRemainingTimeInMillis: [(Function: getRemainingTimeInMillis)],
  done: [(Function: done)],
  fail: [(Function: fail)],
  succeed: [(Function: succeed)],
};*/

/*app.get("/", (req, res) => {
  //console.log(req);
  res.send("Hello World!");
});
app.post("/:id", (req, res) => {
  console.log(req.params);
  res.send("testing????");
});*/

/*app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);*/

const callHandlerWithPromiseOrCallback = (handlerFn, ...args) => {
  return new Promise((resolve, reject) => {
    const cb = (err, resp) => {
      if (err) return reject(err);
      return resolve(resp);
    };
    const resp = handlerFn.call(null, ...args, cb);
    if (typeof resp !== `undefined`) return resolve(resp);
  });
};

module.exports = (config = {}) => {
  const stage = "/dev"; //its hardcoded for now
  const app = express();
  //const port = 3000;
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  Object.keys(config.functions).map((key) => {
    const func = { ...config.functions[key] };
    const [handlerFile, handlerFn] = func.handler.split(".");
    func.events.forEach((event) => {
      const type = Object.keys(event)[0]; // Should only be one top level key?
      const eventOpts = { ...event[type] };

      eventOpts.path = stage + "/" + eventOpts.path;
      //Currently, dont support short syntax e.g. httpApi: 'POST /path'
      debug(`Adding route: ${eventOpts.method} ${eventOpts.path}`);
      app[eventOpts.method](eventOpts.path, async (req, res) => {
        const file = path.join("..", handlerFile);

        const lambdaContext = {};

        const handler = require(file)[handlerFn];

        const resp = await callHandlerWithPromiseOrCallback(
          handler,
          lambdaEvent(req),
          lambdaContext
        );

        res.status = resp.statusCode;
        //res.set("Content-Type", "text/html");
        res.headers = resp.headers;
        //console.log(res.headers);
        res.send(resp.body);
      });
    });
  });
  return app;

  //console.log({ config });
  //return app;
};
