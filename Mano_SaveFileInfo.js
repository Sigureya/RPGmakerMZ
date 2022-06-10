//@ts-check

//=============================================================================
// Mano_SaveFileInfo.js
// ----------------------------------------------------------------------------
// Copyright (c) 2022-2022 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2022/04/14 初版 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
 * @plugindesc セーブ画面に追加情報を表示します。
 * @author しぐれん
 * 
 * @target MZ
 * @orderAfter NUUN_SaveScreen
 * @orderAfter AltSaveScreen
 * 
 * @command SetText
 * @desc 指定した変数に文字列を書き込みます。
 * 改行にも対応します。
 * @arg variableId
 * @type variable
 * @default 0
 * 
 * @arg text
 * @text 書き込む文章
 * @type multiline_string
 * 
 * @param listWindow
 * @text ファイルリストの配置
 * @type struct<Rect>
 * @default {"x":"270","y":"112","width":"616","height":"340"}
 * 
 * @param numVisibleRows
 * @text 表示するファイル数(縦)
 * @desc 他のプラグインで設定した値を使う場合、99を指定します。
 * @type number
 * @min 1
 * @default 3
 * 
 * @param maxCols
 * @text 表示するファイル数(横)
 * @type number
 * @min 1
 * @default 2
 * 
 * @param leftWindow
 * @text 左側のウィンドウ
 * @type struct<Rect>
 * @default {"x":"0","y":"112","width":"270","height":"340"}
 * 
 * @param leftSpriteList
 * @text 画像設定(左側)
 * @type struct<SpriteV2>[]
 * @parent leftWindow
 * @default ["{\"table\":\"[]\",\"variableId\":\"1\",\"bitmap\":\"\",\"x\":\"0\",\"y\":\"0\",\"width\":\"200\",\"height\":\"200\",\"anthorX\":\"0\",\"anthorY\":\"0\",\"isUpper\":\"false\"}"]
 * 
 * @param leftTextList
 * @text 文章設定(左側)
 * @type struct<TextFormat>[]
 * @parent leftWindow
 * @default ["{\"symbol\":\"variable\",\"variableId\":\"1\",\"nameFormat\":\"立ち絵変数:\",\"valueFormat\":\"%1\",\"valueColor\":\"\",\"indentLevel\":\"32\",\"numLines\":\"1\"}","{\"symbol\":\"playtime\",\"variableId\":\"0\",\"nameFormat\":\"プレイ時間\",\"valueFormat\":\"%1\",\"valueColor\":\"\",\"indentLevel\":\"0\",\"numLines\":\"1\"}","{\"symbol\":\"timestamp\",\"variableId\":\"0\",\"nameFormat\":\"%1\",\"valueFormat\":\"\",\"valueColor\":\"\",\"indentLevel\":\"0\",\"numLines\":\"1\"}","{\"symbol\":\"mapname\",\"variableId\":\"0\",\"nameFormat\":\"\",\"valueFormat\":\"%1\",\"valueColor\":\"\",\"indentLevel\":\"0\",\"numLines\":\"1\"}","{\"symbol\":\"mapinfo\",\"variableId\":\"0\",\"nameFormat\":\"\",\"valueFormat\":\"%1\",\"valueColor\":\"\",\"indentLevel\":\"0\",\"numLines\":\"1\"}"]
 *
 * @param leftTextPosition
 * @text 文章の配置
 * @parent leftWindow
 * @type struct<Rect>
 * @default {"x":"0","y":"140","width":"270","height":"340"}
 * 
 * @param bottomWindow
 * @type struct<Rect>
 * @default {"x":"0","y":"452","width":"808","height":"180"}
 * 
 * @param bottomSpriteList
 * @text 画像設定(下側)
 * @type struct<SpriteV2>[]
 * @parent bottomWindow
 * @default []
 * 
 * @param bottomTextList
 * @text 文章設定(下側)
 * @type struct<TextFormat>[]
 * @parent bottomWindow
 * @default ["{\"symbol\":\"lastmsg\",\"variableId\":\"0\",\"nameFormat\":\"%1\",\"valueFormat\":\"\",\"valueColor\":\"\",\"indentLevel\":\"0\",\"numLines\":\"4\"}"]
 * 
 * @param bottomTextPosition
 * @text 文章の配置
 * @parent bottomWindow
 * @type struct<Rect>
 * @default {"x":"0","y":"0","width":"808","height":"130"}
 *
 * @param lastMessageSwitch
 * @text 最後の文章記録フラグ
 * @desc ONの場合のみ、最後の文章を記録します。
 * ゲーム開始時に自動でONになります。
 * @type switch
 * @default 0
 *
 * @help
 * プラグインを有効にするためには、
 * プラグイン導入後に1回以上セーブを行う必要があります。
 * 無効状態でもエラーにはなりません。
 * 
 * ファイル一覧の左・下の2か所に情報ウィンドウを追加します。
 * 情報ウィンドウには以下の情報が表示可能です。
 * これらの設定はプラグインパラメータで行います。
 * ・プレイ時間
 * ・地名(ゲーム中表示)
 * ・地名(編集用表示)
 * ・セーブ日時
 * ・変数
 * ・最後に表示した文章
 * ・画像(変数との対応表が必要)
 * 
 * ■他のプラグインとの対応
 * ・NUUN_SaveScreen
 * 同時使用可能です。
 * 
 * ■AltSaveScreen
 * 画面配置に異常が出るため同時使用できません。
 * 技術的には解決可能ですが、仕様が未定です。
 * 
 * ■利用規約
 * MIT Licenseです。
 * ご自由にお使いください。
 */
 /*~struct~Rect:
 * @param x
 * @type number
 * @default 0
 * 
 * @param y
 * @type number
 * @default 0
 * 
 * @param width
 * @text width/ウィンドウの幅
 * @type number
 * @default 200
 * 
 * @param height
 * @text height/ウィンドウの高さ
 * @type number
 * @default 200
 */
 /*~struct~ActorImage:
 * @param dataType
 * @type select
 * @param memberIndex
 * @type number
 * @default 0
*/
 /*~struct~TextTableItem:
  * @param value
  * @type number
  * @default 1
  * 
  * @param item
  * @type multiline_string
  * @text 表示する文章
  * @desc 制御文字は使用できません。
  * 
 */

/*~struct~TextV2:
 * @param table
 * @text 文字列リスト
 * @desc 指定した変数の値を使い、
 * ここのテーブルから画像を取り出します。
 * @type struct<TextTableItem>[]
 * @default []
 * 
 * @param variableid
 * @text 対応する変数
 * @type variable
 * @desc 指定した変数の値によって表示画像を切り換えます。
 * 完全一致のみ対応です。
 * @default 0
 * 
 * @param numLines
 * @type number
 * @default 1
 * @min 1
*/
/*~struct~TextFormat:
 * @param symbol
 * @text 描画する文字の種類
 * @type select
 * @option 無し
 * @value
 * @option プレイ時間
 * @value playtime
 * @option 地名(ゲーム中表示)
 * @value mapname
 * @option 地名(編集用表示)
 * @value mapinfo
 * @option セーブ日時
 * @value timestamp
 * @option 変数
 * @value variable
 * @option 最後に表示した文章
 * @value lastmsg
 * @default 
 * 
 * @param variableId
 * @text 変数番号
 * @type variable
 * @desc 描画する文字の種類で
 * 変数を指定した場合に使用する変数です。
 * @default 0
 * 
 * @param nameFormat
 * @text 【左】項目表示フォーマット
 * @desc %1などでパラメータを取得して、書式を決めます。
 * 制御文字が使用可能です。
 * @type string
 * @default 項目名
 * 
 * @param valueFormat
 * @text 【右】データ表示フォーマット
 * @desc %1などでパラメータを取得して、書式を決めます。
 * 制御文字・改行は無効です。
 * @type string
 * @default %1
 * 
 * @param valueColor
 * @text 【右】データ文章カラー
 * @type string
 * @desd #FF00FF表記
 * @default 
 * 
 * @param indentLevel
 * @text インデント(項目名を右へ移動)
 * @desc 左側の文字が右側へ移動します。
 * 数値によっては、右側の文字と重なる場合があります。
 * @type number
 * @default 0
 * 
 * @param numLines
 * @text 行数
 * @desc 表示する行数を指定します。
 * 画像と重ならないようにする場合にも使います。
 * @type number
 * @default 1
 * 
*/

 /*~struct~SpriteTableItem:
  * @param value
  * @text 対応数値
  * @desc 指定した変数がこの値と同じ場合に画像を表示します。
  * @type number
  * @default 1
  * 
  * @param item
  * @text 画像
  * @type file
  * @dir img/pictures/
  * @desc 指定画像は枠に収まるよう縮小されます。
  * 
 */

/*~struct~SpriteV2:
 * @param table
 * @text 画像リスト
 * @desc 指定した変数の値を使い、
 * ここのテーブルから画像を取り出します。
 * @type struct<SpriteTableItem>[]
 * @default []
 * 
 * @param variableId
 * @text 対応する変数
 * @type variable
 * @desc 指定した変数の値によって表示画像を切り換えます。
 * 完全一致のみ対応です。
 * @default 0
 * 
 * @param bitmap
 * @desc 設定処理で画像が見つからなかった場合の画像。
 * ※固定で画像を出したい場合にも使えます。
 * @type file
 * @dir img/picutures/
 * 
 * @param x
 * @type number
 * @default 0
 * 
 * @param y
 * @type number
 * @default 0
 * 
 * @param width
 * @text 幅
 * @desc 画像がこれより大きい場合、
 * 枠の中に納まるように縮小します。
 * @type number
 * @default 200
 * 
 * @param height
 * @text 高さ
 * @desc 画像がこれより大きい場合、
 * 枠の中に納まるように縮小します。
 * @type number
 * @default 200
 * 
 * @param anthorX
 * @text 画像中心位置X
 * @desc 0:左が原点・0.5:中央が原点・1:右が原点
 * @type number
 * @default 0
 * @min -1
 * @max 1
 * @decimals 2
 * 
 * @param anthorY
 * @text 画像中心位置Y
 * @desc 0:上が原点・0.5:中央が原点・1:下が原点
 * @type number
 * @default 0
 * @min -1
 * @max 1
 * @decimals 2
 * 
 * @param isUpper
 * @type boolean
 * @on 文章の上
 * @off 文章の下
 * @default false
*/

/*~struct~Sprite:
 * @param symbol
 * @type select
 * @option BattlerImage
 * @default BattlerImage
 * @text 【シンボル】
 * @desc 表示画像の種類
 * 
 * @param bitmap
 * @desc 設定処理で画像が見つからなかった場合の画像。
 * ※固定で画像を出したい場合にも使えます。
 * @type file
 * @dir img/
 * 
 * @param x
 * @type number
 * @default 0
 * 
 * @param y
 * @type number
 * @default 0
 * 
 * @param width
 * @text 幅
 * @desc 画像がこれより大きい場合、
 * 枠の中に納まるように縮小します。
 * @type number
 * @default 200
 * 
 * @param height
 * @text 高さ
 * @desc 画像がこれより大きい場合、
 * 枠の中に納まるように縮小します。
 * @type number
 * @default 200
 * 
 * @param anthorX
 * @text 画像中心位置X
 * @desc 0:左が原点・0.5:中央が原点・1:右が原点
 * @type number
 * @default 0.5
 * @max 1
 * @decimals 2
 * 
 * @param anthorY
 * @text 画像中心位置Y
 * @desc 0:上が原点・0.5:中央が原点・1:下が原点
 * @type number
 * @default 0.5
 * @max 1
 * @decimals 2
 * 
 * @param isUpper
 * @type boolean
 * @on 文章の上
 * @off 文章の下
 * @default true
*/



(function(){
    'use strict';
/**
 * @param {string} objText
 */
function parseRect(objText){
    const obj = JSON.parse(objText);
    return new Rectangle(
        Number(obj.x),Number(obj.y),Number(obj.width),Number(obj.height)
    );
}
/**
 * @typedef {PIXI.Rectangle} RectangleP 
 */

/**
 * @type {String}
 */
const  PLUGIN_NAME= ('Mano_SaveFileInfo');
function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }


/**
 * @typedef {Object} SaveFileInfo
 * @property {string} playtime
 * @property {Number} timestamp
 * @property {string} title 
 * @property {Array<[string,Number]>} faces
 * @property {Array<[string,Number]>} characters
 * @property {Record< string,(string|number)>} [uzssrecord=null]
 */

//専用のレコードへ保存するためのやつ
class KVP_Base{
    /**
     * 
     * @returns {string}
     */
    key(){
        return null;
    }
    /**
     * 
     * @returns {string|number}
     */
    value(){
        return 0;
    }
    /**
     * @param {SaveFileInfo} info 
     */
    read(info){
        if(info.uzssrecord){
            const key =this.key();
            if(key){
                return info.uzssrecord[key];
            }
        }
        return null;
    }
    /**
     * @param {SaveFileInfo} info 
     */
     readToText(info){
        const t= this.read(info);
        if(t){
            return String(t);
        }
        return "";
    }
}
class RecordTemporay{
    constructor(){
        /**
         * @type {Record<(string),(Number|string)>}
         */
        this._record={};
    }
    /**
     * @param {KVP_Base} kvp 
     */
    writeV2(kvp){
        const key = kvp.key();
        //キーが有効なら書き込み
        if(key){
            const value =kvp.value();
            this._record[key] =value;
        }
    }
    get(){
        return this._record;
    }
}

class KVP_Variable extends KVP_Base{
    /**
     * @param {number} variableId 
     */
    constructor(variableId){
        super();
        this._variableId =variableId;
    }
    value(){
        return $gameVariables.value(this._variableId);
    }
    key(){
        return `V${this._variableId}`;
    }
}
class KVP_Mapname extends KVP_Base{
    key(){
        return "mapname";
    }
    value(){        
        return $gameMap.displayName();
    }
}
class KVP_Mapinfo extends KVP_Base{
    key(){
        return "mapinfo";
    }
    value(){
        const mapId = $gameMap.mapId();
        const mapInfo =$dataMapInfos[mapId];
        if(mapInfo){
            return mapInfo.name;
        }
        return "";
    }
}
class KVP_Playtime extends KVP_Base{
    /**
     * @param {SaveFileInfo} info 
     */
    read(info){
        return info.playtime;
    }
}

class KVP_Timestamp extends KVP_Base{

    /**
     * @param {SaveFileInfo} info 
     */
    read(info){
        const d= new Date(info.timestamp);
        return `${d.toLocaleDateString()} ${d.toLocaleTimeString()} `
    }
}
class KVP_LastMessage extends KVP_Base{
    key(){
        return "lastmsg";
    }
    value(){
        return SavaDataManager_V2.getLastMessage();
    }
}

class TextItemDictionary_T{
    constructor(){
        /**
         * @type {Map<string,KVP_Base>}
         */
        this._table=new Map();
        this._table.set("timestamp",new KVP_Timestamp());
        this._table.set("mapname",new KVP_Mapname());
        this._table.set("playtime",new KVP_Playtime());
        this._table.set("mapinfo",new KVP_Mapinfo());
        this._table.set("lastmsg",new KVP_LastMessage());
    }
    /**
     * @private
     * @param {string} symbol 
     * @param {number} variableId 
     */
    createKVP(symbol,variableId){
        if(symbol ==="variable"){
            return new KVP_Variable(variableId);
        }
        const t = this._table.get(symbol);
        if(t){
            return t;
        }
        return null;
    }
    /**
     * 
     * @param {string} text 
     */
    createByText(text){
        const obj =JSON.parse(text);
        const param =(
            {
                indentLevel:Number(obj.indentLevel||0),
                valueColor:String(obj.valueColor),
                valueFormat:String(obj.valueFormat),
                symbol:String(obj.symbol),
                nameFormat:String(obj.nameFormat),
                numLines:Number(obj.numLines||1),
            }
        );
        const vid =Number(obj.variableId);
        const kvp = this.createKVP(param.symbol,vid);
        return new TextContents(kvp,param);
    }
}
const TextItemDictionary=( ()=>{    
    return new TextItemDictionary_T();
})();

class I_BitmapSelector{
    /**
     * @returns {Bitmap}
     * @param {SaveFileInfo} info 
     */
    getBitmap(info){
        return null;
    }
    /**
     * @returns {KVP_Base}
     */
    kvp(){
        return null;
    }
}
class KVPXXX_BitmapTable extends I_BitmapSelector{
    /**
     * @param {number} variableId 
     * @param { Map<number,string> } table
     */
    constructor(variableId,table){
        super();
        this._kvp = new KVP_Variable(variableId);
        this._table=table;
    }
    kvp(){
        return this._kvp;
    }
    /**
     * @param {SaveFileInfo} info 
     */
    getBitmap(info){
        const value = Number( this._kvp.read(info));
        if(!isNaN(value)){
            const filename = this._table.get(value);
            if(filename){
                return ImageManager.loadPicture(filename);
            }
        }
        return null;
    }
}
/**
 * @typedef {Object} TextParamator
 * @property {String} symbol 
 * @property {Number} indentLevel
 * @property {String} valueFormat
 * @property {String} nameFormat
 * @property {String} valueColor
 * @property {number} numLines
 */
class TextContents{
    /**
     * @param {KVP_Base} kvp 
     * @param {TextParamator} param 
     */
    constructor(kvp,param){
        this._kvp =kvp;
        this._param =param;
    }
    kvp(){
        return this._kvp;
    }

    /**
     * @param {SaveFileInfo} data 
     */
     kvpText(data){
        if(data){
            if(this._kvp){
                return [this._kvp.readToText(data)]
            }
        }
        return null;
    }
    /**
     * @param {SaveFileInfo} data 
     */
    getTextXXX(data){
        const textArray = this.kvpText(data);
        return {
            left:this.createParamText(this._param.nameFormat,textArray),
            right :this.createParamText(this._param.valueFormat,textArray),
        }
    }
    /**
     * @param {String} format 
     * @param {String[]|null} param 
     */
    createParamText(format,param){
        const reg =/%([0-9]+)/g;
        return format.replace(reg,(s,n)=>{
            if(!param){
                return "";
            }
            const text = param[Number(n)-1];
            return text ||"";
        });
    }
    indentLevel(){
        return this._param.indentLevel;
    }
    valueTextColor(){
        return this._param.valueColor;
    }
    numLines(){
        return this._param.numLines;
    }
}
/**
 * @typedef {Object} AreaObject
 * @property {RectangleP} rect
 * @property {TextContents[]} textList
 */

// class FaceBitmapSelector extends I_BitmapSelector{
//     /**
//      * @param {Number} index 
//      */
//     constructor(index){
//         super();
//         this._index=index;
//     }
//     /**
//      * @param {SaveFileInfo} info 
//      */
//     getBitmap(info){
//         const face=(info.faces[this._index]);
//         if(face){
//             return ImageManager.loadFace(face[0]);
//         }
//         return null;
//     }
//     /**
//      * @param {SaveFileInfo} info 
//      */
//     frameRect(info){
//         const face = (info.faces[this._index]);
//         if(face){
//             const index = face[1];
//             return this.faceRect(index);
//         }
//         return null;
//     }
//     /**
//      * @param {Number} index 
//      */
//     faceRect(index){
//         const pw =ImageManager.faceWidth
//         const ph =ImageManager.faceHeight;
//         const sx =Math.floor((index % 4) * pw + (0) / 2);
//         const sy = Math.floor(Math.floor(index / 4) * ph + (0) / 2);
//         return new Rectangle(
//             sx,sy,
//             pw,
//             ph
//         );
//     }
// }
/**
 * @typedef {Object} SpriteRecipe
 * @property {RectangleP} positionRect
 * @property {number} anthorX
 * @property {Number} anthorY
 * @property {boolean} isUpper
 */
class SpriteContents{
    /**
     * @param {I_BitmapSelector} xxx 
     * @param {SpriteRecipe} recipe 
     */
    constructor(xxx,recipe){
        this._xxx =xxx;
        this._recipe =recipe;
    }
    /**
     * @returns {KVP_Base}
     */
    kvp(){
        return this._xxx.kvp();
    }
    hue(data){
        return 0;
    }
    anthorX(){
        return this._recipe.anthorX;
    }
    anthorY(){
        return this._recipe.anthorY;
    }
    positionRect(){
        return this._recipe.positionRect.clone();
    }
    alpha(){
        return 1;
    }
    /**
     * @param {SaveFileInfo} info 
     */
    getBitmap(info){
        if(info){
            return this._xxx.getBitmap(info);
        }
        return null;
    }
    /**
     * @param {SaveFileInfo} info 
     */
    frameRect(info){
        return null;
        //return this._xxx.frameRect(info);
    }
    isUpper(){
        return this._recipe.isUpper;
    }
}
/**
 * @template T_DataType
 * @typedef {Object} SuperView_SpriteContentsConcept
 * @property {()=>RectangleP} positionRect
 * @property {()=>number} anthorX
 * @property {()=>number} anthorY
 * @property {(data:T_DataType)=>RectangleP} frameRect
 * @property {(data:T_DataType)=>number} hue
 * @property {(data:T_DataType)=>Bitmap} getBitmap
 * @property {(data:T_DataType)=>number} alpha
 */

/**
 * @template {SaveFileInfo} T_DataType 
 */
 class Sprite_SuperView extends Sprite{
    constructor(){
         super();
         this._data=null;
         this.visible =false;
         this.setContents(null);
    }
    clear(){
        this.visible=false;
        this._elment=null;
    }
    /**
     * @param {SuperView_SpriteContentsConcept<T_DataType>} contents 
     */
    setContents(contents){
        this._elment =(contents ||null);
        this.refresh();
    }
    updateVisible(){
        //this.visible=true;
        this.visible = !!this._elment;
    }
    updatePosition(){
        if(this._elment){
            const rect =this._elment.positionRect()
            this.x = rect.x;
            this.y = rect.y;
            this.anchor.x = this._elment.anthorX();
            this.anchor.y = this._elment.anthorY();
        }
    }
    updateFrame(){
        const rect = this._elment.frameRect(this._data);
        if(rect){
            this.setFrame(rect.x,rect.y,rect.width,rect.height);
            return;
        }
        const orig=this.bitmap.rect;
        this.setFrame(orig.x,orig.y,orig.width,orig.height);
        this;
    }
    refresh(){
        this.updateVisible();
        this.loadBitmap();
        this.updatePosition();
        this.updateOpacity();
        this.updateHue();
    }
    updateHue(){
        if(this._elment){
            this.setHue(this._elment.hue(this._data));
        }
    }
    updateOpacity(){
        if(this._elment){
            this.alpha =this._elment.alpha(this._data);
        }
    }
    loadBitmap(){
        if(!this._elment ){
            this.bitmap=null;
            return;
        }

        //フォールバック画像を返す可能性があるので、nullでも渡す
        const bitmap =this._elment.getBitmap(this._data||null);
        this.bitmap = bitmap;
        if(bitmap){
            //TODO:hueがMV/MZで設定方法が違う
            //MZはspriteが持っているので、何らかの対応を行う
            bitmap.addLoadListener(this.onBitmapLoadead.bind(this));
        }
    }
    onBitmapLoadead(){
        this.updateFrame();
        this.resetScale();
    }
    resetScale(){
        const s=this.calcScale();
        this.scale.set(s,s);
    }
    calcScale(){
        const bitmap =this.bitmap;
        if(bitmap && bitmap.isReady()){
            const posRect =this._elment.positionRect();
            const scaleA =posRect.width   /  this._frame.width ;
            const scaleB =posRect.height / this._frame.height;
            return Math.min(1,scaleA,scaleB);    
        }
        return 0;
    }
    /**
     * @param {T_DataType} data 
     */
    setData(data){
        const dd= data||null;
        if(dd!==this._data){
            this._data=dd;
            this.refresh();    
        }

    }
}
/**
 * @template {SaveFileInfo} T_DataType
 */
 class Spriteset_SuperView extends PIXI.Container{
    /**
     * 
     * @param {SpriteContents[]} constents 
     */
    constructor(constents){
        super();
        /**
         * @type {Sprite_SuperView<T_DataType>[]}
         */
        this._list =[];
        this.setContents(constents);
    }
    /**
     * @param {Number} num 
     */
    reserveSprite(num){
        const alocate= num - this._list.length;
        if(alocate >0){
            for (let i = 0; i < alocate; i++) {
                /**
                 * @type {Sprite_SuperView<T_DataType>}
                 */
                const sprite = new Sprite_SuperView();
                this._list.push(sprite);
                this.addChild(sprite);
            }
        }
    }
    /**
     * @param {SpriteContents[]} contentsList 
     */
    setContents(contentsList){
        this.reserveSprite(contentsList.length);
        this._list.forEach((sprite,index)=>{
            const contents =contentsList[index];
            sprite.setContents(contents||null);
        });
    }
    /**
     * @param {T_DataType} data 
     */
    setData(data){
        for (const iterator of this._list) {
            iterator.setData(data);
        }
    }
}

class DataWindowLayout_V2{
    /**
     * 
     * @param {SpriteContents[]} casset 
     * @param {AreaObject[]} area 
     * @param {RectangleP} rect 
     */
    constructor(casset,area,rect){
        this._rect =rect;

        const upper =[];
        const lower =[];
        for (const iterator of casset) {
            if(iterator.isUpper()){
                upper.push(iterator);
            }else{
                lower.push(iterator);
            }
        }
        this._upperSprite = upper;
        this._lowerSprite = lower;
        this._areaList=area;
    }
    rect(){
        return this._rect;
    }
    createSprites(){
        const result= {
            upper:new Spriteset_SuperView(this._upperSprite),
            lower:new Spriteset_SuperView(this._lowerSprite),
        };
        return result;
    }
    area(){
        return this._areaList;
    }
    *allVariableElements(){
        for (const iterator of this._upperSprite) {
            yield iterator.kvp();
        }
        for (const iterator of this._lowerSprite) {
            yield iterator.kvp();
        }
        for (const area of this._areaList) {
            for (const iterator of area.textList) {
                yield iterator.kvp();
            }
        }
    }
}

/**
 * @param {DataWindowLayout_V2[]} layoutList 
 */
function *allKVP(layoutList){
    for (const iterator of layoutList) {
        for (const aa of iterator.allVariableElements()) {
            yield aa;
        }
    }
}
/**
 * 
 * @param {RectangleP} rect 
 */
function boxFit(rect){
    const box= new Rectangle(0,0,Graphics.boxWidth,Graphics.boxHeight);
    const result = rect.clone();
    return result.fit(box);
}
//TODO:infoは２個用意する
//numvisibleRowsはminで制御する
class Window_SaveFileInfo extends Window_Base{
    /**
     * 
     * @param {DataWindowLayout_V2} layout 
     */
    constructor(layout){
        const rect = boxFit(layout.rect());
        super(rect);
        const sprites= layout.createSprites();
        this._upper =sprites.upper;
        this._lower =sprites.lower;
        this._layout=layout;
        this.addChild(this._upper);
        this.addChildToBack(this._lower);
    }
    /**
     * @param {SaveFileInfo} data 
     */
    setData(data){
        this._upper.setData(data);
        this._lower.setData(data);
        this.pppText(data);
    }
    /**
     * @param {SaveFileInfo} info 
     */
    pppText(info){
        this.contents.clear();
        for (const iterator of this._layout._areaList) {
            this.paintText(info,iterator);
        }
    }

    /**
     * @param {SaveFileInfo} info
     * @param {AreaObject} area 
     */
    paintText(info,area){
        const lineHeight =this.lineHeight();
        let y =area.rect.y;
        for (const iterator of area.textList) {
            const indentLevel =iterator.indentLevel();
            const x = area.rect.x +indentLevel;
            const width= Math.min(this.innerWidth,area.rect.width)-indentLevel;
            this.drawContents(info,iterator,x,y,width,area.rect.height);
            y += iterator.numLines() * lineHeight;
        }
    }
    /**
     * @param {SaveFileInfo} data 
     * @param {TextContents} contents 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} w 
     * @param {Number} h 
     */
    drawContents(data,contents,x,y,w,h){
        const indentWidth= contents.indentLevel();
        const textXXX = contents.getTextXXX(data);
        this.drawTextEx(textXXX.left,x +indentWidth  ,y,w-indentWidth);

        const color = contents.valueTextColor();
        if(color){
            this.changeTextColor(color);
        }else{
            this.resetTextColor();
        }
        //TODO:項目の色変更パラメータ
        this.drawText(textXXX.right,x,y,w,"right");   
    }
}

class SaveTemporaly{
    constructor(){
        this.setLastMessage("");
    }
    /**
     * @param {string} msg 
     */
    setLastMessage(msg){
        this._lastMessage=msg;
    }
    getLastMessage(){
        return this._lastMessage;
    }
}

class ReadonlyFlags{
    /**
     * 
     * @param {Iterable<KVP_Base>} kvpList 
     */
    constructor(kvpList){
        this._lastMessage=false;
        //スクショ保存フラグ
        this._needsSnap =false;

        for (const iterator of kvpList) {
            if(iterator){
                this.xxxFlag(iterator);
            }
        }
    }
    /**
     * @param {KVP_Base} kvp 
     */
    xxxFlag(kvp){
        switch (kvp.key()) {
            case "lastmsg":
                this._lastMessage=true;
                break;        
            default:
                break;
        }
    }

    needLastMessageSave(){
        return this._lastMessage;
    }

}
/**
 * @typedef {Object} MainWindowLayout
 * @property {number} numVisibleRows
 * @property {number} maxCols
 * @property {Rectangle} rect
 */

class SaveDataReadonly{
    /**
     * @param {DataWindowLayout_V2[]} dataList 
     * @param {MainWindowLayout} mainWindowLayout
     * @param {Number} lastMessageSwitch
     */
    constructor(dataList,mainWindowLayout,lastMessageSwitch){
        this._dataLayoutList=dataList;
        this._mainWindow =mainWindowLayout;
        this._lastMessageSwitch=lastMessageSwitch;

        this._flags = new ReadonlyFlags(allKVP(dataList));
    }
    needsLastMessage(){

        if(!this._flags.needLastMessageSave()){
            return false;
        }
        if(this._lastMessageSwitch >0){
            return  $gameSwitches.value(this._lastMessageSwitch);
        }
        return true;
    }
    setupSwitchs() {
        $gameSwitches.setValue(this._lastMessageSwitch,true);
    }

    createInfoRecord_V2(){
         const record =new RecordTemporay();
         for (const iterator of allKVP(this._dataLayoutList)) {
             if(iterator){
                record.writeV2(iterator);
             }
         }
         const result= record.get();
         return result;
    }
    createDataWindows(){
        return this._dataLayoutList.map( (data)=>{
            return new Window_SaveFileInfo(data);
        });
    }
    needsChangeLayoutForListWindow(){
        return true;
    }
    fileListWindowRect(){
        return this._mainWindow.rect.clone();
    }
    fileNumVisivleRows(){
        return this._mainWindow.numVisibleRows;
    }
    fileMaxCols(){
        return this._mainWindow.maxCols;
    }
}

class SaveWindowManager_T3{
    maxCols() {
        return this._readonly.fileMaxCols();
    }

    /**
     * @param {SaveDataReadonly} readonlyData 
     */
    constructor(readonlyData){
        this._readonly=readonlyData;
        this._temporary=null;
    }
    resetTemporary(){
        this._temporary = new SaveTemporaly();
    }
    onLoad(){
        this.resetTemporary();
    }
    onNewgame(){
        this.resetTemporary();
        this._readonly.setupSwitchs();
    }
    createaInfo(){
        return this._readonly.createInfoRecord_V2();
    }
    createDataWindows() {
        return this._readonly.createDataWindows();
    }
    fileListWindowRect() {
        return this._readonly.fileListWindowRect();
    }
    fileNumVisivleRows() {
        return this._readonly.fileNumVisivleRows();
    }
    /**
     * 
     * @param {string} text 
     */
    setLastMessage(text){
        if(this._readonly.needsLastMessage()){
            if(this._temporary){
                this._temporary.setLastMessage(text);
            }
        }
    }
    getLastMessage(){
        return this._temporary._lastMessage;
    }
}

/**
 * @param {String} objText 
 */
function createItemTabel(objText){
    /**
     * @type {Map<Number,String>}
     */
    const result = new Map();
    /**
     * @type {string[]}
     */
    const paramList =JSON.parse(objText);
    for (const iterator of paramList) {
        const obj =JSON.parse(iterator);
        const value =Number(obj.value);
        if(!isNaN(value)){
            if(obj.item){
                const itemText = String(obj.item);
                result.set(value,itemText);    
            }
        }
    }
    return result;
}

/**
 * 
 * @param {string} spriteList 
 * @returns 
 */
function createContentsSpriteList(spriteList){
    /**
     * @type {string[]}
     */
    const spriteV2 =JSON.parse(spriteList||"[]");
    const sp2= spriteV2.map( (text)=>{
        const obj =JSON.parse(text);
        const rect =new Rectangle( Number(obj.x),Number(obj.y),Number(obj.width),Number(obj.height));
        const table = createItemTabel(obj.table);
        const variableId =Number(obj.variableId);
        const bmp =new  KVPXXX_BitmapTable(variableId,table);
        return new SpriteContents(bmp,{
            positionRect:rect,
            anthorX:Number(obj.anthorX),
            anthorY:Number(obj.anthorY),
            isUpper:(obj.isUpper==="true"),
        });
    });
    return sp2;
}

/**
 * @param {string} rect 
 * @param {string} textList 
 * @param {string} areaRectText
 * @param {string} spriteList 
 */
function createPage(rect,textList,areaRectText,spriteList){

    const sp = createContentsSpriteList(spriteList);
    const upper =[];
    const lower =[];
    for (const iterator of sp) {
        if(iterator.isUpper()){
           upper.push(iterator); 
        }else{
            lower.push(iterator);
        }
    }
    const windowRect =parseRect(rect);
    /**
     * @type {string[]}
     */
    const paramList =JSON.parse(textList||"[]");
    const textObj = paramList.map( (t)=>{
        return TextItemDictionary.createByText(t);
    }).filter((v)=>{ return !!v });
    const wwRect = windowRect.clone();
    wwRect.x =0;
    wwRect.y =0;
    const areaRectV2 =parseRect(areaRectText);
    areaRectV2.fit(wwRect);
    return new DataWindowLayout_V2(sp,[
        {
            rect:areaRectV2,
            textList:textObj,
        }
    ],windowRect);
}
const SavaDataManager_V2 =(()=>{
    const param =getParam();
    const leftPage = createPage( param.leftWindow,param.leftTextList,param.leftTextPosition,param.leftSpriteList);
    const bottomPage =createPage(param.bottomWindow,param.bottomTextList,param.bottomTextPosition,param.bottomSpriteList);
    const listRect =parseRect(param.listWindow);
    const lastMessageSwitch =Number(param.lastMessageSwitch);
    const readonlyData = new SaveDataReadonly([leftPage,bottomPage],{
        rect:listRect,
        numVisibleRows:Number(param.numVisibleRows||3),
        maxCols:Number(param.maxCols||2),
    },lastMessageSwitch);

    const manager =new SaveWindowManager_T3(readonlyData);

    return manager;

})();
const Window_Message_startMessage=Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage =function(){
    Window_Message_startMessage.call(this);
    SavaDataManager_V2.setLastMessage(this._textState.text);
};
const DataManager_loadAllSavefileImages =DataManager.loadAllSavefileImages;
DataManager.loadAllSavefileImages =function(){
    DataManager_loadAllSavefileImages.call(this);
};
const  Window_SavefileList_numVisibleRows =Window_SavefileList.prototype.numVisibleRows;
Window_SavefileList.prototype.numVisibleRows =function(){
    const n= Window_SavefileList_numVisibleRows.call(this);
    return Math.min(n,SavaDataManager_V2.fileNumVisivleRows());
};
const Window_SavefileList_maxCols=Window_SavefileList.prototype.maxCols;
Window_SavefileList.prototype.maxCols =function(){
    const oldValue = Window_SavefileList_maxCols.call(this);
    return Math.min(oldValue,SavaDataManager_V2.maxCols());
};
/**
 * @param {Window_SaveFileInfo[]} dataWindows 
 * @param {Window_SavefileList} fileWindow 
 */
function setHelpFunction(dataWindows,fileWindow){
    if(dataWindows.length <=0){
        return;
    }

    const oldFunc =fileWindow.callUpdateHelp;
    fileWindow.callUpdateHelp =function(){
        oldFunc.call(this);
        const fileId = this.savefileId();
        /**
         * @type {SaveFileInfo}
         */
        const info =DataManager.savefileInfo(fileId);
        for (const iterator of dataWindows) {
            iterator.setData(info);
        }
    };

}
const Scene_File_create=Scene_File.prototype.create;
Scene_File.prototype.create =function(){
    Scene_File_create.call(this);
    const dataWindows =SavaDataManager_V2.createDataWindows();

    for (const iterator of dataWindows) {
        this.addWindow(iterator);        
    }
    setHelpFunction(dataWindows,this._listWindow);
    this._listWindow.reselect();
};
const DataManager_makeSavefileInfo=DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo =function(){
    /**
     * @type {SaveFileInfo}
     */
    const result =DataManager_makeSavefileInfo.call(this);
    const record=SavaDataManager_V2.createaInfo();
    result.uzssrecord = record;
    return result;
};
const DataManager_setupNewGame=DataManager.setupNewGame;
DataManager.setupNewGame =function(){
    DataManager_setupNewGame.call(this);
    SavaDataManager_V2.onNewgame();
};
const DataManager_extractSaveContents=DataManager.extractSaveContents;
DataManager.extractSaveContents =function(c){
    DataManager_extractSaveContents.call(this,c);
    SavaDataManager_V2.onLoad();
};

const Scene_File_listWindowRect =Scene_File.prototype.listWindowRect;
Scene_File.prototype.listWindowRect =function(){
    /**
     * @type {Rectangle}
     */
    const base = Scene_File_listWindowRect.call(this);
    const result= SavaDataManager_V2.fileListWindowRect().fit(base);
    return result;
};

PluginManager.registerCommand(PLUGIN_NAME,"SetText",(arg)=>{
    const variableId =Number(arg.variableId);
    const text = String(arg.text);
    $gameVariables.setValue(variableId,text);
});

}());
