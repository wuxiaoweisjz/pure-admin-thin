import type { App } from "vue";

let config: object = {};

const setConfig = (cfg?: unknown) => {
  config = Object.assign(config, cfg);
};

const getConfig = (key?: string): PlatformConfigs => {
  if (typeof key === "string") {
    const arr = key.split(".");
    if (arr && arr.length) {
      let data = config;
      arr.forEach(v => {
        if (data && typeof data[v] !== "undefined") {
          data = data[v];
        } else {
          data = null;
        }
      });
      return data;
    }
  }
  return config;
};

/** 获取项目动态全局配置 */
/*export const getPlatformConfig = async (app: App): Promise<undefined> => {
  app.config.globalProperties.$config = getConfig();
  return axios({
    method: "get",
    url: `${VITE_PUBLIC_PATH}platform-config.json`
  })
    .then(({ data: config }) => {
      let $config = app.config.globalProperties.$config;
      // 自动注入系统配置
      if (app && $config && typeof config === "object") {
        $config = Object.assign($config, config);
        app.config.globalProperties.$config = $config;
        // 设置全局配置
        setConfig($config);
      }
      return $config;
    })
    .catch(() => {
      throw "请在public文件夹下添加platform-config.json配置文件";
    });
};*/

export const getPlatformConfig = async (app: App): Promise<PlatformConfigs> => {
  // 将 platform-config.json 中的内容直接作为配置对象
  const config = {
    Version: "5.8.0",
    Title: "PureAdmin",
    FixedHeader: true,
    HiddenSideBar: false,
    MultiTagsCache: false,
    KeepAlive: true,
    Locale: "zh",
    Layout: "vertical",
    Theme: "light",
    DarkMode: false,
    OverallStyle: "light",
    Grey: false,
    Weak: false,
    HideTabs: false,
    HideFooter: false,
    Stretch: false,
    SidebarStatus: true,
    EpThemeColor: "#409EFF",
    ShowLogo: true,
    ShowModel: "smart",
    MenuArrowIconNoTransition: false,
    CachingAsyncRoutes: false,
    TooltipEffect: "light",
    ResponsiveStorageNameSpace: "responsive-",
    MenuSearchHistory: 6
  };

  // 设置全局配置
  let $config = (app.config.globalProperties.$config = getConfig());

  // 自动注入系统配置
  if (app && $config && typeof config === "object") {
    $config = Object.assign($config, config);
    app.config.globalProperties.$config = $config;
    setConfig($config);
  }

  return $config;
};

/** 本地响应式存储的命名空间 */
const responsiveStorageNameSpace = () => getConfig().ResponsiveStorageNameSpace;

export { getConfig, setConfig, responsiveStorageNameSpace };
