const os = require('os');
const systemUptime = os.uptime();
console.log(systemUptime); //output : 51787.906
// indicates how long the system has been running since its last boot (gives in sconds)
// 51787.906 is the number of seconds, my system has been running since it was last rebooted

console.log(os.userInfo()); //gives the information about the current user 
// output:
// {
//     uid: -1,
//     gid: -1,
//     username: 'device_username',
//     homedir: 'home/directory/path',
//     shell: null
//   }

console.log(os.type()); //return operating system's name like window

let otherInfo ={
    name: os.type(),
    release: os.release(),
    totalMem :os.totalmem(),
    freeMem : os.freemem()
}
console.log(otherInfo);
//output:
// {
//     name: 'Windows_NT',
//     release: '10.0.19045',
//     totalMem: 4100182016,
//     freeMem: 463257600
//   }

