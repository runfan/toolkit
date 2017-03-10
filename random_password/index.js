const args = require('args')
const crypto = require('crypto')

args
    .option('length', '随机数长度')
//   .option('reload', 'Enable/disable livereloading')
//   .command('serve', 'Serve your static site', ['s'])

const flags = args.parse(process.argv)

// console.log(opts)
function rstr(length) {
    return crypto
        .randomBytes(length)
        .toString('base64')
}
if (!flags.length) {
    [6, 12, 24, 48].forEach((length) => {
        var random = rstr(length)
        console.log(random.length, random);
    })
} else {
    var random = rstr(flags.length)
    console.log(random.length, random);
}


