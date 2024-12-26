let body = $response.body;

try {
    let obj = JSON.parse(body);
    let url = $request.url;

    // 获取请求的functionId
    let functionId = url.match(/functionId=([^&]*)/)?.[1];

    switch (functionId) {
        case 'readCustomSurfaceList':
            // 处理自定义布局请求
            if (obj.data && obj.data.list) {
                // 仅保留首页、购物车、我的
                obj.data.list = obj.data.list.filter(item =>
                    ['home', 'cart', 'mine'].includes(item.id) ||
                    ['首页', '购物车', '我的'].includes(item.name)
                );
            }
            break;

        case 'basicConfig':
        case 'serverConfig':
            // 基础配置处理
            if (obj.data && obj.data.LaunchOption) {
                obj.data.LaunchOption = {
                    "TabBar": { "value": "1" },
                    "LaunchMainSwitch": {
                        "launchEndLSWDT": "0",
                        "LaunchAsyncSwitchIsOn": "1",
                        "LaunchMainSwitchIsOn": "1"
                    }
                };
            }

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

            // 清理其他可能影响的配置
            if (obj.data) {
                ['orderCenter', 'discoveryConfig', 'iconFunctionConfig', 'dynamicTabList'].forEach(key => {
                    if (obj.data[key]) delete obj.data[key];
                });
            }
            break;
    }

    body = JSON.stringify(obj);
} catch (e) {
    console.log(`京东底栏处理错误: ${e.message}`);
}

$done({ body });