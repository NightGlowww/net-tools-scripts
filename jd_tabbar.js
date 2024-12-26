const $ = new Env('京东底栏精简');

let body = $response.body;
try {
    console.log('开始处理请求...');
    let obj = JSON.parse(body);

    if (obj.data) {
        // 1. 处理LaunchOption
        if (obj.data.LaunchOption) {
            obj.data.LaunchOption = {
                "LaunchMainSwitch": {
                    "launchEndLSWDT": "0",
                    "LaunchAsyncSwitchIsOn": "1",
                    "LaunchMainSwitchIsOn": "1"
                },
                "TabBar": {
                    "value": "1"
                }
            };
        }

        // 2. 处理JDTabBar
        if (obj.data.JDTabBar) {
            obj.data.JDTabBar = {
                "refreshNaviAll": { "value": "0" },
                "immersiveNaviWithB": { "value": "0" },
                "refreshNaviAuto": { "value": "0" },
                "ConfigCenter": { "needRequest": "0" },
                "TabbarConfig": {
                    "delay": "0",
                    "enableSound": "0",
                    "EnableFuzzy": "0",
                    "enableBackup": "0"
                },
                "navTitle": { "value": "0" }
            };
        }

        // 3. 处理TaroNative
        if (obj.data.TaroNative) {
            if (obj.data.TaroNative.preDecompression) {
                obj.data.TaroNative.preDecompression.preUnzipModule = {
                    "homePageUIIdleInit": ["home", "cart", "mine"]
                };
            }
        }

        // 4. 清理其他配置
        const removeKeys = [
            'HourlyGo',
            'orderCenter',
            'discoveryConfig',
            'iconFunctionConfig',
            'dynamicTabList',
            'JDTabBar.navTitle'
        ];

        removeKeys.forEach(key => {
            if (key.includes('.')) {
                const [parent, child] = key.split('.');
                if (obj.data[parent] && obj.data[parent][child]) {
                    delete obj.data[parent][child];
                }
            } else if (obj.data[key]) {
                delete obj.data[key];
            }
        });

        // 5. 强制设置底栏项目
        obj.data.bottomTabList = ["home", "cart", "mine"];

        // 6. 禁用动态加载
        if (obj.data.JDTabBar) {
            obj.data.JDTabBar.refreshNaviAuto = { "value": "0" };
            obj.data.JDTabBar.ConfigCenter = { "needRequest": "0" };
        }
    }

    body = JSON.stringify(obj);
    console.log('处理完成');
} catch (e) {
    console.log(`京东底栏处理错误: ${e.message}`);
}

$done({ body });

function Env(t) { return new class { constructor(t) { this.name = t } log(t) { console.log(`[${this.name}] ${t}`) } }(t) }