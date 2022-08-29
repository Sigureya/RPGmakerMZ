
/*:
 * @plugindesc 入力済みのアクターの行動を表示します。
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * @url https://raw.githubusercontent.com/Sigureya/RPGmakerMZ/master/Mano_SelectedActionView.js
 * 
 * @target MZ
 * 
 * @param rectX
 * @text ウィンドウ位置:X
 * @type number
 * @default 440
 * 
 * @param rectY
 * @text ウィンドウ位置:Y
 * @type number
 * @default 96
 * 
 * @param rectWidth
 * @text ウィンドウ:幅
 * @type number
 * @default 360
 * 
 * @param rectHeight
 * @text ウィンドウ:高さ
 * @type number
 * @default 200
 * 
 * @param fontSize
 * @text ウィンドウ:フォントサイズ
 * @type number
 * @default 26
 * 
 * @param actorNameOffsetX
 * @type number
 * @default 0
 * 
 * @param actorNameWidth
 * @type number
 * @default 400
 * 
 * @param actorNameAlgin
 * @text アクター名の揃え位置
 * @desc 名前を左右どちらに揃えるか設定します。
 * @type select
 * @option 左揃え
 * @value left
 * @option 右揃え
 * @value right
 * @default left
 * 
 * @param skillNameOffsetX
 * @type number
 * @default 140
 * 
 * @param skillNameWidth
 * @type number
 * @default 400
 * 
 * @param skillNameAlgin
 * @text スキル名の揃え位置
 * @desc 名前を左右どちらに揃えるか設定します。
 * @type select
 * @option 左揃え
 * @value left
 * @option 右揃え
 * @value right
 * @default right
 * 
 * @help
 * 入力済みのアクターの行動を表示します。
 * 表示位置は全てプラグインパラメータで設定できます。
 * 
 * MITラインセスとします。
 * ご自由にお使いください。
**/

(function(){
    'use strict';
/**
 * @type {String}
 */
const  PLUGIN_NAME= ('Mano_SelectedActionView');
function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }

const setting = (function(){
    const param =getParam();
    const result ={
        windowRect:new Rectangle(
            Number(param.rectX),
            Number(param.rectY),
            Number(param.rectWidth),
            Number(param.rectHeight)
        ),
        fontSize:Number(param.fontSize||26),

        actorNameWidth:Number(param.actorNameWidth||400),
        actorNameOffsetX:Number(param.actorNameOffsetX||0),
        actorNameAlgin:String(param.actorNameAlgin),


        skillNameWidth:Number(param.skillNameWidth||400),
        skillNameOffsetX:Number(param.skillNameOffsetX||0),
        skillNameAlgin:String(param.skillNameAlgin),
    };
    return result;
})();

class Window_SeletedAction extends Window_Selectable{


    initialize(rect){
        this.setList([]);
        super.initialize(rect);
    }
    maxItems(){
        return this._list.length;
    }
    /**
     * @param {Game_Action} action 
     */
    pushAction(action){
        const lastIndex = this.maxItems();
        this._list.push(action);
        this.redrawItem(lastIndex);
        this.select(lastIndex);
    }
    popAction(){
        if(this._list.length >0){
            const lastIndex = this.maxItems()-1;
            this.clearItem(lastIndex);
            this.select(this._index-1);
            this._list.pop();
                
        }
    }
    clearActions(){
        this._list.length=0;
        this.deselect();
        this.refresh();
    }

    /**
     * @param {Game_Action[]} list 
     */
    setList(list){
        this._list =list;
    }
    itemAt(index){
        return this._list[index];
    }
    drawItem(index){
        const action = this.itemAt(index);
        if(action){
            const rect = this.itemRect(index);
            const item = action.item();
            if(item){
                const subject = action.subject();
                const nameWidth =Math.min(setting.actorNameWidth,rect.width);
                const skillWidth =Math.min[setting.skillNameWidth,rect.width];

                this.drawText(subject.name(),rect.x + setting.actorNameOffsetX,rect.y,nameWidth,setting.actorNameAlgin);
                this.drawItemName(item,rect.x +setting.skillNameOffsetX,rect.y,skillWidth);
            }
        }

    }
}
/**
 * 
 * @param {Scene_Battle} sceneBattle 
 */
const createActionWindow=(sceneBattle)=>{
    const aw = new Window_SeletedAction(setting.windowRect);

    sceneBattle.addWindow(aw);
    //@ts-ignore
    sceneBattle._actionWindow=aw;
}

const Scene_Battle_createAllWindows =Scene_Battle.prototype.createAllWindows ;
Scene_Battle.prototype.createAllWindows =function(){
    Scene_Battle_createAllWindows.call(this);
    createActionWindow(this);
};
const Scene_Battle_hideSubInputWindows=Scene_Battle.prototype.hideSubInputWindows;
Scene_Battle.prototype.hideSubInputWindows =function(){
    Scene_Battle_hideSubInputWindows.call(this);
    this._actionWindow.hide();

};

const Scene_Battle_commandFight =Scene_Battle.prototype.commandFight
Scene_Battle.prototype.commandFight=function(){

    this._actionWindow.clearActions();
    Scene_Battle_commandFight.call(this);
};
const Scene_Battle_startActorCommandSelection=Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection =function(){
    Scene_Battle_startActorCommandSelection.call(this);
    this._actionWindow.show();
};

const Scene_Battle_onSelectAction=Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction =function(){
    const action =BattleManager.inputtingAction();
    this._actionWindow.pushAction(action);
    Scene_Battle_onSelectAction.call(this);
};
const Scene_Battle_onSkillCancel=Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel =function(){
    Scene_Battle_onSkillCancel.call(this);

};
const Scene_Battle_selectPreviousCommand=Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand =function(){
    this._actionWindow.popAction();
    Scene_Battle_selectPreviousCommand.call(this);
};

}())
