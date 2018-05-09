const os=require('os');
/**
 * 获取服务器端信息
 */
class Info {
    /**
     * 构造函数
     */
    constructor() {

    }

    /**
     * 获取cpu(处理器架构)
     * @return {String}
     */
    getCpuF() {
        let arch=os.arch();
        console.log(arch);
        return arch;
    }

    /**
     * 获取cpu信息
     * @return {String}
     */
    getCpu() {
        let cpus=os.cpus();
        console.log(cpus);
        return cpus;
    }

    /**
     * 字节顺序 高位优先返回BE,低位优先的返回LE
     * @return {String}
     */
    getByteSort() {
        let endianness=os.endianness();
        console.log(endianness);
        return endianness;
    }


    /**
     * 空闲内存字节
     * @return {String}
     */
    getFreeMemory() {
        let freemem=os.freemem();
        console.log(freemem);
        return freemem;
    }

    /**
     * 当前登录用户的根目录
     * @return {String}
     */
    getHomeDir() {
        let homedir=os.homedir();
        console.log(homedir);
        return homedir;
    }

    /**
     * 操作系统主机名
     * @return {String}
     */
    getHostName() {
        let hostname=os.hostname();
        console.log(hostname);
        return hostname;
    }
    /**
     * 系统最近5、10、15分钟的平均负载,这是一个针对linux或unix的统计，windows下始终返回[0,0,0]
     * @return {String}
     */
    getLoadAvg() {
        let loadavg=os.loadavg();
        console.log(loadavg);
        return loadavg;
    }
    /**
     * 网络配置列表
     * @return {String}
     */
    getNetworkSetting() {
        let networkInterfaces=os.networkInterfaces();
        console.log(networkInterfaces);
        return networkInterfaces;
    }

    /**
     * 操作系统类型,返回值有'darwin', 'freebsd', 'linux', 'sunos' , 'win32'
     * @return {String}
     */
    getOsType() {
        let platform=os.platform();
        console.log(platform);
        return platform;
    }

    /**
     * 操作系统版本
     * @return {String}
     */
    getOsVersion() {
        let release=os.release();
        console.log(release);
        return release;
    }

    /**
     * 操作系统临时文件的默认目录
     * @return {String}
     */
    getTmpDir() {
        let tmpdir=os.tmpdir();
        console.log(tmpdir);
        return tmpdir;
    }

    /**
     * 系统总内存
     * @return {String}
     */
    getTotalMemory() {
        let totalmem=os.totalmem();
        console.log(totalmem);
        return totalmem;
    }

    /**
     * 操作系统名称，基于linux的返回linux,基于苹果的返回Darwin,基于windows的返回Windows_NT
     * @return {String}
     */
    getOsName() {
        let type=os.type();
        console.log(type);
        return type;
    }
    /**
     * 计算机正常运行时间
     * @return {String}
     */
    getOsRunTime() {
        let uptime=os.uptime();
        console.log(uptime);
        return uptime;
    }
}
module.exports = Info;
