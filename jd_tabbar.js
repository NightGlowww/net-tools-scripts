let body = $response.body;

try {
    let obj = JSON.parse(body);

    // 1. 修改LaunchOption下的TabBar配置
    if (obj.data && obj.data.LaunchOption) {
        obj.data.LaunchOption = {
            "TabBar": { "value": "1" },  // 启用TabBar
            "LaunchMainSwitch": {
                "launchEndLSWDT": "0",
                "LaunchAsyncSwitchIsOn": "1",
                "LaunchMainSwitchIsOn": "1"
            }
        };
    }

    // 2. 修改JDTabBar配置
    if (obj.data && obj.data.JDTabBar) {
        obj.data.JDTabBar = {
            "refreshNaviAll": { "value": "1" },
            "immersiveNaviWithB": { "value": "0" },
            "refreshNaviAuto": { "value": "1" },
            "ConfigCenter": { "needRequest": "0" },
            "TabbarConfig": {
                "delay": "0",
                "enableSound": "0",
                "EnableFuzzy": "1",
                "enableBackup": "0"
            }
        };
    }

    // 3. 清理TaroNative底栏相关配置
    if (obj.data && obj.data.TaroNative) {
        if (obj.data.TaroNative.preDecompression) {
            obj.data.TaroNative.preDecompression.preUnzipModule.homePageUIIdleInit = [
                "home",
                "cart",
                "mine"
            ];
        }
    }

    // 4. 修改底栏TabBar布局
    if (obj.data && obj.data.tabBarInfo) {
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

    // 5. 清理动态加载配置
    if (obj.data && obj.data.dynamicTabList) {
        obj.data.dynamicTabList = null;
    }

    // 6. 移除不必要的底栏配置
    if (obj.data) {
        // 移除一些可能影响底栏的配置
        const removeKeys = [
            'orderCenter',
            'discoveryConfig',
            'iconFunctionConfig'
        ];

        removeKeys.forEach(key => {
            if (obj.data[key]) delete obj.data[key];
        });
    }

    body = JSON.stringify(obj);
} catch (e) {
    console.log(`京东底栏处理错误: ${e.message}`);
}

$done({ body });