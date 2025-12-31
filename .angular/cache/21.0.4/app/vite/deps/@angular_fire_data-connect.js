import {
  Component,
  FirebaseApp,
  FirebaseApps,
  FirebaseError,
  Logger,
  SDK_VERSION,
  VERSION,
  _getProvider,
  _isFirebaseServerApp,
  _registerComponent,
  _removeServiceInstance,
  getApp,
  isCloudWorkstation,
  pingServer,
  registerVersion,
  updateEmulatorBanner,
  ɵAngularFireSchedulers,
  ɵgetAllInstancesOf,
  ɵgetDefaultInstanceOf,
  ɵzoneWrap
} from "./chunk-HBGOQ4ZI.js";
import "./chunk-OLSPUTAR.js";
import "./chunk-JS7UPFDT.js";
import {
  NgModule,
  Optional,
  setClassMetadata,
  ɵɵdefineNgModule
} from "./chunk-2OVTG2SB.js";
import {
  InjectionToken,
  Injector,
  NgZone,
  makeEnvironmentProviders,
  ɵɵdefineInjector
} from "./chunk-AFXNZWYR.js";
import {
  concatMap,
  distinct,
  from,
  timer
} from "./chunk-MUD6KAHP.js";
import "./chunk-GOMI4DH3.js";

// node_modules/@angular/fire/node_modules/@firebase/data-connect/dist/index.esm2017.js
var name = "@firebase/data-connect";
var version = "0.3.10";
var SDK_VERSION2 = "";
function setSDKVersion(version2) {
  SDK_VERSION2 = version2;
}
var AppCheckTokenProvider = class {
  constructor(app, appCheckProvider) {
    this.appCheckProvider = appCheckProvider;
    if (_isFirebaseServerApp(app) && app.settings.appCheckToken) {
      this.serverAppAppCheckToken = app.settings.appCheckToken;
    }
    this.appCheck = appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.getImmediate({ optional: true });
    if (!this.appCheck) {
      void (appCheckProvider === null || appCheckProvider === void 0 ? void 0 : appCheckProvider.get().then((appCheck) => this.appCheck = appCheck).catch());
    }
  }
  getToken() {
    if (this.serverAppAppCheckToken) {
      return Promise.resolve({ token: this.serverAppAppCheckToken });
    }
    if (!this.appCheck) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.appCheck) {
            this.getToken().then(resolve, reject);
          } else {
            resolve(null);
          }
        }, 0);
      });
    }
    return this.appCheck.getToken();
  }
  addTokenChangeListener(listener) {
    var _a;
    void ((_a = this.appCheckProvider) === null || _a === void 0 ? void 0 : _a.get().then((appCheck) => appCheck.addTokenListener(listener)));
  }
};
var Code = {
  OTHER: "other",
  ALREADY_INITIALIZED: "already-initialized",
  NOT_INITIALIZED: "not-initialized",
  NOT_SUPPORTED: "not-supported",
  INVALID_ARGUMENT: "invalid-argument",
  PARTIAL_ERROR: "partial-error",
  UNAUTHORIZED: "unauthorized"
};
var DataConnectError = class _DataConnectError extends FirebaseError {
  constructor(code, message) {
    super(code, message);
    this.name = "DataConnectError";
    Object.setPrototypeOf(this, _DataConnectError.prototype);
  }
  /** @internal */
  toString() {
    return `${this.name}[code=${this.code}]: ${this.message}`;
  }
};
var DataConnectOperationError = class extends DataConnectError {
  /** @hideconstructor */
  constructor(message, response) {
    super(Code.PARTIAL_ERROR, message);
    this.name = "DataConnectOperationError";
    this.response = response;
  }
};
var logger = new Logger("@firebase/data-connect");
function setLogLevel(logLevel) {
  logger.setLogLevel(logLevel);
}
function logDebug(msg) {
  logger.debug(`DataConnect (${SDK_VERSION2}): ${msg}`);
}
function logError(msg) {
  logger.error(`DataConnect (${SDK_VERSION2}): ${msg}`);
}
var FirebaseAuthProvider = class {
  constructor(_appName, _options, _authProvider) {
    this._appName = _appName;
    this._options = _options;
    this._authProvider = _authProvider;
    this._auth = _authProvider.getImmediate({ optional: true });
    if (!this._auth) {
      _authProvider.onInit((auth) => this._auth = auth);
    }
  }
  getToken(forceRefresh) {
    if (!this._auth) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this._auth) {
            this.getToken(forceRefresh).then(resolve, reject);
          } else {
            resolve(null);
          }
        }, 0);
      });
    }
    return this._auth.getToken(forceRefresh).catch((error) => {
      if (error && error.code === "auth/token-not-initialized") {
        logDebug("Got auth/token-not-initialized error.  Treating as null token.");
        return null;
      } else {
        logError("Error received when attempting to retrieve token: " + JSON.stringify(error));
        return Promise.reject(error);
      }
    });
  }
  addTokenChangeListener(listener) {
    var _a;
    (_a = this._auth) === null || _a === void 0 ? void 0 : _a.addAuthTokenListener(listener);
  }
  removeTokenChangeListener(listener) {
    this._authProvider.get().then((auth) => auth.removeAuthTokenListener(listener)).catch((err) => logError(err));
  }
};
var QUERY_STR = "query";
var MUTATION_STR = "mutation";
var SOURCE_SERVER = "SERVER";
var SOURCE_CACHE = "CACHE";
var encoderImpl;
function setEncoder(encoder) {
  encoderImpl = encoder;
}
setEncoder((o) => JSON.stringify(o));
function setIfNotExists(map, key, val) {
  if (!map.has(key)) {
    map.set(key, val);
  }
}
function getRefSerializer(queryRef3, data, source) {
  return function toJSON() {
    return {
      data,
      refInfo: {
        name: queryRef3.name,
        variables: queryRef3.variables,
        connectorConfig: Object.assign({ projectId: queryRef3.dataConnect.app.options.projectId }, queryRef3.dataConnect.getSettings())
      },
      fetchTime: Date.now().toLocaleString(),
      source
    };
  };
}
var QueryManager = class {
  constructor(transport) {
    this.transport = transport;
    this._queries = /* @__PURE__ */ new Map();
  }
  track(queryName, variables, initialCache) {
    const ref = {
      name: queryName,
      variables,
      refType: QUERY_STR
    };
    const key = encoderImpl(ref);
    const newTrackedQuery = {
      ref,
      subscriptions: [],
      currentCache: initialCache || null,
      lastError: null
    };
    setIfNotExists(this._queries, key, newTrackedQuery);
    return this._queries.get(key);
  }
  addSubscription(queryRef3, onResultCallback, onErrorCallback, initialCache) {
    const key = encoderImpl({
      name: queryRef3.name,
      variables: queryRef3.variables,
      refType: QUERY_STR
    });
    const trackedQuery = this._queries.get(key);
    const subscription = {
      userCallback: onResultCallback,
      errCallback: onErrorCallback
    };
    const unsubscribe = () => {
      const trackedQuery2 = this._queries.get(key);
      trackedQuery2.subscriptions = trackedQuery2.subscriptions.filter((sub) => sub !== subscription);
    };
    if (initialCache && trackedQuery.currentCache !== initialCache) {
      logDebug("Initial cache found. Comparing dates.");
      if (!trackedQuery.currentCache || trackedQuery.currentCache && compareDates(trackedQuery.currentCache.fetchTime, initialCache.fetchTime)) {
        trackedQuery.currentCache = initialCache;
      }
    }
    if (trackedQuery.currentCache !== null) {
      const cachedData = trackedQuery.currentCache.data;
      onResultCallback({
        data: cachedData,
        source: SOURCE_CACHE,
        ref: queryRef3,
        toJSON: getRefSerializer(queryRef3, trackedQuery.currentCache.data, SOURCE_CACHE),
        fetchTime: trackedQuery.currentCache.fetchTime
      });
      if (trackedQuery.lastError !== null && onErrorCallback) {
        onErrorCallback(void 0);
      }
    }
    trackedQuery.subscriptions.push({
      userCallback: onResultCallback,
      errCallback: onErrorCallback,
      unsubscribe
    });
    if (!trackedQuery.currentCache) {
      logDebug(`No cache available for query ${queryRef3.name} with variables ${JSON.stringify(queryRef3.variables)}. Calling executeQuery.`);
      const promise = this.executeQuery(queryRef3);
      promise.then(void 0, (err) => {
      });
    }
    return unsubscribe;
  }
  executeQuery(queryRef3) {
    if (queryRef3.refType !== QUERY_STR) {
      throw new DataConnectError(Code.INVALID_ARGUMENT, `ExecuteQuery can only execute query operation`);
    }
    const key = encoderImpl({
      name: queryRef3.name,
      variables: queryRef3.variables,
      refType: QUERY_STR
    });
    const trackedQuery = this._queries.get(key);
    const result = this.transport.invokeQuery(queryRef3.name, queryRef3.variables);
    const newR = result.then((res) => {
      const fetchTime = (/* @__PURE__ */ new Date()).toString();
      const result2 = Object.assign(Object.assign({}, res), { source: SOURCE_SERVER, ref: queryRef3, toJSON: getRefSerializer(queryRef3, res.data, SOURCE_SERVER), fetchTime });
      trackedQuery.subscriptions.forEach((subscription) => {
        subscription.userCallback(result2);
      });
      trackedQuery.currentCache = {
        data: res.data,
        source: SOURCE_CACHE,
        fetchTime
      };
      return result2;
    }, (err) => {
      trackedQuery.lastError = err;
      trackedQuery.subscriptions.forEach((subscription) => {
        if (subscription.errCallback) {
          subscription.errCallback(err);
        }
      });
      throw err;
    });
    return newR;
  }
  enableEmulator(host, port) {
    this.transport.useEmulator(host, port);
  }
};
function compareDates(str1, str2) {
  const date1 = new Date(str1);
  const date2 = new Date(str2);
  return date1.getTime() < date2.getTime();
}
var CallerSdkTypeEnum = {
  Base: "Base",
  // Core JS SDK
  Generated: "Generated",
  // Generated JS SDK
  TanstackReactCore: "TanstackReactCore",
  // Tanstack non-generated React SDK
  GeneratedReact: "GeneratedReact",
  // Tanstack non-generated Angular SDK
  TanstackAngularCore: "TanstackAngularCore",
  // Tanstack non-generated Angular SDK
  GeneratedAngular: "GeneratedAngular"
  // Generated Angular SDK
};
function urlBuilder(projectConfig, transportOptions) {
  const { connector, location, projectId: project, service } = projectConfig;
  const { host, sslEnabled, port } = transportOptions;
  const protocol = sslEnabled ? "https" : "http";
  const realHost = host || `firebasedataconnect.googleapis.com`;
  let baseUrl = `${protocol}://${realHost}`;
  if (typeof port === "number") {
    baseUrl += `:${port}`;
  } else if (typeof port !== "undefined") {
    logError("Port type is of an invalid type");
    throw new DataConnectError(Code.INVALID_ARGUMENT, "Incorrect type for port passed in!");
  }
  return `${baseUrl}/v1/projects/${project}/locations/${location}/services/${service}/connectors/${connector}`;
}
function addToken(url, apiKey) {
  if (!apiKey) {
    return url;
  }
  const newUrl = new URL(url);
  newUrl.searchParams.append("key", apiKey);
  return newUrl.toString();
}
var connectFetch = globalThis.fetch;
function getGoogApiClientValue(_isUsingGen, _callerSdkType) {
  let str = "gl-js/ fire/" + SDK_VERSION2;
  if (_callerSdkType !== CallerSdkTypeEnum.Base && _callerSdkType !== CallerSdkTypeEnum.Generated) {
    str += " js/" + _callerSdkType.toLowerCase();
  } else if (_isUsingGen || _callerSdkType === CallerSdkTypeEnum.Generated) {
    str += " js/gen";
  }
  return str;
}
function dcFetch(url, body, { signal }, appId, accessToken, appCheckToken, _isUsingGen, _callerSdkType, _isUsingEmulator) {
  if (!connectFetch) {
    throw new DataConnectError(Code.OTHER, "No Fetch Implementation detected!");
  }
  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Client": getGoogApiClientValue(_isUsingGen, _callerSdkType)
  };
  if (accessToken) {
    headers["X-Firebase-Auth-Token"] = accessToken;
  }
  if (appId) {
    headers["x-firebase-gmpid"] = appId;
  }
  if (appCheckToken) {
    headers["X-Firebase-AppCheck"] = appCheckToken;
  }
  const bodyStr = JSON.stringify(body);
  const fetchOptions = {
    body: bodyStr,
    method: "POST",
    headers,
    signal
  };
  if (isCloudWorkstation(url) && _isUsingEmulator) {
    fetchOptions.credentials = "include";
  }
  return connectFetch(url, fetchOptions).catch((err) => {
    throw new DataConnectError(Code.OTHER, "Failed to fetch: " + JSON.stringify(err));
  }).then(async (response) => {
    let jsonResponse = null;
    try {
      jsonResponse = await response.json();
    } catch (e) {
      throw new DataConnectError(Code.OTHER, JSON.stringify(e));
    }
    const message = getMessage(jsonResponse);
    if (response.status >= 400) {
      logError("Error while performing request: " + JSON.stringify(jsonResponse));
      if (response.status === 401) {
        throw new DataConnectError(Code.UNAUTHORIZED, message);
      }
      throw new DataConnectError(Code.OTHER, message);
    }
    return jsonResponse;
  }).then((res) => {
    if (res.errors && res.errors.length) {
      const stringified = JSON.stringify(res.errors);
      const response = {
        errors: res.errors,
        data: res.data
      };
      throw new DataConnectOperationError("DataConnect error while performing request: " + stringified, response);
    }
    return res;
  });
}
function getMessage(obj) {
  if ("message" in obj) {
    return obj.message;
  }
  return JSON.stringify(obj);
}
var RESTTransport = class {
  constructor(options, apiKey, appId, authProvider, appCheckProvider, transportOptions, _isUsingGen = false, _callerSdkType = CallerSdkTypeEnum.Base) {
    var _a, _b;
    this.apiKey = apiKey;
    this.appId = appId;
    this.authProvider = authProvider;
    this.appCheckProvider = appCheckProvider;
    this._isUsingGen = _isUsingGen;
    this._callerSdkType = _callerSdkType;
    this._host = "";
    this._location = "l";
    this._connectorName = "";
    this._secure = true;
    this._project = "p";
    this._accessToken = null;
    this._appCheckToken = null;
    this._lastToken = null;
    this._isUsingEmulator = false;
    this.invokeQuery = (queryName, body) => {
      const abortController = new AbortController();
      const withAuth = this.withRetry(() => dcFetch(addToken(`${this.endpointUrl}:executeQuery`, this.apiKey), {
        name: `projects/${this._project}/locations/${this._location}/services/${this._serviceName}/connectors/${this._connectorName}`,
        operationName: queryName,
        variables: body
      }, abortController, this.appId, this._accessToken, this._appCheckToken, this._isUsingGen, this._callerSdkType, this._isUsingEmulator));
      return withAuth;
    };
    this.invokeMutation = (mutationName, body) => {
      const abortController = new AbortController();
      const taskResult = this.withRetry(() => {
        return dcFetch(addToken(`${this.endpointUrl}:executeMutation`, this.apiKey), {
          name: `projects/${this._project}/locations/${this._location}/services/${this._serviceName}/connectors/${this._connectorName}`,
          operationName: mutationName,
          variables: body
        }, abortController, this.appId, this._accessToken, this._appCheckToken, this._isUsingGen, this._callerSdkType, this._isUsingEmulator);
      });
      return taskResult;
    };
    if (transportOptions) {
      if (typeof transportOptions.port === "number") {
        this._port = transportOptions.port;
      }
      if (typeof transportOptions.sslEnabled !== "undefined") {
        this._secure = transportOptions.sslEnabled;
      }
      this._host = transportOptions.host;
    }
    const { location, projectId: project, connector, service } = options;
    if (location) {
      this._location = location;
    }
    if (project) {
      this._project = project;
    }
    this._serviceName = service;
    if (!connector) {
      throw new DataConnectError(Code.INVALID_ARGUMENT, "Connector Name required!");
    }
    this._connectorName = connector;
    (_a = this.authProvider) === null || _a === void 0 ? void 0 : _a.addTokenChangeListener((token) => {
      logDebug(`New Token Available: ${token}`);
      this._accessToken = token;
    });
    (_b = this.appCheckProvider) === null || _b === void 0 ? void 0 : _b.addTokenChangeListener((result) => {
      const { token } = result;
      logDebug(`New App Check Token Available: ${token}`);
      this._appCheckToken = token;
    });
  }
  get endpointUrl() {
    return urlBuilder({
      connector: this._connectorName,
      location: this._location,
      projectId: this._project,
      service: this._serviceName
    }, { host: this._host, sslEnabled: this._secure, port: this._port });
  }
  useEmulator(host, port, isSecure) {
    this._host = host;
    this._isUsingEmulator = true;
    if (typeof port === "number") {
      this._port = port;
    }
    if (typeof isSecure !== "undefined") {
      this._secure = isSecure;
    }
  }
  onTokenChanged(newToken) {
    this._accessToken = newToken;
  }
  async getWithAuth(forceToken = false) {
    var _a;
    let starterPromise = new Promise((resolve) => resolve(this._accessToken));
    if (this.appCheckProvider) {
      this._appCheckToken = (_a = await this.appCheckProvider.getToken()) === null || _a === void 0 ? void 0 : _a.token;
    }
    if (this.authProvider) {
      starterPromise = this.authProvider.getToken(
        /*forceToken=*/
        forceToken
      ).then((data) => {
        if (!data) {
          return null;
        }
        this._accessToken = data.accessToken;
        return this._accessToken;
      });
    } else {
      starterPromise = new Promise((resolve) => resolve(""));
    }
    return starterPromise;
  }
  _setLastToken(lastToken) {
    this._lastToken = lastToken;
  }
  withRetry(promiseFactory, retry = false) {
    let isNewToken = false;
    return this.getWithAuth(retry).then((res) => {
      isNewToken = this._lastToken !== res;
      this._lastToken = res;
      return res;
    }).then(promiseFactory).catch((err) => {
      if ("code" in err && err.code === Code.UNAUTHORIZED && !retry && isNewToken) {
        logDebug("Retrying due to unauthorized");
        return this.withRetry(promiseFactory, true);
      }
      throw err;
    });
  }
  _setCallerSdkType(callerSdkType) {
    this._callerSdkType = callerSdkType;
  }
};
function mutationRef(dcInstance, mutationName, variables) {
  dcInstance.setInitialized();
  const ref = {
    dataConnect: dcInstance,
    name: mutationName,
    refType: MUTATION_STR,
    variables
  };
  return ref;
}
var MutationManager = class {
  constructor(_transport) {
    this._transport = _transport;
    this._inflight = [];
  }
  executeMutation(mutationRef3) {
    const result = this._transport.invokeMutation(mutationRef3.name, mutationRef3.variables);
    const withRefPromise = result.then((res) => {
      const obj = Object.assign(Object.assign({}, res), { source: SOURCE_SERVER, ref: mutationRef3, fetchTime: Date.now().toLocaleString() });
      return obj;
    });
    this._inflight.push(result);
    const removePromise = () => this._inflight = this._inflight.filter((promise) => promise !== result);
    result.then(removePromise, removePromise);
    return withRefPromise;
  }
};
function executeMutation(mutationRef3) {
  return mutationRef3.dataConnect._mutationManager.executeMutation(mutationRef3);
}
var FIREBASE_DATA_CONNECT_EMULATOR_HOST_VAR = "FIREBASE_DATA_CONNECT_EMULATOR_HOST";
function parseOptions(fullHost) {
  const [protocol, hostName] = fullHost.split("://");
  const isSecure = protocol === "https";
  const [host, portAsString] = hostName.split(":");
  const port = Number(portAsString);
  return { host, port, sslEnabled: isSecure };
}
var DataConnect = class {
  // @internal
  constructor(app, dataConnectOptions, _authProvider, _appCheckProvider) {
    this.app = app;
    this.dataConnectOptions = dataConnectOptions;
    this._authProvider = _authProvider;
    this._appCheckProvider = _appCheckProvider;
    this.isEmulator = false;
    this._initialized = false;
    this._isUsingGeneratedSdk = false;
    this._callerSdkType = CallerSdkTypeEnum.Base;
    if (typeof process !== "undefined" && process.env) {
      const host = process.env[FIREBASE_DATA_CONNECT_EMULATOR_HOST_VAR];
      if (host) {
        logDebug("Found custom host. Using emulator");
        this.isEmulator = true;
        this._transportOptions = parseOptions(host);
      }
    }
  }
  // @internal
  _useGeneratedSdk() {
    if (!this._isUsingGeneratedSdk) {
      this._isUsingGeneratedSdk = true;
    }
  }
  _setCallerSdkType(callerSdkType) {
    this._callerSdkType = callerSdkType;
    if (this._initialized) {
      this._transport._setCallerSdkType(callerSdkType);
    }
  }
  _delete() {
    _removeServiceInstance(this.app, "data-connect", JSON.stringify(this.getSettings()));
    return Promise.resolve();
  }
  // @internal
  getSettings() {
    const copy = JSON.parse(JSON.stringify(this.dataConnectOptions));
    delete copy.projectId;
    return copy;
  }
  // @internal
  setInitialized() {
    if (this._initialized) {
      return;
    }
    if (this._transportClass === void 0) {
      logDebug("transportClass not provided. Defaulting to RESTTransport.");
      this._transportClass = RESTTransport;
    }
    if (this._authProvider) {
      this._authTokenProvider = new FirebaseAuthProvider(this.app.name, this.app.options, this._authProvider);
    }
    if (this._appCheckProvider) {
      this._appCheckTokenProvider = new AppCheckTokenProvider(this.app, this._appCheckProvider);
    }
    this._initialized = true;
    this._transport = new this._transportClass(this.dataConnectOptions, this.app.options.apiKey, this.app.options.appId, this._authTokenProvider, this._appCheckTokenProvider, void 0, this._isUsingGeneratedSdk, this._callerSdkType);
    if (this._transportOptions) {
      this._transport.useEmulator(this._transportOptions.host, this._transportOptions.port, this._transportOptions.sslEnabled);
    }
    this._queryManager = new QueryManager(this._transport);
    this._mutationManager = new MutationManager(this._transport);
  }
  // @internal
  enableEmulator(transportOptions) {
    if (this._initialized && !areTransportOptionsEqual(this._transportOptions, transportOptions)) {
      logError("enableEmulator called after initialization");
      throw new DataConnectError(Code.ALREADY_INITIALIZED, "DataConnect instance already initialized!");
    }
    this._transportOptions = transportOptions;
    this.isEmulator = true;
  }
};
function areTransportOptionsEqual(transportOptions1, transportOptions2) {
  return transportOptions1.host === transportOptions2.host && transportOptions1.port === transportOptions2.port && transportOptions1.sslEnabled === transportOptions2.sslEnabled;
}
function connectDataConnectEmulator(dc, host, port, sslEnabled = false) {
  if (isCloudWorkstation(host)) {
    void pingServer(`https://${host}${port ? `:${port}` : ""}`);
    updateEmulatorBanner("Data Connect", true);
  }
  dc.enableEmulator({ host, port, sslEnabled });
}
function getDataConnect(appOrOptions, optionalOptions) {
  let app;
  let dcOptions;
  if ("location" in appOrOptions) {
    dcOptions = appOrOptions;
    app = getApp();
  } else {
    dcOptions = optionalOptions;
    app = appOrOptions;
  }
  if (!app || Object.keys(app).length === 0) {
    app = getApp();
  }
  const provider = _getProvider(app, "data-connect");
  const identifier = JSON.stringify(dcOptions);
  if (provider.isInitialized(identifier)) {
    const dcInstance = provider.getImmediate({ identifier });
    const options = provider.getOptions(identifier);
    const optionsValid = Object.keys(options).length > 0;
    if (optionsValid) {
      logDebug("Re-using cached instance");
      return dcInstance;
    }
  }
  validateDCOptions(dcOptions);
  logDebug("Creating new DataConnect instance");
  return provider.initialize({
    instanceIdentifier: identifier,
    options: dcOptions
  });
}
function validateDCOptions(dcOptions) {
  const fields = ["connector", "location", "service"];
  if (!dcOptions) {
    throw new DataConnectError(Code.INVALID_ARGUMENT, "DC Option Required");
  }
  fields.forEach((field) => {
    if (dcOptions[field] === null || dcOptions[field] === void 0) {
      throw new DataConnectError(Code.INVALID_ARGUMENT, `${field} Required`);
    }
  });
  return true;
}
function terminate(dataConnect) {
  return dataConnect._delete();
}
function registerDataConnect(variant) {
  setSDKVersion(SDK_VERSION);
  _registerComponent(new Component(
    "data-connect",
    (container, { instanceIdentifier: settings, options }) => {
      const app = container.getProvider("app").getImmediate();
      const authProvider = container.getProvider("auth-internal");
      const appCheckProvider = container.getProvider("app-check-internal");
      let newOpts = options;
      if (settings) {
        newOpts = JSON.parse(settings);
      }
      if (!app.options.projectId) {
        throw new DataConnectError(Code.INVALID_ARGUMENT, "Project ID must be provided. Did you pass in a proper projectId to initializeApp?");
      }
      return new DataConnect(app, Object.assign(Object.assign({}, newOpts), { projectId: app.options.projectId }), authProvider, appCheckProvider);
    },
    "PUBLIC"
    /* ComponentType.PUBLIC */
  ).setMultipleInstances(true));
  registerVersion(name, version, variant);
  registerVersion(name, version, "esm2017");
}
function executeQuery(queryRef3) {
  return queryRef3.dataConnect._queryManager.executeQuery(queryRef3);
}
function queryRef(dcInstance, queryName, variables, initialCache) {
  dcInstance.setInitialized();
  dcInstance._queryManager.track(queryName, variables, initialCache);
  return {
    dataConnect: dcInstance,
    refType: QUERY_STR,
    name: queryName,
    variables
  };
}
function toQueryRef(serializedRef) {
  const { refInfo: { name: name2, variables, connectorConfig } } = serializedRef;
  return queryRef(getDataConnect(connectorConfig), name2, variables);
}
function validateArgs(connectorConfig, dcOrVars, vars, validateVars) {
  let dcInstance;
  let realVars;
  if (dcOrVars && "enableEmulator" in dcOrVars) {
    dcInstance = dcOrVars;
    realVars = vars;
  } else {
    dcInstance = getDataConnect(connectorConfig);
    realVars = dcOrVars;
  }
  if (!dcInstance || !realVars && validateVars) {
    throw new DataConnectError(Code.INVALID_ARGUMENT, "Variables required.");
  }
  return { dc: dcInstance, vars: realVars };
}
function subscribe(queryRefOrSerializedResult, observerOrOnNext, onError, onComplete) {
  let ref;
  let initialCache;
  if ("refInfo" in queryRefOrSerializedResult) {
    const serializedRef = queryRefOrSerializedResult;
    const { data, source, fetchTime } = serializedRef;
    initialCache = {
      data,
      source,
      fetchTime
    };
    ref = toQueryRef(serializedRef);
  } else {
    ref = queryRefOrSerializedResult;
  }
  let onResult = void 0;
  if (typeof observerOrOnNext === "function") {
    onResult = observerOrOnNext;
  } else {
    onResult = observerOrOnNext.onNext;
    onError = observerOrOnNext.onErr;
    observerOrOnNext.onComplete;
  }
  if (!onResult) {
    throw new DataConnectError(Code.INVALID_ARGUMENT, "Must provide onNext");
  }
  return ref.dataConnect._queryManager.addSubscription(ref, onResult, onError, initialCache);
}
registerDataConnect();

// node_modules/@angular/fire/fesm2022/angular-fire-data-connect.mjs
var DATA_CONNECT_PROVIDER_NAME = "data-connect";
var DataConnectInstances = class {
  constructor() {
    return ɵgetAllInstancesOf(DATA_CONNECT_PROVIDER_NAME);
  }
};
var dataConnectInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(DATA_CONNECT_PROVIDER_NAME))), distinct());
var PROVIDED_DATA_CONNECT_INSTANCES = new InjectionToken("angularfire2.data-connect-instances");
function defaultDataConnectInstanceFactory(provided, defaultApp) {
  return ɵgetDefaultInstanceOf(DATA_CONNECT_PROVIDER_NAME, provided, defaultApp);
}
function dataConnectInstanceFactory(fn) {
  return (zone, injector) => {
    return zone.runOutsideAngular(() => fn(injector));
  };
}
var DATA_CONNECT_INSTANCES_PROVIDER = {
  provide: DataConnectInstances,
  deps: [[new Optional(), PROVIDED_DATA_CONNECT_INSTANCES]]
};
var DEFAULT_DATA_CONNECT_INSTANCE_PROVIDER = {
  provide: DataConnect,
  useFactory: defaultDataConnectInstanceFactory,
  deps: [[new Optional(), PROVIDED_DATA_CONNECT_INSTANCES], FirebaseApp]
};
var DataConnectModule = class _DataConnectModule {
  constructor() {
    registerVersion("angularfire", VERSION.full, "fdc");
  }
  static ɵfac = function DataConnectModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DataConnectModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _DataConnectModule
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [DEFAULT_DATA_CONNECT_INSTANCE_PROVIDER, DATA_CONNECT_INSTANCES_PROVIDER]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DataConnectModule, [{
    type: NgModule,
    args: [{
      providers: [DEFAULT_DATA_CONNECT_INSTANCE_PROVIDER, DATA_CONNECT_INSTANCES_PROVIDER]
    }]
  }], () => [], null);
})();
function provideDataConnect(fn, ...deps) {
  registerVersion("angularfire", VERSION.full, "fdc");
  return makeEnvironmentProviders([DEFAULT_DATA_CONNECT_INSTANCE_PROVIDER, DATA_CONNECT_INSTANCES_PROVIDER, {
    provide: PROVIDED_DATA_CONNECT_INSTANCES,
    useFactory: dataConnectInstanceFactory(fn),
    multi: true,
    deps: [NgZone, Injector, ɵAngularFireSchedulers, FirebaseApps, ...deps]
  }]);
}
var connectDataConnectEmulator2 = ɵzoneWrap(connectDataConnectEmulator, true);
var executeMutation2 = ɵzoneWrap(executeMutation, true);
var executeQuery2 = ɵzoneWrap(executeQuery, true);
var getDataConnect2 = ɵzoneWrap(getDataConnect, true);
var mutationRef2 = ɵzoneWrap(mutationRef, true, 2);
var queryRef2 = ɵzoneWrap(queryRef, true, 2);
var setLogLevel2 = ɵzoneWrap(setLogLevel, true);
var subscribe2 = ɵzoneWrap(subscribe, true);
var terminate2 = ɵzoneWrap(terminate, true);
var toQueryRef2 = ɵzoneWrap(toQueryRef, true, 2);
export {
  CallerSdkTypeEnum,
  Code,
  DataConnect,
  DataConnectError,
  DataConnectInstances,
  DataConnectModule,
  DataConnectOperationError,
  MUTATION_STR,
  MutationManager,
  QUERY_STR,
  SOURCE_CACHE,
  SOURCE_SERVER,
  areTransportOptionsEqual,
  connectDataConnectEmulator2 as connectDataConnectEmulator,
  dataConnectInstance$,
  executeMutation2 as executeMutation,
  executeQuery2 as executeQuery,
  getDataConnect2 as getDataConnect,
  mutationRef2 as mutationRef,
  parseOptions,
  provideDataConnect,
  queryRef2 as queryRef,
  setLogLevel2 as setLogLevel,
  subscribe2 as subscribe,
  terminate2 as terminate,
  toQueryRef2 as toQueryRef,
  validateArgs,
  validateDCOptions
};
//# sourceMappingURL=@angular_fire_data-connect.js.map
