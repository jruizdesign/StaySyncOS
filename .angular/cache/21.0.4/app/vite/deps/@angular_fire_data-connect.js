import {
  CallerSdkTypeEnum,
  Code,
  DataConnect,
  DataConnectError,
  DataConnectOperationError,
  MUTATION_STR,
  MutationManager,
  QUERY_STR,
  SOURCE_CACHE,
  SOURCE_SERVER,
  areTransportOptionsEqual,
  connectDataConnectEmulator,
  executeMutation,
  executeQuery,
  getDataConnect,
  mutationRef,
  parseOptions,
  queryRef,
  setLogLevel,
  subscribe,
  terminate,
  toQueryRef,
  validateArgs,
  validateDCOptions
} from "./chunk-T7TARFXG.js";
import {
  FirebaseApp,
  FirebaseApps,
  VERSION,
  ɵAngularFireSchedulers,
  ɵgetAllInstancesOf,
  ɵgetDefaultInstanceOf,
  ɵzoneWrap
} from "./chunk-YMMAOIF5.js";
import "./chunk-OYIDUI2F.js";
import {
  registerVersion
} from "./chunk-YWX26FOZ.js";
import {
  NgModule,
  Optional,
  setClassMetadata,
  ɵɵdefineNgModule
} from "./chunk-UGLG2V2C.js";
import {
  InjectionToken,
  Injector,
  NgZone,
  makeEnvironmentProviders,
  ɵɵdefineInjector
} from "./chunk-G6I5RPEY.js";
import {
  concatMap,
  distinct,
  from,
  timer
} from "./chunk-MUD6KAHP.js";
import "./chunk-653SOEEV.js";

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
