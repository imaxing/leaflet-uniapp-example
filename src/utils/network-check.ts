export default (): Promise<boolean> => {
  return new Promise(resolve => {
    uni.getNetworkType({
      success: ({ networkType }) => {
        // 返回网络类型 2g，3g，4g，wifi, none(没有网络连接), unknown(未知的网络类型)
        if (networkType === 'none' || networkType === 'unknown') {
          uni.showModal({
            title: '提示',
            content:
              networkType === 'none'
                ? '没有网络连接,请检查您的网络设置'
                : networkType === 'unknown'
                ? '未知的网络类型,请检查您的网络设置'
                : '',
            showCancel: false
          })
          resolve(false)
        } else {
          resolve(true)
        }
      }
    })
  })
}
