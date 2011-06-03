Ext.form.DisplayField = Ext.extend(Ext.form.Field,  {
     /**
     * Set to true on all Ext.form.Field subclasses. This is used by {@link Ext.form.FormPanel#getValues} to determine which
     * components inside a form are fields.
     * @property isField
     * @type Boolean
     */
    isField: true,
    
    isFormField : true,
    
    /**
     * @cfg {Boolean/Function/Object} disclosure
     * True to display a disclosure icon on each list item.
     * This is just to show the disclosure icon to indicate a list is associated with the displayfield
     */
    disclosure : true,
    
    /**
     * @cfg {String} disclosureCls The CSS class to use to change disclosure icon image and its properties)
     */
    disclosureCls : 'x-field-disclosure',
     /**
     * @cfg {String} inputCls Overrides {@link Ext.form.Field}'s inputCls. Defaults to 'x-slider'
     */
    inputCls: 'x-displayfield',
    
    initComponent : function() {
        this.addEvents('displaytap');
        Ext.form.DisplayField.superclass.initComponent.call(this);
      
    },
    
    afterRender: function() {
        Ext.form.DisplayField.superclass.afterRender.call(this);
        this.mon(this.el, {
            tap: this.onTap,
            scope: this
        });
        if(this.disclosure){
          this.tagspec = {tag : 'div',cls : 'x-disclosure '+this.disclosureCls}
          Ext.DomHelper.insertAfter(this.fieldEl,this.tagspec);
        }
    },
    
   
    onTap : function(e){
        this.fireEvent('displaytap',this.label,this.getValue());
    },
    
    /**
     * True to set the field DOM element autocorrect attribute to "on", false to set to "off". Defaults to undefined, leaving the attribute unset.
     * @cfg {Boolean} autoCorrect
     */

    renderTpl: [
        '<tpl if="label">',
            '<label <tpl if="fieldEl">for="{inputId}"</tpl> class="x-form-label"><span>{label}</span></label>',
        '</tpl>',
        '<tpl if="fieldEl">',
            '<div id="{inputId}" name="{name}"  class="x-field-clear-container {fieldCls}"',
            '<tpl if="style">style="{style}" </tpl>',
        '></div></tpl>',
        '<div class="x-field-mask"></div>'
    ],
    
    
    /**
     * Returns the normalized data value (undefined or emptyText will be returned as '').  To return the raw value see {@link #getRawValue}.
     * @return {Mixed} value The field value
     */
    getValue : function(){
        if (!this.rendered || !this.fieldEl) {
           
            return this.dom.innerHTML;
        }
        
        return this.fieldEl.dom.innerHTML || '';
    },

    /**
     * Sets a data value into the field and validates it.  To set the value directly without validation see {@link #setRawValue}.
     * @param {Mixed} value The value to set
     * @return {Ext.form.DisplayField} this
     */
    setValue : function(v){
        this.value = v;
        if (this.rendered && this.fieldEl) {
            this.fieldEl.dom.innerHTML = (Ext.isEmpty(v) ? '' : v);
        }
        return this;
    }
});

Ext.reg('displayfield', Ext.form.DisplayField);

Ext.ns('pcc.views','Ext.ux');

Ext.setup({
    onReady: function(){
    
        
        var wrapper = new Ext.TabPanel({
        
    cardSwitchAnimation: false,
                id   : 'tabs',
            fullscreen: true,
            tabBar: {
                dock: 'bottom',
                layout: {
                    pack: 'center'
                }
            },
            items: [{
                title: 'My Calls',
                iconCls: 'time',
                xtype: 'mycalls'
            }, Customers, Bulletins, Ranking, Settings
            ]
        });
    }
});
