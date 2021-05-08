const bTroll = artifacts.require('bTroll')
//const RINKEBY_KEYHASH = '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311'
module.exports = async (deployer, network, [defaultAccount]) => {
  // hard coded for rinkeby
  if (network.startsWith('rinkeby')) {
    await deployer.deploy(bTroll, RINKEBY_KEYHASH)
    //let bt = await bTroll.deployed()
  } else {
    console.log("Right now only rinkeby works! Please change your network to Rinkeby")
  }
}