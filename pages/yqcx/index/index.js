// pages/yqcx/index/index.js
import $ from '../../../common/common.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    customersArray: [],
    hasCustomer: true,
    falseMessage: '此客户无逾期记录',
    depart_id: 0,
    company_name: '万盈鹏辉企业管理',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      company_name: options.company_name
    });
    wx.setNavigationBarTitle({
      title: options.company_name,
    })
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
    console.log(this.data.customersArray);
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
  
  bindSearch: function () {
    console.log(this.data.inputValue);
    var that = this;
    if (this.data.inputValue) {
      $.post(
        'index.php?m=wxapp&c=yuqi&a=searchYuqiByName',
        {
          customerName: this.data.inputValue,
          sessionKey: wx.getStorageSync('sessionKey'),
        },
        function (res) {
          console.log(res.data);
          if(res.data.status == 0) {
            that.setData({
              hasCustomer: false,
              falseMessage: res.data.message,
            });
          }else {
            that.setData({
              hasCustomer: true,
              customersArray: res.data.customers,
              depart_id: res.data.depart_id,
            });
          }
        }
      );
    }
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  bindLoan: function (e) {
    var customer_id = e.currentTarget.dataset.id;
    var countLoans = e.currentTarget.dataset.count;
    var loan_id = e.currentTarget.dataset.loan_id;
    console.log(e.currentTarget.dataset);
    if (countLoans > 1) {
      wx.navigateTo({
        url: '../loans/loans?customer_id=' + customer_id,
      })
    }else {
      wx.navigateTo({
        url: '../value/value?loan_id=' + loan_id + '&customer_id=' + customer_id,
      })
    }
  }
})