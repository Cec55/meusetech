/*!
 ColVis 1.1.2
 ©2010-2015 SpryMedia Ltd - datatables.net/license
*/
!function(t,n,s){t=function(t){var o=function(n,s){(!this.CLASS||"ColVis"!=this.CLASS)&&alert("Warning: ColVis must be initialised with the keyword 'new'"),"undefined"==typeof s&&(s={});var i=t.fn.dataTable.camelToHungarian;return i&&(i(o.defaults,o.defaults,!0),i(o.defaults,s)),this.s={dt:null,oInit:s,hidden:!0,abOriginal:[]},this.dom={wrapper:null,button:null,collection:null,background:null,catcher:null,buttons:[],groupButtons:[],restore:null},o.aInstances.push(this),this.s.dt=t.fn.dataTable.Api?new t.fn.dataTable.Api(n).settings()[0]:n,this._fnConstruct(s),this};return o.prototype={button:function(){return this.dom.wrapper},fnRebuild:function(){this.rebuild()},rebuild:function(){for(var t=this.dom.buttons.length-1;t>=0;t--)this.dom.collection.removeChild(this.dom.buttons[t]);this.dom.buttons.splice(0,this.dom.buttons.length),this.dom.groupButtons.splice(0,this.dom.groupButtons.length),this.dom.restore&&this.dom.restore.parentNode(this.dom.restore),this._fnAddGroups(),this._fnAddButtons(),this._fnDrawCallback()},_fnConstruct:function(s){this._fnApplyCustomisation(s);var o,i,e=this;for(this.dom.wrapper=n.createElement("div"),this.dom.wrapper.className="ColVis",this.dom.button=t("<button />",{"class":this.s.dt.bJUI?"ColVis_Button ColVis_MasterButton ui-button ui-state-default":"ColVis_Button ColVis_MasterButton"}).append("<span>"+this.s.buttonText+"</span>").bind("mouseover"==this.s.activate?"mouseover":"click",function(t){t.preventDefault(),e._fnCollectionShow()}).appendTo(this.dom.wrapper)[0],this.dom.catcher=this._fnDomCatcher(),this.dom.collection=this._fnDomCollection(),this.dom.background=this._fnDomBackground(),this._fnAddGroups(),this._fnAddButtons(),o=0,i=this.s.dt.aoColumns.length;i>o;o++)this.s.abOriginal.push(this.s.dt.aoColumns[o].bVisible);this.s.dt.aoDrawCallback.push({fn:function(){e._fnDrawCallback.call(e)},sName:"ColVis"}),t(this.s.dt.oInstance).bind("column-reorder.dt",function(t,n,s){for(o=0,i=e.s.aiExclude.length;i>o;o++)e.s.aiExclude[o]=s.aiInvertMapping[e.s.aiExclude[o]];t=e.s.abOriginal.splice(s.iFrom,1)[0],e.s.abOriginal.splice(s.iTo,0,t),e.fnRebuild()}),t(this.s.dt.oInstance).bind("destroy.dt",function(){t(e.dom.wrapper).remove()}),this._fnDrawCallback()},_fnApplyCustomisation:function(n){t.extend(!0,this.s,o.defaults,n),!this.s.showAll&&this.s.bShowAll&&(this.s.showAll=this.s.sShowAll),!this.s.restore&&this.s.bRestore&&(this.s.restore=this.s.sRestore);var n=this.s.groups,s=this.s.aoGroups;if(n)for(var i=0,e=n.length;e>i;i++)n[i].title&&(s[i].sTitle=n[i].title),n[i].columns&&(s[i].aiColumns=n[i].columns)},_fnDrawCallback:function(){for(var n,o=this.s.dt.aoColumns,i=this.dom.buttons,e=this.s.aoGroups,l=0,a=i.length;a>l;l++)n=i[l],n.__columnIdx!==s&&t("input",n).prop("checked",o[n.__columnIdx].bVisible);for(i=0,n=e.length;n>i;i++){t:{for(var l=e[i].aiColumns,a=0,u=l.length;u>a;a++)if(!1===o[l[a]].bVisible){l=!1;break t}l=!0}if(l)t("input",this.dom.groupButtons[i]).prop("checked",!0),t("input",this.dom.groupButtons[i]).prop("indeterminate",!1);else{t:{for(l=e[i].aiColumns,a=0,u=l.length;u>a;a++)if(!0===o[l[a]].bVisible){l=!1;break t}l=!0}l?(t("input",this.dom.groupButtons[i]).prop("checked",!1),t("input",this.dom.groupButtons[i]).prop("indeterminate",!1)):t("input",this.dom.groupButtons[i]).prop("indeterminate",!0)}}},_fnAddGroups:function(){var t;if("undefined"!=typeof this.s.aoGroups)for(var n=0,s=this.s.aoGroups.length;s>n;n++)t=this._fnDomGroupButton(n),this.dom.groupButtons.push(t),this.dom.buttons.push(t),this.dom.collection.appendChild(t)},_fnAddButtons:function(){var n,s=this.s.dt.aoColumns;if(-1===t.inArray("all",this.s.aiExclude))for(var o=0,i=s.length;i>o;o++)-1===t.inArray(o,this.s.aiExclude)&&(n=this._fnDomColumnButton(o),n.__columnIdx=o,this.dom.buttons.push(n));"alpha"===this.s.order&&this.dom.buttons.sort(function(t,n){var o=s[t.__columnIdx].sTitle,i=s[n.__columnIdx].sTitle;return o===i?0:i>o?-1:1}),this.s.restore&&(n=this._fnDomRestoreButton(),n.className+=" ColVis_Restore",this.dom.buttons.push(n)),this.s.showAll&&(n=this._fnDomShowXButton(this.s.showAll,!0),n.className+=" ColVis_ShowAll",this.dom.buttons.push(n)),this.s.showNone&&(n=this._fnDomShowXButton(this.s.showNone,!1),n.className+=" ColVis_ShowNone",this.dom.buttons.push(n)),t(this.dom.collection).append(this.dom.buttons)},_fnDomRestoreButton:function(){var n=this;return t('<li class="ColVis_Special '+(this.s.dt.bJUI?"ui-button ui-state-default":"")+'">'+this.s.restore+"</li>").click(function(){for(var t=0,s=n.s.abOriginal.length;s>t;t++)n.s.dt.oInstance.fnSetColumnVis(t,n.s.abOriginal[t],!1);n._fnAdjustOpenRows(),n.s.dt.oInstance.fnAdjustColumnSizing(!1),n.s.dt.oInstance.fnDraw(!1)})[0]},_fnDomShowXButton:function(n,s){var o=this;return t('<li class="ColVis_Special '+(this.s.dt.bJUI?"ui-button ui-state-default":"")+'">'+n+"</li>").click(function(){for(var t=0,n=o.s.abOriginal.length;n>t;t++)-1===o.s.aiExclude.indexOf(t)&&o.s.dt.oInstance.fnSetColumnVis(t,s,!1);o._fnAdjustOpenRows(),o.s.dt.oInstance.fnAdjustColumnSizing(!1),o.s.dt.oInstance.fnDraw(!1)})[0]},_fnDomGroupButton:function(n){var s=this,o=this.s.aoGroups[n];return t('<li class="ColVis_Special '+(this.s.dt.bJUI?"ui-button ui-state-default":"")+'"><label><input type="checkbox" /><span>'+o.sTitle+"</span></label></li>").click(function(n){var i=!t("input",this).is(":checked");for("li"!==n.target.nodeName.toLowerCase()&&(i=!i),n=0;n<o.aiColumns.length;n++)s.s.dt.oInstance.fnSetColumnVis(o.aiColumns[n],i)})[0]},_fnDomColumnButton:function(n){var s=this,o=this.s.dt.aoColumns[n],i=this.s.dt,o=null===this.s.fnLabel?o.sTitle:this.s.fnLabel(n,o.sTitle,o.nTh);return t("<li "+(i.bJUI?'class="ui-button ui-state-default"':"")+'><label><input type="checkbox" /><span>'+o+"</span></label></li>").click(function(o){var e=!t("input",this).is(":checked");"li"===o.target.nodeName.toLowerCase()||"input"!=o.target.nodeName.toLowerCase()&&null!==s.s.fnStateChange||(e=!e);var l=t.fn.dataTableExt.iApiIndex;t.fn.dataTableExt.iApiIndex=s._fnDataTablesApiIndex.call(s),i.oFeatures.bServerSide?(s.s.dt.oInstance.fnSetColumnVis(n,e,!1),s.s.dt.oInstance.fnAdjustColumnSizing(!1),(""!==i.oScroll.sX||""!==i.oScroll.sY)&&s.s.dt.oInstance.oApi._fnScrollDraw(s.s.dt),s._fnDrawCallback()):s.s.dt.oInstance.fnSetColumnVis(n,e),t.fn.dataTableExt.iApiIndex=l,null!==s.s.fnStateChange&&("span"==o.target.nodeName.toLowerCase()&&o.preventDefault(),s.s.fnStateChange.call(s,n,e))})[0]},_fnDataTablesApiIndex:function(){for(var t=0,n=this.s.dt.oInstance.length;n>t;t++)if(this.s.dt.oInstance[t]==this.s.dt.nTable)return t;return 0},_fnDomCollection:function(){return t("<ul />",{"class":this.s.dt.bJUI?"ColVis_collection ui-buttonset ui-buttonset-multi":"ColVis_collection"}).css({display:"none",opacity:0,position:this.s.bCssPosition?"":"absolute"})[0]},_fnDomCatcher:function(){var s=this,o=n.createElement("div");return o.className="ColVis_catcher",t(o).click(function(){s._fnCollectionHide.call(s,null,null)}),o},_fnDomBackground:function(){var n=this,s=t("<div></div>").addClass("ColVis_collectionBackground").css("opacity",0).click(function(){n._fnCollectionHide.call(n,null,null)});return"mouseover"==this.s.activate&&s.mouseover(function(){n.s.overcollection=!1,n._fnCollectionHide.call(n,null,null)}),s[0]},_fnCollectionShow:function(){var s,o=this;s=t(this.dom.button).offset();var i=this.dom.collection,e=this.dom.background,l=parseInt(s.left,10),a=parseInt(s.top+t(this.dom.button).outerHeight(),10);this.s.bCssPosition||(i.style.top=a+"px",i.style.left=l+"px"),t(i).css({display:"block",opacity:0}),e.style.bottom="0px",e.style.right="0px",a=this.dom.catcher.style,a.height=t(this.dom.button).outerHeight()+"px",a.width=t(this.dom.button).outerWidth()+"px",a.top=s.top+"px",a.left=l+"px",n.body.appendChild(e),n.body.appendChild(i),n.body.appendChild(this.dom.catcher),t(i).animate({opacity:1},o.s.iOverlayFade),t(e).animate({opacity:.1},o.s.iOverlayFade,"linear",function(){t.browser&&t.browser.msie&&"6.0"==t.browser.version&&o._fnDrawCallback()}),this.s.bCssPosition||(s="left"==this.s.sAlign?l:l-t(i).outerWidth()+t(this.dom.button).outerWidth(),i.style.left=s+"px",e=t(i).outerWidth(),t(i).outerHeight(),l=t(n).width(),s+e>l&&(i.style.left=l-e+"px")),this.s.hidden=!1},_fnCollectionHide:function(){var s=this;!this.s.hidden&&null!==this.dom.collection&&(this.s.hidden=!0,t(this.dom.collection).animate({opacity:0},s.s.iOverlayFade,function(){this.style.display="none"}),t(this.dom.background).animate({opacity:0},s.s.iOverlayFade,function(){n.body.removeChild(s.dom.background),n.body.removeChild(s.dom.catcher)}))},_fnAdjustOpenRows:function(){for(var t=this.s.dt.aoOpenRows,n=this.s.dt.oApi._fnVisbleColumns(this.s.dt),s=0,o=t.length;o>s;s++)t[s].nTr.getElementsByTagName("td")[0].colSpan=n}},o.fnRebuild=function(n){var s=null;"undefined"!=typeof n&&(s=t.fn.dataTable.Api?new t.fn.dataTable.Api(n).table().node():n.fnSettings().nTable);for(var i=0,e=o.aInstances.length;e>i;i++)("undefined"==typeof n||s==o.aInstances[i].s.dt.nTable)&&o.aInstances[i].fnRebuild()},o.defaults={active:"click",buttonText:"Show / hide columns",aiExclude:[],bRestore:!1,sRestore:"Restore original",bShowAll:!1,sShowAll:"Show All",sAlign:"left",fnStateChange:null,iOverlayFade:500,fnLabel:null,bCssPosition:!1,aoGroups:[],order:"column"},o.aInstances=[],o.prototype.CLASS="ColVis",o.VERSION="1.1.2",o.prototype.VERSION=o.VERSION,"function"==typeof t.fn.dataTable&&"function"==typeof t.fn.dataTableExt.fnVersionCheck&&t.fn.dataTableExt.fnVersionCheck("1.7.0")?t.fn.dataTableExt.aoFeatures.push({fnInit:function(t){var n=t.oInit;return new o(t,n.colVis||n.oColVis||{}).button()},cFeature:"C",sFeature:"ColVis"}):alert("Warning: ColVis requires DataTables 1.7 or greater - www.datatables.net/download"),t.fn.dataTable.ColVis=o,t.fn.DataTable.ColVis=o},"function"==typeof define&&define.amd?define(["jquery","datatables"],t):"object"==typeof exports?t(require("jquery"),require("datatables")):jQuery&&!jQuery.fn.dataTable.ColVis&&t(jQuery,jQuery.fn.dataTable)}(window,document);