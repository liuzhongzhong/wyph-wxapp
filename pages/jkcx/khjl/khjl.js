// pages/jkcx/khjl/khjl.js
import $ from '../../../common/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loan_id : 0,
    staff : [],
    latitude: 1000,
    longitude: 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      loan_id : options.loan_id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    $.post(
      'index.php?m=wxapp&c=loan&a=getLoanStaffInfo',
      {
        loan_id: this.data.loan_id,
      },
      function (res) {
        console.log(res.data);
        if (res.data.status == 1) {
          that.setData({
            staff: res.data.staff,
            longitude: res.data.latitude,
            latitude: res.data.longitude,
          });
        }
      }
    );
  },

  bindAddress: function (e) {
    console.log(this.data);
    if (this.data.latitude != 1000 || this.data.longitude != 1000) {
      wx.openLocation({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        scale: 12
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  bindPhone: function (e) {
    wx.makePhoneCall({
      phoneNumber: this.data.customer.phone,
    })
  },
})