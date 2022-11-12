//@ts-check
//=============================================================================
// Mano_JoyStick.js
// ----------------------------------------------------------------------------
// Copyright (c) 2022-2022 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ver 0.9.0 2022/11/12
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================



/*:
 * @plugindesc ジョイスティックの入力を扱えるようにします。
 * @author しぐれん(https://github.com/Sigureya/RPGmakerMV)
 * @url https://raw.githubusercontent.com/Sigureya/RPGmakerMZ/master/Mano_InputConfig.js
 * 
 * @target MZ
 * @orderAfter VisuMZ_1_OptionsCore
 * @orderAfter MOG_TitleSplashScreen
 * 
 * @command ShowConfig
 * 
 * @param commandCols
 * @type number
 * @min 1
 * @default 2
 * 
 * @param optionCommandName
 * @text コンフィグ:項目名
 * @default アナログスティック設定
 * @param applySetting
 * @type struct<Command>
 * @default {"name":"設定を保存","description":"設定を保存します。"}
 * @parent optionCommandName
 * 
 * @param resetSetting
 * @type struct<Command>
 * @default {"name":"リセット","description":"初期設定に戻します。"}
 * @parent optionCommandName
 * 
 * @param axesTest
 * @type struct<Command>
 * @default {"name":"入力検知","description":"スティックを操作して割り当てを決定します。"}
 * @parent optionCommandName
 * 
 * @param resetSettingsName
 * @default 設定を初期化する
 * @parent optionCommandName
 * 
 * @param resetDescription
 * @default 初期設定に戻します
 * 
 * @param joyStickR
 * @type struct<JoyStick>
 * @default {"variableX":"0","variableY":"0","scele":"5"}
 * 
 * 
 * @param test
 * @type note
 * @desc 入力テストモードで表示する文字(2行まで)
 * @default 入力を確認中。確定する場合、スティックを倒したまま決定。
 * 
 * @help
 * ゲームパッドのアナログスティックの入力を取得可能にします。
 * 以下の機能を提供します。
 * ・左右のスティックの入力状態を検知。
 * ・スティックの状態を変数へ書き込み。
 * ・DirectInput形式のゲームパッド使用時に十字キーとスティックの両方が使用可能。
 * ・スティックの軸割り当て設定によって、多数のゲームパッドへ対応。
 * 
 * プラグインパラメータで、書き込み先の変数を指定します。
 * 
*/
/*~struct~Command:
 * @param name
 * @text コマンド名/CommandName
 * 
 * @param description
 * @text 説明文/Description
 * 
 * 
*/
/*~struct~JoyStick:
 * @param variableX
 * @text 変数X/VariableX
 * @type variable
 * @default 0
 * 
 * @param variableY
 * @text 変数Y/VariableY
 * @type variable
 * @default 0
 * 
 * @param scale
 * @type number
 * @desc スティックから受け取った値に乗算を行います。
 * @decimals 4
 * @default 5.0000
 * 
*/


/*~struct~Picuture:
 * 
 * @param pictureId
 * @type number
 * @default 0
 * 
 * @param image
 * @type file
 * @dir img/pictures/
 * 
 * @param moveScale
 * @type number
 * @default 10
 * 
 * @param homeX
 * @type number
 * @default 0
 * 
 * @param homeY
 * @type number
 * @default 0
 */


(function(){
    'use strict';

/**
 * @typedef {object} JoyStickConfigItem
 * @property {number} index
 */
//TODO:データの取得、この部分を変える
//optionにクラス埋め込むのはアレだが、他に手が無い

/**
 * @typedef {object} JoyStickConfig
 * @property {number} rx
 * @property {number} ry
 * @property {number} lx
 * @property {number} ly
 * @property {number} dxAxes DirectInput形式で使う軸
 */
/**
 * @typedef {object} JoyStickAxesConcept
 * @property {(gamepad:Gamepad)=>number} tiltX
 * @property {(gamepad:Gamepad)=>number} tiltY
 * @property {(gamepad:Gamepad)=>boolean} isLeftPressed
 * @property {(gamepad:Gamepad)=>boolean} isRightPressed
 * @property {(gamepad:Gamepad)=>boolean} isUpPressed
 * @property {(gamepad:Gamepad)=>boolean} isDownPressed
 * @property {()=>boolean} isDPAD
 */

/**
 * @typedef {object} CommandItem
 * @property {string} name
 * @property {string} description
 * @property {string} symbol
 */
/**
 * @typedef {Readonly<CommandItem>} ConstCommandItem
 */

/**
 * @typedef {object} CommandList
 * @property {ConstCommandItem} resetSettings
 * @property {ConstCommandItem} test
 * @property {ConstCommandItem} apply
 */

/**
 * @typedef {object} WordSet
 * @property {string} axesNoSignal 
 * @property {string} optionCommandName
 * 
 */

/**
 * @param {Gamepad} gamepad
 * @param {number} axesIndex
 * @param {number} threshold
 */
function readAxes(gamepad,axesIndex,threshold){

    const axes = (gamepad.axes[axesIndex] || 0) ;
    return Math.abs(axes) > threshold ? axes : 0;
}

/**
 * @type {String}
 */
const  PLUGIN_NAME= ('Mano_JoyStick');
function getParam(){ return PluginManager.parameters(PLUGIN_NAME);  }

const CONIFG_KEY="JOYSTICK_CONFIG";


class Joystick_DirectAxes{
    tiltX(){
        return 0;
    }
    tiltY(){
        return 0;
    }
    isDPAD(){
        //DPAD扱いの部分を全部受け取れるようにする
        return  true;
    }
    /**
     * @param {Gamepad} gamepad 
     */
    isLeftPressed(gamepad){
        return false;
    }
    /**
     * @param {Gamepad} gamepad 
     */
    isRightPressed(gamepad){
        return false;
    }
    /**
     * @param {Gamepad} gamepad 
     * @returns 
     */
    isUpPressed(gamepad){
        return false;
    }
    /**
     * @param {Gamepad} gamepad 
     * @returns 
     */
    isDownPressed(gamepad){
        return false;
    }
    
}

class Joystick_Axes{
    /**
     * 
     * @param {number} indexX 
     * @param {number} indexY 
     * @param {number} buttonId
     */
    constructor(indexX,indexY,buttonId){
        this.setAxesIndexX(indexX);
        this.setAxesIndexY(indexY);
        this.setDpadMode(false);
        this._buttonId =buttonId;
    }
    /**
     * @param {number} index 
     */
    setAxesIndexX(index){
        this._indexX=index;
    }

    /**
     * @param {number} index 
     */
    setAxesIndexY(index){
        this._indexY=index;

    }
    indexX(){
        return this._indexX;
    }
    indexY(){
        return this._indexY;
    }
    /**
     * @param {boolean} value 
     */
    setDpadMode(value){
        this._dpadMode=value;
    }
    isDPAD(){
        return this._dpadMode;
    }

    threshold(){
        return 0.5;
    }

    isStickPressed(){
        return false;
    }

   
    /**
     * @private
     * @param {number} value 
     */
    normalizeBytTresholdvalue(value){
        return Math.abs(value) > this.threshold() ? value:0;
    }
    /**
     * 
     * @param {Gamepad} gamepad 
     * @returns 
     */
    tiltX(gamepad){
        const value = gamepad.axes[this._indexX];
        return this.normalizeBytTresholdvalue(value);
    }
    /**
     * 
     * @param {Gamepad} gamepad 
     * @returns 
     */
    tiltY(gamepad){
        const value = gamepad.axes[this._indexY];
        return this.normalizeBytTresholdvalue(value);
    }


    /**
     * @private
     * @param {Gamepad} gamepad 
     * @param {number} index 
     * @param {number} threshold
     */
    isPressedDetail(gamepad,index,threshold){
        const value = (gamepad.axes[index]);
        return  (value > threshold) && //一定以下のぐらつきを排除 + NaNの時に先行して消す
                (threshold * value) > 0; //閾値と向きのチェック
    }
    /**
     * @param {Gamepad} gamepad 
     * @returns {boolean}
     */
    isLeftPressed(gamepad){
        return this.isPressedDetail(gamepad,this._indexX,-this.threshold());
    }

    /**
     * @param {Gamepad} gamepad 
     * @returns {boolean}
     */
    isRightPressed(gamepad){
        return this.isPressedDetail(gamepad,this._indexX,this.threshold());
    }
    /**
     * @param {Gamepad} gamepad 
     * @returns {boolean}
     */
    isUpPressed(gamepad){
        return this.isPressedDetail(gamepad,this._indexY,-this.threshold());
    }
    /**
     * @param {Gamepad} gamepad 
     * @returns {boolean}
     */
    isDownPressed(gamepad){
        return this.isPressedDetail(gamepad,this._indexY,this.threshold());
    }


}

class AxesWriterBase{
    /**
     * 
     * @param {string} name 
     */
    constructor(name){
        /**
         * @readonly
         */
        this._name=name;

    }
    name(){
        return this._name;
    }
    /**
     * @param {number} index 
     */
    setIndex(index){

    }
    getIndex(){
        return -1
    }
}

class AxesWriterX extends AxesWriterBase{
    /**
     * 
     * @param {Joystick_Axes} axes 
     * @param {string} name
     */
    constructor(axes,name){
        super(name);
        this._axes=axes;
    }
    /**
     * @param {number} index 
     */
    setIndex(index){
        this._axes.setAxesIndexX(index);
    }
    getIndex(){
        return this._axes.indexX();
    }
}
class AxesWriterY extends AxesWriterBase{
    /**
     * 
     * @param {Joystick_Axes} axes 
     * @param {string} name
     */
    constructor(axes,name){
        super(name);
        this._axes=axes;
    }
    /**
     * @param {number} index 
     */
    setIndex(index){
        this._axes.setAxesIndexY(index);
    }
    getIndex(){
        return this._axes.indexY();

    }
}


class JoyStickMapper{
    
    constructor(){
        /**
         * @type {Readonly<[Joystick_Axes,Joystick_Axes,Joystick_DirectAxes]>}
         */
         this._axesXX=[
            new Joystick_Axes(0,1,10),
            new Joystick_Axes(2,3,11),
            new Joystick_DirectAxes()
        ];
        this.refreshDPadAxes();
        this._signX = 0;
        this._signY = 0;
    }


    /**
     * @returns {Joystick_DirectAxes}
     */
    dpadXXX(){
        return this._axesXX[2];
    }
    joyRight(){
        return this._axesXX[1];
    }
    joyLeft(){
        return this._axesXX[0]
    }
    /**
     * @returns {ReadonlyArray<AxesWriterBase>}
     */
    createTemporaryMapper(){
        const left = this.joyLeft();
        const right = this.joyRight();

        return [
            new AxesWriterX(left,"LX"),
            new AxesWriterY(left,"LY"),
            new AxesWriterX(right,"RX"),
            new AxesWriterY(right,"RY")
        ];
    }
        /**
     * 
     * @returns {JoyStickConfig}
     */
    createConfig(){
        const right = this.joyRight();
        const left = this.joyLeft();
        return {
            rx:right.indexX(),
            ry:right.indexY(),
            lx:left.indexX(),
            ly:left.indexY(),
            dxAxes:9,
        };
    }
    /**
     * @param {JoyStickConfig} config 
     */
    applyConfig(config){
        if(config){
            const right = this.joyRight();
            right.setAxesIndexX(config.rx);
            right.setAxesIndexY(config.ry);
            const left = this.joyLeft();
            left.setAxesIndexX(config.lx);
            left.setAxesIndexY(config.ly);    
        }
    }
    
    /**
     * @param {number} index 
     * @returns {JoyStickAxesConcept}
     */
    itemAt(index){
        return this._axesXX[index];
    }
    maxItems(){
        return this._axesXX.length;
    }
    refreshDPadAxes(){
        /**
         * @type {ReadonlyArray<JoyStickAxesConcept>}
         */
        this._dpadAxes = this._axesXX.filter( function(g){ return g.isDPAD()});
    }

    /**
     * @param {Gamepad} gamepad 
     */
    updateSign(gamepad){
        let signX=0;
        let signY=0;
        for (const iterator of this._dpadAxes) {
            if(iterator.isDPAD()){
                if(signX ===0){
                    const left = iterator.isLeftPressed(gamepad) ? 1:0;
                    const right = iterator.isRightPressed(gamepad)? 1:0;
                    signX = left - right;
                }
                if(signY ===0){
                    const up = iterator.isUpPressed(gamepad) ? 1:0;
                    const down = iterator.isDownPressed(gamepad)? 1:0;
                    signY = up - down;
                }
            }
        }
        this._signX = signX;
        this._signY = signY;
    }

    signX(){
        return this._signX;
    }
    signY(){
        return this._signY;
    }
}


class JoyStickListenerBase{
    /**
     * 
     * @param {JoyStickAxesConcept} axes 
     * @param {Gamepad} gamepad 
     */
    updateListner(axes,gamepad){

    }
    onSceneCreate(){}
}

class JoyListner_Picture extends JoyStickListenerBase{
    /**
     * @param {string} filename
     * @param {number} pictureId 
     * 
     * @param {number} scale 
     */
    constructor(filename,pictureId,scale){
        super();
        this._pictureId = pictureId;
        this._scale = scale;
        this._filename=filename;
    }
    /**
     * 
     * @param {string} objText 
     */
    static create(objText){
        const obj =JSON.parse(objText);
        const filename =obj.image;
        const pictureId =Number(obj.pictureId);
        return new JoyListner_Picture(filename,pictureId,10);

    }
    /**
     * @param {JoyStickAxesConcept} axes 
     * @param {Gamepad} gamepad 
     */
    updateListner(axes,gamepad){
        const picture =$gameScreen.picture(this._pictureId);
        if(picture){
            const x = axes.tiltX(gamepad);
            const y = axes.tiltY(gamepad);
            //@ts-ignore
            picture._x = ( ( x * this._scale) + picture._x).clamp(0,Graphics.boxWidth);
            //@ts-ignore
            picture._y = ( ( y * this._scale) + picture._y).clamp(0,Graphics.boxHeight);
        }
    }
    onSceneCreate(){
        this.showPicuture();
    }
    showPicuture(){
        const picuture =$gameScreen.picture(this._pictureId);
        if(picuture && picuture.name() ===this._filename){
            return;
        }
        $gameScreen.showPicture(this._pictureId,this._filename,0,0,0,100,100,255,0);
    }
}

class JoyListner_Variable extends JoyStickListenerBase{
    /**
     * 
     * @param {number} variableX 
     * @param {number} variableY 
     */
    constructor(variableX,variableY){
        super();
        this._variableX = variableX;
        this._variableY = variableY;
        this.setScale(5);

    }
    /**
     * @param {string} objText 
     * @returns 
     */
    static create(objText){
        const obj =JSON.parse(objText);
        const x = Number(obj.variableX);
        const y = Number(obj.variableY);
        const scale= Number(obj.scale);

        const result= new JoyListner_Variable(x,y);
        result.setScale(scale);
        return result;
    }
    /**
     * @param {number} scale 
     */
    setScale(scale){
        this._scale = scale;

    }

    scale(){
        return this._scale;
    }
    /**
     * @param {JoyStickAxesConcept} axes 
     * @param {Gamepad} gamepad 
     */
    updateListner(axes,gamepad){
        const x= axes.tiltX(gamepad);
        const y= axes.tiltY(gamepad);
        const scale = this.scale();
        if(this._variableX > 0){
            $gameVariables._data[this._variableX] = x * scale;
        }
        if(this._variableY > 0){
            $gameVariables._data[this._variableY] = y * scale;
        }
    }

}

class AxesListnerFactory{
    constructor(){
        /**
         * @type {Map<string,ReadonlyArray<JoyStickListenerBase>>}
         */
        this._map = new Map();

    }
    /**
     * @param {string} sceneName 
     */
    get(sceneName){
        return this._map.get(sceneName);
    }

    /**
     * 
     * @param {string} sceneName 
     * @param {ReadonlyArray<JoyStickListenerBase>} list 
     */
    set(sceneName,list){
        this._map.set(sceneName,list);
    }
}


class GamepadState{
    constructor(){
        this.clear();
    }
    /**
     * 
     * @param {Readonly<Gamepad>} gamepad 
     */
    set(gamepad){
        /**
         * @type {ReadonlyArray<number>}
         */
        this._axes = Array.from(gamepad.axes);
        this._name= gamepad.id;
        this._conected=true;
        this._numButtons = gamepad.buttons.length;
    }
    isContected(){
        return this._conected;
    }
    clear(){
        this._axes =[];
        this._name="";
        this._conected=false;
    }
    descriptionText(){
        return `name:${this.name()}\nbuttons:${this._numButtons.toString().padStart(2)}`
    }
    name(){
        return this._name;
    }
    numAxes(){
        return this._axes.length;
    }
    /**
     * @param {number} index 
     * @returns 
     */
    axesValue(index){
        return this._axes[index] ||0;
    }
    /**
     * 
     * @param {number} index 
     * @returns 
     */
    isEnabled(index){
        return this.axesValue(index) !==0;
    }
    maximumValueIndex(){
        let lastIndex=0;
        let lastValue=-1;
        for(let index = 0; index < this._axes.length;++index){
            const abs = Math.abs(this.axesValue(index));
            if(abs <=1 && abs > lastValue){
                lastIndex = index;
                lastValue =abs;
            }
        }
        return lastIndex;
    }
}

class JoyStickManager_T{

    /**
     * @param {Readonly<WordSet>} word
     * @param {Readonly<CommandList>} commnad
     * @param {ReadonlyMap<string,ReadonlyArray<JoyStickListenerBase>>} listenerMap 
     */
    constructor(word,commnad,listenerMap){
        this._word =word;
        this._command =commnad;
        this._gamepad = new GamepadState();
        this._listnersMap=listenerMap;
        this._joyStickMapper = new JoyStickMapper()
        //シーンごとに割り振りできるシステム
        /**
         * @type {JoyStickListenerBase[]}
         */
        this._listners =[];
        this.changePadStateCopyMode(false);
    }
    word(){
        return this._word;
    }
    commandList(){
        return this._command;
    }
    isGamepadConected(){
        return this._gamepad.isContected();
    }
    gamepad(){
        return this._gamepad;
    }
    createMapperTemporay(){
        return this._joyStickMapper.createTemporaryMapper();
    }
    /**
     * @param {boolean} value 
     */
    changePadStateCopyMode(value){
        this._needsAxesStateCopy=value;
        this._gamepad.clear();
    }
    startConfigScene(){
        SceneManager.push(Scene_JoyStickConfig);
        this.changePadStateCopyMode(true);
    }


    /**
     * @param {number} index
     * @param {JoyStickListenerBase} listener 
     */
    setXXX(index,listener){
        this._listners[index] = listener;
    }
    /**
     * @param {Gamepad} gamepad 
     */
    update(gamepad){
        if(this._needsAxesStateCopy){
            this._gamepad.set(gamepad);
        }
        this._joyStickMapper.updateSign(gamepad);
        this.updateListener(gamepad);
        
    }
    /**
     * 
     * @param {Gamepad} gamepad 
     */
    updateListener(gamepad){
        const length = Math.min(this._listners.length,this._joyStickMapper.maxItems());
        for(let i =0; i < length;++i){
            const listener =this._listners[i] ;
            if(listener){
                const axes = this._joyStickMapper.itemAt(i);
                if(axes){
                    listener.updateListner(axes,gamepad);
                }
            }
        }

    }
    createConfig(){
        return this._joyStickMapper.createConfig();
    }
    /**
     * @param {JoyStickConfig} config 
     */
    applyConfig(config){
        this._joyStickMapper.applyConfig(config);
    }
    resetConfig(){
        this.applyConfig({
            dxAxes:-1,
            lx:0,
            ly:1,
            rx:2,
            ry:3,
        });
    }

    signX(){
        return this._joyStickMapper.signX();
    }
    signY(){
        return this._joyStickMapper.signY();
    }
    /**
     * 
     * @param {string} sceneName 
     */
    onSceneCreate(sceneName){
        const list = this._listnersMap.get(sceneName);
        if(list){
            this._listners =Array.from(list);
        }else{
            this._listners =[];
        }
        for (const iterator of this._listners) {
            if(iterator){
                iterator.onSceneCreate();
            }
        }
    }
}



const JoyStickManager=(function(){

    /**
     * 
     * @returns {Readonly<CommandItem>}
     * @param {string} symbol
     * @param {string} text 
     */
    function createCommandItem(symbol,text){
        const obj=JSON.parse(text);
        return {
            description:String(obj.description),
            name:String(obj.name),
            symbol:symbol,
        };
    }


    const param = getParam();

    /**
     * @type {CommandList}
     */
    const command ={
        resetSettings:createCommandItem("reset",param.resetSetting),
        apply:createCommandItem("save",param.applySetting),
        test:createCommandItem("test",param.axesTest),
    };
    /**
     * @type {WordSet}
     */
    const wordSet={
        optionCommandName:String(param.optionCommandName),

        axesNoSignal:"このaxesはシグナルがありません。",
    };
    const v = JoyListner_Variable.create(param.joyStickR);
    /**
     * @type {Map<string,ReadonlyArray<JoyStickListenerBase>>}
     */
    const listenerMap =new Map();
    listenerMap.set("Scene_Map",[null,v]);
    const manager= new JoyStickManager_T(wordSet,command,listenerMap);
    return manager;
}());

class Window_AxesState extends Window_Selectable{
    update(){
        //this._list =JoyStickManager.getLastAxesState();
        this.refresh();    
        this.updateInputTest();
        super.update()
    }
    isInputTestMode(){
        return this._cursorFixed;
    }
    updateInputTest(){
        if(this.isInputTestMode()){
            const index= JoyStickManager.gamepad().maximumValueIndex();
            if(index !==this.index()){
                this.select(index);
            }
        }
    }
    startInputTestMode(){
        this.setCursorFixed(true)
    }
    endInputTestMode(){
        this.setCursorFixed(false);
    }
    /**
     * 
     * @param {number} index 
     * @returns 
     */
    axesValue(index){
        return JoyStickManager.gamepad().axesValue(index);
    }
    /**
     * @param {number} index 
     */
    isItemEnabled(index){
        return JoyStickManager.gamepad().isEnabled(index);
    }
    isCurrentItemEnabled(){
        return this.isItemEnabled(this.index());
    }
    maxItems(){
        return JoyStickManager.gamepad().numAxes();
    }
    /**
     * @param {number} index 
     */
    drawItem(index){
        const value =  this.axesValue(index);
        const rect = this.itemRectWithPadding(index);
        this.changePaintOpacity(value !==0);
        const valueText =`${( value < 0 ? "":" ")}${value.toFixed(4)}`;
        const text= `axes[${index.toString().padStart(2)}]:${valueText}`;
        this.drawText(text,rect.x,rect.y,rect.width);
    }
    updateHelp(){
        const value = this.axesValue(this.index());
        if(value ===0){
            this._helpWindow.setText(JoyStickManager.word().axesNoSignal)

        }else{
            this._helpWindow.clear();
        }
    }
}

class Window_JoyStickMapper extends Window_Selectable{
    initialize(rect){
        this._list =JoyStickManager.createMapperTemporay();
        super.initialize(rect);
    }
    updateHelp(){
    }
    activate(){
        super.activate();
        if(this._helpWindow){
            this._helpWindow.setText(JoyStickManager.gamepad().descriptionText());
        }
    }
    /**
     * @param {number} index 
     * @returns 
     */
    itemAt(index){
        return this._list[index];
    }
    currentItem(){
        return this.itemAt(this.index());
    }
    maxItems(){
        return this._list.length;
    }
    /**
     * @param {number} index 
     */
    drawItem(index){
        const item = this.itemAt(index);
        if(item){
            const rect = this.itemRectWithPadding(index);
            item.getIndex()
            this.drawAxes(rect,item.name(),item.getIndex())

        }
        
    }

    /**
     * @param {Readonly<Rectangle>} rect 
     * @param {string} name 
     * @param {number} axesIndex 
     */
    drawAxes(rect,name,axesIndex){
        const nameWidth =this.nameWidth();
        this.drawText(name,rect.x,rect.y,nameWidth);
        const axesIndexText =`axes:${axesIndex}`;
        this.drawText(axesIndexText,rect.x + nameWidth,rect.y,80,"right");
    }
    nameWidth(){
        return 200;
    }
}

/**
 * @extends {Window_Command<string>}
 */
class Window_JoyConfigCommand extends Window_Command{

    maxCols(){
        return 2
    }
    updateHelp(){
        super.updateHelp();
        this._helpWindow.setText(this.currentExt()||"");
    }
    drawItem(index){
        const rect = this.itemRectWithPadding(index);
        this.drawText(this.commandName(index,),rect.x,rect.y,rect.width);
    }
    hideCursor(){
        this.cursorVisible=false;
    }
    activate(){
        super.activate();
        this.cursorVisible=true;
    }
    /**
     * 
     * @param {Readonly<CommandItem>} word 
     * @param {boolean} enabled
     */
    addCommandWord(word,enabled=true){
        this.addCommand(word.name,word.symbol,enabled,word.description);

    }
    makeCommandList(){
        const command = JoyStickManager.commandList();
        const coneted = JoyStickManager.gamepad().isContected();
        this.addCommand("直接設定","axes",coneted,"Axes設定を直接行います。");
        this.addCommandWord(command.test);
        this.addCommandWord(command.resetSettings);
        //this.addCommandWord(command.apply);

    }
}

class Scene_JoyStickConfig extends Scene_MenuBase{
    createAllWindows(){
        this.createHelpWindow();
        this.createAxesStateWindow();
        this.createCommandWindow();
        this.createMapperWindow();
    }
    create(){
        super.create();
        this.createAllWindows();
    }
    joyStickWindowWidth(){
        return 300;
    }
    joyStickStateWindowRect(){
        const width =this.joyStickWindowWidth();
        const height= this.mainAreaHeight();
        return new Rectangle(Graphics.boxWidth-width,this.mainAreaTop(),width,height);
    }
    commandWindowRect(){
        const mapperHeight=this.mapperWindowHeight();
        const width =Graphics.boxWidth -this.joyStickWindowWidth();
        const height = this.mainAreaHeight()-mapperHeight;
        const y = this.mainAreaTop()+mapperHeight;
        return new Rectangle(0,y,width,height);
    }
    mapperWindowHeight(){
        return this.calcWindowHeight(5,true);
    }
    mapperWindowRect(){

        const width =Graphics.boxWidth -this.joyStickWindowWidth();
        const height = this.mapperWindowHeight();
        return new Rectangle(0,this.mainAreaTop(),width,height);        
    }

    createCommandWindow(){
        const word = JoyStickManager.commandList();
        const rect = this.commandWindowRect();
        const cmd = new Window_JoyConfigCommand(rect);
        cmd.setHelpWindow(this._helpWindow);
        cmd.select(0);
        cmd.deactivate();
        cmd.setHandler("cancel",this.onCommandCancel.bind(this));
        cmd.setHandler("axes",this.commandAxes.bind(this));
        cmd.setHandler(word.test.symbol,this.commandTest.bind(this));
        cmd.setHandler(word.resetSettings.symbol,this.commandReset.bind(this));

        cmd.hideCursor();
        cmd.refresh();
        this._commandWindow=cmd;
        this.addWindow(cmd);
    }
    onCommandCancel(){
        this._commandWindow.hideCursor();
        this._mapperWindow.activate();

    }
    commandAxes(){
        this._axesStateWindow.endInputTestMode();
        const mapperItem= this._mapperWindow.currentItem();
        if(mapperItem){
            const axesIndex =mapperItem.getIndex();
            if((0 <= axesIndex && axesIndex < this._axesStateWindow.maxItems())){
                this._axesStateWindow.select(axesIndex);
            }else{
                this._axesStateWindow.select(0);
            }
        }
        this._axesStateWindow.activate();
    }
    commandTest(){
        this._axesStateWindow.startInputTestMode();
        this._axesStateWindow.activate();
    }
    commandReset(){
        JoyStickManager.resetConfig();
        this._mapperWindow.refresh();
        this._commandWindow.activate();
    }

    createAxesStateWindow(){
        const rect = this.joyStickStateWindowRect();
        const jssw = new Window_AxesState(rect);
        jssw.setHandler("ok",this.onAxesOk.bind(this));
        jssw.setHandler("cancel",this.onAxesCancel.bind(this));
        jssw.setHelpWindow(this._helpWindow);

        this.addWindow(jssw);
        this._axesStateWindow = jssw;
    }
    onAxesOk(){
        this._axesStateWindow.endInputTestMode();
        const item= this._mapperWindow.currentItem();
        if(item){
            const target =this._axesStateWindow.index();
            item.setIndex(target);
            this._mapperWindow.redrawCurrentItem();
        }
        this._axesStateWindow.deselect();
        this._commandWindow.activate();
    }
    onAxesCancel(){
        this._axesStateWindow.endInputTestMode();
        this._axesStateWindow.deselect();
        this._commandWindow.activate();

    }

    createMapperWindow(){
        const rect = this.mapperWindowRect();
        const jmw = new Window_JoyStickMapper(rect);
        jmw.setHelpWindow(this._helpWindow);
        jmw.refresh();
        jmw.select(0);
        jmw.activate();

        jmw.setHandler("ok",this.onMapperOk.bind(this));
        jmw.setHandler("cancel",this.popScene.bind(this));
        this.addWindow(jmw);
        this._mapperWindow=jmw;

    }
    onMapperOk(){
        this._commandWindow.activate();
    }
    terminate(){
        ConfigManager.save();
        super.terminate();
    }

}
const Input_updateGamepadState=Input._updateGamepadState;
Input._updateGamepadState =function(gamepad){
    Input_updateGamepadState.call(this,gamepad);
    JoyStickManager.update(gamepad);
};
const Scene_Map_create=Scene_Map.prototype.create;
Scene_Map.prototype.create =function(){
    Scene_Map_create.call(this);
    JoyStickManager.onSceneCreate(this.constructor.name);
};
const SceneManager_onSceneCreate=SceneManager.onSceneCreate;
SceneManager.onSceneCreate =function(){
    SceneManager_onSceneCreate.call(this);
    JoyStickManager.changePadStateCopyMode( this._scene.constructor.name === Scene_JoyStickConfig.name);
};
const ConfigManager_makeData=ConfigManager.makeData;
ConfigManager.makeData =function(){
    const result =ConfigManager_makeData.call(this);
    const config=JoyStickManager.createConfig();
    result[CONIFG_KEY] = config;
    return result;
};
const ConfigManager_applyData=ConfigManager.applyData;
ConfigManager.applyData =function(config){
    const joyStick = config[CONIFG_KEY];
    if(joyStick){
        JoyStickManager.applyConfig(joyStick);
    }else{
        JoyStickManager.resetConfig();
    }
    ConfigManager_applyData.call(this,config);
};
const JOY_OPTION_SYMBOL="JOYPAD";
const Window_Options_statusText=Window_Options.prototype.statusText;
Window_Options.prototype.statusText =function(index){
    const symbol = this.commandSymbol(index);
    if(symbol ===JOY_OPTION_SYMBOL){
        return "";
    }
   return Window_Options_statusText.call(this,index);
};
const Window_Options_processOk=Window_Options.prototype.processOk;
Window_Options.prototype.processOk =function(){
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if(symbol ===JOY_OPTION_SYMBOL){
        JoyStickManager.startConfigScene();
        this.playOkSound();
        return;
    }

    Window_Options_processOk.call(this);
};
const Window_Options_addVolumeOptions=Window_Options.prototype.addVolumeOptions;
Window_Options.prototype.addVolumeOptions =function(){
    Window_Options_addVolumeOptions.call(this);
    this.addCommand(JoyStickManager.word().optionCommandName,JOY_OPTION_SYMBOL);
};
PluginManager.registerCommand(PLUGIN_NAME,"ShowConfig",()=>{
    JoyStickManager.startConfigScene();
});



}())
