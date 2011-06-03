Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function(options) {
        datetimePicker = new Ext.ux.DateTimePicker({
            useTitles: true,
			id:'dt',
            value: {
                day: 23,
                month: 2,
                year: 2000,
				hour:13,
				minute:45
            },
			listeners:{
				"hide":function(picker){
					console.info(picker.getValue());
				}
			}
        });
        
        var panel = new Ext.Panel({
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            items: [{
                xtype: 'button',
                ui: 'normal',
                text: 'Show DateTimePicker',
                handler: function() {
					datetimePicker.show();
                }
            }]
        });
    }
});