pcc.views.MyCalls = Ext.extend(Ext.Panel, {
    layout: 'card',
    
    initComponent: function(){
        this.storeTest={"Recent":2,"AllOpen":2,"Closed":2,"All":2};  
        this.form=new Ext.form.FormPanel({
                        title: 'My Calls',
                        dockedItems: [{
                            xtype: 'toolbar',
                            title: 'My Calls',
                            items:[{
                                xtype: 'spacer'
                            }, {
                                xtype: 'spacer'
                            }, {
                                iconMask: true,
                                iconAlign: 'right',
                                iconCls: 'add',
                                listeners: {
                                    tap: {fn: this.onAddTicket, scope: this}    
                                }
                            }]
                        }],
                        items: [{
                                xtype: 'displayfield',
                                name: 'Scheduled',
                                label: 'Scheduled',
                                autoCapitalize: false,
                                value: this.storeTest.Recent,
                                listeners: {
                                    displaytap: {fn: this.onSelect, scope: this}    
                                }
                            },{
                                xtype: 'displayfield',
                                name: 'Complete',
                                label: 'Complete',
                                autoCapitalize: false,
                                value: this.storeTest.AllOpen,
                                listeners: {
                                    displaytap: {fn: this.onSelect, scope: this}   
                                }
                            },{
                                xtype: 'displayfield',
                                name: 'Remaining',
                                label: 'Remaining',
                                autoCapitalize: false,
                                value: this.storeTest.Closed,
                                listeners: {
                                    displaytap: {fn: this.onSelect, scope: this}   
                                }
                            },{
                                xtype: 'displayfield',
                                name: 'Incomplete',
                                label: 'Incomplete',
                                autoCapitalize: false,
                                value: this.storeTest.All,
                                listeners: {
                                    displaytap: {fn: this.onSelect, scope: this}   
                                }
                            }]
                    });
        
            
        this.items = this.form;
        
        
        pcc.views.MyCalls.superclass.initComponent.call(this);
    },
    onSelect: function(o, v){
            var openedTickets = new pcc.views.Tickets({
                prevCard: this.form,
                newTitle: o
            });
            this.setActiveItem(openedTickets, 'slide');

    },
    onAddTicket: function(button, event){
            var addTickets = new pcc.views.Add({
                prevCard: this.form
            });
            this.setActiveItem(addTickets, 'slide');

    }
    
});

Ext.reg('mycalls', pcc.views.MyCalls);
Ext.regModel('Tickets', {
        idProperty:'CompanyID',
        fields: [{name:'CompanyID', type:'int'},{name:'CompanyName', type:'string'}]
      });
var ticketTypeValue='';
pcc.views.Tickets = Ext.extend(Ext.Panel, {
    layout: 'card',
    
    initComponent: function(){
        
        
        var toolbarBase = {
            xtype: 'toolbar',
            title: this.newTitle
        };
        
        if (this.prevCard !== undefined) {
            toolbarBase.items = [{
                ui: 'back',
                text: this.prevCard.title,
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
                }
            }]
        }
       
       
        this.tickets=new Ext.data.Store({
            model  : 'Tickets',
            proxy: 
            {
               type:'ajax',
               url:'ws/Service.asmx/GetTickets',
               reader:{
                 type:'json',
                 root:'d.rows',
                 totalProperty: 'd.totalRows'
               }
               ,headers: { 'Content-Type': 'application/json; charset=utf-8;'}
            }
//            ,getGroupString: function(r){
//                return r.get('CompanyName')[0]
//            }
       });
        
        this.on('activate', this.checkActiveDate, this);
        
        this.groupingBase = {
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
        
        this.customerList = new Ext.List(Ext.apply(this.groupingBase, {
            fullscreen: true
        }));
        this.items=this.customerList;
                
        this.dockedItems = toolbarBase;
        
        pcc.views.Tickets.superclass.initComponent.call(this);
    },
    checkActiveDate: function(){ 
        if(ticketTypeValue!=this.newTitle) 
        {
            ticketTypeValue=this.newTitle; 
            //alert(ticketTypeValue);
            this.tickets.load({params: {'ticketType': '\''+ticketTypeValue+'\''}});
        }
    }
    
});

Ext.reg('Tickets', pcc.views.Tickets);

pcc.views.TicketTimer = Ext.extend(Ext.Panel, {
    initComponent: function(){
        this.datetimeStart = new Ext.ux.DateTimePicker({
            useTitles: true,
			id:'dtStart',
			listeners:{
				"hide":{fn: this.onTimeStartHide, scope: this}
			}
        });
        this.datetimeEnd = new Ext.ux.DateTimePicker({
            useTitles: true,
			id:'dtEnd',
			listeners:{
				"hide":{fn: this.onTimeStopHide, scope: this}
			}
        });
        
        this.TimeItems=[{       xtype: 'displayfield',
                                id: 'startTime',
                                label: 'Start Time',
                                autoCapitalize: false,
                                value: '',
                                listeners: {
                                    displaytap: {fn: this.onTimeStart, scope: this}   
                                }
                            },{ xtype: 'displayfield',
                                id: 'endTime',
                                label: 'Stop Time',
                                autoCapitalize: false,
                                value: '',
                                listeners: {
                                    displaytap: {fn: this.onTimeStop, scope: this}   
                                }
                            }];
        this.items=this.TimeItems;
    },
    onTimeStartHide: function(picker){
		this.datetimeStart.setValue(picker.getValue().format('m/d/y  h:i a'));
	},
    onTimeStopHide: function(picker){
		this.datetimeStop.setValue(picker.getValue().format('m/d/y  h:i a'));
	},
    onTimeStart: function(o, v){
        if(v=='')
        { 
           var date=new Date();
           var values={'relativeFormat': new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0),'hour':date.getHours(),'minute':date.getMinutes()}
          
           this.datetimeStart.setValue(values,false);
           this.datetimeStart.show();
        }
        else
        {
            this.datetimeStart.show();
        }
    },
    onTimeStop: function(o, v){
        if(v=='')
        { 
           var date=new Date();
           var values={'relativeFormat': new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0),'hour':date.getHours(),'minute':date.getMinutes()}
          
           this.datetimeEnd.setValue(values,false);
           this.datetimeEnd.show();
        }
        else
        {
            this.datetimeEnd.show();
        }
    }


});
Ext.reg('TicketTimer', pcc.views.TicketTimer);

pcc.views.TicketDetail = Ext.extend(Ext.form.FormPanel, {
    layout: 'card',
    
    initComponent: function(){
        
        this.storeTest={"Client":"client","Description":"description","Time":[{"startTime":new Date(),"endTime":new Date()},{"startTime":new Date(),"endTime":new Date()},{"startTime":new Date(),"endTime":new Date()}]};  
        var toolbarBase = {
            xtype: 'toolbar',
            title: this.storeTest.Client
        };
        
        if (this.prevCard !== undefined) {
            toolbarBase.items = [{
                ui: 'back',
                text: this.prevCard.title,
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
                }
            }]
        }
        
        this.tTimer1 = new pcc.views.TicketTimer();
        
        this.PanelControl=new Ext.Panel({
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1
            },
            items: [{
                        xtype : 'textareafield',
                        name  : 'tbdescription',
                    placeHolder: 'Work Details',
                        value: this.storeTest.Description,
                        maxLength : 500,
                        maxRows : 10,
                        required: true
                    }]
        });
                   
        this.items=this.PanelControl;
                
        this.dockedItems = toolbarBase;
        
        pcc.views.TicketDetail.superclass.initComponent.call(this);
    }
    
});

Ext.reg('TicketDetail', pcc.views.TicketDetail);

pcc.views.Add = Ext.extend(Ext.form.FormPanel, {
    layout: 'card',
    id:'AddPanel',
    initComponent: function(){
        this.setWidth("100%");
        this.ClientStore = new Ext.data.Store({
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
            autoLoad:true
          });

//	var companyDropDown = {
//	                    flex:0,
//                        xtype: 'selectfield',
//                        name : 'company',
//                        valueField : 'CompanyID',
//                        displayField : 'CompanyName',
//                        store : this.ClientStore,
//                placeHolder: 'Client'
//                    };

        
        
        
        var toolbarBase = {
            xtype: 'toolbar',
            title: 'Add'
        };
        
        if (this.prevCard !== undefined) {
            toolbarBase.items = [{
                ui: 'back',
                text: 'Back',
                scope: this,
                handler: function(){
                    this.ownerCt.setActiveItem(this.prevCard, {
                        type: 'slide',
                        reverse: true,
                        scope: this,
                        after: function(){
                            this.destroy();
                        }
                    });
                }
            },{
                                xtype: 'spacer'
                            },{
                                xtype: 'spacer'
                            },
            {
            text: 'Save',
            ui: 'action',
            scope : this,
            handler: function() {
                var alertText='';
                if(Ext.getCmp('tbcompany').getValue()=='')
                    alertText='Please select a client.  ';
                if(Ext.getCmp('tbdescription').getValue()=='')
                    alertText+='Please create a title';
                if(alertText=='')
                {
                    var openedTickets = new pcc.views.TicketDetail({
                        prevCard: this.prevCard,
                        ticketID: Ext.getCmp('tbcompany').getValue()
                    });
                    this.ownerCt.setActiveItem(openedTickets, 'slide');
                }
                else
                    alert(alertText);
//            if (!this.actions) {
//                        this.actions = new Ext.ActionSheet({
//                            items: [{
//                                text: 'Close Ticket',
//                                ui: 'decline',
//                                handler : Ext.emptyFn
//                            },{
//                                text : 'Cancel',
//                                scope : this,
//                                handler : function(){
//                                    this.actions.hide();
//                                }
//                            }]
//                        });
//                    }
//                    this.actions.show();
                }
            }
          ]
        }

//        this.TimePanel = new Ext.Panel({
//            items: [{
//                                xtype: 'displayfield',
//                                id: 'startTime',
//                                label: 'Start Time',
//                                autoCapitalize: false,
//                                margin:'0',
//                                value: '',
//                                listeners: {
//                                    displaytap: {fn: this.onTimeStart, scope: this}   
//                                }
//                            },{
//                                xtype: 'displayfield',
//                                id: 'endTime',
//                                label: 'Stop Time',
//                                autoCapitalize: false,
//                                width:'100%',
//                                value: '',
//                                listeners: {
//                                    displaytap: {fn: this.onTimeStop, scope: this}   
//                                }
//                            }]
//        });
//        
//        this.timeCarousel= new Ext.Carousel({
//            items: [this.TimePanel]
//        });
//        this.description=[{
//	                            flex:0,
//                                xtype: 'displayfield',
//                                id: 'startTime',
//                                label: 'Start Time',
//                                autoCapitalize: false,
//                                margin:'0',
//                                value: '',
//                                listeners: {
//                                    displaytap: {fn: this.onTimeStart, scope: this}   
//                                }
//                            },{
//	                            flex:0,
//                                xtype: 'displayfield',
//                                id: 'endTime',
//                                label: 'Stop Time',
//                                autoCapitalize: false,
//                                width:'100%',
//                                value: '',
//                                listeners: {
//                                    displaytap: {fn: this.onTimeStop, scope: this}   
//                                }
//                            },{
//	                    flex:0,
//                        xtype: 'selectfield',
//                        name : 'company',
//                        valueField : 'CompanyID',
//                        displayField : 'CompanyName',
//                        store : this.ClientStore,
//                placeHolder: 'Client'
//                    },{
//                        xtype : 'textareafield',
//                        name  : 'tbdescription',
//                    placeHolder: 'Work Details',
//                        maxLength : 500,
//                        maxRows : 10,
//                        required: true
//                    }];

 this.PanelControl=new Ext.Panel({
            fullscreen: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                flex: 1
            },
            items: [{
	                    flex:0,
                        xtype: 'selectfield',
                        id : 'tbcompany',
                        valueField : 'CompanyID',
                        displayField : 'CompanyName',
                        store : this.ClientStore,
                        placeHolder: 'Client'
                    },{
                        xtype : 'textareafield',
                        id  : 'tbdescription',
                        placeHolder: 'Problem Title',
                        maxLength : 200,
                        maxRows : 5,
                        required: true
                    }]
        });
                   
        this.items=this.PanelControl;
        
        this.dockedItems = toolbarBase;
        
        //this.items.add(timeCarousel);
        
        pcc.views.Add.superclass.initComponent.call(this);
    }
});

Ext.reg('Add', pcc.views.Add);