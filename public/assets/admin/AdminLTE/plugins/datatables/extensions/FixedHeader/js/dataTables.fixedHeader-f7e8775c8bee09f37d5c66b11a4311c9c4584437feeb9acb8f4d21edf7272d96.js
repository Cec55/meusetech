/*! FixedHeader 2.1.2
 * ©2010-2014 SpryMedia Ltd - datatables.net/license
 */
/**
 * @summary     FixedHeader
 * @description Fix a table's header or footer, so it is always visible while
 *              Scrolling
 * @version     2.1.2
 * @file        dataTables.fixedHeader.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2009-2014 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
var FixedHeader;!function(e,t,i){var o=function(o){"use strict";return FixedHeader=function(e,t){if(!this instanceof FixedHeader)return void alert("FixedHeader warning: FixedHeader must be initialised with the 'new' keyword.");var i={aoCache:[],oSides:{top:!0,bottom:!1,left:0,right:0},oZIndexes:{top:104,bottom:103,left:102,right:101},oCloneOnDraw:{top:!1,bottom:!1,left:!0,right:!0},oMes:{iTableWidth:0,iTableHeight:0,iTableLeft:0,iTableRight:0,iTableTop:0,iTableBottom:0},oOffset:{top:0},nTable:null,bFooter:!1,bInitComplete:!1};this.fnGetSettings=function(){return i},this.fnUpdate=function(){this._fnUpdateClones(),this._fnUpdatePositions()},this.fnPosition=function(){this._fnUpdatePositions()};var a=o.fn.dataTable.Api?new o.fn.dataTable.Api(e).settings()[0]:e.fnSettings();a._oPluginFixedHeader=this,this.fnInit(a,t)},FixedHeader.prototype={fnInit:function(t,i){var a=this.fnGetSettings(),n=this;return this.fnInitSettings(a,i),""!==t.oScroll.sX||""!==t.oScroll.sY?void alert("FixedHeader 2 is not supported with DataTables' scrolling mode at this time"):(a.nTable=t.nTable,t.aoDrawCallback.unshift({fn:function(){FixedHeader.fnMeasure(),n._fnUpdateClones.call(n),n._fnUpdatePositions.call(n)},sName:"FixedHeader"}),a.bFooter=o(">tfoot",a.nTable).length>0,a.oSides.top&&a.aoCache.push(n._fnCloneTable("fixedHeader","FixedHeader_Header",n._fnCloneThead)),a.oSides.bottom&&a.aoCache.push(n._fnCloneTable("fixedFooter","FixedHeader_Footer",n._fnCloneTfoot)),a.oSides.left&&a.aoCache.push(n._fnCloneTable("fixedLeft","FixedHeader_Left",n._fnCloneTLeft,a.oSides.left)),a.oSides.right&&a.aoCache.push(n._fnCloneTable("fixedRight","FixedHeader_Right",n._fnCloneTRight,a.oSides.right)),FixedHeader.afnScroll.push(function(){n._fnUpdatePositions.call(n)}),o(e).resize(function(){FixedHeader.fnMeasure(),n._fnUpdateClones.call(n),n._fnUpdatePositions.call(n)}),o(a.nTable).on("column-reorder.dt",function(){FixedHeader.fnMeasure(),n._fnUpdateClones(!0),n._fnUpdatePositions()}).on("column-visibility.dt",function(){FixedHeader.fnMeasure(),n._fnUpdateClones(!0),n._fnUpdatePositions()}),FixedHeader.fnMeasure(),n._fnUpdateClones(),n._fnUpdatePositions(),void(a.bInitComplete=!0))},fnInitSettings:function(e,t){t!==i&&(t.top!==i&&(e.oSides.top=t.top),t.bottom!==i&&(e.oSides.bottom=t.bottom),"boolean"==typeof t.left?e.oSides.left=t.left?1:0:t.left!==i&&(e.oSides.left=t.left),"boolean"==typeof t.right?e.oSides.right=t.right?1:0:t.right!==i&&(e.oSides.right=t.right),t.zTop!==i&&(e.oZIndexes.top=t.zTop),t.zBottom!==i&&(e.oZIndexes.bottom=t.zBottom),t.zLeft!==i&&(e.oZIndexes.left=t.zLeft),t.zRight!==i&&(e.oZIndexes.right=t.zRight),t.offsetTop!==i&&(e.oOffset.top=t.offsetTop),t.alwaysCloneTop!==i&&(e.oCloneOnDraw.top=t.alwaysCloneTop),t.alwaysCloneBottom!==i&&(e.oCloneOnDraw.bottom=t.alwaysCloneBottom),t.alwaysCloneLeft!==i&&(e.oCloneOnDraw.left=t.alwaysCloneLeft),t.alwaysCloneRight!==i&&(e.oCloneOnDraw.right=t.alwaysCloneRight))},_fnCloneTable:function(e,i,a,n){var l,s=this.fnGetSettings();"absolute"!=o(s.nTable.parentNode).css("position")&&(s.nTable.parentNode.style.position="relative"),l=s.nTable.cloneNode(!1),l.removeAttribute("id");var d=t.createElement("div");return d.style.position="absolute",d.style.top="0px",d.style.left="0px",d.className+=" FixedHeader_Cloned "+e+" "+i,"fixedHeader"==e&&(d.style.zIndex=s.oZIndexes.top),"fixedFooter"==e&&(d.style.zIndex=s.oZIndexes.bottom),"fixedLeft"==e?d.style.zIndex=s.oZIndexes.left:"fixedRight"==e&&(d.style.zIndex=s.oZIndexes.right),l.style.margin="0",d.appendChild(l),t.body.appendChild(d),{nNode:l,nWrapper:d,sType:e,sPosition:"",sTop:"",sLeft:"",fnClone:a,iCells:n}},_fnMeasure:function(){var e=this.fnGetSettings(),t=e.oMes,i=o(e.nTable),a=i.offset(),n=this._fnSumScroll(e.nTable.parentNode,"scrollTop");this._fnSumScroll(e.nTable.parentNode,"scrollLeft");t.iTableWidth=i.outerWidth(),t.iTableHeight=i.outerHeight(),t.iTableLeft=a.left+e.nTable.parentNode.scrollLeft,t.iTableTop=a.top+n,t.iTableRight=t.iTableLeft+t.iTableWidth,t.iTableRight=FixedHeader.oDoc.iWidth-t.iTableLeft-t.iTableWidth,t.iTableBottom=FixedHeader.oDoc.iHeight-t.iTableTop-t.iTableHeight},_fnSumScroll:function(e,t){for(var i=e[t];(e=e.parentNode)&&"HTML"!=e.nodeName&&"BODY"!=e.nodeName;)i=e[t];return i},_fnUpdatePositions:function(){var e=this.fnGetSettings();this._fnMeasure();for(var t=0,i=e.aoCache.length;i>t;t++)"fixedHeader"==e.aoCache[t].sType?this._fnScrollFixedHeader(e.aoCache[t]):"fixedFooter"==e.aoCache[t].sType?this._fnScrollFixedFooter(e.aoCache[t]):"fixedLeft"==e.aoCache[t].sType?this._fnScrollHorizontalLeft(e.aoCache[t]):this._fnScrollHorizontalRight(e.aoCache[t])},_fnUpdateClones:function(e){var t=this.fnGetSettings();e&&(t.bInitComplete=!1);for(var i=0,o=t.aoCache.length;o>i;i++)t.aoCache[i].fnClone.call(this,t.aoCache[i]);e&&(t.bInitComplete=!0)},_fnScrollHorizontalRight:function(e){var t=this.fnGetSettings(),i=t.oMes,a=FixedHeader.oWin,n=FixedHeader.oDoc,l=e.nWrapper,s=o(l).outerWidth();a.iScrollRight<i.iTableRight?(this._fnUpdateCache(e,"sPosition","absolute","position",l.style),this._fnUpdateCache(e,"sTop",i.iTableTop+"px","top",l.style),this._fnUpdateCache(e,"sLeft",i.iTableLeft+i.iTableWidth-s+"px","left",l.style)):i.iTableLeft<n.iWidth-a.iScrollRight-s?(this._fnUpdateCache(e,"sPosition","fixed","position",l.style),this._fnUpdateCache(e,"sTop",i.iTableTop-a.iScrollTop+"px","top",l.style),this._fnUpdateCache(e,"sLeft",a.iWidth-s+"px","left",l.style)):(this._fnUpdateCache(e,"sPosition","absolute","position",l.style),this._fnUpdateCache(e,"sTop",i.iTableTop+"px","top",l.style),this._fnUpdateCache(e,"sLeft",i.iTableLeft+"px","left",l.style))},_fnScrollHorizontalLeft:function(e){var t=this.fnGetSettings(),i=t.oMes,a=FixedHeader.oWin,n=(FixedHeader.oDoc,e.nWrapper),l=o(n).outerWidth();a.iScrollLeft<i.iTableLeft?(this._fnUpdateCache(e,"sPosition","absolute","position",n.style),this._fnUpdateCache(e,"sTop",i.iTableTop+"px","top",n.style),this._fnUpdateCache(e,"sLeft",i.iTableLeft+"px","left",n.style)):a.iScrollLeft<i.iTableLeft+i.iTableWidth-l?(this._fnUpdateCache(e,"sPosition","fixed","position",n.style),this._fnUpdateCache(e,"sTop",i.iTableTop-a.iScrollTop+"px","top",n.style),this._fnUpdateCache(e,"sLeft","0px","left",n.style)):(this._fnUpdateCache(e,"sPosition","absolute","position",n.style),this._fnUpdateCache(e,"sTop",i.iTableTop+"px","top",n.style),this._fnUpdateCache(e,"sLeft",i.iTableLeft+i.iTableWidth-l+"px","left",n.style))},_fnScrollFixedFooter:function(e){var t=this.fnGetSettings(),i=t.oMes,a=FixedHeader.oWin,n=(FixedHeader.oDoc,e.nWrapper),l=o("thead",t.nTable).outerHeight(),s=o(n).outerHeight();a.iScrollBottom<i.iTableBottom?(this._fnUpdateCache(e,"sPosition","absolute","position",n.style),this._fnUpdateCache(e,"sTop",i.iTableTop+i.iTableHeight-s+"px","top",n.style),this._fnUpdateCache(e,"sLeft",i.iTableLeft+"px","left",n.style)):a.iScrollBottom<i.iTableBottom+i.iTableHeight-s-l?(this._fnUpdateCache(e,"sPosition","fixed","position",n.style),this._fnUpdateCache(e,"sTop",a.iHeight-s+"px","top",n.style),this._fnUpdateCache(e,"sLeft",i.iTableLeft-a.iScrollLeft+"px","left",n.style)):(this._fnUpdateCache(e,"sPosition","absolute","position",n.style),this._fnUpdateCache(e,"sTop",i.iTableTop+s+"px","top",n.style),this._fnUpdateCache(e,"sLeft",i.iTableLeft+"px","left",n.style))},_fnScrollFixedHeader:function(e){for(var t=this.fnGetSettings(),i=t.oMes,o=FixedHeader.oWin,a=(FixedHeader.oDoc,e.nWrapper),n=0,l=t.nTable.getElementsByTagName("tbody"),s=0;s<l.length;++s)n+=l[s].offsetHeight;i.iTableTop>o.iScrollTop+t.oOffset.top?(this._fnUpdateCache(e,"sPosition","absolute","position",a.style),this._fnUpdateCache(e,"sTop",i.iTableTop+"px","top",a.style),this._fnUpdateCache(e,"sLeft",i.iTableLeft+"px","left",a.style)):o.iScrollTop+t.oOffset.top>i.iTableTop+n?(this._fnUpdateCache(e,"sPosition","absolute","position",a.style),this._fnUpdateCache(e,"sTop",i.iTableTop+n+"px","top",a.style),this._fnUpdateCache(e,"sLeft",i.iTableLeft+"px","left",a.style)):(this._fnUpdateCache(e,"sPosition","fixed","position",a.style),this._fnUpdateCache(e,"sTop",t.oOffset.top+"px","top",a.style),this._fnUpdateCache(e,"sLeft",i.iTableLeft-o.iScrollLeft+"px","left",a.style))},_fnUpdateCache:function(e,t,i,o,a){e[t]!=i&&(a[o]=i,e[t]=i)},_fnClassUpdate:function(e,t){var i=this;"TR"!==e.nodeName.toUpperCase()&&"TH"!==e.nodeName.toUpperCase()&&"TD"!==e.nodeName.toUpperCase()&&"SPAN"!==e.nodeName.toUpperCase()||(t.className=e.className),o(e).children().each(function(a){i._fnClassUpdate(o(e).children()[a],o(t).children()[a])})},_fnCloneThead:function(e){var t=this.fnGetSettings(),i=e.nNode;if(t.bInitComplete&&!t.oCloneOnDraw.top)return void this._fnClassUpdate(o("thead",t.nTable)[0],o("thead",i)[0]);var a=o(t.nTable).outerWidth();for(e.nWrapper.style.width=a+"px",i.style.width=a+"px";i.childNodes.length>0;)o("thead th",i).unbind("click"),i.removeChild(i.childNodes[0]);var n=o("thead",t.nTable).clone(!0)[0];i.appendChild(n);var l=[],s=[];o("thead>tr th",t.nTable).each(function(){l.push(o(this).width())}),o("thead>tr td",t.nTable).each(function(){s.push(o(this).width())}),o("thead>tr th",t.nTable).each(function(e){o("thead>tr th:eq("+e+")",i).width(l[e]),o(this).width(l[e])}),o("thead>tr td",t.nTable).each(function(e){o("thead>tr td:eq("+e+")",i).width(s[e]),o(this).width(s[e])}),o("th.sorting, th.sorting_desc, th.sorting_asc",i).bind("click",function(){this.blur()})},_fnCloneTfoot:function(e){var t=this.fnGetSettings(),i=e.nNode;for(e.nWrapper.style.width=o(t.nTable).outerWidth()+"px";i.childNodes.length>0;)i.removeChild(i.childNodes[0]);var a=o("tfoot",t.nTable).clone(!0)[0];i.appendChild(a),o("tfoot:eq(0)>tr th",t.nTable).each(function(e){o("tfoot:eq(0)>tr th:eq("+e+")",i).width(o(this).width())}),o("tfoot:eq(0)>tr td",t.nTable).each(function(e){o("tfoot:eq(0)>tr td:eq("+e+")",i).width(o(this).width())})},_fnCloneTLeft:function(e){for(var t=this.fnGetSettings(),i=e.nNode,a=o("tbody",t.nTable)[0];i.childNodes.length>0;)i.removeChild(i.childNodes[0]);i.appendChild(o("thead",t.nTable).clone(!0)[0]),i.appendChild(o("tbody",t.nTable).clone(!0)[0]),t.bFooter&&i.appendChild(o("tfoot",t.nTable).clone(!0)[0]);var n="gt("+(e.iCells-1)+")";o("thead tr",i).each(function(){o("th:"+n,this).remove()}),o("tfoot tr",i).each(function(){o("th:"+n,this).remove()}),o("tbody tr",i).each(function(){o("td:"+n,this).remove()}),this.fnEqualiseHeights("thead",a.parentNode,i),this.fnEqualiseHeights("tbody",a.parentNode,i),this.fnEqualiseHeights("tfoot",a.parentNode,i);for(var l=0,s=0;s<e.iCells;s++)l+=o("thead tr th:eq("+s+")",t.nTable).outerWidth();i.style.width=l+"px",e.nWrapper.style.width=l+"px"},_fnCloneTRight:function(e){for(var t=this.fnGetSettings(),i=o("tbody",t.nTable)[0],a=e.nNode,n=o("tbody tr:eq(0) td",t.nTable).length;a.childNodes.length>0;)a.removeChild(a.childNodes[0]);a.appendChild(o("thead",t.nTable).clone(!0)[0]),a.appendChild(o("tbody",t.nTable).clone(!0)[0]),t.bFooter&&a.appendChild(o("tfoot",t.nTable).clone(!0)[0]),o("thead tr th:lt("+(n-e.iCells)+")",a).remove(),o("tfoot tr th:lt("+(n-e.iCells)+")",a).remove(),o("tbody tr",a).each(function(){o("td:lt("+(n-e.iCells)+")",this).remove()}),this.fnEqualiseHeights("thead",i.parentNode,a),this.fnEqualiseHeights("tbody",i.parentNode,a),this.fnEqualiseHeights("tfoot",i.parentNode,a);for(var l=0,s=0;s<e.iCells;s++)l+=o("thead tr th:eq("+(n-1-s)+")",t.nTable).outerWidth();a.style.width=l+"px",e.nWrapper.style.width=l+"px"},fnEqualiseHeights:function(e,t,i){var a,n=o(e+" tr",t);o(e+" tr",i).each(function(e){a=n.eq(e).css("height"),"Microsoft Internet Explorer"==navigator.appName&&(a=parseInt(a,10)+1),o(this).css("height",a),n.eq(e).css("height",a)})}},FixedHeader.oWin={iScrollTop:0,iScrollRight:0,iScrollBottom:0,iScrollLeft:0,iHeight:0,iWidth:0},FixedHeader.oDoc={iHeight:0,iWidth:0},FixedHeader.afnScroll=[],FixedHeader.fnMeasure=function(){var i=o(e),a=o(t),n=FixedHeader.oWin,l=FixedHeader.oDoc;l.iHeight=a.height(),l.iWidth=a.width(),n.iHeight=i.height(),n.iWidth=i.width(),n.iScrollTop=i.scrollTop(),n.iScrollLeft=i.scrollLeft(),n.iScrollRight=l.iWidth-n.iScrollLeft-n.iWidth,n.iScrollBottom=l.iHeight-n.iScrollTop-n.iHeight},FixedHeader.version="2.1.2",o(e).scroll(function(){FixedHeader.fnMeasure();for(var e=0,t=FixedHeader.afnScroll.length;t>e;e++)FixedHeader.afnScroll[e]()}),o.fn.dataTable.FixedHeader=FixedHeader,o.fn.DataTable.FixedHeader=FixedHeader,FixedHeader};"function"==typeof define&&define.amd?define(["jquery","datatables"],o):"object"==typeof exports?o(require("jquery"),require("datatables")):jQuery&&!jQuery.fn.dataTable.FixedHeader&&o(jQuery,jQuery.fn.dataTable)}(window,document);