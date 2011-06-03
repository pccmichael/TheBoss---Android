Ext.regModel('Company', {
        idProperty:'CompanyID',
        fields: [{name:'CompanyID', type:'int'},{name:'CompanyName', type:'string'}]
      });
      
var store = new Ext.data.Store({
        model  : 'Company',
        proxy: 
        {
           type:'ajax',
           url:'ws/Service.asmx/GetCompanies',
           reader:{
             type:'json',
             root:'d.rows',
             totalProperty: 'd.totalRows'
           }
           ,headers: { 'Content-Type': 'application/json; charset=utf-8;'}
        },
        autoLoad:true,
        getGroupString: function(r){
            return r.get('CompanyName')[0]
        }
      });

var groupingBase = {
    itemTpl: '<div class="contact2"><strong>{CompanyName}</strong></div>',
    selModel: {
        mode: 'SINGLE',
        allowDeselect: true
    },
    grouped: true,
    indexBar: true,
    
    onItemDisclosure: {
        scope: 'test',
        handler: function(record, btn, index){
            alert('Disclose more info for ' + record.get('CompanyID'));
        }
    },
    store: store
};
var customerList = new Ext.List(Ext.apply(groupingBase, {
    fullscreen: true
}));
var customerListPanel = new Ext.Panel({
    layout: 'card',
    items: [customerList],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        
        items: [{
            xtype: 'spacer'
        }, {
            xtype: 'textfield',
            placeHolder: 'Search...',
            listeners: {
                scope: this,
                
                keyup: function(field){
                    var value = field.getValue();
                    
                    if (!value) {
                        store.filterBy(function(){
                            return true;
                        });
                    }
                    else {
                        var searches = value.split(' '), regexps = [], i;
                        
                        for (i = 0; i < searches.length; i++) {
                            if (!searches[i]) 
                                return;
                            regexps.push(new RegExp(searches[i], 'i'));
                        };
                        
                        store.filterBy(function(record){
                            var matched = [];
                            
                            for (i = 0; i < regexps.length; i++) {
                                var search = regexps[i];
                                
                                if (record.get('CompanyName').match(search) || record.get('CompanyName').match(search)) 
                                    matched.push(true);
                                else 
                                    matched.push(false);
                            };
                            
                            if (regexps.length > 1 && matched.indexOf(false) != -1) {
                                return false;
                            }
                            else {
                                return matched[0];
                            }
                        });
                    }
                }
            }
        }, {
            xtype: 'spacer'
        }]
    }]
})
var Customers = new Ext.Panel({
                layout: 'card',
                iconCls: 'team',
                title: 'Customers',
    items: [customerListPanel],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'light',
        title: 'Customers',
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
