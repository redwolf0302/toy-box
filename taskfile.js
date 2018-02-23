/**
 * taskr编译文件
 */
const notifier = require('node-notifier');

export async function compile(task) {
    await task.parallel(['bin', 'lib']);
}

export async function bin(task, opts) {
    await task.source(opts.src || 'bin/*').babel().target('dist/bin', {mode: '0755'});
    notify('Compiled bin files')
}

export async function lib(task, opts) {
    await task.source(opts.src || 'lib/**/*.js').babel().target('dist/lib');
    notify('Compiled lib files');
}

/**
 * 构建任务
 * @param task
 * @returns {Promise<void>}
 */
export async function build(task) {
    await task.serial(['compile'])
}

//默认的任务
export default async function (task) {
    await task.start('build');
    await task.watch('bin/*', 'bin');
    await task.watch('lib/**/*.js', 'lib');
}

export async function release(task) {
    await task.clear('dist').start('build')
}

function notify(msg) {
    return notifier.notify({
        title: 'ToyBox',
        message: msg,
        icon: false
    })
}