var BulletinStore = new Ext.data.JsonStore({
    // Load data at once
    autoLoad: true,
    // Override default http proxy settings
    proxy: new Ext.data.HttpProxy({
        // Call web service method using GET syntax
        url: 'ws/Service.asmx/GetAgents',
        // Ask for Json response
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    }),
    // Root variable 
    //root: 'd',
    // Fields declaration
    fields: ['FirstName', 'LastName'],
    listeners: {
        load: function(){
            //alert(store.data);
        }
    }

});
Ext.regModel('Agents', {
    fields: ['FirstName', 'LastName']
});
Ext.regModel('Contact', {
    fields: ['FirstName', 'LastName']
});
var mystore = new Ext.data.JsonStore({
    model: 'Contact',
    sorters: 'LastName',
    getGroupString: function(record){
        return record.get('LastName')[0];
    },
    data: [{
        FirstName: 'Tommy',
        LastName: 'Maintz'
    }, {
        FirstName: 'Rob',
        LastName: 'Dougan'
    }, {
        FirstName: 'Ed',
        LastName: 'Spencer'
    }, {
        FirstName: 'Jamie',
        LastName: 'Avins'
    }, {
        FirstName: 'Aaron',
        LastName: 'Conran'
    }, {
        FirstName: 'Dave',
        LastName: 'Kaneda'
    }, {
        FirstName: 'Michael',
        LastName: 'Mullany'
    }, {
        FirstName: 'Abraham',
        LastName: 'Elias'
    }, {
        FirstName: 'Jay',
        LastName: 'Robinson'
    }, {
        FirstName: 'Tommy',
        LastName: 'Maintz'
    }, {
        FirstName: 'Rob',
        LastName: 'Dougan'
    }, {
        FirstName: 'Ed',
        LastName: 'Spencer'
    }, {
        FirstName: 'Jamie',
        LastName: 'Avins'
    }, {
        FirstName: 'Aaron',
        LastName: 'Conran'
    }, {
        FirstName: 'Dave',
        LastName: 'Kaneda'
    }, {
        FirstName: 'Michael',
        LastName: 'Mullany'
    }, {
        FirstName: 'Abraham',
        LastName: 'Elias'
    }, {
        FirstName: 'Jay',
        LastName: 'Robinson'
    }]
});
var groupingBase = {
    itemTpl: '<div class="contact2"><strong>{FirstName}</strong> {LastName}</div>',
    selModel: {
        mode: 'SINGLE',
        allowDeselect: true
    },
    grouped: true,
    indexBar: false,
    
    onItemDisclosure: {
        scope: 'test',
        handler: function(record, btn, index){
            alert('Disclose more info for ' + record.get('FirstName'));
        }
    },
	plugins: [{
                ptype: 'listpaging',
                autoPaging: false
            }, {
                ptype: 'pullrefresh'
            }],
    store: BulletinStore
};
var BulletinList = new Ext.List(Ext.apply(groupingBase, {
    fullscreen: true
}));
var BulletinListPanel = new Ext.Panel({
    items: [BulletinList]
})
var Bulletins = new Ext.Panel({
                iconCls: 'bookmarks',
                title: 'Bulletin',
    items: [BulletinListPanel],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'light',
        title: 'Bulletins',
        items: [{
            xtype: 'spacer'
        }, {
            xtype: 'spacer'
        }, {
            iconMask: true,
            iconAlign: 'right',
            iconCls: 'add'
        }]
    }]
});
