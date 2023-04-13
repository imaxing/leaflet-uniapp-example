export default () => {
  const updateManager = uni.getUpdateManager()
  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: res => {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        res.confirm && updateManager.applyUpdate()
      }
    })
  })

  updateManager.onUpdateFailed(() => {
    // 新版本下载失败
    uni.showModal({
      title: '更新提示',
      content: '新版本下载失败',
      showCancel: false
    })
  })
  updateManager.onCheckForUpdate(res => {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate ? '有新版本' : '无新版本')
  })
}
