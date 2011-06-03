/*
 SETTINGS UI
 */
var doSaveSettings = function(){
    //display Loading indicator to user
    mainPanel.setLoading(true, false);
    var myparams1 = new Object();
    
    myparams1.username = Settings.getValues().Username;
    myparams1.password = Settings.getValues().Password;
    Ext.Ajax.request({
        url: 'ws/Authentication.asmx/SaveSettings',
        method: 'post',
        params: myparams1 //,headers:{'Content-Type':'application/json;charset=utf-8'}   
        ,
        success: function(response, options){
            //AF.myReq = response;
            //AF.myOptions = options;
            //alert(response.responseText);
            mainPanel.setLoading(false);
            //AF.myReqDecoded = Ext.decode(response.responseText);
        },
        failure: function(response, options){
            //alert(response.responseText);
            mainPanel.setLoading(false);
        }
    });
}
