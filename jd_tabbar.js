const $ = new Env('京东底栏净化');
let body = $response.body;

try {
    $.log('开始处理京东底栏...');
    let obj = JSON.parse(body);

    // 处理基础配置
    if (obj.data) {
        // 1. 处理底栏配置
        if (obj.data.JDTabBar) {
            obj.data.JDTabBar = {
                "refreshNaviAll": { "value": "1" },
                "immersiveNaviWithB": { "value": "0" },
                "refreshNaviAuto": { "value": "1" },
                "ConfigCenter": { "needRequest": "0" },
                "TabbarConfig": {
                    "delay": "0",
                    "enableSound": "0",
                    "EnableFuzzy": "1",
                    "enableBackup": "1"
                }
            };
        }

        // 2. 强制启用主开关
        if (obj.data.LaunchOption) {
            obj.data.LaunchOption = {
                "LaunchMainSwitch": {
                    "launchEndLSWDT": "0",
                    "LaunchAsyncSwitchIsOn": "1",
                    "LaunchMainSwitchIsOn": "1"
                },
                "TabBar": { "value": "1" }
            };
        }

        // 3. 强制设置TabBar布局
        if (obj.data.tabBarInfo) {
            obj.data.tabBarInfo = {
                "items": [
                    {
                        "functionId": "home",
                        "name": "首页",
                        "canDelete": false,
                        "isShow": true,
                        "sortId": 1
                    },
                    {
                        "functionId": "cart",
                        "name": "购物车",
                        "canDelete": false,
                        "isShow": true,
                        "sortId": 2
                    },
                    {
                        "functionId": "mine",
                        "name": "我的",
                        "canDelete": false,
                        "isShow": true,
                        "sortId": 3
                    }
                ]
            };
        }

        // 4. 清理其他可能影响的配置
        if (obj.data.iconFunctionConfig) {
            delete obj.data.iconFunctionConfig;
        }
        if (obj.data.orderCenter) {
            delete obj.data.orderCenter;
        }
        if (obj.data.discoveryConfig) {
            delete obj.data.discoveryConfig;
        }

        // 5. 设置底栏样式
        if (obj.data.bottomTabList) {
            obj.data.bottomTabList = ["home", "cart", "mine"];
        }

        // 6. 禁用动态加载
        if (obj.data.dynamicTabList) {
            obj.data.dynamicTabList = false;
        }
    }

    // 输出处理后的数据
    body = JSON.stringify(obj);
    $.log('底栏处理完成');

} catch (e) {
    $.log('京东底栏处理错误: ' + e.message);
} finally {
    const result = { body };
    $.done(result);
}

// 辅助函数
function Env(t) {
    return new class {
        log(t) {
            console.log(`[京东底栏净化] ${t}`);
        }
        done(t = {}) {
            return t;
        }
    }
}