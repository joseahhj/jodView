//导出组件中README中的meta
export function importAll(r) {
    const obj = {}
    r.keys()
        .map(r)
        .map(m => {
            const tag = m.meta && m.meta.title ? m.meta.title : 'Breadcrumb'
            obj[tag] = m.meta
        })
    return obj
}

//导出单个md文件路径
export function importMdSingle(r) {
    const obj = {}
    r.keys()
        .map(r)
        .map(m => Object.assign({
            order: m.meta && m.meta.order ? m.meta.order : 0
        }, m))
        .sort((a, b) => {
            return a.order < b.order ? -1 : (a.order > b.order ? 1 : 0)
        })
        .forEach(m => {
            obj[m.order] = m
        })

    return obj
}

//导出组件中md文件路径
export function importMdUrl(r) {
    const endObj = {}
    const listKey = r.keys()
    listKey.map(r => {
        const urlSplit = r.split('/')
        const newUrl = r.split('.')
        const tag = urlSplit[1]
        const mark = tag + '/'
        let endObjKeys = Object.keys(endObj)

        endObjKeys.indexOf(tag) < 0 ? endObj[tag] = [] : '';
        r.indexOf(mark) > -1 ? endObj[tag].push(newUrl[1]) : '';
    })
    return endObj
}

//解析某一文件夹下的所有md文件
export function importMd(mdUrl) {
    const obj = {}
    const getReadMe = name => require('../../src/components' + name + '.md');
    mdUrl.map(m => {
        const endValue = getReadMe(m)
        const order = endValue.meta && endValue.meta.order ? endValue.meta.order : 0
        obj[order] = endValue
    })
    return obj
}

// 解析md文件公共方法
function renderMDFile(readme, headFun, codeFun) {
    let marked = require('marked');
    const renderer = new marked.Renderer();

    renderer.heading = headFun ? headFun : function(text, level) {
        let atId = level == 2 ? ' id="' + text + '"' : '';
        return '<h' + level + atId + '>' + text + '</h' + level + '>';
    };
    renderer.code = codeFun ? codeFun : function(code, lang) {

        return '<pre class="hljs">' + require('highlight.js').highlightAuto(code).value + '</pre>';
    };

    return marked(readme.markdown, {
        renderer: renderer
    }) || '';
}

//解析demo文件夹下的一个md内容
export function renderMarkdown(readme) {
    let codeFun = function(code, level) {
        let btnStr
        if (level == 'vue') {
            btnStr =
                '<div class="code-html">' +
                '<pre class="hljs hide">' +
                require('highlight.js').highlightAuto(code).value +
                '</pre>' +
                '</div>'
        } else {
            btnStr = '<div class="pre-code-box">' +
                '<p class="btn-des clearfix">' +
                '<span class="pre-show">显示编辑代码</span>' +
                '<span class="pre-run hide" title="可编辑代码区域">运行</span>' +
                '</p>' +
                '<pre class="hljs hide">' +
                require('highlight.js').highlightAuto(code).value +
                '</pre>' +
                '</div>'
        }
        return btnStr;
    };

    return renderMDFile(readme, null, codeFun);
}
//解析文档文件夹下的一个md内容
export function renderDocMd(readme) {
    return renderMDFile(readme);
}

//解析某一文件夹下所有md内容
export function renderMdList(mdUrl) {
    const readmeList = importMd(mdUrl)
    for (let key in readmeList) {
        readmeList[key].html = renderMarkdown(readmeList[key])
    }
    return readmeList
}