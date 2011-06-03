var Settings = new Ext.form.FormPanel({
                iconCls: 'settings',
                title: 'Settings',
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Settings',
        ui: 'light'
    }],
    items: [{
        xtype: 'fieldset',
        id: 'loginFormSet',
        title: '',
        items: [{
            xtype: 'textfield',
            placeHolder: 'Username',
            name: 'Username',
            id: 'Username',
            required: true
        }, {
            xtype: 'passwordfield',
            placeHolder: 'Password',
            name: 'Password',
            required: true
        }, {
            xtype: 'button',
            text: 'Save Settings',
            ui: 'confirm',
            style: 'margin:2%;',
            handler: function(){
				localStorage.setItem("userId","pccmichael");
				localStorage.setItem("userPassword","password");
				alert(localStorage.getItem("userID"))
            }
        }]
    }]
});
