let body = $response.body;

try {
    body = JSON.parse(body);

    // 修改TabBar配置
    if (body.data && body.data.JDTabBar) {
        // 启用刷新导航条功能
        body.data.JDTabBar.refreshNaviAll = {
            "value": "1"
        };

        // 设置模糊效果和透明度
        body.data.JDTabBar.TabbarConfig = {
            "delay": "0.05",
            "enableSound": "0", // 关闭声音
            "EnableFuzzy": "1", // 启用模糊
            "enableBackup": "1"
        };
    }

    // 修改LaunchOption配置,只保留核心功能
    if (body.data && body.data.LaunchOption) {
        body.data.LaunchOption = {
            "TabBar": {
                "value": "1"  // 启用TabBar
            },
            "LaunchMainSwitch": {
                "LaunchMainSwitchIsOn": "1",
                "LaunchAsyncSwitchIsOn": "1"
            }
        };
    }

    // 强制设置显示的底栏按钮
    if (body.data && body.data.iconFunctionConfig) {
        body.data.iconFunctionConfig = {
            "tabBarItems": [
                {
                    "id": "home",
                    "title": "首页",
                    "icon": "tab_home",
                    "selectedIcon": "tab_home_selected"
                },
                {
                    "id": "cart",
                    "title": "购物车",
                    "icon": "tab_cart",
                    "selectedIcon": "tab_cart_selected"
                },
                {
                    "id": "mine",
                    "title": "我的",
                    "icon": "tab_mine",
                    "selectedIcon": "tab_mine_selected"
                }
            ]
        };
    }

    body = JSON.stringify(body);
} catch (e) {
    console.log('京东底栏精简脚本执行错误: ' + e);
}

$done({ body });