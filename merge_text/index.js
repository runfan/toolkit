const args = require('args')
const glob = require("glob")
const assert = require('assert');
const fs = require('fs')
const path = require('path')

args
    .option('dir', '代码文档目录')
    .option('pattern', '过滤规则')
    .option('out', '输出文档目录', '../out.txt')

const flags = args.parse(process.argv)
assert(flags.dir, '必须指定文档目录')
assert(flags.out, '必须指定输出目录')

if (fs.existsSync(flags.out))
    fs.unlinkSync(flags.out)
glob(`${flags.dir}/${flags.pattern}`, {
    // debug: true,
    nodir: true,
    realpath: true
}, function (err, files) {
    if (err) throw err
    files.forEach(file => {
        if (/node_modules/.test(file)) return
        if (/dist/.test(file)) return
        if (/main\.js$/.test(file)) return
        fs.readFile(file, (err, data) => {
            if (err) throw err;
            let lines = data.toString()
            lines = lines
                .replace(/\/\*[^]*?\*\//g, '')//多行注释
                .replace(/\s*\/\/.*$/gm, '')//单行注释
                .replace(/\s+\n|\r/g,'\n')//空行
            // console.log(lines)
            fs.appendFile(flags.out, lines, (err) => {
                if (err) throw err;
            })
        })
    });
})