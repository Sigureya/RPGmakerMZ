//=============================================================================
// Mano_ChoiceCustom.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020-2020 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ver 1.0 2020/09/24
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================



/*:
 * @plugindesc 選択肢を表示し、結果を変数に保存します。
 * Show choices and save the result to a variable
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * 
 * @target MZ
 * 
 * @help
 * 条件分岐付きの選択肢を作成できます。
 * 条件分岐の関係で選択できるものが存在しない場合、
 * 選択肢は表示されません。
 * 
 * 選択結果は変数で受け取ります。
 * 選択が失敗した場合やキャンセルの場合があるので、
 * コマンド実行前に初期値を設定しておきましょう。
 * キャンセル・失敗時には変数は変更されません。
 * 
 * 文章と選択肢を同時に表示する場合、
 * このプラグインに搭載されている文章の表示を使う必要があります。
 * 
 * 
 * 2020/09/24 公開
 * 
 * アクター選択で、顔グラフィックとか歩行グラフィック使うのも実装したい
 * 
 * @command showMessage
 * @text 文章の表示/showMessage
 * @desc 選択肢と文章を同時に表示する場合は、
 * このコマンドを使用してください。
 * 
 * @arg text
 * @desc 表示する文章/text
 * @type multiline_string
 * 
 * @arg speakerName
 * @text 名前/name
 * @desc 会話しているキャラの名前
 * @type string
 * 
 * @arg face
 * @text 顔グラフィック/face
 * @type file
 * @dir img/faces/
 * 
 * @arg faceIndex
 * @text 顔番号/faceNumber
 * @desc 顔グラフィックの番号/faceNumber
 * @type number
 * @default 0
 * @max 7
 * 
 * @arg positionType
 * @text 表示位置/position
 * @type select
 * @option 上/Top
 * @value 0
 * @option 中/Center
 * @value 1
 * @option 下/Bottom
 * @value 2
 * @default 2
 * 
 * @arg background
 * @text 背景/background
 * @type select
 * @option ウィンドウ/window
 * @value 0
 * @option 暗くする
 * @value 1
 * @option 透明
 * @value 2
 * @default 0
 * 
 * @command customChoice
 * @text 選択肢/customChoice
 * @desc スイッチで表示を切り替えられる選択肢です。
 *  
 * @arg basicParam
 * @text 基本設定/BasicParam
 * @desc 結果の代入先などを設定します
 * @type struct<ChoiceBasicParam>
 * @default {"variableId":"19","displayMode":"choice","cancelEnabled":"true","cursorSave":"0"}
 * 
 * @arg list
 * @text 選択肢リスト/choiceList
 * @type struct<SimpleChoiceItem>[]
 * @default []
 * 
 * @command commonEventChoice
 * @text コモンイベントの選択/commonEventChoice
 * @desc 選択肢の処理の後、対応したコモンイベントを呼び出します。
 * Process the choices and call the corresponding common event.
 * @arg basicParam
 * @text 基本設定/basicParam
 * @desc 表示形式などを指定します。
 * (変数の番号の指定は無視されます)
 * @type struct<ChoiceBasicParam>
 * @default {"variableId":"19","displayMode":"choice","cancelEnabled":"true","cursorSave":"0"}
 * 
 * @arg list
 * @text 選択肢リスト/choiceList
 * @type struct<CommonEventChoiceItem>[]
 * @default []

 * 
 * @command memberChoice
 * @text パーティメンバーの選択/memberChoice
 * @desc 現在のパーティメンバーの中から一人を選択します。
 * 変数へ選択したアクターのIDが代入されます。
 * 
 * @arg basicParam
 * @text 基本設定
 * @desc 結果の代入先などを設定します
 * @type struct<ChoiceBasicParam>
 * @default {"variableId":"19","displayMode":"choice","cancelEnabled":"true","cursorSave":"0"}
 * 
 * @arg fillterConditionExpr
 * @text 判定式
 * @desc リストの除外判定に使います。trueの物のみ表示します。
 * aという変数にアクターが入っています(ダメージ式と同じ)
 * @type multiline_string
 * @default true
 * 
 * @command ActorChoice
 * @text アクターの選択
 * @desc パーティの内外を指定して、アクターの選択肢を表示します。
 * 
 * @arg basicParam
 * @text 基本設定/basicParam
 * @desc 表示形式などを指定します。
 * @type struct<ChoiceBasicParam>
 * @default {"variableId":"19","displayMode":"choice","cancelEnabled":"true","cursorSave":"0"}
 * 
 * @arg isOutMember
 * @text パーティ外メンバーを表示
 * @type boolean
 * @default true
 * 
 * @arg isInMember
 * @text パーティ内メンバーを表示
 * @type boolean
 * @default false
 *  
 * @arg list
 * @text 表示するアクターのリスト
 * @type struct<ActorChoice>[]
 * @default ["{\"actor\":\"1\",\"switchId\":\"0\"}","{\"actor\":\"2\",\"switchId\":\"0\"}","{\"actor\":\"3\",\"switchId\":\"0\"}","{\"actor\":\"4\",\"switchId\":\"0\"}","{\"actor\":\"5\",\"switchId\":\"0\"}","{\"actor\":\"6\",\"switchId\":\"0\"}","{\"actor\":\"7\",\"switchId\":\"0\"}","{\"actor\":\"8\",\"switchId\":\"0\"}"]
 * 
 * @command ActorAdd
 * @text パーティに追加する/memberAdd
 * @desc 控えキャラクターをパーティに加えることに特化した内容です。
 * 加入処理まで自動で行います。
 * 
 * @arg basicParam
 * @text 基本設定/BasicParam
 * @desc 結果の代入先などを設定します
 * @type struct<ChoiceBasicParam>
 * @default {"variableId":"19","displayMode":"choice","cancelEnabled":"true","cursorSave":"0"}
 * 
 * @arg list
 * @text アクター一覧/actorList
 * @type struct<ActorChoice>[]
 * @default ["{\"actor\":\"1\",\"switchId\":\"0\"}","{\"actor\":\"2\",\"switchId\":\"0\"}","{\"actor\":\"3\",\"switchId\":\"0\"}","{\"actor\":\"4\",\"switchId\":\"0\"}","{\"actor\":\"5\",\"switchId\":\"0\"}","{\"actor\":\"6\",\"switchId\":\"0\"}","{\"actor\":\"7\",\"switchId\":\"0\"}","{\"actor\":\"8\",\"switchId\":\"0\"}"]
 * 
 * @command getMemberCount
 * @text パーティ人数の取得/getMemberCount
 * @desc memberRemoveの補助用コマンドです
 * 
 * @arg variableId
 * @text 保存先変数/variableId
 * @type variable
 * @default 0
 * 
 * @command memberRemove
 * @text パーティから外す/memberRemove
 * @desc 警告：パーティメンバーが一人の時はエラーが発生します。
 * warning: An error will occur if there is only one party member.：パーティメンバーが一人の時はエラーが発生します。
 * 
 * 
 * @arg basicParam
 * @text 基本設定/basicParam
 * @desc 表示形式などを指定します。
 * @type struct<ChoiceBasicParam>
 * @default {"variableId":"19","displayMode":"choice","cancelEnabled":"true","cursorSave":"0"}
 * 
 * @command classChoice
 * @text 職業の選択/classChoice
 * @desc 職業を一つ選び、そのIDを変数に保存します。
 * Select one profession and save its ID in a variable.
 * 
 * @arg basicParam
 * @text 基本設定/basicParam
 * @desc 表示形式などを指定します。
 * @type struct<ChoiceBasicParam>
 * @default {"variableId":"19","displayMode":"choice","cancelEnabled":"true","cursorSave":"0"}
 * 
 * 
 * @arg list
 * @text 職業リスト/classList
 * @desc 職業の一覧です。
 * @type struct<classItem>[]
 * @default ["{\"classId\":\"1\",\"switchId\":\"0\"}","{\"classId\":\"2\",\"switchId\":\"0\"}","{\"classId\":\"3\",\"switchId\":\"0\"}","{\"classId\":\"4\",\"switchId\":\"0\"}","{\"classId\":\"5\",\"switchId\":\"0\"}","{\"classId\":\"6\",\"switchId\":\"0\"}","{\"classId\":\"7\",\"switchId\":\"0\"}","{\"classId\":\"8\",\"switchId\":\"0\"}"]
 * 
 * @command classChange
 * @text 職業の変更/classChange
 * @desc 対象のアクターの職業を変更します。
 * 
 * @arg basicParam
 * @text 基本設定/basicParam
 * @desc 表示形式などを指定します。
 * @type struct<ChoiceBasicParam>
 * @default {"variableId":"19","displayMode":"choice","cancelEnabled":"true","cursorSave":"0"}
 * 
 * @arg actorIdVariable
 * @text アクターIDを入れる変数/actorId
 * @type variable
 * @default 17
 * 
 * @arg keepExp
 * @text レベルの保持/keepExp
 * @type boolean
 * @default false
 * 
 * @arg list
 * @text 職業リスト/classList
 * @desc 職業の一覧です。
 * @type struct<classItem>[]
 * @default ["{\"classId\":\"1\",\"switchId\":\"0\"}","{\"classId\":\"2\",\"switchId\":\"0\"}","{\"classId\":\"3\",\"switchId\":\"0\"}","{\"classId\":\"4\",\"switchId\":\"0\"}","{\"classId\":\"5\",\"switchId\":\"0\"}","{\"classId\":\"6\",\"switchId\":\"0\"}","{\"classId\":\"7\",\"switchId\":\"0\"}","{\"classId\":\"8\",\"switchId\":\"0\"}"]
 * 
*/
/*~struct~ChoiceBasicParam:
 * @param variableId
 * @text 結果を保存する変数/variable
 * @desc 選択肢に埋め込まれた数値が代入されます。
 * キャンセル時は数値を変更しません。
 * @type variable
 * @default 19
 * 
 * @param displayMode
 * @text 表示方法/displayMode
 * @type select
 * @option 選択肢(無効項目は非表示)
 * @value choice
 * @default choice
 * 
 * @param cancelEnabled
 * @text キャンセルの許可/cancelEnabled
 * @desc 取り消しボタンを許可するかどうかを決定します。
 * @type boolean
 * @default true
 * 
 * @param cursorSave
 * @text カーソル位置の記憶/cursorSave
 * @desc カーソル初期位置を指定した変数の内容で決めます。
 * 指定しない場合、カーソルは先頭で開始します。
 * @type variable
 * @default 0
*/

/*~struct~SimpleChoiceItem:
 * @param name
 * @text 項目名/Name
 * @type string
 * 
 * @param value
 * @text 戻り値/Value
 * @desc 選択肢が選ばれた場合に変数に入力する数値を指定します。
 * @type number
 * @min -999999
 * 
 * @param switchId
 * @text スイッチ/enableSwitch
 * @desc スイッチがONの場合のみ有効化します。
 * Enabled only when Switch is ON.
 * @type switch
 * @default 0
*/
/*~struct~CommonEventChoiceItem:
 * @param name
 * @text 項目名/Name
 * @type string
 * @default コモンイベント
 * 
 * @param value
 * @text コモンイベント/commonEvent
 * @desc 選択肢が選ばれた場合に呼び出すコモンイベント
 * @type common_event
 * 
 * @param switchId
 * @text スイッチ/enableSwitch
 * @desc スイッチがONの場合のみ有効化します。
 * Enabled only when Switch is ON.
 * @type switch
 * @default 0
*/
/*~struct~ActorConditon:
 * 
 * @param isStateAffected
 * @text ステートが付与されている
 * @type state[]
 * @default []
 * 
 * @param isnotStateAffected
 * @text ステートが付与されていない
 * @type state[]
 * @default []
 * 
 * @param expr
 * @text 判定式
 * @desc リストの除外判定に使います。trueの物のみ表示します。
 * aという変数にアクターが入っています(ダメージ式と同じ)
 * @type multiline_string
 * @default true
*/

//酒場から引っ張り出す時に使う
/*~struct~ActorChoice:
 * 
 * @param actor
 * @text アクター/actor
 * @desc アクターを指定します。
 * 指定した物のみがリストに表示されます。
 * @type actor
 * @default 1
 * 
 * @param switchId
 * @text switch番号
 * @desc 加入フラグ用です。ONの場合のみリストに表示します。
 * 指定しない場合、常に表示します。
 * @type switch
 * @default 0
 * 
 * 
 * 
*/
/*~struct~classItem:
 *
 * @param classId
 * @text 職業/class
 * @type class
 * @default 1
 * 
 * @param help
 * @text 説明分/helpText
 * @desc ヘルプ画面用の文章(現在未実装)
 * @type string
 * 
 * @param switchId
 * @text 有効化スイッチ/switch
 * @type switch
 * @default 0
 * 
*/

/*~struct~ChoiceItemEX:
 * @param name
 * @text 項目名/ItemName
 * @type string
 * 
 * @param valueExpr
 * @text JS: 戻り値/returnValue
 * @desc この項目が選ばれた場合に代入する式を設定します。
 * @type string
 * @default 200+400
 * 
 * @param condtion
 * @text 条件式/condition
 * @desc この項目を有効にするための条件を指定します。
 * Set the conditions for enabling this item.
 * @default return true;
 * 
*/

(function(){

    "use strict";
const PLUGIN_NAME='Mano_ChoiceCustom';

function evalTemp(item,expr){
    const a =item;
    return !!(eval(expr));
}

    class I_ChoiceItem{
        constructor(){
            this._enabled =true;
        }
        /**
         * @param {Boolean} value 
         */
        setEnabled(value){
            this._enabled =this._enabled && value;
        }

        /**
         * @param {Number} valueId 
         */
        setSwitchId(valueId){
            if(valueId >0){
                this.setEnabled( $gameSwitches.value(valueId));
            }
        }

        /**
         * @param {String} evalText 
         */
        evalCondition(evalText){
            const item = this.item();
            this.setEnabled(!!evalTemp( item,evalText ));
        }

        isEnabled(){
            return this._enabled;
        }
        item(){
            return null;
        }
        name(){
            return "";
        }
        value(){
            return 0;
        }
        helpText(){
            return "";
        }
        /**
         * @param {Window_Help} helpWindow 
         */
        writeHelp(helpWindow){
            helpWindow.setText(this.helpText());
        }

        /**
         * @returns {Game_Actor}
         */
        actor(){
            return null;
        }
    }


class ChoiceItem_Actor extends I_ChoiceItem{
    /**
     * 
     * @param {Game_Actor} actor 
     */
    constructor(actor){
        super();
        this.setActor(actor)
    }
    /**
     * @param {Game_Actor} actor 
     */
    setActor(actor){
        this._actor =actor;
    }

    item(){
        return this._actor;
    }
    /**
     * @returns {String}
     */
    name(){
        return this._actor.name();
    }

    actor(){
        return this._actor;
    }
    value(){
        return this._actor.actorId();
    }
}

class I_Choice {
    /**
     * @returns {string[]}
     */
    choiceList(){
        return [];
    }
    cancelType(){
        return -2;
    }
    canCancel(){
        return true;
    }
    getValue(index){
        return 0;
    }
    getCanceledValue(){
        return 0;
    }
    defaultIndex(){
        return 0;
    }
}

class SimpleChoiceItem extends I_ChoiceItem{
    /**
     * 
     * @param {String} name 
     * @param {Number} value 
     */
    constructor(name,value){
        super();
        this.setName(name);
        this.setValue(value);
        this.setHelpText("");
    }
    /**
     * 
     * @param {String} help 
     */
    setHelpText(help){
        this._helpText = help;
    }
    /**
     * @param {String} name 
     */
    setName(name){
        this._name = name;
    }
    name(){
        return this._name;
    }
    helpText(){
        return this._helpText;
    }
    /**
     * @param {Number} value 
     */
    setValue(value){
        this._value =value;
    }
    value(){
        return this._value;
    }

}

class ChoiceSimple extends I_Choice{
    constructor(){
        super();
        this.setList([]);
        this.setCursorMemory(0);
        this.setTargetVaribale(0);
    }
    /**
     * @param {Number} variableId 
     */
    setCursorMemory(variableId){
        this._cursorMemoryVariable =variableId;
    }
    /**
     * @param {Number} variableId 
     */
    setTargetVaribale(variableId){
        this._variableId = variableId;
    }
    setConditionExpr(expr){
        for (const iterator of this._list) {
            iterator.evalCondition(expr);
        }
    }
    /**
     * @param {I_ChoiceItem[]} list 
     */
    setList(list){
        this._list =list;
    }

    /**
     * @returns {string[]}
     */
    choiceList(){
        return this._list.map(item=>{
            return item.name()
        });
    }

    removeDisabledItem(){
        const newList =this._list.filter(item=>{return item.isEnabled()});
        this.setList(newList );
    }
    defaultIndex(){
        const value=$gameVariables.value(this._cursorMemoryVariable);
        if(value >0){
            return value;
        }
        return 0;
    }
    item(index){
        return this._list[index];
    }
    makeChoiceMessage(){
        this.makeChoiceMessageEX((item)=>{
            this.saveResult(item.value());
        });
    }
    /**
     * @param {Number} value 
     */
    saveResult(value){
        $gameVariables.setValue(this._variableId,value);
    }
    /**
     * @param {(item:I_ChoiceItem)=>void} func 
     */
    makeChoiceMessageEX(func){
        this.removeDisabledItem();
        if(this._list.length>0){
            $gameMessage.setChoices(
                this.choiceList(),
                this.defaultIndex(),
                this.cancelType()
            );
            $gameMessage.setChoiceCallback( n =>{
                const item = this.item(n);
                if(item){
                    this.saveCursor(n);
                    func(item);
                }
            });
        }
    }

    cancelType(){
        return -2;
    }
    saveCursor(index){
        $gameVariables.setValue(this._cursorMemoryVariable,index);
    }
}

function parseList(listText){
    /**
     * @type {String[]}
     */
    const textList =JSON.parse(listText);
    const objList = textList.map( t =>{return JSON.parse(t)});
    return objList;

}

function parseBasicArg(argText){
    const arg = JSON.parse(argText);
    return {
        variableId:Number(arg.variableId)||0,
        cursorSave:Number(arg.cursorSave)||0,
        displayMode:String(arg.displayMode) ,
        enabledExpr:String(arg.enabledExpr||""),
    };
}
/**
 * @returns {Game_Actor}
 * @param {*} arg 
 */
function actorFromArg(arg){
    const vId= (arg.actorIdVariable);
    const actorId = $gameVariables.value(vId);
    return $gameActors.actor(actorId);
}

function createCusutomChoice(arg){
    const param = parseBasicArg(arg.basicParam);
    const choice = new ChoiceSimple();
    choice.setCursorMemory(param.cursorSave);
    choice.setTargetVaribale(param.variableId);
    return choice;
}
function customChoice(arg){
    const list =parseList(arg.list).map(obj=>{
        const item = new SimpleChoiceItem( obj.name,Number(obj.value) );
        item.setSwitchId(Number(obj.switchId));
        return item;
    });
    const choice = createCusutomChoice(arg);
    choice.setList(list);
    choice.makeChoiceMessage();
}

/**
 * @param {*} arg 
 * @param {Game_Interpreter} interpreter 
 */
function customChoiceCommonEvent(arg,interpreter){
    const choice = createCusutomChoice(arg);
    const list =parseList(arg.list).map(obj=>{
        const item = new SimpleChoiceItem( obj.name,Number(obj.value) );
        item.setSwitchId(Number(obj.switchId));
        return item;
    });

    choice.setList(list);
    choice.makeChoiceMessageEX((item)=>{
        const commonEventId = item.value();
        const eventCode= $dataCommonEvents[commonEventId];
        if(eventCode){
            const eventId = interpreter.isOnCurrentMap() ? interpreter.eventId():0;
            interpreter.setupChild(eventCode.list,eventId);
        }
    });
}
/**
 * 
 * @param {Game_Actor} a 
 * @param {String} expr 
 */
function evalActor(a,expr){
    return !!(eval(expr));

}

function createMemberList(){
    /**
     * @type {Game_Actor[]}
     */
    const members =$gameParty.members();
    const list = members.map( (actor)=>{
        return new ChoiceItem_Actor(actor);
    });
    return list;
}

function memberChoice(arg){
    const choice = createCusutomChoice(arg);
    const list = createMemberList();
    choice.setList(list);
    for (const iterator of list) {
        iterator.setEnabled( evalActor(iterator.item(),arg.fillterConditionExpr));
    }
    choice.makeChoiceMessage();
}

function createActorList(listText){
    const list = parseList(listText).map((obj)=>{
        const actorId = Number(obj.actor);
        const actor =$gameActors.actor(actorId);
        if(actor){
            const actorChoice = new ChoiceItem_Actor(actor);
            actorChoice.setSwitchId(Number(obj.switchId));
            return actorChoice
        }
        throw new Error("存在しないアクターが指定されました");
    });
    return list;
}

function actorChoice(arg){
    const choice = createCusutomChoice(arg);
    const list =createActorList(arg.list);

    //あとで実装する
    const removeOutMember= (arg.isOutMember==='true');
    const removeInMember =(arg.isInMember ==="true");
    const members =$gameParty.members();
    const finalList =list.filter((ac)=>{
        const actor = ac.actor();
        const isInMember = members.includes(actor);
        if(removeInMember){
            if(isInMember){
                return false;
            }
        }
        if(removeOutMember){
            if(!isInMember){
                return false;
            }
        }
        return true;
    });

    choice.setList(finalList);
    choice.makeChoiceMessage();
}
function actorAdd(arg){
    const choice = createCusutomChoice(arg);
    const list =createActorList(arg.list);
    const members = $gameParty.members();
    choice.setList(list.filter(item=>{
        if(item){
            const actor = item.actor();
            if(actor){
                return !members.includes(actor);
            }
        }
        return false;
    }));
    choice.makeChoiceMessageEX((item)=>{
        $gameParty.addActor(item.value());
        choice.saveResult(item.value());
    });
}
function memberRemove(arg){
    const list = createMemberList();
    if(list.length <=1){
        const msg = $gameSystem.isJapanese() ? 
            "パーティメンバーが1人だけです。":
            "There is only one party member.";
        throw new Error(msg);
    }
    const choice = createCusutomChoice(arg);
    choice.setList(list);
    choice.makeChoiceMessageEX(item =>{
        const value = item.value();
        $gameParty.removeActor(value);
        choice.saveResult(value);
    });
}
function createClassList(listText){
    const list = parseList(listText).map((obj)=>{
        const classId = Number(obj.classId);
        const class_ =$dataClasses[classId];
        const className =class_ ? class_.name : "";
        const item = new SimpleChoiceItem(className,classId);
        item.setHelpText(obj.help);
        return item;
    });
    return list;
}

function classChoice(arg){
    const choice = createCusutomChoice(arg);
    const list = createClassList(arg.list);
    choice.setList(list);
    choice.makeChoiceMessage();
}

function classChange(arg){
    const actor = actorFromArg(arg);
    if(actor){
        const choice = createCusutomChoice(arg);
        const list = createClassList(arg.list);
        choice.setList(list);
        choice.makeChoiceMessageEX(item=>{
            const classId = item.value();
            const keepExp = arg.keepExp ==="true";
            actor.changeClass(classId,keepExp);
            choice.saveResult(classId);
        });
    }
}
/**
 * @param {Game_Interpreter} inter 
 */
function setWait(inter){
    inter.setWaitMode("message");
}
function showMessage(arg){
    $gameMessage.setFaceImage(arg.face,Number(arg.faceIndex));
    $gameMessage.setBackground(Number(arg.background));
    $gameMessage.setPositionType(Number(arg.positionType));
    $gameMessage.setSpeakerName(arg.speakerName);
    $gameMessage.add(arg.text);
}
PluginManager.registerCommand(PLUGIN_NAME,"showMessage",showMessage);

PluginManager.registerCommand(PLUGIN_NAME,"commonEventChoice",function(arg){
    customChoiceCommonEvent(arg,this);
    setWait(this);
});

PluginManager.registerCommand(PLUGIN_NAME,"customChoice",function(arg){
     customChoice(arg);
     setWait(this);
});

PluginManager.registerCommand(PLUGIN_NAME,"memberChoice",function(arg){
    memberChoice(arg);
    setWait(this);
});
PluginManager.registerCommand(PLUGIN_NAME,"ActorChoice",function(arg){
    actorChoice(arg);
    setWait(this);
});

PluginManager.registerCommand(PLUGIN_NAME,"ActorAdd",function(arg){
    actorAdd(arg);
    setWait(this);
});

PluginManager.registerCommand(PLUGIN_NAME,"memberRemove",function(arg){
    memberRemove(arg);
    setWait(this);
});
PluginManager.registerCommand(PLUGIN_NAME,"getMemberCount",(arg)=>{
    const variableId = Number(arg.variableId);
    if(variableId > 0){
        const value = $gameParty.members().length;
        $gameVariables.setValue(variableId,value);
    }
})

PluginManager.registerCommand(PLUGIN_NAME,"classChoice",function(arg){
    classChoice(arg);
    setWait(this);
});

PluginManager.registerCommand(PLUGIN_NAME,"classChange",function(arg){
    classChange(arg);
    setWait(this);
});

})();
