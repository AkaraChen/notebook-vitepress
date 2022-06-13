const defaultSidebar = [
    {
        text: 'JavaScript',
        collapsible: true,
        collapsed: true,
        items: [
            { text: '技巧', link: 'javascript/skill/closure' },
            { text: 'API', link: 'javascript/api/fetch' },
            { text: '异步', link: 'javascript/async' },
            { text: '后端', link: 'javascript/backend/express' },
            { text: 'React', link: 'javascript/react/basic' },
            { text: '面向对象', link: 'javascript/oop' },
            { text: '函数式', link: 'javascript/fp' },
            { text: 'TypeScript', link: 'javascript/ts' },
        ]
    }, {
        text: 'CSS',
        collapsible: true,
        collapsed: true,
        items: [
            { text: '杂项', link: 'css/miscellaneous' },
            { text: '选择器', link: 'css/selector' },
            { text: '相对单位', link: 'css/relative-unit' },
            { text: '布局', link: 'css/layout' },
            { text: '变换与动画', link: 'css/transform-animation' },
            { text: '实例', link: 'css/snippets' },
            { text: '设计', link: 'css/design' }
        ]
    }, {
        text: 'Rust',
        collapsible: true,
        collapsed: true,
        items: [
            { text: '第一行代码', link: 'rust/headfirst' },
            { text: '基础', link: 'rust/basic' },
            { text: '所有权', link: 'rust/ownership' }
        ]
    }, {
        text: 'MySQL',
        collapsible: true,
        collapsed: true,
        items: [
            { text: '基础', link: 'mysql/basic' },
            { text: 'CRUD', link: 'mysql/crud' }
        ]
    }, {
        text: '编程语言',
        collapsible: true,
        collapsed: true,
        items: [
            { text: '类型系统', link: 'lang/type-system', },
            { text: "基本类型", link: 'lang/types' },
        ]
    }, {
        text: '操作系统',
        collapsible: true,
        collapsed: true,
        items: [
            { text: '导论', link: 'system/conclusion' },
            { text: '历史', link: 'system/history' },
            { text: '进程', link: 'system/process' },
            { text: '受限直接执行', link: 'system/limited-direct-execution' },
            { text: '进程调度', link: 'system/process-scheduling' },
            { text: '内存虚拟化', link: 'system/vitual-memory' }
        ]
    }, {
        text: '机器学习',
        collapsible: true,
        collapsed: true,
        items: [
            { text: '第一行代码', link: 'ml/headfirst-in-js' },
            { text: '历史', link: 'ml/history' },
            { text: 'MNIST', link: 'ml/mnist' },
            { text: 'GPU 加速', link: 'ml/gpu-support' }
        ]
    }, {
        text: '其他',
        collapsible: true,
        collapsed: true,
        items: [
            { text: 'Kotlin', link: 'other/kotlin/basic' },
            { text: '日语', link: 'other/japanese' },
            { text: 'CTF', link: 'other/ctf' },
            { text: 'PostgreSQL', link: 'other/pgsql' },
            { text: 'Java', link: 'other/java/snippets' },
            { text: 'Golang', link: 'other/golang/basic' }
        ]
    },
]

const JavaScriptSidebar = [
    {
        text: '技巧',
        collapsible: true,
        collapsed: true,
        items: [
            { text: '闭包', link: 'javascript/skill/closure' },
            { text: '选择结构', link: 'javascript/skill/better-control-flow' }
        ]
    }, {
        text: 'API',
        collapsible: true,
        collapsed: true,
        items: [
            { text: 'this 与 ABC', link: 'javascript/api/this' },
            { text: 'fetch', link: 'javascript/api/fetch' },
            { text: 'Promise', link: 'javascript/api/promise' },
            { text: '元编程', link: 'javascript/api/proxy' },
            { text: 'Web Component', link: 'javascript/web-component' }
        ]
    }, {
        text: '异步',
        collapsible: true,
        collapsed: true,
        items: [
            { text: '基础', link: 'javascript/async' }
        ]
    }, {
        text: '后端',
        collapsible: true,
        collapsed: true,
        items: [
            { text: 'Express', link: 'javascript/backend/express' }
        ]
    }, {
        text: 'React',
        collapsible: true,
        collapsed: true,
        items: [
            { text: '基础', link: 'javascript/react/basic' },
            { text: 'Hooks', link: 'javascript/react/hooks' }
        ]
    },
    {
        text: '面向对象',
        collapsible: true,
        collapsed: true,
        items: [
            { text: '基础', link: 'javascript/oop', }
        ]
    },
    {
        text: '函数式',
        collapsible: true,
        collapsed: true,
        items: [
            { text: '基础', link: 'javascript/fp' }
        ]
    }, {
        text: 'TypeScript',
        collapsible: true,
        collapsed: true,
        items: [
            { text: '基础', link: 'javascript/ts' }
        ]
    }
]

export default {
    title: `🤨 AkaraChen's Notebook`,
    description: 'Ridiculous JavaScript.',
    lang: "zh-CN",
    themeConfig: {
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2020-present Akara Chen'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/akarachen' }
        ],
        sidebar: {
            '/javascript/': JavaScriptSidebar,
            '/css/': defaultSidebar,
            '/lang/': defaultSidebar,
            '/system/': defaultSidebar,
            '/ml/': defaultSidebar,
            '/mysql/': defaultSidebar,
            '/other/': defaultSidebar,
            '/rust/': defaultSidebar,
            '/index': defaultSidebar,
        }
    },
}