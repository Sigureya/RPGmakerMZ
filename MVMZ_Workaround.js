 class I_MVMZ_Workaround{
    /**
     * @param {Window_Base} window_ 
     * @param {Rectangle} rect 
     * @param {(window:Window_Base,rect:Rectangle)=>void} initFunction
     */
    windowInitialize(window_,rect,initFunction){
        throw(new Error("初期化処理のみ実装"));
    }
    paddingSize(){
        return 18;
    }
    lineHeight(){
        return 36;
    }
    /**
     * @param {Number} lines 
     * @returns 
     */
    calcWindowHeight(lines){
        return this.lineHeight()*lines + this.paddingSize()*2;
    }
    /**
     * 
     * @param {Window_Selectable} window 
     * @param {Number} index 
     * @returns {Rectangle}
     */
    itemRectWithPadding(window,index){
        return null;
    }
    /**
     * @param {String} commandName 
     * @param {String} args 
     */
    pluginCommandCallMV(commandName,args){
        return false;
    }
}
class PluginCommandCaller{
    /**
     * @param {String} commandName
     * @param {String[]} paramNames 
     * @param  {(arg:any)=>void} func
     */
    constructor(commandName,paramNames,func){
        this._commandName = commandName;
        this._paramNames =paramNames;
        this._func = func;
    }
    /**
     * @param {String[]} mvArgs 
     */
    makeMZ_arg(mvArgs){
        const result ={}
        const len = Math.min(mvArgs.length,this._paramNames.length);
        for(let i=0; i < len;++i){
            const paramName = this._paramNames[i];
            result[paramName] = mvArgs[i];
        }
        return result;
    }
    /**
     * @param {String[]} mvArgs 
     */
    convertCall(mvArgs){
        const argMZ = this.makeMZ_arg(mvArgs);
        this.callMZ(argMZ);

    }
    callMZ(arg){
        this._func(arg);
    }
}
class PluginManagerMV_T{
    constructor(){
        /**
         * @type {Map<String,PluginCommandCaller>}
         */
        this._map = new Map();
    }
    pluginName(){
        return PLUGIN_NAME;
    }
    /**
     * @param {String} commandName 
     * @param {String[]} paramNames
     * @param {(arg)=>void} func 
     */
    registerCommand(commandName,paramNames,func){
        if(Utils.RPGMAKER_NAME ==="MZ"){
            this.registerCommandMZ(commandName,func);
        }else if( Utils.RPGMAKER_NAME ==="MV"){
            this.registerCommandMV(commandName,paramNames,func);
        }
    }
    /**
     * @param {String} commandName 
     * @param {(arg)=>void} func 
     */
    registerCommandMZ(commandName,func){
        PluginManager.registerCommand(this.pluginName(),commandName,func);
    }
    /**
     * @param {String} commandName 
     * @param {String[]} paramNames
     * @param {(arg)=>void} func 
     */
    registerCommandMV(commandName,paramNames, func){
        const funcObj = new PluginCommandCaller(commandName,paramNames,func);
        this._map.set(commandName,funcObj);
    }
    /**
     * @description ツクールMV環境では、ここから呼び出す
     * @param {String} commandName 
     * @param {String[]} args 
     */
    callMV(commandName,args){
        const func = this._map.get(commandName);
        if(func){
            func.convertCall(args);
            return true;
        }
        return false;
    }
}
class MV_Workaround extends I_MVMZ_Workaround{
    constructor(){
        super();
        this._pluginManager = new PluginManagerMV_T();

    }
    /**
     * @param {Window_Base} window_ 
     * @param {Rectangle} rect 
     * @param {(window:Window_Base,rect:Rectangle)=>void} initFunction
     */
    windowInitialize(window_,rect,initFuncton){
        initFuncton.call(window_,rect.x,rect.y,rect.width,rect.height);
    }
    paddingSize(){
        return 18;
    }
    lineHeight(){
        return 36;
    }
    /**
     * @param {Window_Selectable} window 
     * @param {Number} index 
     * @returns {Rectangle}
     */
    itemRectWithPadding(window,index){
        return window.itemRectForText(index);
    }

    /**
     * @param {String} commandName 
     * @param {String[]} paramNames
     * @param {(arg)=>void} func 
     */
    registerCommand(commandName,paramNames,func){
        this._pluginManager.registerCommandMV(commandName,paramNames,func);
    }
    /**
     * @param {String} commandName 
     * @param {String[]} args 
     */
    pluginCommandCallMV(commandName,args){
        this._pluginManager.callMV(commandName,args);
    }
}
class Scene_MenuBase_MVMZ  extends Scene_MenuBase{
    /**
     * 
     * @returns {number}
     */
    mainAreaTop(){
        if(super.mainAreaTop){
            return super.mainAreaTop();
        }
        return 0;
    }
    /**
     * 
     * @returns {Number}
     */
    mainAreaHeight(){
        const baseHeight = (super.mainAreaHeight) ? super.mainAreaHeight():Graphics.boxHeight;

        return baseHeight
    }
    /**
     * 
     * @returns {Bitmap}
     */
    backgrongBitmap(){
        return null;
    }
    createBackground(){
        const bmp = this.backgrongBitmap();
        if(bmp){
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = bmp;
            this.addChild(this._backgroundSprite);
        }else{
            super.createBackground();
        }

    }
    lineHeight(){
        if( Utils.RPGMAKER_NAME==="MV"){
            return 26;
        }
        return 26;
    }
    paddingSize(){
        return 4;
    }
    /**
     * @param {Number} lines 
     * @returns 
     */
    calcWindowHeightEX(lines){
        return this.lineHeight() * lines + this.paddingSize()*2;
        //TODO:MZに対応して設計しつつ、MVをあれこれ
    }
}
