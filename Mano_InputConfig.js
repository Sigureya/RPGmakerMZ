//=============================================================================
// Mano_InputConfig.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017-2021 Sigureya
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// ver 10.0.0 2026/10/10
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/Sigureya/
//=============================================================================

/*:
@target MZ
@author しぐれん(https://github.com/Sigureya/RPGmakerMV)
@plugindesc ゲームの操作に関する機能をまとめて管理します。
@url https://raw.githubusercontent.com/Sigureya/RPGmakerMZ/master/Mano_InputConfig.js

@orderAfter VisuMZ_1_OptionsCore
@orderAfter MOG_TitleSplashScreen

@command GetButtonName
@text GetButton/ボタン名の取得
@desc 指定した操作がどのボタンにあるかを返します。
@arg symbol
@type select
@option ok(決定)
@value ok
@option cancel(取り消し)
@value cancel
@option shift(ダッシュ)
@value shift
@option menu(メニュー)
@value menu
@option pageup(前)
@value pageup
@option pagedown(次)
@value pagedown
@default ok

@arg nameVariable
@type variable
@desc ボタン名称を受け取る変数です。
@text ボタン名称/buttonName
@default 0

@command GetButtonNameEX
@text GetButtonEX/ボタン名の取得
@desc 指定した操作がどのボタンにあるかを返します。
@arg symbol
@type any
@desc アクションのシンボル
@default 

@arg nameVariable
@type variable
@desc ボタン名称を受け取る変数です。
@default 0

@command GamepadScene
@text GamepadScene/ゲームパッド設定を開く
@desc ゲームパッド設定のシーンを開きます。
@command KeyboardScene
@text KeyboardScene/キーボード設定を開く
@desc キーボード設定のシーンを開きます。
@param color
@type struct<ColorManager>
@text 色設定/ColorSetting
@default {"normal":"#880000","mandatory":"#22e488","move":"#22e488"}

@param basicOk
@type struct<BasicSymbol>
@text 決定/ok
@default {"mandatory":"true","name":"{\"jp\":\"決定\",\"en\":\"OK\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}

@param basicCancel
@type struct<BasicSymbol>
@text 取り消し/cancle
@default {"mandatory":"true","name":"{\"jp\":\"キャンセル\",\"en\":\"cancel\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}

@param basicShift
@type struct<BasicSymbol>
@text ダッシュ/dash
@default {"mandatory":"true","name":"{\"jp\":\"ダッシュ\",\"en\":\"dash\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}

@param basicMenu
@type struct<BasicSymbol>
@text メニュー/menu
@default {"mandatory":"true","name":"{\"jp\":\"メニュー\",\"en\":\"menu\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}

@param basicEscape
@type struct<BasicSymbol>
@text メニュー(2)/menu(2)
@default {"mandatory":"true","name":"{\"jp\":\"メニュー/キャンセル\",\"en\":\"menu/cancel\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}

@param basicPageup
@type struct<BasicSymbol>
@text 次/next
@default {"mandatory":"true","name":"{\"jp\":\"次\",\"en\":\"next\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}

@param basicPagedown
@type struct<BasicSymbol>
@text 前/prev
@default {"mandatory":"true","name":"{\"jp\":\"前\",\"en\":\"prev\"}","keyText":"{\"jp\":\"\",\"en\":\"\"}","helpText":"{\"jp\":\"\",\"en\":\"\"}"}

@param mapperDelete
@type struct<MultiLangString>
@text 設定を消去/delete
@default {"en":"delete","jp":"設定を消去"}

@param extendsMapper
@type struct<InputDefine>[]
@desc ボタンイベント・追加の入力設定の登録
@text 入力拡張/inputExtension
@default []

@param eventList
@type struct<EventDefine>[]
@desc コモンイベントの呼び出し設定(簡単版)
@text コモンイベント/CommonEvent
@default []

@param GamepadIsNotConnectedText
@type struct<MultiLangNote>
@desc ゲームパッドが接続されていない場合の文章です。
@text 未接続/GamepadIsNotConnected
@default {"jp":"ゲームパッドが接続されていません\nボタンを押して再度試してください","en":"The gamepad is not connected.\nPress the button and try again."}

@param needButtonDetouchText
@type struct<MultiLangNote>
@desc キーコンフィグはボタンから手を離さない限り終了しません。
@text ボタンから手を放すように促すメッセージ
@default {"jp":"コンフィグを終了するために、\nボタンから手を放してください。","en":"Release the button to exit the config."}

@param saveCommand
@type struct<MultiLangString>
@text 設定の保存/SaveSetting
@default {"en":"seve setting","jp":"設定を保存"}

@param saveValidTest
@type boolean
@desc 入力設定の不備がある場合、保存を禁止。
@text 設定検証/Validating the Configuration
@default true

@param saveCommandWidth
@type number
@text 幅/width
@parent saveCommand
@default 4

@param saveDescription
@type struct<MultiLangString>
@text 説明文/Description
@parent saveCommand
@default {"en":"seve setting","jp":"設定を保存"}

@param resetCommand
@type struct<MultiLangString>
@default {"en":"reset","jp":"初期設定に戻す"}

@param resetWidth
@type number
@parent resetCommand
@default 4

@param resetDescription
@type struct<MultiLangString>
@parent resetCommand
@default {"en":"reset","jp":"初期設定に戻します。"}

@param WASDCommand
@type struct<MultiLangString>
@default {"en":"WASD","jp":"WASD"}

@param WASDwidth
@type number
@text WASD Command Width
@parent WASDCommand
@default 3

@param WASDhelp
@type struct<MultiLangString>
@parent WASDCommand
@default {"en":"seve setting","jp":"WASDのキーで移動できるようにします。"}

@param changeKeyLayoutCommand
@type struct<MultiLangString>
@text キー配置/KeyLayout
@default {"jp":"キー配置","en":"Key Layout"}

@param changeKeyLayoutCommandWidth
@type number
@parent changeKeyLayoutCommand
@default 4

@param exitCommand
@type struct<MultiLangString>
@text やめる/exit
@default {"en":"exit","jp":"やめる"}

@param exitWidth
@type number
@parent exitCommand
@default 4

@param exitHelp
@type struct<MultiLangString>
@text 説明文
@parent exitCommand
@default {"en":"exit","jp":"変更を保存せずにやめる"}

@param gamepadConfigCommandText
@type struct<MultiLangString>
@desc ゲームパッドコンフィグを開くコマンドの名前です
@default {"en":"gamepad config","jp":"ゲームパッドコンフィグ"}

@param keyConfigCommandText
@type struct<MultiLangString>
@desc キーコンフィグを開くコマンドの名前です
@default {"en":"keyboard config","jp":"キーコンフィグ"}

@param gamepadSceneBackground
@type file
@dir img/titles1/
@default 

@param keySceneBackground
@type file
@dir img/titles1/
@default 

@param SettingsForYEP_OptionsCore
@type struct<DisguiseAsYEP>
@default {"gamepad":"true","Keyboard":"true"}

*/
/*~struct~BasicSymbol:
@param mandatory
@type boolean
@text 必須扱い/mandatory
@default true

@param name
@type struct<MultiLangString>
@default {"jp":"","en":""}

@param keyText
@type struct<MultiLangString>
@desc キーコンフィグの際の表示名を定義します(空欄OK)
@text キーの表示/keyText
@default {"jp":"","en":""}

@param helpText
@type struct<MultiLangNote>
@desc 画面上部に表示する説明文
@text 詳細/helpText
@default {"jp":"","en":""}

*/
/*~struct~TouchButton:
@param image
@type file
@desc 通常時は上の半分、押されている間は下の半分が使われます。
@dir img/
@default system

@param x
@type number
@default 0

@param y
@type number
@default 0

*/
/*~struct~EventCaller:
@param id
@type common_event
@desc ボタンを押した際に呼び出すコモンイベント(マップのみ)
@text 呼び出すイベント/event
@default 0

@param inputType
@type select
@desc 呼び出し時のボタンの入力形式。
@text 入力方式/inputType
@option 押されている/pressed
@value 0
@option トリガー/triggerd
@value 1
@option リピート/repeated
@value 2
@default 0

*/
/*~struct~KeyboradSetting:
@param keys
@type string
@desc 半角英字で設定。例 Ef65
@default 

@param exKeys
@type any
@desc 文字以外の特殊なキーを割り当てる場合に使用します。
@text 追加のキー
@default []

@param text
@type struct<MultiLangString>
@desc キーコンフィグの際の表示名を定義します(空欄OK)
@text キーの表示/keyText
@default {"jp":"","en":""}

*/
/*~struct~AdvancedSetting:
@param symbol
@type string
@desc ボタンを押した場合の動作(上級者向け)
@text シンボル/symbol
@default 

@param overwrite
@type select
@desc どのボタンのシンボルを基準にするか
@text 上書き/overwrite
@option 上書きしない/none
@value 0
@option ゲームパッド/gamepad
@value 1
@option キーボード/Keyboard
@value 2
@option イベント/event
@value 3
@default 0

@param mandatory
@type boolean
@text 必須フラグ/mandatory
@default false

*/
/*~struct~EventDefine:
@param key
@type select
@option none/設定無し
@value 
@option A
@value A
@option B
@value B
@option C
@value C
@option D
@value D
@option E
@value E
@option F
@value F
@option G
@value G
@option H
@value H
@option I
@value I
@option J
@value J
@option K
@value K
@option L
@value L
@option M
@value M
@option N
@value N
@option O
@value O
@option P
@value P
@option Q
@value Q
@option R
@value R
@option S
@value S
@option T
@value T
@option U
@value U
@option V
@value V
@option W
@value W
@option X
@value X
@option Y
@value Y
@option Z
@value Z
@default 

@param keyText
@type struct<MultiLangString>
@desc キーコンフィグの際に表示するテキスト
@default {"jp":"","en":""}

@param button
@type select
@desc ボタン設定。配置と名前は任天堂のスタイルを想定。
@text パッドボタン/padButton
@option none
@value NaN
@option 0(B/×)
@value 0
@option 1(A/○)
@value 1
@option 2(X/□)
@value 2
@option 3(Y/△)
@value 3
@option 4(L1)
@value 4
@option 5(R1)
@value 5
@option 6(L2)
@value 6
@option 7(R2)
@value 7
@option 8(select)
@value 8
@option 9(start)
@value 9
@option 10(L3)
@value 10
@option 11(R3)
@value 11
@option 16(center)
@value 16
@default NaN

@param name
@type struct<MultiLangString>
@desc 言語別に行動の説明を入力します
@text 行動名/actionName
@default {"jp":"","en":""}

@param helpText
@type struct<MultiLangString>
@desc 画面上部に表示する説明文
@text 詳細/helpText
@default {"jp":"","en":""}

@param event
@type struct<EventCaller>
@desc ボタンを押した際にコモンイベントを実行します。
@text イベント/event
@default {"id":"0","inputType":"0"}

@param enabled
@type boolean
@desc テスト用に一時的に無効化したい場合などで使います。
@text 有効化
@default true

*/
/*~struct~InputDefine:
@param keySetting
@type struct<KeyboradSetting>
@text キー設定/keySetting
@default {"keys":"","color":"","text":"{\"jp\":\"\",\"en\":\"\"}"}

@param button
@type select
@desc ボタン設定。配置と名前は任天堂のスタイルを想定。
@text パッドボタン/padButton
@option none
@value NaN
@option 0(B/×)
@value 0
@option 1(A/○)
@value 1
@option 2(X/□)
@value 2
@option 3(Y/△)
@value 3
@option 4(L1)
@value 4
@option 5(R1)
@value 5
@option 6(L2)
@value 6
@option 7(R2)
@value 7
@option 8(select)
@value 8
@option 9(start)
@value 9
@option 10(L3)
@value 10
@option 11(R3)
@value 11
@option 16(center)
@value 16
@default NaN

@param name
@type struct<MultiLangString>
@desc 言語別に行動の説明を入力します
@text 行動名/actionName
@default {"jp":"","en":""}

@param helpText
@type struct<MultiLangString>
@desc 画面上部に表示する説明文
@text 詳細/helpText
@default {"jp":"","en":""}

@param event
@type struct<EventCaller>
@desc ボタンを押した際にコモンイベントを実行します。
@text イベント/CommonEvent
@default {"id":"0","inputType":"0"}

@param touchButton
@type struct<TouchButton>
@desc MZのみ:画面上にタッチUI向けのボタンを追加します
@text タッチボタン/touchButton
@default {}

@param adovanced
@type struct<AdvancedSetting>
@desc 多くの場合、これを変更する必要はありません。
@text 上級者向け/adovanced
@default {"symbol":"","overwrite":"0","mandatory":"false"}

@param enabled
@type boolean
@desc テスト用に一時的に無効化したい場合などで使います。
@text 有効化
@default true

*/
/*~struct~MultiLangNote:
@param jp
@type multiline_string
@text 日本語
@default 

@param en
@type multiline_string
@default 

*/
/*~struct~MultiLangNoteFull:
@param jp
@type multiline_string
@text 日本語
@default 

@param en
@type multiline_string
@default 

@param ch
@type multiline_string
@text 中文
@default 

@param ko
@type multiline_string
@text 한국
@default 

@param ge
@type multiline_string
@text Deutsche
@default 

@param fr
@type multiline_string
@text français
@default 

@param ru
@type multiline_string
@text русский
@default 

*/
/*~struct~MultiLangString:
@param jp
@type any
@text 日本語
@default 

@param en
@type any
@text English
@default 

*/
/*~struct~MultiLangStringFull:
@param jp
@type any
@text 日本語
@default 

@param en
@type any
@text English
@default 

@param ch
@type any
@text 中文
@default 

@param ko
@type any
@text 한국
@default 

@param ge
@type any
@text Deutsche
@default 

@param fr
@type any
@text français
@default 

@param ru
@type any
@text русский
@default 

*/
/*~struct~ColorManager:
@param normal
@type any
@default #880000

@param mandatory
@type any
@text 必須シンボル/mandatory
@default #22e488

@param move
@type any
@text 移動/move
@default #22e488

@param extends
@type any
@text 拡張シンボル/extends
@default #22e488

*/
/*~struct~DisguiseAsYEP:
@param gamepad
@type boolean
@desc Impersonate the configuration as if it were GamepadConfig.js (by Yanfly).
@default true

@param Keyboard
@type boolean
@desc Impersonate the configuration as if it were YEP_KeyboardConfig.js (by Yanfly).
@default true

*/
(() => {
  "use strict";
  //#region src/baseSystem/inputConfig/logic/core/pure/gamepad/items.ts
  /** ボタン項目のハンドラ名。元 .js V8Item_Button の super("button") L5252 */
  const GAMEPAD_BUTTON_HANDLER = "button";
  /**
   * 項目リストを組み立てる。元 .js makeV8Item() L5378
   * ボタンを並べたあとにコマンドが続く。この順序が添字の意味になる。
   */
  const createGamepadConfigItems = (buttons, commandHandles) => [
    ...buttons.map((button) => ({
      kind: "button",
      button,
    })),
    ...commandHandles.map((handle) => ({
      kind: "command",
      handle,
    })),
  ];
  /**
   * 指定の添字を決定したときに呼ぶハンドラ名。範囲外なら null。
   * 元 .js callOkHandler() L5432 が item.handlerSymbol() を引いている。
   */
  const handlerAt = (items, index) => {
    const item = items[index];
    if (!item) {
      return null;
    }
    return item.kind === "button" ? GAMEPAD_BUTTON_HANDLER : item.handle;
  };
  /**
   * 指定の添字が選べるか。元 .js xxOpacity() L5231 と
   * V8_Item_ApplyCommand の上書き (L5335)。
   * 保存コマンド以外は常に true。
   */
  const isItemEnabledAt = (items, index, context) => {
    const item = items[index];
    if (!item) {
      return false;
    }
    if (item.kind === "command" && item.handle === context.saveHandle) {
      return context.mapperValid;
    }
    return true;
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/gamepad/layout.ts
  /**
   * 選べるゲームパッドの配置。元 .js createGamepad() L4239
   *
   * **並びを変えてもセーブは壊れない**（symbol で保存するため）。
   * 先頭が既定の配置になる。元 .js はボタン番号が先頭だったが、ここでは Nintendo を先頭に置いている。
   */
  const createGamepadLayouts = () => [
    faceButtonLayout({
      symbol: "N",
      name: "Nintendo",
      faces: ["B", "A", "Y", "X"],
    }),
    faceButtonLayout({
      symbol: "P",
      name: "PlayStation 4",
      faces: ["×", "〇", "□", "△"],
    }),
    faceButtonLayout({
      symbol: "X",
      name: "Xbox",
      faces: ["A", "B", "X", "Y"],
    }),
    faceButtonLayout({
      symbol: "PS5",
      name: "PlayStation 5",
      faces: ["□", "×", "〇", "△"],
    }),
    buttonNumberLayout({
      symbol: "Number",
      name: "ButtonNumber",
    }),
  ];
  /** 表のボタンだけが機種で違い、残りは共通。元 .js createGamepadLayout() L4005 */
  const faceButtonLayout = (source) => ({
    symbol: source.symbol,
    name: source.name,
    layout: {
      button0: {
        name: source.faces[0],
        buttonId: 0,
      },
      button1: {
        name: source.faces[1],
        buttonId: 1,
      },
      button2: {
        name: source.faces[2],
        buttonId: 2,
      },
      button3: {
        name: source.faces[3],
        buttonId: 3,
      },
      button4: {
        name: "L1",
        buttonId: 4,
      },
      button5: {
        name: "R1",
        buttonId: 5,
      },
      button6: {
        name: "L2",
        buttonId: 6,
      },
      button7: {
        name: "R2",
        buttonId: 7,
      },
      button8: {
        name: "Select",
        buttonId: 8,
      },
      button9: {
        name: "Start",
        buttonId: 9,
      },
      button10: {
        name: "L3",
        buttonId: 10,
      },
      button11: {
        name: "R3",
        buttonId: 11,
      },
    },
  });
  const numberButton = (buttonId) => ({
    name: String(buttonId),
    buttonId,
  });
  /**
   * ボタン番号をそのまま名前にする。機種が分からないときに使う。
   * 元 .js createButtonNumberLayout() L4031
   */
  const buttonNumberLayout = (identity) => ({
    symbol: identity.symbol,
    name: identity.name,
    layout: {
      button0: numberButton(0),
      button1: numberButton(1),
      button2: numberButton(2),
      button3: numberButton(3),
      button4: numberButton(4),
      button5: numberButton(5),
      button6: numberButton(6),
      button7: numberButton(7),
      button8: numberButton(8),
      button9: numberButton(9),
      button10: numberButton(10),
      button11: numberButton(11),
    },
  });
  /**
   * レイアウトを添字で引ける配列にする。元 .js DeviceLayout.buttons() L2843
   *
   * GamepadLayout は button0〜button11 の固定フィールドで持つが、
   * コンフィグ画面は添字でボタンを選ぶため配列が要る (元 .js L5382)。
   * 保持と走査で形が違うので、変換をここ 1 箇所に置く。
   */
  const gamepadButtons = (layout) => [
    layout.button0,
    layout.button1,
    layout.button2,
    layout.button3,
    layout.button4,
    layout.button5,
    layout.button6,
    layout.button7,
    layout.button8,
    layout.button9,
    layout.button10,
    layout.button11,
  ];
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/symbol/constants.ts
  const SYSTEM_SYMBOLS = ["debug", "control", "tab"];
  const BASIC_SYMBOLS = ["ok", "cancel", "shift", "menu", "pageup", "pagedown"];
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/symbol/symbol.ts
  /**
   * 初期化にマッパーを必要としないシンボルを作る。
   * パラメータだけ、あるいはシンボル文字列だけで組み立てられるものを置く。
   */
  /** 元 .js L1600。symbol は "escape" 固定 */
  const createEscapeSymbol = (source) => ({
    kind: "escape",
    symbol: "escape",
    name: source.name,
    keyText: source.keyText,
    helpText: source.helpText,
  });
  const MOVE_SYMBOL_ARROWS = [
    {
      symbol: "up",
      arrow: "↑",
    },
    {
      symbol: "down",
      arrow: "↓",
    },
    {
      symbol: "left",
      arrow: "←",
    },
    {
      symbol: "right",
      arrow: "→",
    },
  ];
  /**
   * 移動シンボル 4 種。元 .js L1568
   * 名前は矢印固定でヘルプテキストを持たないため、変換関数だけを受け取る。
   */
  const createMoveSymbols = (toText) =>
    MOVE_SYMBOL_ARROWS.map((item) => ({
      kind: "move",
      symbol: item.symbol,
      name: toText(item.arrow),
      helpText: toText(""),
    }));
  /**
   * マッパーに配置されているが定義が無いシンボル。元 .js L2505
   * 対象のシンボル集合は呼び出し側がマッパーから導出して渡す。
   * 元 .js は name() でデバッグ文字列を組み立てていた (L2377) が、
   * 表示の都合なので再構築では持たせない。
   */
  const createUnknownSymbols = (symbols, toText) =>
    Array.from(symbols, (symbol) => ({
      kind: "unknown",
      symbol,
      name: toText(symbol),
      helpText: toText(""),
    }));
  /**
   * 標準シンボルを作る。
   * どちらのマッパーにも存在しないシンボルは生成しない。元 .js L1746
   */
  const createBasicSymbols = (sources, keySymbols, padSymbols) =>
    sources
      .filter(
        (source) =>
          keySymbols.has(source.symbol) || padSymbols.has(source.symbol),
      )
      .map((source) => createBasicSymbol(source, keySymbols, padSymbols));
  const createBasicSymbol = (source, keySymbols, padSymbols) => ({
    kind: "basic",
    symbol: source.symbol,
    name: source.name,
    keyText: source.keyText,
    helpText: source.helpText,
    mandatory:
      source.mandatory &&
      keySymbols.has(source.symbol) &&
      padSymbols.has(source.symbol),
  });
  /**
   * シンボル文字列から一覧の添字を引く。元 .js indexOfSymbol() L5125
   * 見つからなければ -1。
   */
  const indexOfSymbol = (list, symbol) =>
    list.findIndex((item) => item.symbol === symbol);
  /**
   * 選択すべき添字。元 .js selectSymbol() L5136
   * シンボルが空、または一覧に無い場合は先頭を選ぶ。
   */
  const selectIndexOfSymbol = (list, symbol) => {
    if (!symbol) {
      return 0;
    }
    const index = indexOfSymbol(list, symbol);
    return index >= 0 ? index : 0;
  };
  /**
   * 割り当て先として選べるものの一覧。**末尾に「設定を消去」を足す。**
   * 元 .js Window_InputSymbolList.makeItemList() L5192
   *
   * 消去は「空シンボルの割り当て」で表す。判別ユニオンを増やさずに済み、
   * 書き戻しの `normalizeMapper()` が空の割り当てを落とす。
   * 説明文は表示名と同じ（元 .js SymbolDeleteObject.helpText() L1591）。
   */
  const createSymbolListItems = (symbols, deleteName) => [
    ...symbols,
    {
      symbol: "",
      name: deleteName,
      helpText: deleteName,
      enabled: true,
    },
  ];
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/model.ts
  /** 多言語の解決はパラメータ読み取りで済んでいるので、ここでは素通し */
  const toText = (value) => value;
  const valuesOf = (mapper) => new Set(Object.values(mapper));
  /** マッパーに居るが定義が無いシンボルを集める */
  const unknownSymbolsOf = (mappers, known) => {
    const all = [
      ...Object.values(mappers.keyMapper),
      ...Object.values(mappers.padMapper),
    ];
    return new Set(all.filter((symbol) => !!symbol && !known.has(symbol)));
  };
  const createModel = (mappers, settings, extendsList) => {
    const basic = createBasicSymbols(
      settings.basicSymbols,
      valuesOf(mappers.keyMapper),
      valuesOf(mappers.padMapper),
    );
    const escape = createEscapeSymbol(settings.escapeSymbol);
    const move = createMoveSymbols(toText);
    const unknown = createUnknownSymbols(
      unknownSymbolsOf(
        mappers,
        new Set([
          ...BASIC_SYMBOLS,
          ...SYSTEM_SYMBOLS,
          escape.symbol,
          ...move.map((item) => item.symbol),
          ...extendsList.map((item) => item.symbol),
        ]),
      ),
      toText,
    );
    const symbols = [...basic, escape, ...extendsList, ...unknown, ...move];
    return {
      symbols,
      dictionary: new Map(symbols.map((item) => [item.symbol, item])),
      mandatory: new Set(
        [...basic, ...extendsList]
          .filter((item) => item.mandatory)
          .map((item) => item.symbol),
      ),
      colors: settings.colors,
    };
  };
  /** 選べるゲームパッドの配置。識別情報（symbol / name）は配置の定義が持つ */
  const GAMEPAD_LAYOUTS = createGamepadLayouts();
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/color.ts
  /** 元 .js のコンストラクタが `||` で補っている既定値 (L1346) */
  const DEFAULT_SYMBOL_COLOR = {
    normal: "#880000",
    mandatory: "#22e488",
    move: "#22e488",
    extends: "",
  };
  /** シンボルが割り当てられていない項目の背景色。元 .js emptyColor() L1373 */
  const EMPTY_COLOR = "#000000";
  /**
   * 未設定の項目を既定値で補う。元 .js SymbolColorManager_T.create() L1355
   * 空文字も未設定として扱う（オリジナルの `||` 準拠）。
   */
  const createSymbolColorParam = (source) => ({
    normal: source.normal || DEFAULT_SYMBOL_COLOR.normal,
    mandatory: source.mandatory || DEFAULT_SYMBOL_COLOR.mandatory,
    move: source.move || DEFAULT_SYMBOL_COLOR.move,
    extends: source.extends || DEFAULT_SYMBOL_COLOR.extends,
  });
  /**
   * 移動シンボルの色。元 .js moveSymbolColor() L1382
   * move が空なら mandatory へ倒すが、createSymbolColorParam が既定値で
   * 埋めるため、この分岐は実際には通らない（オリジナル準拠で残す）。
   */
  const moveSymbolColor = (colors) => colors.move || colors.mandatory;
  /**
   * 必須・空・通常の 3 状態から色を選ぶ。元 .js I_SymbolDefine.backColor() L1445
   */
  const stateColor = (colors, mandatory, empty) => {
    if (mandatory) {
      return colors.mandatory;
    }
    if (empty) {
      return EMPTY_COLOR;
    }
    return colors.normal;
  };
  /**
   * シンボル項目の背景色。元 .js backColor() L1445 と各派生の上書き。
   *
   * 判定の順序はオリジナル準拠:
   *   1. 個別指定の色 (ExtendsSymbol.customBackColor / KeySetting.backColor L2154)
   *   2. 必須なら mandatory
   *   3. シンボルが空なら empty
   *   4. それ以外は normal
   *
   * move は moveSymbolColor() へ (L1553)、escape は常に mandatory へ (L1641) 差し替わる。
   */
  const symbolBackColor = (symbol, colors) => {
    switch (symbol.kind) {
      case "move":
        return moveSymbolColor(colors);
      case "escape":
        return colors.mandatory;
      case "extends":
        if (symbol.customColor) {
          return symbol.customColor;
        }
        return stateColor(colors, symbol.mandatory, !symbol.symbol);
      case "basic":
        return stateColor(colors, symbol.mandatory, !symbol.symbol);
      case "unknown":
        return stateColor(colors, false, !symbol.symbol);
    }
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/keySetting/keySetting.ts
  /**
   * キー文字列をキーコード列へ変換する。
   * split("") は UTF-16 単位で分けるので、元 .js の charCodeAt によるループと一致する。
   * 元 .js iterateKeyCord() L1943
   */
  const keyCodesOf = (setting) => {
    return setting.keys
      .toUpperCase()
      .split("")
      .map((char) => char.charCodeAt(0))
      .concat(setting.exKeyCodes);
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/text/text.ts
  /**
   * 元 .js は本体の判定タイミングがおかしいという理由でコピーしてきている (L1140)。
   * $dataSystem.locale を引数で受けるため純粋になる。
   */
  const isJapanese = (locale) => /^ja/.test(locale.locale);
  /**
   * 表示に使うテキストを選ぶ。元 .js currentName() L1204
   * 日本語かつ ja が空でない場合だけ ja を使い、それ以外は en へ倒す。
   * en が空でも ja へは戻らない（オリジナル準拠）。
   */
  const selectText = (text, locale) => {
    if (isJapanese(locale) && text.ja) {
      return text.ja;
    }
    return text.en;
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/settings.ts
  const SAVE_HANDLE = "save";
  const WASD_HANDLE = "wasd";
  const RESET_HANDLE = "reset";
  const LAYOUT_HANDLE = "layout";
  const EXIT_HANDLE = "exit";
  /** パラメータが読めなかった場合に使う値 */
  const DEFAULT_SETTINGS = {
    basicSymbols: [
      {
        symbol: "ok",
        name: "決定",
        keyText: "",
        helpText: "",
        mandatory: true,
      },
      {
        symbol: "cancel",
        name: "キャンセル",
        keyText: "",
        helpText: "",
        mandatory: true,
      },
      {
        symbol: "shift",
        name: "ダッシュ",
        keyText: "",
        helpText: "",
        mandatory: false,
      },
      {
        symbol: "menu",
        name: "メニュー",
        keyText: "",
        helpText: "",
        mandatory: true,
      },
      {
        symbol: "pageup",
        name: "前のページ",
        keyText: "",
        helpText: "",
        mandatory: false,
      },
      {
        symbol: "pagedown",
        name: "次のページ",
        keyText: "",
        helpText: "",
        mandatory: false,
      },
    ],
    escapeSymbol: {
      name: "メニュー/キャンセル",
      keyText: "",
      helpText: "",
    },
    extendsSymbols: [],
    colors: DEFAULT_SYMBOL_COLOR,
    gamepadCommands: [
      {
        handle: SAVE_HANDLE,
        name: "設定を保存",
        helpText: "",
      },
      {
        handle: RESET_HANDLE,
        name: "初期設定に戻す",
        helpText: "",
      },
      {
        handle: LAYOUT_HANDLE,
        name: "ボタン表記変更",
        helpText: "",
      },
      {
        handle: EXIT_HANDLE,
        name: "やめる",
        helpText: "",
      },
    ],
    keyCommands: [
      {
        handle: SAVE_HANDLE,
        name: "設定を保存",
        width: 4,
        helpText: "",
      },
      {
        handle: WASD_HANDLE,
        name: "WASD",
        width: 3,
        helpText: "",
      },
      {
        handle: RESET_HANDLE,
        name: "初期設定に戻す",
        width: 4,
        helpText: "",
      },
      {
        handle: LAYOUT_HANDLE,
        name: "キー配置",
        width: 4,
        helpText: "",
      },
      {
        handle: EXIT_HANDLE,
        name: "やめる",
        width: 4,
        helpText: "",
      },
    ],
    optionCommands: {
      gamepad: "ゲームパッドコンフィグ",
      keyboard: "キーコンフィグ",
    },
    deleteSymbolName: "設定を消去",
    unassignedText: "未割り当て",
    lockedKeyText: "このキーは変更できません",
    symbolErrors: {
      advancedSymbolInvalid:
        "拡張シンボルは標準シンボルと異なる内容でなければいけません。",
      nameEmpty: "表示用の名称が設定されていません\nsymbol:",
    },
    backgrounds: {
      gamepad: "",
      key: "",
    },
    yep: {
      gamepad: true,
      keyboard: true,
    },
  };
  /**
   * ゲームパッド画面のコマンド 1 つ。
   * 見つからない場合は、名前にハンドラ名を出して気付けるようにする。
   */
  const gamepadCommandOf = (commands, handle) => {
    var _commands$find;
    return (_commands$find = commands.find(
      (command) => command.handle === handle,
    )) !== null && _commands$find !== void 0
      ? _commands$find
      : {
          handle,
          name: handle,
          helpText: "",
        };
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/params.ts
  const parseObject = (source) => {
    if (!source) {
      return {};
    }
    try {
      const parsed = JSON.parse(source);
      return typeof parsed === "object" && parsed !== null ? parsed : {};
    } catch (_unused) {
      return {};
    }
  };
  const asString = (value) => (typeof value === "string" ? value : "");
  /** struct の中の値も文字列なので、もう 1 段 JSON.parse が要る */
  const readMultiLang = (value) => {
    const obj = parseObject(asString(value));
    return {
      ja: asString(obj.jp),
      en: asString(obj.en),
    };
  };
  /** アノテーションの@type boolean は "true" のみ真。元 .js L1711 と同じ扱い */
  const readBoolean = (value, fallback) => {
    const text = asString(value);
    if (text === "true") {
      return true;
    }
    if (text === "false") {
      return false;
    }
    return fallback;
  };
  const BASIC_PARAM_KEYS = [
    {
      symbol: "ok",
      key: "basicOk",
    },
    {
      symbol: "cancel",
      key: "basicCancel",
    },
    {
      symbol: "shift",
      key: "basicShift",
    },
    {
      symbol: "menu",
      key: "basicMenu",
    },
    {
      symbol: "pageup",
      key: "basicPageup",
    },
    {
      symbol: "pagedown",
      key: "basicPagedown",
    },
  ];
  /** @type number は文字列で来る。壊れていれば既定値へ倒す */
  const readNumber = (value, fallback) => {
    const parsed = Number(asString(value));
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
  };
  /**
   * キー配置画面のコマンド。名前・幅・説明が別々の @param になっている。
   * 元 .js L4413 の setting と同じ組み合わせ。
   */
  const KEY_COMMAND_PARAM_KEYS = [
    {
      handle: SAVE_HANDLE,
      name: "saveCommand",
      width: "saveCommandWidth",
      help: "saveDescription",
    },
    {
      handle: WASD_HANDLE,
      name: "WASDCommand",
      width: "WASDwidth",
      help: "WASDhelp",
    },
    {
      handle: RESET_HANDLE,
      name: "resetCommand",
      width: "resetWidth",
      help: "resetDescription",
    },
    {
      handle: LAYOUT_HANDLE,
      name: "changeKeyLayoutCommand",
      width: "changeKeyLayoutCommandWidth",
      help: "",
    },
    {
      handle: EXIT_HANDLE,
      name: "exitCommand",
      width: "exitWidth",
      help: "exitHelp",
    },
  ];
  /**
   * 未割り当てを表す文言。**注釈に @param が無い。**
   * 元 .js は `params.textEmpty` を読んでいたが、その @param は定義されていない。
   */
  const UNASSIGNED_TEXT = {
    ja: "未割り当て",
    en: "not assigned",
  };
  /**
   * 変更できないキーであることを伝える文言。**注釈に @param が無い。**
   * 元 .js は変更できない理由を画面に出していなかった。
   */
  const LOCKED_KEY_TEXT = {
    ja: "このキーは変更できません",
    en: "This key cannot be changed.",
  };
  /**
   * シンボル一覧で理由を出すときの文言。**注釈に @param が無い。**
   * 元 .js createErrorTexts() L4185 が直書きしている（英語が空の行もそのまま）。
   */
  const SYMBOL_ERROR_TEXTS = [
    {
      key: "advancedSymbolInvalid",
      text: {
        ja: "拡張シンボルは標準シンボルと異なる内容でなければいけません。",
        en: "The extended symbol must differ from the basic symbols.",
      },
    },
    {
      key: "nameEmpty",
      text: {
        ja: "表示用の名称が設定されていません\nsymbol:",
        en: "The name for display is not set\nsymbol:",
      },
    },
  ];
  /**
   * ゲームパッド画面のコマンド。
   * **名前と説明はキー配置画面と同じ @param から来る。**
   * 元 .js も同じ `Key_Command` を両方の画面へ渡していた (L4413)。
   *
   * 配置切り替えだけは画面ごとに別物で、**注釈に @param が無い。**
   * 元 .js が `createButtonLayoutChangeCommand()` (L5786) に直書きしている。
   */
  const GAMEPAD_COMMAND_PARAM_KEYS = [
    {
      handle: SAVE_HANDLE,
      name: "saveCommand",
      help: "saveDescription",
      fixed: null,
    },
    {
      handle: RESET_HANDLE,
      name: "resetCommand",
      help: "resetDescription",
      fixed: null,
    },
    {
      handle: LAYOUT_HANDLE,
      name: "",
      help: "",
      fixed: {
        ja: "ボタン表記変更",
        en: "Change button notation",
      },
    },
    {
      handle: EXIT_HANDLE,
      name: "exitCommand",
      help: "exitHelp",
      fixed: null,
    },
  ];
  /**
   * YEP_OptionsCore との連携。注釈のキーは `Keyboard`（大文字始まり）である。
   * **綴りを変えると連携が黙って切れる。** 元 .js L6634
   */
  const readYepInterop = (raw) => {
    const obj = parseObject(raw.SettingsForYEP_OptionsCore);
    return {
      gamepad: readBoolean(obj.gamepad, DEFAULT_SETTINGS.yep.gamepad),
      keyboard: readBoolean(obj.Keyboard, DEFAULT_SETTINGS.yep.keyboard),
    };
  };
  const readColors = (raw) => {
    const obj = parseObject(raw.color);
    return createSymbolColorParam({
      normal: asString(obj.normal),
      mandatory: asString(obj.mandatory),
      move: asString(obj.move),
      extends: asString(obj.extends),
    });
  };
  /**
   * `struct<...>[]` は「JSON 文字列の配列」の JSON 文字列である。
   * ここで 1 段だけ解いて、要素はまだ文字列のまま返す。
   */
  const parseArray = (source) => {
    if (!source) {
      return [];
    }
    try {
      const parsed = JSON.parse(source);
      return Array.isArray(parsed)
        ? parsed.filter((item) => typeof item === "string")
        : [];
    } catch (_unused2) {
      return [];
    }
  };
  /** 入力方式。0=押しっぱなし / 1=トリガー / 2=リピート。元 .js L1875 */
  const readInputType = (value) => {
    switch (asString(value)) {
      case "1":
        return 1;
      case "2":
        return 2;
      default:
        return 0;
    }
  };
  /**
   * `struct<EventCaller>`。イベント ID が 0 以下なら「呼び出し無し」とする。
   * 元 .js isValidEvent() L1846 と同じ基準を、読み取りの時点で適用している。
   */
  const readEventCaller = (value) => {
    const obj = parseObject(asString(value));
    const eventId = Number(asString(obj.id));
    if (!Number.isFinite(eventId) || eventId <= 0) {
      return null;
    }
    return {
      eventId,
      inputType: readInputType(obj.inputType),
    };
  };
  /**
   * パッドボタン番号。未指定は注釈の `@default NaN`。
   * 空文字も未指定として扱う。**Number("") は 0 になり、B ボタンを奪ってしまう。**
   */
  const readButtonId = (value) => {
    const text = asString(value);
    if (!text) {
      return null;
    }
    const parsed = Number(text);
    return Number.isFinite(parsed) ? parsed : null;
  };
  const OVERWRITE_TYPES = [0, 1, 2, 3];
  /** `struct<AdvancedSetting>` の overwrite。範囲外は「上書きしない」へ倒す */
  const readOverwriteType = (value) => {
    var _OVERWRITE_TYPES$find;
    return (_OVERWRITE_TYPES$find = OVERWRITE_TYPES.find(
      (type) => String(type) === asString(value),
    )) !== null && _OVERWRITE_TYPES$find !== void 0
      ? _OVERWRITE_TYPES$find
      : 0;
  };
  /** 「無効化」指定。注釈の @default は true なので、"false" のときだけ落とす */
  const isDisabled = (value) => asString(value) === "false";
  /**
   * `struct<AdvancedSetting>`。元 .js AdovancedSetting.create() L1977
   * **シンボルを手書きした場合、overwrite の指定によらず上書き確定になる。**
   */
  const readAdvanced = (value) => {
    const obj = parseObject(asString(value));
    const manualSymbol = asString(obj.symbol) || null;
    return {
      manualSymbol,
      overwrite: manualSymbol ? 9 : readOverwriteType(obj.overwrite),
      mandatory: readBoolean(obj.mandatory, false),
    };
  };
  const EMPTY_ADVANCED = {
    manualSymbol: null,
    overwrite: 0,
    mandatory: false,
  };
  /** `@type select[]` は数値も文字列で来る。数にならないものは捨てる */
  const readNumberList = (value) =>
    parseArray(asString(value))
      .map((item) => Number(item))
      .filter((code) => Number.isFinite(code));
  /**
   * `struct<EventDefine>`（`eventList` の 1 件）。コモンイベント呼び出しの簡単版。
   * キーは英字 1 文字、上級者向け設定は持たない。元 .js createSimpleEventCaller() L2026
   */
  const readEventDefine = (text, toText) => {
    const obj = parseObject(text);
    if (isDisabled(obj.enabled)) {
      return null;
    }
    const event = readEventCaller(obj.event);
    if (!event) {
      return null;
    }
    return {
      name: toText(obj.name),
      keyText: toText(obj.keyText),
      helpText: toText(obj.helpText),
      buttonId: readButtonId(obj.button),
      keyCodes: keyCodesOf({
        keys: asString(obj.key),
        exKeyCodes: [],
        color: null,
      }),
      mandatory: EMPTY_ADVANCED.mandatory,
      overwrite: EMPTY_ADVANCED.overwrite,
      manualSymbol: EMPTY_ADVANCED.manualSymbol,
      event,
      customColor: null,
      touchButton: null,
    };
  };
  /**
   * `struct<TouchButton>`。マップ上に置くタッチ UI のボタン。
   * 画像が空なら null を返す。`@type file` なので値はファイル名がそのまま入る。
   * 元 .js TouchButton.create() L1236
   */
  const readTouchButton = (value) => {
    const obj = parseObject(asString(value));
    const image = asString(obj.image);
    if (!image) {
      return null;
    }
    return {
      image,
      x: readNumber(obj.x, 0),
      y: readNumber(obj.y, 0),
    };
  };
  /**
   * `struct<InputDefine>`（`extendsMapper` の 1 件）。入力拡張の本体。
   * 元 .js createExtendsSymbol() L2048
   *
   * */
  const readInputDefine = (text, toText) => {
    const obj = parseObject(text);
    if (isDisabled(obj.enabled)) {
      return null;
    }
    const keySetting = parseObject(asString(obj.keySetting));
    const advanced = readAdvanced(obj.adovanced);
    return {
      name: toText(obj.name),
      keyText: toText(keySetting.text),
      helpText: toText(obj.helpText),
      buttonId: readButtonId(obj.button),
      keyCodes: keyCodesOf({
        keys: asString(keySetting.keys),
        exKeyCodes: readNumberList(keySetting.exKeys),
        color: null,
      }),
      mandatory: advanced.mandatory,
      overwrite: advanced.overwrite,
      manualSymbol: advanced.manualSymbol,
      event: readEventCaller(obj.event),
      customColor: null,
      touchButton: readTouchButton(obj.touchButton),
    };
  };
  /**
   * プラグインパラメータから設定を組み立てる。
   * ロケールはここで解決し、以降は文字列だけを扱う。
   */
  const readSettings = (raw, locale) => {
    const text = (value) => selectText(readMultiLang(value), locale);
    const basicSymbols = BASIC_PARAM_KEYS.map((entry, index) => {
      const obj = parseObject(raw[entry.key]);
      const fallback = DEFAULT_SETTINGS.basicSymbols[index];
      return {
        symbol: entry.symbol,
        name: text(obj.name) || fallback.name,
        keyText: text(obj.keyText),
        helpText: text(obj.helpText),
        mandatory: readBoolean(obj.mandatory, fallback.mandatory),
      };
    });
    const escapeObj = parseObject(raw.basicEscape);
    const extendsSymbols = [
      ...parseArray(raw.extendsMapper).map((item) =>
        readInputDefine(item, text),
      ),
      ...parseArray(raw.eventList).map((item) => readEventDefine(item, text)),
    ].filter((item) => item !== null);
    return {
      basicSymbols,
      escapeSymbol: {
        name: text(escapeObj.name) || DEFAULT_SETTINGS.escapeSymbol.name,
        keyText: text(escapeObj.keyText),
        helpText: text(escapeObj.helpText),
      },
      extendsSymbols,
      colors: readColors(raw),
      gamepadCommands: GAMEPAD_COMMAND_PARAM_KEYS.map((entry, index) => {
        const fallback = DEFAULT_SETTINGS.gamepadCommands[index];
        return {
          handle: entry.handle,
          name: entry.fixed
            ? selectText(entry.fixed, locale)
            : text(raw[entry.name]) || fallback.name,
          helpText: entry.help ? text(raw[entry.help]) : "",
        };
      }),
      keyCommands: KEY_COMMAND_PARAM_KEYS.map((entry, index) => {
        const fallback = DEFAULT_SETTINGS.keyCommands[index];
        return {
          handle: entry.handle,
          name: text(raw[entry.name]) || fallback.name,
          width: readNumber(raw[entry.width], fallback.width),
          helpText: entry.help ? text(raw[entry.help]) : "",
        };
      }),
      optionCommands: {
        gamepad:
          text(raw.gamepadConfigCommandText) ||
          DEFAULT_SETTINGS.optionCommands.gamepad,
        keyboard:
          text(raw.keyConfigCommandText) ||
          DEFAULT_SETTINGS.optionCommands.keyboard,
      },
      deleteSymbolName:
        text(raw.mapperDelete) || DEFAULT_SETTINGS.deleteSymbolName,
      unassignedText: selectText(UNASSIGNED_TEXT, locale),
      lockedKeyText: selectText(LOCKED_KEY_TEXT, locale),
      symbolErrors: {
        advancedSymbolInvalid: selectText(SYMBOL_ERROR_TEXTS[0].text, locale),
        nameEmpty: selectText(SYMBOL_ERROR_TEXTS[1].text, locale),
      },
      backgrounds: {
        gamepad: asString(raw.gamepadSceneBackground),
        key: asString(raw.keySceneBackground),
      },
      yep: readYepInterop(raw),
    };
  };
  /**
   * デバイス記号からレイアウトの添字を引く。元 .js selectOfSymbol() L2909
   * 該当が無ければ LAYOUT_NOT_FOUND。
   */
  const indexOfDeviceSymbol = (layouts, deviceSymbol) =>
    layouts.findIndex((layout) => layout.symbol === deviceSymbol);
  /**
   * 添字に対応するデバイス記号。範囲外なら空文字。
   * セーブデータへ書き出すときに使う。元 .js deviceSymbol() L2851
   */
  const deviceSymbolAt = (layouts, index) => {
    var _layouts$index$symbol, _layouts$index2;
    return (_layouts$index$symbol =
      (_layouts$index2 = layouts[index]) === null || _layouts$index2 === void 0
        ? void 0
        : _layouts$index2.symbol) !== null && _layouts$index$symbol !== void 0
      ? _layouts$index$symbol
      : "";
  };
  /**
   * セーブデータのデバイス記号から、実行中に使う添字を求める。
   *
   * 元 .js の selectOfSymbol() は該当が無いと -1 を入れ、
   * currentLayout() が undefined を返す状態のまま動き続けていた (L2915)。
   * 添字で持つ以上その状態は扱いづらいので、見つからなければ先頭へ倒す。
   */
  const resolveLayoutIndex = (layouts, deviceSymbol) => {
    const index = indexOfDeviceSymbol(layouts, deviceSymbol);
    return index === -1 ? 0 : index;
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/eventCall.ts
  /** コモンイベント ID が設定されているか。元 .js isValidEvent() L1845 */
  const isValidEvent = (event) => !!event && event.eventId > 0;
  /**
   * 入力種別に応じて、いま呼び出すべきかを判定する。
   * 元 .js needsEventCall() L1874
   */
  const needsEventCall = (event, symbol, judge) => {
    switch (event.inputType) {
      case 0:
        return judge.isPressed(symbol);
      case 1:
        return judge.isTriggered(symbol);
      case 2:
        return judge.isRepeated(symbol);
      default:
        return false;
    }
  };
  const isCallNeeded = (symbol, judge) => {
    if (!symbol.event || !isValidEvent(symbol.event)) {
      return false;
    }
    return needsEventCall(symbol.event, symbol.symbol, judge);
  };
  /**
   * 予約すべきコモンイベント ID。該当が無ければ null。
   *
   * 元 .js callButtonEvent() L2519 は拡張シンボルを順に見て、
   * 既にコモンイベントが予約されていたら中断していた。
   * 予約は不純な操作なので、ここでは最初に該当したものの ID を返すだけにする。
   * 呼び出し側が「未予約なら予約する」を担当すれば同じ結果になる。
   */
  const eventIdToReserve = (symbols, judge) => {
    var _symbols$find$event$e, _symbols$find;
    return (_symbols$find$event$e =
      (_symbols$find = symbols.find((symbol) =>
        isCallNeeded(symbol, judge),
      )) === null ||
      _symbols$find === void 0 ||
      (_symbols$find = _symbols$find.event) === null ||
      _symbols$find === void 0
        ? void 0
        : _symbols$find.eventId) !== null && _symbols$find$event$e !== void 0
      ? _symbols$find$event$e
      : null;
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/grid.ts
  /**
   * 添字の総数と列数から行数を出す。
   * **同じ項目が複数の添字を占める画面でもそのまま使える。**
   * 幅の広いキーは占めるぶんだけ添字を持っているので、総数で割れば行数になる。
   */
  const gridRowCount = (maxItems, maxCols) =>
    maxCols > 0 ? Math.ceil(maxItems / maxCols) : 0;
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/input/buttonName.ts
  /**
   * symbol が割り当てられている最初のボタンの名前。無ければ null。
   *
   * 元 .js は同じ symbol が複数のボタンに割り当てられていても
   * 一覧の先頭で見つけたものを返す (L3021)。ここでも並び順で決める。
   */
  const buttonNameOfSymbol = (buttons, mapper, symbol) => {
    if (!symbol) {
      return null;
    }
    const found = buttons.find((button) => mapper[button.id] === symbol);
    return found ? found.name : null;
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/key/help.ts
  /** 「キー」と「割り当て」の区切り */
  const SEPARATOR = " : ";
  /** 2 行目を足す。無ければ 1 行のまま（空行を作らない） */
  const withSecondLine = (head, second) =>
    second ? `${head}\n${second}` : head;
  /**
   * キー 1 つのヘルプ。**1 行目に割り当て、2 行目に説明。**
   *
   * ヘルプ欄は 2 行ぶんの高さがある（コアの `helpAreaHeight()` が
   * `calcWindowHeight(2, false)`）ので、説明があれば 2 行目へ入る。
   * 改行は `drawTextEx()` がそのまま扱う。
   *
   * **説明が無いキーのほうが多い。** シンボルの `helpText` は
   * パラメータの任意項目で、既定は空である。そのときは 1 行だけになる。
   *
   * **変更できないキーは、2 行目を理由に差し替える。**
   * 決定しても音が鳴るだけなので、**押す前に分かるようにする。**
   * シンボルの説明よりも「変更できない」ほうが先に要る情報である。
   */
  const keyHelpText = (source, texts) => {
    const assigned = source.symbolName || texts.unassigned;
    const head = source.keyName
      ? `${source.keyName}${SEPARATOR}${assigned}`
      : "";
    if (!source.editable) {
      return head ? withSecondLine(head, texts.locked) : texts.locked;
    }
    return withSecondLine(head, source.description);
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/key/key.ts
  /**
   * 割り当てを変更できるキーか。元 .js isEnabled() L3411
   * Enter・上下左右（37〜40）・Ctrl(17) 以下を除外する。
   */
  const isKeyEnabled = (key) =>
    (key.code < 37 || 40 < key.code) && key.code > 17;
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/key/items.ts
  /**
   * 項目の一覧を作る。元 .js pushCommad() L2130
   *
   * **幅の広い項目は、同じ項目オブジェクトを繰り返して並べる。**
   * 幅は個数で表され、範囲の判定は参照の同一性で行う（window/key.ts の spanOf）。
   * 配置表も Space のように同じキーを繰り返すので、キー側にも同じ扱いが要る。
   * 添字ごとに新しいオブジェクトを作ると、幅の広いキーとコマンドが
   * **1 マスずつに割れてしまう**（描画もカーソル移動も 1 マス単位になる）。
   */
  const createKeyConfigItems = (keys, commands) => {
    const keyItems = /* @__PURE__ */ new Map();
    return [
      ...keys.map((key) => {
        const found = keyItems.get(key);
        if (found) {
          return found;
        }
        const item = {
          kind: "key",
          key,
        };
        keyItems.set(key, item);
        return item;
      }),
      ...commands.flatMap((command) => {
        const item = {
          kind: "command",
          command,
        };
        return Array.from({ length: Math.max(1, command.width) }, () => item);
      }),
    ];
  };
  /** 添字の項目。範囲外は null */
  const keyItemAt = (items, index) => {
    var _items$index;
    return (_items$index = items[index]) !== null && _items$index !== void 0
      ? _items$index
      : null;
  };
  /** 添字のハンドラ名。キーや範囲外なら null */
  const keyHandlerAt = (items, index) => {
    const item = keyItemAt(items, index);
    return item && item.kind === "command" ? item.command.handle : null;
  };
  /**
   * 選べる項目か。元 .js isEnabled() L3411 と isCurrentItemEnabled() L6013
   * コマンドは常に選べる。キーは編集できるものだけ。
   */
  const isKeyItemEnabled = (items, index) => {
    const item = keyItemAt(items, index);
    if (!item) {
      return false;
    }
    return item.kind === "command" ? true : isKeyEnabled(item.key);
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/key/layouts/keys.ts
  const keyChar = (char) => ({
    char,
    code: char.charCodeAt(0),
  });
  const keyInfo = (char, code) => ({
    char,
    code,
  });
  const KEYS = {
    NULL: keyInfo("", 0),
    /** JIS の Enter。名前を出すのはこの 1 マスだけ */
    ENTER_JIS: keyInfo("Enter", 13),
    /**
     * Enter が占める 2 マス目以降。**カーソルはここに止まらない。**
     * 来たら同じ方向へもう 1 回動く（`scene/windows/pure/key.ts` の移動）。
     * 名前を出さないのは、1 つの矩形に「Enter」を重ねて描かないためである。
     */
    ENTER_JIS_NULL: keyInfo("", 13),
    ENTER_US: keyInfo("Enter", 13),
    SPACE: keyInfo("Space", 32),
    SHIFT: keyInfo("Shift", 16),
    CTRL: keyInfo("CTRL", 17),
    UP: keyInfo("↑", 38),
    DOWN: keyInfo("↓", 40),
    LEFT: keyInfo("←", 37),
    RIGHT: keyInfo("→", 39),
    TENKEY0: keyInfo("0", 96),
    TENKEY1: keyInfo("1", 97),
    TENKEY2: keyInfo("2", 98),
    TENKEY3: keyInfo("3", 99),
    TENKEY4: keyInfo("4", 100),
    TENKEY5: keyInfo("5", 101),
    TENKEY6: keyInfo("6", 102),
    TENKEY7: keyInfo("7", 103),
    TENKEY8: keyInfo("8", 104),
    TENKEY9: keyInfo("9", 105),
    TENKEY_DOT: keyInfo(".", 110),
    TENKEY_MINUS: keyInfo("-", 109),
    TENKEY_PLUS: keyInfo("+", 107),
    _0: keyChar("0"),
    _1: keyChar("1"),
    _2: keyChar("2"),
    _3: keyChar("3"),
    _4: keyChar("4"),
    _5: keyChar("5"),
    _6: keyChar("6"),
    _7: keyChar("7"),
    _8: keyChar("8"),
    _9: keyChar("9"),
    A: keyChar("A"),
    B: keyChar("B"),
    C: keyChar("C"),
    D: keyChar("D"),
    E: keyChar("E"),
    F: keyChar("F"),
    G: keyChar("G"),
    H: keyChar("H"),
    I: keyChar("I"),
    J: keyChar("J"),
    K: keyChar("K"),
    L: keyChar("L"),
    M: keyChar("M"),
    N: keyChar("N"),
    O: keyChar("O"),
    P: keyChar("P"),
    Q: keyChar("Q"),
    R: keyChar("R"),
    S: keyChar("S"),
    T: keyChar("T"),
    U: keyChar("U"),
    V: keyChar("V"),
    W: keyChar("W"),
    X: keyChar("X"),
    Y: keyChar("Y"),
    Z: keyChar("Z"),
    TAB: keyInfo("TAB", 9),
    INSERT: keyInfo("Ins", 45),
    BACK: keyInfo("Back", 8),
    HOME: keyInfo("Home", 36),
    END: keyInfo("End", 35),
    PAGEUP: keyInfo("PgUp", 33),
    PAGEDOWN: keyInfo("PgDn", 34),
    ESC: keyInfo("esc", 27),
    ATMARK: keyInfo("@", 192),
    MINUS: keyInfo("-", 189),
    COMMA: keyInfo(",", 188),
    SEMICOLON: keyInfo(";", 186),
    SLASH: keyInfo("/", 191),
    BACKSLASH: keyInfo("\\", 226),
    DOT: keyInfo(".", 190),
    COLON: keyInfo(":", 58),
    CARET: keyInfo("^", 222),
    APOSTROPHE: keyInfo("'", 222),
    /** JIS では = が MINUS と同じキーコードになる。元 .js EQUAL_JIS L2060 */
    EQUAL_JIS: keyInfo("=", 189),
    SQUARE_BRACKETS_OPEN: keyInfo("[", 219),
    SQUARE_BRACKETS_CLOSE: keyInfo("]", 221),
    AZERTY_PAREN_CLOSE: keyInfo(")", 219),
    AZERTY_EQUAL: keyInfo("=", 187),
    AZERTY_CIRCUMFLEX: keyInfo("^", 221),
    AZERTY_DOLLAR: keyInfo("$", 186),
    AZERTY_U_GRAVE: keyInfo("ù", 192),
    AZERTY_ASTERISK: keyInfo("*", 220),
    AZERTY_LESS_THAN: keyInfo("<", 226),
    AZERTY_SEMICOLON: keyInfo(";", 190),
    AZERTY_COLON: keyInfo(":", 191),
    AZERTY_EXCLAMATION: keyInfo("!", 223),
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/key/layouts/rows.ts
  const K$1 = KEYS;
  /** QWERTY 配列の文字段。JIS と US が使う */
  const QWERTY_LETTERS = {
    top: [K$1.Q, K$1.W, K$1.E, K$1.R, K$1.T, K$1.Y, K$1.U, K$1.I, K$1.O, K$1.P],
    home: [K$1.A, K$1.S, K$1.D, K$1.F, K$1.G, K$1.H, K$1.J, K$1.K, K$1.L],
    bottom: [
      K$1.Z,
      K$1.X,
      K$1.C,
      K$1.V,
      K$1.B,
      K$1.N,
      K$1.M,
      K$1.COMMA,
      K$1.DOT,
      K$1.SLASH,
    ],
  };
  /**
   * 1 行目。数字列と編集キー。
   * 13 番目が配置で違う（JIS は ^、US は =）。AZERTY は 12 番目も違う。
   */
  const topRow = (thirteenth, twelfth = K$1.MINUS) => [
    K$1.ESC,
    K$1._1,
    K$1._2,
    K$1._3,
    K$1._4,
    K$1._5,
    K$1._6,
    K$1._7,
    K$1._8,
    K$1._9,
    K$1._0,
    twelfth,
    thirteenth,
    K$1.INSERT,
    K$1.BACK,
    K$1.HOME,
    K$1.END,
    K$1.PAGEUP,
    K$1.PAGEDOWN,
  ];
  /**
   * 2 行目。QWERTY 段とテンキー上段。
   * 12〜15 番目が配置で違う（記号と Enter の形）。
   */
  const qwertyRow = (tail, letters = QWERTY_LETTERS.top) => [
    K$1.TAB,
    ...letters,
    tail[0],
    tail[1],
    tail[2],
    tail[3],
    K$1.TENKEY7,
    K$1.TENKEY8,
    K$1.TENKEY9,
    K$1.TENKEY_MINUS,
  ];
  /**
   * 3 行目。ASDF 段とテンキー中段。
   * 11〜15 番目が配置で違う。
   */
  const homeRow = (tail, letters = QWERTY_LETTERS.home) => [
    K$1.NULL,
    ...letters,
    tail[0],
    tail[1],
    tail[2],
    tail[3],
    tail[4],
    K$1.TENKEY4,
    K$1.TENKEY5,
    K$1.TENKEY6,
    K$1.TENKEY_PLUS,
  ];
  /**
   * 4 行目。ZXCV 段とテンキー下段。
   * 12 番目だけが配置で違う（JIS は \、US は右 Shift）。
   */
  const bottomRow = (twelfth, letters = QWERTY_LETTERS.bottom) => [
    K$1.SHIFT,
    ...letters,
    twelfth,
    K$1.SHIFT,
    K$1.UP,
    K$1.NULL,
    K$1.TENKEY1,
    K$1.TENKEY2,
    K$1.TENKEY3,
    K$1.NULL,
  ];
  /** 5 行目。Space とカーソル。**配置によらず同じ。** */
  const spaceRow = () => [
    K$1.CTRL,
    K$1.NULL,
    K$1.NULL,
    K$1.NULL,
    K$1.SPACE,
    K$1.SPACE,
    K$1.SPACE,
    K$1.SPACE,
    K$1.NULL,
    K$1.NULL,
    K$1.NULL,
    K$1.NULL,
    K$1.LEFT,
    K$1.DOWN,
    K$1.RIGHT,
    K$1.TENKEY0,
    K$1.TENKEY0,
    K$1.TENKEY_DOT,
    K$1.NULL,
  ];
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/key/layouts/layout.ts
  const K = KEYS;
  /**
   * JIS 配置の 95 キー（19 列 × 5 行）。
   *
   * **Enter が 2 行にまたがる。** 2 行目に本体、続く 3 マスへ
   * 「通り過ぎる升」（`ENTER_JIS_NULL`）を置いて場所を確保している。
   * 描画側（`Window_KeyConfig_MA`）はこの 4 マスを 1 つの矩形として扱い、
   * **カーソルは本体にしか止まらない。**
   */
  const createJisLayout = () => [
    ...topRow(K.CARET),
    ...qwertyRow([
      K.ATMARK,
      K.SQUARE_BRACKETS_OPEN,
      K.ENTER_JIS,
      K.ENTER_JIS_NULL,
    ]),
    ...homeRow([
      K.SEMICOLON,
      K.COLON,
      K.SQUARE_BRACKETS_CLOSE,
      K.ENTER_JIS_NULL,
      K.ENTER_JIS_NULL,
    ]),
    ...bottomRow(K.BACKSLASH),
    ...spaceRow(),
  ];
  /**
   * US 配置の 95 キー（19 列 × 5 行）。
   *
   * **Enter は 3 マスの横並び**で、JIS のように行をまたがない。
   */
  const createUsLayout = () => [
    ...topRow(K.EQUAL_JIS),
    ...qwertyRow([
      K.SQUARE_BRACKETS_OPEN,
      K.SQUARE_BRACKETS_CLOSE,
      K.BACKSLASH,
      K.NULL,
    ]),
    ...homeRow([K.SEMICOLON, K.APOSTROPHE, K.ENTER_US, K.ENTER_US, K.ENTER_US]),
    ...bottomRow(K.SHIFT),
    ...spaceRow(),
  ];
  /**
   * フランス語（AZERTY）配置の 95 キー（19 列 × 5 行）。
   *
   * 元 .js createFR_Keyboard() L3868 は JIS の記号をそのまま流用していたので、
   * **記号キーは刻印に合わせて作り直した。** Enter は JIS と同じく 2 行にまたがる。
   *
   * - A と Q、Z と W が入れ替わり、M は 3 行目の L の右へ移る
   * - 4 行目は左 Shift の右に < があるので、文字が 1 升右へずれる
   * - 1 の左の ² は升が無いので載せない（JIS の 半角/全角 と同じ扱い）
   * - 数字列は刻印の数字を出す。キーコードは 1〜0 と同じである
   */
  const createAzertyLayout = () => [
    ...topRow(K.AZERTY_EQUAL, K.AZERTY_PAREN_CLOSE),
    ...qwertyRow(
      [K.AZERTY_CIRCUMFLEX, K.AZERTY_DOLLAR, K.ENTER_JIS, K.ENTER_JIS_NULL],
      [K.A, K.Z, K.E, K.R, K.T, K.Y, K.U, K.I, K.O, K.P],
    ),
    ...homeRow(
      [
        K.M,
        K.AZERTY_U_GRAVE,
        K.AZERTY_ASTERISK,
        K.ENTER_JIS_NULL,
        K.ENTER_JIS_NULL,
      ],
      [K.Q, K.S, K.D, K.F, K.G, K.H, K.J, K.K, K.L],
    ),
    ...bottomRow(K.AZERTY_EXCLAMATION, [
      K.AZERTY_LESS_THAN,
      K.W,
      K.X,
      K.C,
      K.V,
      K.B,
      K.N,
      K.COMMA,
      K.AZERTY_SEMICOLON,
      K.AZERTY_COLON,
    ]),
    ...spaceRow(),
  ];
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/key/layouts/keyboard.ts
  /**
   * 選べるキー配置。**並びを変えてもセーブは壊れない**（symbol で保存するため）。
   * 元 .js createKeyboard() L3984 と同じく JIS / US / AZERTY の順。
   */
  const KEYBOARD_LAYOUTS = [
    {
      symbol: "JIS",
      name: "JIS",
      keys: createJisLayout(),
    },
    {
      symbol: "US",
      name: "US",
      keys: createUsLayout(),
    },
    {
      symbol: "AZERTY",
      name: "AZERTY",
      keys: createAzertyLayout(),
    },
  ];
  /**
   * WASD 配置で上書きするキー。元 .js setupWASD() L4077
   * 既存の割り当てを消さず、この 6 つだけを差し替える。
   */
  const WASD_ASSIGNMENTS = [
    {
      code: 81,
      symbol: "pageup",
    },
    {
      code: 69,
      symbol: "pagedown",
    },
    {
      code: 87,
      symbol: "up",
    },
    {
      code: 65,
      symbol: "left",
    },
    {
      code: 83,
      symbol: "down",
    },
    {
      code: 68,
      symbol: "right",
    },
  ];
  /** WASD 配置を重ねたマッパーを返す。元のマッパーは書き換えない */
  const withWasd = (mapper) => ({
    ...mapper,
    ...Object.fromEntries(
      WASD_ASSIGNMENTS.map((entry) => [entry.code, entry.symbol]),
    ),
  });
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/key/span.ts
  const headIndexOf = (itemAt, index, item) =>
    index <= 0 || itemAt(index - 1) !== item
      ? index
      : headIndexOf(itemAt, index - 1, item);
  const tailIndexOf = (itemAt, index, item, maxItems) =>
    index >= maxItems - 1 || itemAt(index + 1) !== item
      ? index
      : tailIndexOf(itemAt, index + 1, item, maxItems);
  /**
   * 同じ項目が占める添字の範囲を求める。
   * 項目が無い添字は、その添字 1 つだけの範囲になる。
   * 元 .js は前後を for で走査していた。ここでは末尾再帰で同じ動きをする。
   */
  const spanOf = (itemAt, index, maxItems) => {
    const item = itemAt(index);
    if (!item) {
      return {
        head: index,
        tail: index,
      };
    }
    return {
      head: headIndexOf(itemAt, index, item),
      tail: tailIndexOf(itemAt, index, item, maxItems),
    };
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/mapper/mapper.ts
  /**
   * escape で代替できるシンボル。
   * コア `Input._isEscapeCompatible`（rmmz_core.js L6011）と同じ 2 つ。
   * `Input.isPressed` / `isTriggered` が escape をこの 2 つとして扱うので、
   * escape さえ割り当たっていれば操作不能にはならない。
   */
  const ESCAPE_COMPATIBLE = new Set(["cancel", "menu"]);
  /**
   * 必須シンボルのうち、マッパーに載っていないもの。
   * 元 .js isValidMapper_V3() L2612 の判定をそのまま写す。
   *
   * **単純な部分集合ではない。** escape が割り当たっていれば
   * cancel / menu は満たされたものとして扱う（L2617）。
   */
  const missingMandatorySymbols = (mapper, mandatorySymbols) => {
    const assigned = new Set(Object.values(mapper));
    const hasEscape = assigned.has("escape");
    return Array.from(mandatorySymbols).filter(
      (symbol) =>
        !assigned.has(symbol) && !(hasEscape && ESCAPE_COMPATIBLE.has(symbol)),
    );
  };
  const isMapperValid = (mapper, mandatorySymbols) =>
    missingMandatorySymbols(mapper, mandatorySymbols).length === 0;
  /**
   * コードに対応するシンボル定義を引く。元 .js getSymbolObjectByCode() L4925
   *
   * 元 .js は symbolManager（モジュール変数）を直接見ていた。
   * 辞書を引数で受けることで純粋になる。
   */
  const symbolAt = (mapper, dictionary, code) => {
    var _dictionary$get;
    return (_dictionary$get = dictionary.get(mapper[code])) !== null &&
      _dictionary$get !== void 0
      ? _dictionary$get
      : null;
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/mapper/repair.ts
  /** 既定の配置で symbol が割り当てられているキーのうち、いま空いているもの */
  const vacantDefaultCodes = (defaultMapper, current, symbol) =>
    Object.entries(defaultMapper)
      .filter((entry) => entry[1] === symbol)
      .map((entry) => Number(entry[0]))
      .filter((code) => !current[code]);
  /**
   * 必須シンボルの不足を、既定の配置を参考にして静かに補う。
   *
   * **不足が無ければ何も足さない。** 戻り値は常に新しいオブジェクトで、
   * 変わったかどうかは `filled` で判る。
   *
   * `mandatorySymbols` は**既定の配置から求めたもの**を渡すこと。
   * 読み込んだマッパーから求めると、欠けたシンボルが必須から外れて
   * （`symbol.ts` createBasicSymbol の mandatory 判定）不足が見えなくなる。
   */
  const repairMapper = (mapper, defaultMapper, mandatorySymbols) => {
    const repaired = { ...mapper };
    const filled = [];
    const unresolved = [];
    for (const symbol of missingMandatorySymbols(mapper, mandatorySymbols)) {
      const codes = vacantDefaultCodes(defaultMapper, repaired, symbol);
      if (codes.length === 0) {
        unresolved.push(symbol);
        continue;
      }
      for (const code of codes) {
        repaired[code] = symbol;
      }
      filled.push(symbol);
    }
    return {
      mapper: repaired,
      filled,
      unresolved,
    };
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/mapper/write.ts
  const EMPTY_WRITES = {
    key: [],
    pad: [],
  };
  /**
   * 1 つの割り当てから書き込み指示を作る。
   * シンボルが空なら何も書かない。元 .js L2287
   */
  const writesOf = (source) => {
    if (!source.symbol) {
      return EMPTY_WRITES;
    }
    const key = source.keyCodes.map((code) => ({
      code,
      symbol: source.symbol,
      overwrite: source.overwrite,
    }));
    if (source.buttonId === null) {
      return {
        key,
        pad: [],
      };
    }
    return {
      key,
      pad: [
        {
          code: source.buttonId,
          symbol: source.symbol,
          overwrite: source.overwrite,
        },
      ],
    };
  };
  /** 複数の割り当てをまとめる。順序は入力の順を保つ */
  const mergeWrites = (list) => ({
    key: list.flatMap((writes) => writes.key),
    pad: list.flatMap((writes) => writes.pad),
  });
  /**
   * 書き込みを適用した新しいマッパーを返す。元のマッパーは変更しない。
   *
   * 上書き無効の指示は、その時点で値があるとスキップされる。
   * つまり **先に書いたほうが勝つ** ので、list の順序が結果に影響する。
   * 元 .js が全件 loadSymbol してから全件 fillSymbol する 2 パス構成なのは、
   * この順序依存を緩和するための対処である (flow.md 指摘 9)。
   */
  const applyWrites = (mapper, writes) =>
    writes.reduce(
      (current, write) => {
        if (!write.overwrite && current[write.code]) {
          return current;
        }
        return {
          ...current,
          [write.code]: write.symbol,
        };
      },
      { ...mapper },
    );
  /**
   * 有効な項目だけを残したマッパーを作る。
   * キーが数値にならないもの、シンボルが空のものを落とす。
   * 元 .js TemporaryMappper.createNormalizedMapper() L4838
   */
  const normalizeMapper = (mapper) =>
    Object.entries(mapper).reduce((current, [key, symbol]) => {
      const code = Number(key);
      if (Number.isNaN(code) || !symbol) {
        return current;
      }
      return {
        ...current,
        [code]: symbol,
      };
    }, {});
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/symbolList.ts
  /**
   * その項目の理由。無ければ空文字。
   * **順序は元 .js に合わせる**（手動シンボル → 名前）。
   */
  const symbolErrorTextOf = (symbol, texts) => {
    if (symbol.kind === "extends" && symbol.invalidManualSymbol) {
      return `${texts.advancedSymbolInvalid}\nsymbol:${symbol.invalidManualSymbol}`;
    }
    if (!symbol.name) {
      return `${texts.nameEmpty}${symbol.symbol}`;
    }
    return "";
  };
  /**
   * 一覧の 1 項目。**理由があればヘルプはそちらを出す。** 元 .js getHelpText() L1518
   *
   * **選べなくするのは手動シンボルが不正なときだけ。**
   * 名前が空でも割り当て自体は成立するので、理由を出すに留める（元 .js L1470 と同じ）。
   */
  const symbolListEntryOf = (symbol, texts) => {
    const errorText = symbolErrorTextOf(symbol, texts);
    return {
      symbol: symbol.symbol,
      name: symbol.name,
      helpText: errorText || symbol.helpText,
      enabled: !(symbol.kind === "extends" && symbol.invalidManualSymbol),
    };
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/touchButton/touchButton.ts
  const EMPTY_IMAGE = {
    folder: "",
    fileName: "",
  };
  /**
   * 最後のスラッシュで分割する。貪欲マッチなので "a/b/c" は "a/b" と "c" になる。
   * グローバルフラグを付けないこと（lastIndex を持つと呼び出しごとに結果が変わる）。
   * 元 .js L1225
   */
  const IMAGE_PATH = /(.*)\/(.*)/;
  /** "system/ButtonSet" → { folder: "img/system/", fileName: "ButtonSet" } */
  const parseImagePath = (filePath) => {
    const result = IMAGE_PATH.exec(filePath);
    if (!result) {
      return EMPTY_IMAGE;
    }
    return {
      folder: `img/${result[1]}/`,
      fileName: result[2],
    };
  };
  /** ファイル名が空でないこと。元 .js isValid() L1259 */
  const isImageValid = (image) => !!image.fileName;
  /**
   * タッチボタンを作る。画像が指定されていない場合は null を返して落とす。
   * 元 .js は無効なボタンも生成し、呼び出し側で isValid() を見て捨てていた (L2078)。
   */
  const createTouchButton = (source, symbol) => {
    const image = parseImagePath(source.image);
    if (!isImageValid(image)) {
      return null;
    }
    return {
      image,
      x: source.x,
      y: source.y,
      symbol,
    };
  };
  /**
   * 拡張シンボルからタッチボタンを集める。
   * 画像の指定が無いものと、画像が壊れているものは落ちる。
   * 元 .js setupExtendsSymbols() が ButtonManager へ積んでいた分にあたる (L2642)。
   */
  const collectTouchButtons = (owners) =>
    owners
      .map((owner) =>
        owner.touchButton
          ? createTouchButton(owner.touchButton, owner.symbol)
          : null,
      )
      .filter((button) => button !== null);
  /**
   * ビットマップの読み込み。ImageManager への依存を引数で受ける。
   * 元 .js bitmap() L1269
   */
  const loadTouchButtonBitmap = (button, loadFn) =>
    loadFn(button.image.folder, button.image.fileName);
  /**
   * 押下状態の更新。Input._currentState へ書き込む代わりに次の値を返す。
   * 既に押されている場合はタッチの状態で上書きしない。
   * 元 .js virtualPress() L1296
   */
  const nextPressState = (state) => state.pressed || state.touched;
  /**
   * 画像は上下半々で使う。上半分が通常、下半分が押下時。
   * 読み込みが終わるまで height は 0 なので、その場合も 0 になる。
   * 元 .js Sprite_EX_Base.onLoadeed() L2693
   */
  const buttonImageHeight = (bitmap) => bitmap.height / 2;
  /**
   * 画像の切り出し範囲。押下時は下半分へ切り替わる。
   * 元 .js setColdFrame() / setHotFrame() L2697
   */
  const buttonFrame = (sprite, pressed) => ({
    x: 0,
    y: pressed ? sprite.imageHeight : 0,
    width: sprite.bitmap.width,
    height: sprite.imageHeight,
  });
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/createSymbol.ts
  /**
   * 採用できなかった手動シンボル。正常なら null。
   * **空欄は正常である**（指定していないだけ）。元 .js isSymbolValid() L1991
   */
  const invalidManualSymbolOf = (manualSymbol, isBasicSymbol) => {
    if (!manualSymbol) {
      return null;
    }
    return isBasicSymbol(manualSymbol) ? manualSymbol : null;
  };
  /** 手動指定のシンボル。標準シンボルと同名なら無効。元 .js L2164 */
  const manualSymbolOf = (manualSymbol, isBasicSymbol) => {
    if (!manualSymbol) {
      return null;
    }
    return isBasicSymbol(manualSymbol) ? null : manualSymbol;
  };
  /**
   * ボタン番号に配置されているシンボル。元 .js L2175
   *
   * オリジナル準拠。**標準シンボルのときに採用する**という、
   * manualSymbolOf / firstKeySymbolOf とは逆の判定になっている。
   * 仕様として妥当かどうかは未確定 (flow.md 指摘 3)。
   */
  const padSymbolOf = (buttonId, padMapper, isBasicSymbol) => {
    if (buttonId === null) {
      return null;
    }
    const symbol = padMapper[buttonId];
    if (!symbol) {
      return null;
    }
    return isBasicSymbol(symbol) ? symbol : null;
  };
  /** キーコード列のうち、最初に見つかった非標準シンボル。元 .js L2186 */
  const firstKeySymbolOf = (keyCodes, keyMapper, isBasicSymbol) => {
    var _keyCodes$map$find;
    return (_keyCodes$map$find = keyCodes
      .map((code) => keyMapper[code])
      .find((symbol) => !!symbol && !isBasicSymbol(symbol))) !== null &&
      _keyCodes$map$find !== void 0
      ? _keyCodes$map$find
      : null;
  };
  /** コモンイベント呼び出し用のシンボル。元 .js L2200 */
  const eventCallSymbolOf = (event) => {
    if (!event || event.eventId <= 0) {
      return null;
    }
    return `call${event.eventId}`;
  };
  /** 上書き種別による優先シンボル。元 .js L2214 */
  const preferredSymbolOf = (source, mappers, isBasicSymbol) => {
    const manual = manualSymbolOf(source.manualSymbol, isBasicSymbol);
    if (manual) {
      return manual;
    }
    switch (source.overwrite) {
      case 1:
        return padSymbolOf(source.buttonId, mappers.padMapper, isBasicSymbol);
      case 2:
        return firstKeySymbolOf(
          source.keyCodes,
          mappers.keyMapper,
          isBasicSymbol,
        );
      case 3:
        return eventCallSymbolOf(source.event);
      default:
        return null;
    }
  };
  /**
   * 優先シンボルが取れなかった場合のフォールバック。元 .js L2244
   * pad → key → event の順に見る。
   */
  const fallbackSymbolOf = (source, mappers, isBasicSymbol) => {
    var _ref, _padSymbolOf;
    return (_ref =
      (_padSymbolOf = padSymbolOf(
        source.buttonId,
        mappers.padMapper,
        isBasicSymbol,
      )) !== null && _padSymbolOf !== void 0
        ? _padSymbolOf
        : firstKeySymbolOf(
            source.keyCodes,
            mappers.keyMapper,
            isBasicSymbol,
          )) !== null && _ref !== void 0
      ? _ref
      : eventCallSymbolOf(source.event);
  };
  /**
   * 拡張シンボルを解決する。元 .js readMySymbol L2234
   * シンボルが決まらなかった場合は null を返して落とす。
   * 元 .js は空シンボルのまま保持して必須指定を false へ落としていた (L2264)。
   */
  const resolveExtendsSymbol = (source, mappers, isBasicSymbol) => {
    var _preferredSymbolOf;
    const symbol =
      (_preferredSymbolOf = preferredSymbolOf(
        source,
        mappers,
        isBasicSymbol,
      )) !== null && _preferredSymbolOf !== void 0
        ? _preferredSymbolOf
        : fallbackSymbolOf(source, mappers, isBasicSymbol);
    if (!symbol) {
      return null;
    }
    return {
      kind: "extends",
      symbol,
      name: source.name,
      keyText: source.keyText,
      helpText: source.helpText,
      buttonId: source.buttonId,
      keyCodes: source.keyCodes,
      mandatory: source.mandatory,
      overwrite: source.overwrite,
      event: source.event,
      customColor: source.customColor,
      touchButton: source.touchButton,
      invalidManualSymbol: invalidManualSymbolOf(
        source.manualSymbol,
        isBasicSymbol,
      ),
    };
  };
  /**
   * 拡張シンボルをまとめて解決する。
   * ここではマッパーへの書き込みを行わない。
   * 元 .js は全件 loadSymbol してから全件 fillSymbol する 2 パス構成で、
   * その 1 パス目にあたる (L2466)。
   */
  const resolveExtendsSymbols = (sources, mappers, isBasicSymbol) =>
    sources
      .map((source) => resolveExtendsSymbol(source, mappers, isBasicSymbol))
      .filter((symbol) => symbol !== null);
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/extendsSymbols.ts
  const isBasicSymbol = (symbol) => BASIC_SYMBOLS.includes(symbol);
  /** 上書き可否。手動シンボル指定を含め、種別が「上書きしない」以外なら許す。元 .js L1996 */
  const isOverwriteEnabled = (symbol) => symbol.overwrite !== 0;
  /**
   * 拡張シンボルを決めて、キー・ボタンへの割り当てを書き込んだマッパーを返す。
   * 引数のマッパーは変更しない。書き戻すのは呼び出し側 (rmmz.ts) の仕事。
   * sources はパラメータで定義された拡張シンボル（`InputConfigSettings.extendsSymbols`）。
   *
   * **初期マッパーの複製より前に呼ぶこと。** 拡張シンボルの割り当ては
   * 「初期設定に戻す」で戻る先に含まれていなければならない。
   * 元 .js も onBoot() → makeDefaultMapper() の順だった (L6479)。
   */
  const fillExtendsSymbols = (mappers, sources) => {
    const symbols = resolveExtendsSymbols(sources, mappers, isBasicSymbol);
    const writes = mergeWrites(
      symbols.map((symbol) =>
        writesOf({
          symbol: symbol.symbol,
          buttonId: symbol.buttonId,
          keyCodes: symbol.keyCodes,
          overwrite: isOverwriteEnabled(symbol),
        }),
      ),
    );
    return {
      symbols,
      keyMapper: applyWrites(mappers.keyMapper, writes.key),
      gamepadMapper: applyWrites(mappers.padMapper, writes.pad),
    };
  };
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/pure/savedata.ts
  /**
   * セーブデータ（symbol）→ 実行中の一時データ（添字）。
   * 未知の symbol は先頭のレイアウトへ倒れる。
   */
  const toLayoutSelection = (saved, tables) => ({
    keyLayoutIndex: resolveLayoutIndex(tables.key, saved.keyLayout),
    padLayoutIndex: resolveLayoutIndex(tables.pad, saved.padLayout),
  });
  /**
   * 実行中の一時データ（添字）→ セーブデータ（symbol）。
   * 範囲外の添字は空文字になり、次回読み込み時に先頭へ倒れる。
   */
  const toSavedLayout = (selection, tables) => ({
    keyLayout: deviceSymbolAt(tables.key, selection.keyLayoutIndex),
    padLayout: deviceSymbolAt(tables.pad, selection.padLayoutIndex),
  });
  //#endregion
  //#region src/baseSystem/inputConfig/logic/core/store.ts
  /** ConfigManager へぶら下げるキー。元 .js MA_INPUTCONFIG_CONTENTS L4701 */
  const CONFIG_KEY = "MANO_INPUTCONFIG";
  const INITIAL_SELECTION = {
    keyLayoutIndex: 0,
    padLayoutIndex: 0,
  };
  const layoutTables = () => ({
    key: KEYBOARD_LAYOUTS,
    pad: GAMEPAD_LAYOUTS,
  });
  const isMapperLike = (value) =>
    typeof value === "object" && value !== null && !Array.isArray(value);
  const asText = (value) => (typeof value === "string" ? value : "");
  /**
   * 設定・拡張シンボル・初期マッパー・レイアウト選択の保持。
   *
   * 「初期設定に戻す」はここに複製した値を使う。
   * Input.*Mapper を直接参照すると、編集中の値へ戻ってしまう。
   */
  var InputConfigStore = class {
    constructor() {
      this.defaultKey = {};
      this.defaultPad = {};
      this.selection = INITIAL_SELECTION;
      this.captured = false;
      this.currentSettings = DEFAULT_SETTINGS;
      this.resolvedSymbols = [];
    }
    /**
     * パラメータの解釈結果を受け取る。エントリポイントから起動時に 1 度だけ呼ぶ。
     * バンドルの外へは出ないので、利用者がこれを呼ぶことはできない。
     */
    applySettings(settings) {
      this.currentSettings = settings;
    }
    /** 現在の設定。受け取る前なら既定値が返る */
    settings() {
      return this.currentSettings;
    }
    /**
     * 拡張シンボルを決めて保持し、キー・ボタンへの割り当てを書き込んだマッパーを返す。
     * 引数のマッパーは変更しない。計算は fillExtendsSymbols()。
     *
     * **初期マッパーの複製（captureDefaults）より前に呼ぶこと。**
     * 拡張シンボルの割り当ては「初期設定に戻す」で戻る先に含まれていなければならない。
     */
    setupExtendsSymbols(mappers) {
      const filled = fillExtendsSymbols(
        mappers,
        this.currentSettings.extendsSymbols,
      );
      this.resolvedSymbols = filled.symbols;
      return {
        keyMapper: filled.keyMapper,
        gamepadMapper: filled.gamepadMapper,
      };
    }
    /**
     * 解決済みの拡張シンボル。起動時に 1 度決めたものを返す。
     *
     * **マッパーの編集では変わらない。** シンボル文字列は
     * 「起動時のマッパー＋パラメータ」から決まるもので、
     * コンフィグ画面での割り当て変更はシンボルの置き場所を変えるだけである。
     * 元 .js も onBoot() で 1 度だけ決めていた (L2453)。
     */
    extendsSymbols() {
      return this.resolvedSymbols;
    }
    /**
     * 現在の Input.*Mapper を初期設定として複製する。
     * 他のプラグインによる改変が終わった後に 1 度だけ呼ぶ。
     * 競合で複数回呼ばれても最初の 1 回だけを採用する (元 .js の _initialized 相当)。
     */
    captureDefaults(keyMapper, padMapper) {
      if (this.captured) {
        return;
      }
      this.defaultKey = normalizeMapper(keyMapper);
      this.defaultPad = normalizeMapper(padMapper);
      this.captured = true;
    }
    isCaptured() {
      return this.captured;
    }
    /** 初期設定のキーボード配置。複製を返すので書き換えても影響しない */
    cloneDefaultKeyMapper() {
      return { ...this.defaultKey };
    }
    /** 初期設定のゲームパッド配置 */
    cloneDefaultGamepadMapper() {
      return { ...this.defaultPad };
    }
    layoutSelection() {
      return this.selection;
    }
    setPadLayoutIndex(index) {
      this.selection = {
        ...this.selection,
        padLayoutIndex: index,
      };
    }
    setKeyLayoutIndex(index) {
      this.selection = {
        ...this.selection,
        keyLayoutIndex: index,
      };
    }
    /** ConfigManager.makeData() へ渡す形。元 .js createConfigData() L4653 */
    makeSaveData(keyMapper, padMapper) {
      const saved = toSavedLayout(this.selection, layoutTables());
      return {
        keyLayout: saved.keyLayout,
        padLayout: saved.padLayout,
        keyMapper: { ...normalizeMapper(keyMapper) },
        gamepadMapper: { ...normalizeMapper(padMapper) },
      };
    }
    /**
     * セーブデータを検証して埋める。欠けている項目は初期設定で補う。
     * 元 .js validateSaveData() L4619
     */
    validate(data) {
      const source = typeof data === "object" && data !== null ? data : {};
      return {
        keyLayout: asText(source.keyLayout),
        padLayout: asText(source.padLayout),
        keyMapper: isMapperLike(source.keyMapper)
          ? { ...normalizeMapper(source.keyMapper) }
          : this.cloneDefaultKeyMapper(),
        gamepadMapper: isMapperLike(source.gamepadMapper)
          ? { ...normalizeMapper(source.gamepadMapper) }
          : this.cloneDefaultGamepadMapper(),
      };
    }
    /**
     * セーブデータを取り込む。レイアウトの選択はここで添字へ移す。
     * 戻り値を Input.*Mapper へ入れるのは呼び出し側の仕事。
     */
    applySaveData(data) {
      const validated = this.validate(data);
      this.selection = toLayoutSelection(validated, layoutTables());
      return validated;
    }
  };
  const store = new InputConfigStore();
  const inputConfigStore = () => store;
  //#endregion
  //#region src/baseSystem/inputConfig/gamepadConfig.ts
  var GamepadConfigSource = class {
    constructor(model, mapper, settings, layoutIndex) {
      this.model = model;
      this.settings = settings;
      this.tmpMapper = { ...mapper };
      this.layout = GAMEPAD_LAYOUTS[layoutIndex] ? layoutIndex : 0;
      this.items = [];
      this.remakeItems();
    }
    remakeItems() {
      const entry = GAMEPAD_LAYOUTS[this.layout];
      this.items = createGamepadConfigItems(
        gamepadButtons(entry.layout),
        this.settings.gamepadCommands.map((command) => command.handle),
      );
    }
    maxItems() {
      return this.items.length;
    }
    maxCols() {
      return 4;
    }
    rowCount() {
      return gridRowCount(this.maxItems(), this.maxCols());
    }
    itemAt(index) {
      var _handlerAt;
      const item = this.items[index];
      if (!item) {
        return null;
      }
      const enabled = isItemEnabledAt(this.items, index, {
        saveHandle: SAVE_HANDLE,
        mapperValid: this.isMapperValid(),
      });
      const handler =
        (_handlerAt = handlerAt(this.items, index)) !== null &&
        _handlerAt !== void 0
          ? _handlerAt
          : "";
      if (item.kind !== "button") {
        const command = gamepadCommandOf(
          this.settings.gamepadCommands,
          item.handle,
        );
        return {
          name: command.name,
          symbolName: "",
          backColor: null,
          enabled,
          handler,
          helpText:
            item.handle === "layout" ? this.layoutName() : command.helpText,
          code: null,
        };
      }
      const symbol = symbolAt(
        this.tmpMapper,
        this.model.dictionary,
        item.button.buttonId,
      );
      return {
        name: item.button.name,
        symbolName: symbol ? symbol.name : "",
        backColor: symbol
          ? symbolBackColor(symbol, this.model.colors)
          : this.model.colors.normal,
        enabled,
        handler,
        helpText: symbol ? symbol.helpText : "",
        code: item.button.buttonId,
      };
    }
    symbolStringAt(code) {
      var _this$tmpMapper$code;
      return (_this$tmpMapper$code = this.tmpMapper[code]) !== null &&
        _this$tmpMapper$code !== void 0
        ? _this$tmpMapper$code
        : "";
    }
    changeSymbol(code, symbol) {
      this.tmpMapper[code] = symbol;
    }
    mapper() {
      return this.tmpMapper;
    }
    resetMapper(mapper) {
      this.tmpMapper = { ...mapper };
    }
    applyToInput() {
      Input.gamepadMapper = { ...normalizeMapper(this.tmpMapper) };
      Input.clear();
    }
    isMapperValid() {
      return isMapperValid(this.tmpMapper, this.model.mandatory);
    }
    layoutIndex() {
      return this.layout;
    }
    layoutName() {
      return GAMEPAD_LAYOUTS[this.layout].name;
    }
    changeNextLayout() {
      this.layout = (this.layout + 1) % GAMEPAD_LAYOUTS.length;
      this.remakeItems();
    }
  };
  /**
   * settings は連結層が store から読んで渡す。起動後に変わらないので構築時に 1 回だけ。
   * layoutIndex は開いた直後の配置。保存済みの選択を渡す（元 .js L5352 は保存済みの配置で開いていた）。
   */
  const createGamepadConfigProxy = (model, mapper, settings, layoutIndex = 0) =>
    new GamepadConfigSource(model, mapper, settings, layoutIndex);
  //#endregion
  //#region src/baseSystem/inputConfig/scene/windows/common.ts
  /** ヘルプ欄への書き込み。ヘルプウィンドウを持たない使い方でも落ちないようにする */
  const setHelpText = (helpWindow, text) => {
    if (helpWindow) {
      helpWindow.setText(text);
    }
  };
  /**
   * **決定はキーリピートを拾わない。** 元 .js L5032
   *
   * コアの既定は `_canRepeat` なら `Input.isRepeated("ok")` で、
   * **押しっぱなしにすると決定が連続して発火する。**
   * 割り当てを選ぶ画面では、一覧が開いた直後にその決定がもう一度通ってしまう。
   *
   * `Input` は呼ぶ側（Window のメソッド）が渡す。描画層でグローバルを読んでよいのは
   * class のメソッドだけである（funcKind.md 5.2 [FILE]）。
   */
  const isOkTriggeredOnce = (input) => input.isTriggered("ok");
  /** キャンセルも同じ。コアの既定は `Input.isRepeated("cancel")`。元 .js L5035 */
  const isCancelTriggeredOnce = (input) => input.isTriggered("cancel");
  /**
   * 項目の背景。**割り当てられているシンボルの色で縦のグラデーションを敷き、
   * 同じ色で枠を描く。** 元 .js drawItemBackgroundEx() L5953
   *
   * コアの既定（`drawBackgroundRect`）と同じ形で、色だけが違う。
   * **平らに塗ると、選択中のカーソルとの区別が付きにくくなる。**
   *
   * bottomColor はグラデーションの下側。呼ぶ側が `ColorManager.itemBackColor2()` を渡す。
   */
  const drawItemBack = (window, rect, color, bottomColor) => {
    const back = window.contentsBack;
    back.gradientFillRect(
      rect.x,
      rect.y,
      rect.width,
      rect.height,
      color,
      bottomColor,
      true,
    );
    back.strokeRect(rect.x, rect.y, rect.width, rect.height, color);
  };
  //#endregion
  //#region src/baseSystem/inputConfig/scene/windows/pure/button.ts
  /** 右側に文字があるときに右へ渡す幅の割合。元 .js L5412 */
  const RIGHT_TEXT_RATIO = 0.7;
  /**
   * 右側に文字があるときは幅の 7 割を右へ渡す。無ければ左が全幅。
   * 元 .js Window_GamepadConfig_V8.drawItem() L5406
   */
  const splitLeftRight = (rect, hasRight) => {
    const rightWidth = hasRight ? rect.width * RIGHT_TEXT_RATIO : 0;
    return {
      leftX: rect.x,
      leftWidth: rect.width - rightWidth,
      rightX: rect.x + rect.width - rightWidth,
      rightWidth,
    };
  };
  /**
   * ハンドラ名から項目の添字を引く。無ければ `INDEX_NOT_FOUND`。
   * **「やめる」へカーソルを移す**のに使う（元 .js selectExit() L6127）。
   * 同じ名前が複数あれば最初のものを返す。
   */
  const indexOfHandler = (handlerAt, maxItems, handle) => {
    const found = Array.from({ length: maxItems }, (_, index) => index).find(
      (index) => handlerAt(index) === handle,
    );
    return found === void 0 ? -1 : found;
  };
  //#endregion
  //#region src/baseSystem/inputConfig/scene/windows/pure/key.ts
  /**
   * 元 .js L6104〜 の各メソッドが返している値。
   *
   * **コアの既定（文字 26 / 行 36）より小さい。**
   * 19 列を 1 行へ収める画面なので、1 升が狭く、そのままでは入らない。
   */
  const DEFAULT_KEY_METRICS = {
    keyNameFontSize: 22,
    symbolNameFontSize: 18,
    /** 元 .js lineHeight() L6115。コアの既定は 36 */
    lineHeight: 24,
    itemPadding: 2,
    rowSpacing: 2,
    colSpacing: 2,
  };
  /** これ以下には縮めない。読めなくなる */
  const MIN_FONT_SIZE = 10;
  /**
   * 升の幅に比例させる。**画面の大きさは作品ごとに違う。**
   * 幅 816 を前提に固定すると、大きい画面では文字だけが取り残されて
   * 升の中でぽつんと小さくなる。
   */
  const scaled = (base, itemWidth) =>
    Math.max(MIN_FONT_SIZE, Math.round((base * itemWidth) / 41));
  /**
   * 升の幅から寸法を決める。**渡すのは 1 升の幅**（`itemWidth()`）で、
   * 幅の広いキーの矩形ではない。**そこを間違えると、広いキーだけ文字が大きくなる。**
   */
  const keyGridMetrics = (itemWidth) => ({
    keyNameFontSize: scaled(DEFAULT_KEY_METRICS.keyNameFontSize, itemWidth),
    symbolNameFontSize: scaled(
      DEFAULT_KEY_METRICS.symbolNameFontSize,
      itemWidth,
    ),
    lineHeight: scaled(DEFAULT_KEY_METRICS.lineHeight, itemWidth),
    itemPadding: DEFAULT_KEY_METRICS.itemPadding,
    rowSpacing: DEFAULT_KEY_METRICS.rowSpacing,
    colSpacing: DEFAULT_KEY_METRICS.colSpacing,
    itemWidth,
  });
  /** 元 .js itemHeight() L6110 */
  const keyItemHeight = (metrics) =>
    metrics.keyNameFontSize +
    metrics.symbolNameFontSize +
    metrics.rowSpacing +
    2;
  /** 止まらない升の間だけ、同じ方向へ進み続ける */
  const passThrough = (next, step, maxItems, isSkipped) =>
    next < 0 || next >= maxItems || !isSkipped(next)
      ? next
      : passThrough(next + step, step, maxItems, isSkipped);
  /** 範囲外なら null。通り過ぎた先が端を越えることがある */
  const indexOrNull = (index, maxItems) =>
    index < 0 || index >= maxItems ? null : index;
  /**
   * 右へ移動したときの添字。移動しない場合は null。
   * 幅の広いキーは 1 つとして扱うため、範囲の末尾を基準にする。
   * 元 .js cursorRight() L6034
   */
  const nextIndexRight = (cursor, span, isSkipped) => {
    const movable =
      span.tail < cursor.maxItems - 1 || (cursor.wrap && cursor.horizontal);
    if (cursor.maxCols < 2 || !movable) {
      return null;
    }
    return indexOrNull(
      passThrough(
        (span.tail + 1) % cursor.maxItems,
        1,
        cursor.maxItems,
        isSkipped,
      ),
      cursor.maxItems,
    );
  };
  /**
   * 左へ移動したときの添字。移動しない場合は null。
   * 元 .js cursorLeft() L6047
   */
  const nextIndexLeft = (cursor, span, isSkipped) => {
    const movable = span.head > 0 || (cursor.wrap && cursor.horizontal);
    if (cursor.maxCols < 2 || !movable) {
      return null;
    }
    return indexOrNull(
      passThrough(
        (span.head - 1 + cursor.maxItems) % cursor.maxItems,
        -1,
        cursor.maxItems,
        isSkipped,
      ),
      cursor.maxItems,
    );
  };
  /**
   * 上下へ移動したときの添字。移動しない場合は null。
   *
   * **止まらない升は飛ばす。** Enter の下半分へ落ちると、
   * カーソルが動いて見えないまま同じキーの中に留まることになる。
   * 折り返しはしない（コアも列が 2 つ以上あるときは折り返さない）。
   */
  const nextIndexVertical = (cursor, down, isSkipped) => {
    const step = down ? cursor.maxCols : -cursor.maxCols;
    return indexOrNull(
      passThrough(cursor.index + step, step, cursor.maxItems, isSkipped),
      cursor.maxItems,
    );
  };
  /**
   * 項目の高さの中央に 1 行分の矩形を作る。元 .js itemLineRect() L5023
   * 共通基底に置かれているが、呼んでいるのはキー配置画面だけ (L6100)。
   * 元 .js は受け取った矩形を書き換えていた。ここでは新しい矩形を返す。
   */
  const lineRectOf = (rect, lineHeight) => {
    const padding = (rect.height - lineHeight) / 2;
    return {
      x: rect.x,
      y: rect.y + padding,
      width: rect.width,
      height: rect.height - padding * 2,
    };
  };
  /**
   * 複数の添字にまたがる項目の幅。元 .js itemRect() L5872
   * 範囲の先頭の矩形に、またいだぶんの幅を足す。
   *
   * 元 .js と同じく、範囲が行をまたぐ場合は考慮していない。
   */
  const spanWidth = (headRect, span, metrics) =>
    headRect.width +
    (metrics.itemPadding + metrics.itemWidth) * (span.tail - span.head);
  /**
   * 2 行にまたがる項目（JIS の Enter）の矩形。先頭の升を右と下へ 1 升ずつ広げる。元 .js L5901
   */
  const tallRect = (headRect, itemWidth, itemHeight) => ({
    x: headRect.x,
    y: headRect.y,
    width: headRect.width + itemWidth,
    height: headRect.height + itemHeight,
  });
  /**
   * キー配置ウィンドウの高さ。並べる行数ぶんだけを取り、残りはシンボル一覧が使う。
   *
   * キーの升はコアの既定より高いので、`calcWindowHeight()` をそのまま使えない。
   * padding は上下の余白（`calcWindowHeight(0, true)`）で、幅の余白もこれと同じ量である。
   * **升の幅はウィンドウがこの後に計算する `itemWidth()` と同じ式で求める。**
   * ずれると、高さと中身の大きさが噛み合わなくなる。
   */
  const keyConfigWindowHeight = (boxWidth, padding, maxCols, rowCount) => {
    return (
      padding +
      rowCount *
        keyItemHeight(
          keyGridMetrics(Math.floor((boxWidth - padding) / maxCols)),
        )
    );
  };
  /** 範囲ぶんに広げた矩形 */
  const spanRect = (headRect, span, metrics) => ({
    x: headRect.x,
    y: headRect.y,
    width: spanWidth(headRect, span, metrics),
    height: headRect.height,
  });
  /**
   * キー 1 つの 2 段組。元 .js drawKey() L6073
   * 下段の y にシンボル名のフォントサイズを足すのはオリジナル準拠。
   * 上段のフォントサイズではない点に注意。
   */
  const keyTextLayout = (rect, metrics) => ({
    keyName: {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      fontSize: metrics.keyNameFontSize,
    },
    symbolName: {
      x: rect.x,
      y: rect.y + metrics.symbolNameFontSize + 2,
      width: rect.width,
      fontSize: metrics.symbolNameFontSize,
    },
  });
  //#endregion
  //#region src/baseSystem/inputConfig/scene/windows/gamepadConfig.ts
  /**
   * ゲームパッドのボタン割り当て画面。元 .js Window_GamepadConfig_V8 L5340
   *
   * 並べるものと編集中のマッパーは Proxy が持つ。ここは描画と入力だけを受け持つ。
   */
  var Window_GamepadConfig_MA = class extends Window_Selectable {
    /**
     * **Proxy は constructor の引数で受け取る。**
     * コアの constructor は引数をそのまま initialize() へ渡すので
     * (rmmz_windows.js L10)、super より前に入れられる。
     * super.initialize() の中で寸法計算とビットマップ作成が走るため、
     * **そこより後に渡すと大きさが合わなくなる。**
     */
    initialize(rect, proxy) {
      this._proxy = proxy;
      super.initialize(rect);
      this.refresh();
    }
    layoutIndex() {
      return this._proxy.layoutIndex();
    }
    layoutName() {
      return this._proxy.layoutName();
    }
    changeNextLayout() {
      this._proxy.changeNextLayout();
      this.refresh();
    }
    /** 選んでいるボタンの番号。コマンド項目なら null。元 .js currentButton() L5449 */
    currentCode() {
      var _this$_proxy$itemAt$c, _this$_proxy$itemAt;
      return (_this$_proxy$itemAt$c =
        (_this$_proxy$itemAt = this._proxy.itemAt(this.index())) === null ||
        _this$_proxy$itemAt === void 0
          ? void 0
          : _this$_proxy$itemAt.code) !== null &&
        _this$_proxy$itemAt$c !== void 0
        ? _this$_proxy$itemAt$c
        : null;
    }
    mapper() {
      return this._proxy.mapper();
    }
    isMapperValid() {
      return this._proxy.isMapperValid();
    }
    symbolStringAt(buttonId) {
      return this._proxy.symbolStringAt(buttonId);
    }
    changeSymbol(buttonId, symbol) {
      this._proxy.changeSymbol(buttonId, symbol);
      this.refresh();
    }
    resetMapper(mapper) {
      this._proxy.resetMapper(mapper);
      this.refresh();
    }
    applyToInput() {
      this._proxy.applyToInput();
    }
    maxItems() {
      return this._proxy.maxItems();
    }
    maxCols() {
      return this._proxy.maxCols();
    }
    isItemEnabled(index) {
      var _this$_proxy$itemAt$e, _this$_proxy$itemAt2;
      return (_this$_proxy$itemAt$e =
        (_this$_proxy$itemAt2 = this._proxy.itemAt(index)) === null ||
        _this$_proxy$itemAt2 === void 0
          ? void 0
          : _this$_proxy$itemAt2.enabled) !== null &&
        _this$_proxy$itemAt$e !== void 0
        ? _this$_proxy$itemAt$e
        : false;
    }
    isCurrentItemEnabled() {
      return this.isItemEnabled(this.index());
    }
    /**
     * **これが無いと決定が一切届かない。**
     * コアの processHandling() は `isOkEnabled()`（既定は `isHandled("ok")`）が
     * 真のときだけ processOk() を呼ぶ (rmmz_windows.js L1154)。
     * この画面は "ok" ではなく項目ごとのハンドラ名で登録するため、既定のままでは
     * 常に偽になる。元 .js L5423
     */
    isOkEnabled() {
      return true;
    }
    /**
     * **押しっぱなしで連続発火しないようにする。** 元 .js L5032
     * コアの既定はキーリピートを拾う。
     */
    isOkTriggered() {
      return isOkTriggeredOnce(Input);
    }
    isCancelTriggered() {
      return isCancelTriggeredOnce(Input);
    }
    /** 選んでいる項目のハンドラ名 */
    currentHandler() {
      var _this$_proxy$itemAt$h, _this$_proxy$itemAt3;
      return (_this$_proxy$itemAt$h =
        (_this$_proxy$itemAt3 = this._proxy.itemAt(this.index())) === null ||
        _this$_proxy$itemAt3 === void 0
          ? void 0
          : _this$_proxy$itemAt3.handler) !== null &&
        _this$_proxy$itemAt$h !== void 0
        ? _this$_proxy$itemAt$h
        : "";
    }
    /**
     * そのハンドラ名の項目へカーソルを移す。無ければ動かさない。
     * **キャンセルで「やめる」へ移る**のに使う。元 .js selectExit() L6127
     */
    selectHandler(handle) {
      const index = indexOfHandler(
        (i) => {
          var _this$_proxy$itemAt$h2, _this$_proxy$itemAt4;
          return (_this$_proxy$itemAt$h2 =
            (_this$_proxy$itemAt4 = this._proxy.itemAt(i)) === null ||
            _this$_proxy$itemAt4 === void 0
              ? void 0
              : _this$_proxy$itemAt4.handler) !== null &&
            _this$_proxy$itemAt$h2 !== void 0
            ? _this$_proxy$itemAt$h2
            : null;
        },
        this.maxItems(),
        handle,
      );
      if (index !== -1) {
        this.smoothSelect(index);
      }
    }
    callOkHandler() {
      var _this$_proxy$itemAt5;
      const handler =
        (_this$_proxy$itemAt5 = this._proxy.itemAt(this.index())) === null ||
        _this$_proxy$itemAt5 === void 0
          ? void 0
          : _this$_proxy$itemAt5.handler;
      if (handler && this.isHandled(handler)) {
        this.callHandler(handler);
      }
    }
    /** 項目の説明。元 .js helpText() L5264 / L5305 */
    helpTextAt(index) {
      var _this$_proxy$itemAt$h3, _this$_proxy$itemAt6;
      return (_this$_proxy$itemAt$h3 =
        (_this$_proxy$itemAt6 = this._proxy.itemAt(index)) === null ||
        _this$_proxy$itemAt6 === void 0
          ? void 0
          : _this$_proxy$itemAt6.helpText) !== null &&
        _this$_proxy$itemAt$h3 !== void 0
        ? _this$_proxy$itemAt$h3
        : "";
    }
    /** 元 .js updateHelp() L5478 */
    updateHelp() {
      setHelpText(this._helpWindow, this.helpTextAt(this.index()));
    }
    /** 背景はシンボルの色で塗る。キー配置画面と同じ形にしてある */
    drawItemBackground(index) {
      var _view$backColor;
      const view = this._proxy.itemAt(index);
      const color =
        (_view$backColor =
          view === null || view === void 0 ? void 0 : view.backColor) !==
          null && _view$backColor !== void 0
          ? _view$backColor
          : ColorManager.itemBackColor1();
      drawItemBack(
        this,
        this.itemRect(index),
        color,
        ColorManager.itemBackColor2(),
      );
    }
    drawItem(index) {
      const view = this._proxy.itemAt(index);
      if (!view) {
        return;
      }
      const rect = this.itemRectWithPadding(index);
      const right = view.code !== null ? `:${view.symbolName}` : "";
      const area = splitLeftRight(rect, !!right);
      this.changePaintOpacity(view.enabled);
      this.drawText(view.name, area.leftX, rect.y, area.leftWidth);
      if (right) {
        this.drawText(right, area.rightX, rect.y, area.rightWidth);
      }
      this.changePaintOpacity(true);
    }
  };
  //#endregion
  //#region src/baseSystem/inputConfig/scene/windows/keyConfig.ts
  /**
   * キー配置の一覧。元 .js Window_KeyConfig_MA_V10 L5897
   *
   * ゲームパッド側と違い、**1 つの項目が複数の添字を占める**ことで
   * 幅の広いキー（Enter / Space / コマンド）を表す。
   * 添字の範囲と寸法の計算は Proxy に借りる。
   */
  var Window_KeyConfig_MA = class extends Window_Selectable {
    /**
     * **Proxy は constructor の引数で受け取る。**
     * コアの constructor は引数をそのまま initialize() へ渡すので
     * (rmmz_windows.js L10)、super より前に入れられる。
     *
     * この画面では**順序が効く**。項目の高さは Proxy が決めるが、
     * コアは contentsHeight() に itemHeight() を足した大きさで
     * ビットマップを作り (rmmz_windows.js L899)、それは initialize() の中で
     * 1 度きりである。後から渡すと足りない大きさのまま固定される。
     */
    initialize(rect, proxy) {
      this._proxy = proxy;
      super.initialize(rect);
      this.refresh();
    }
    layoutIndex() {
      return this._proxy.layoutIndex();
    }
    layoutName() {
      return this._proxy.layoutName();
    }
    changeNextLayout() {
      this._proxy.changeNextLayout();
      this.refresh();
    }
    mapper() {
      return this._proxy.mapper();
    }
    isMapperValid() {
      return this._proxy.isMapperValid();
    }
    /** 選んでいるキーのキーコード。コマンド項目なら null */
    currentCode() {
      var _this$_proxy$itemAt$c, _this$_proxy$itemAt;
      return (_this$_proxy$itemAt$c =
        (_this$_proxy$itemAt = this._proxy.itemAt(this.index())) === null ||
        _this$_proxy$itemAt === void 0
          ? void 0
          : _this$_proxy$itemAt.code) !== null &&
        _this$_proxy$itemAt$c !== void 0
        ? _this$_proxy$itemAt$c
        : null;
    }
    symbolStringAt(keyCode) {
      return this._proxy.symbolStringAt(keyCode);
    }
    changeSymbol(keyCode, symbol) {
      this._proxy.changeSymbol(keyCode, symbol);
      this.refresh();
    }
    resetMapper(mapper) {
      this._proxy.resetMapper(mapper);
      this.refresh();
    }
    /** 確定操作。ここでだけ実際の入力へ書き戻す */
    applyToInput() {
      this._proxy.applyToInput();
    }
    maxItems() {
      return this._proxy.maxItems();
    }
    maxCols() {
      return this._proxy.maxCols();
    }
    /**
     * 寸法は**1 升の幅**から決まる。画面の大きさが作品ごとに違うため、
     * 固定値ではなく比で持つ（`pure/key.ts` の `keyGridMetrics()`）。
     */
    metrics() {
      return keyGridMetrics(this.itemWidth());
    }
    itemHeight() {
      return keyItemHeight(this.metrics());
    }
    /**
     * **隙間と余白はコアの既定より狭い。** 元 .js L6118〜L6128
     *
     * コアの既定（余白 8 / 横 8 / 縦 4）は、1 行に数個しか並べない画面のものである。
     * **19 列を並べるこの画面では、1 升 41px のうち 33px が隙間と余白で消え、
     * 文字を描ける幅が 17px しか残らない。**
     * そこへ 22px の字を詰めると、コアが横に潰して描く（`fillText` の maxWidth）。
     * **M・Q・X のような幅の広い字ほど潰れて読めなくなる。**
     */
    itemPadding() {
      return this.metrics().itemPadding;
    }
    colSpacing() {
      return this.metrics().colSpacing;
    }
    rowSpacing() {
      return this.metrics().rowSpacing;
    }
    /**
     * コアの既定（36）より小さい。元 .js lineHeight() L6115
     * コマンドと Enter を升の縦中央へ置くのに使う。
     */
    lineHeight() {
      return this.metrics().lineHeight;
    }
    /**
     * 幅の広い項目は、範囲の先頭の矩形を広げて返す。
     * JIS の Enter だけは 2 行にまたがるので別扱いにする（元 .js L5901）。
     */
    itemRect(index) {
      if (this._proxy.isTallAt(index)) {
        return this.tallItemRect();
      }
      const span = this._proxy.spanAt(index);
      const rect = spanRect(super.itemRect(span.head), span, this.metrics());
      return new Rectangle(rect.x, rect.y, rect.width, rect.height);
    }
    tallItemRect() {
      const rect = tallRect(
        super.itemRect(this._proxy.tallHeadIndex()),
        this.itemWidth(),
        this.itemHeight(),
      );
      return new Rectangle(rect.x, rect.y, rect.width, rect.height);
    }
    isItemEnabled(index) {
      var _this$_proxy$itemAt$e, _this$_proxy$itemAt2;
      return (_this$_proxy$itemAt$e =
        (_this$_proxy$itemAt2 = this._proxy.itemAt(index)) === null ||
        _this$_proxy$itemAt2 === void 0
          ? void 0
          : _this$_proxy$itemAt2.enabled) !== null &&
        _this$_proxy$itemAt$e !== void 0
        ? _this$_proxy$itemAt$e
        : false;
    }
    isCurrentItemEnabled() {
      return this.isItemEnabled(this.index());
    }
    /**
     * **これが無いと決定が一切届かない。**
     * コアの processHandling() は `isOkEnabled()`（既定は `isHandled("ok")`）が
     * 真のときだけ processOk() を呼ぶ (rmmz_windows.js L1154)。
     * この画面は "ok" ではなく項目ごとのハンドラ名で登録するため、既定のままでは
     * 常に偽になる。元 .js L6184
     */
    isOkEnabled() {
      return true;
    }
    /**
     * **押しっぱなしで連続発火しないようにする。** 元 .js L5032
     * コアの既定はキーリピートを拾う。
     */
    isOkTriggered() {
      return isOkTriggeredOnce(Input);
    }
    isCancelTriggered() {
      return isCancelTriggeredOnce(Input);
    }
    /** コマンドならそのハンドラ、キーなら "key" を呼ぶ */
    /** 選んでいる項目のハンドラ名 */
    currentHandler() {
      var _this$_proxy$itemAt$h, _this$_proxy$itemAt3;
      return (_this$_proxy$itemAt$h =
        (_this$_proxy$itemAt3 = this._proxy.itemAt(this.index())) === null ||
        _this$_proxy$itemAt3 === void 0
          ? void 0
          : _this$_proxy$itemAt3.handler) !== null &&
        _this$_proxy$itemAt$h !== void 0
        ? _this$_proxy$itemAt$h
        : "";
    }
    /**
     * そのハンドラ名の項目へカーソルを移す。無ければ動かさない。
     * **キャンセルで「やめる」へ移る**のに使う。元 .js selectExit() L6127
     */
    selectHandler(handle) {
      const index = indexOfHandler(
        (i) => {
          var _this$_proxy$itemAt$h2, _this$_proxy$itemAt4;
          return (_this$_proxy$itemAt$h2 =
            (_this$_proxy$itemAt4 = this._proxy.itemAt(i)) === null ||
            _this$_proxy$itemAt4 === void 0
              ? void 0
              : _this$_proxy$itemAt4.handler) !== null &&
            _this$_proxy$itemAt$h2 !== void 0
            ? _this$_proxy$itemAt$h2
            : null;
        },
        this.maxItems(),
        handle,
      );
      if (index !== -1) {
        this.smoothSelect(index);
      }
    }
    callOkHandler() {
      var _this$_proxy$itemAt5;
      const handler =
        (_this$_proxy$itemAt5 = this._proxy.itemAt(this.index())) === null ||
        _this$_proxy$itemAt5 === void 0
          ? void 0
          : _this$_proxy$itemAt5.handler;
      if (handler && this.isHandled(handler)) {
        this.callHandler(handler);
      }
    }
    currentSpan() {
      return this._proxy.spanAt(this.index());
    }
    cursorContext(wrap) {
      return {
        index: Math.max(0, this.index()),
        maxItems: this.maxItems(),
        maxCols: this.maxCols(),
        horizontal: this.isHorizontal(),
        wrap,
      };
    }
    /**
     * **止まらない升の判定。** 4 方向すべてがこれを使う。
     * Enter の場所取りの升へ来たら、同じ方向へもう 1 回動く。
     */
    skipJudge() {
      return (index) => this._proxy.isSkippedAt(index);
    }
    moveTo(next) {
      if (next !== null) {
        this.smoothSelect(next);
      }
    }
    /** 幅の広い項目を 1 つとして扱う。元 .js cursorRight() L6034 */
    cursorRight(wrap) {
      this.moveTo(
        nextIndexRight(
          this.cursorContext(wrap),
          this.currentSpan(),
          this.skipJudge(),
        ),
      );
    }
    /** 元 .js cursorLeft() L6047 */
    cursorLeft(wrap) {
      this.moveTo(
        nextIndexLeft(
          this.cursorContext(wrap),
          this.currentSpan(),
          this.skipJudge(),
        ),
      );
    }
    /**
     * 上下も止まらない升を飛ばす。
     * **コアの既定（添字 + 列数）だと、Enter の下半分へ落ちて
     * カーソルが動いて見えないまま同じキーの中に留まる。**
     */
    cursorDown(wrap) {
      this.moveTo(
        nextIndexVertical(this.cursorContext(wrap), true, this.skipJudge()),
      );
    }
    cursorUp(wrap) {
      this.moveTo(
        nextIndexVertical(this.cursorContext(wrap), false, this.skipJudge()),
      );
    }
    /** 項目の説明。元 .js getHelpText() L6156 */
    helpTextAt(index) {
      var _this$_proxy$itemAt$h3, _this$_proxy$itemAt6;
      return (_this$_proxy$itemAt$h3 =
        (_this$_proxy$itemAt6 = this._proxy.itemAt(index)) === null ||
        _this$_proxy$itemAt6 === void 0
          ? void 0
          : _this$_proxy$itemAt6.helpText) !== null &&
        _this$_proxy$itemAt$h3 !== void 0
        ? _this$_proxy$itemAt$h3
        : "";
    }
    /** 元 .js updateHelp() L6179 */
    updateHelp() {
      setHelpText(this._helpWindow, this.helpTextAt(this.index()));
    }
    /**
     * **同じ項目は、先頭の升で 1 度だけ描く。** 元 .js drawItem() L6090
     * 幅の広いキーは同じ矩形を何度も塗り直すことになり、無駄でしかない。
     */
    isContinuation(index) {
      return (
        this._proxy.isSkippedAt(index) || this.currentHeadOf(index) !== index
      );
    }
    currentHeadOf(index) {
      return this._proxy.spanAt(index).head;
    }
    /**
     * **背景はシンボルの色で塗る。** 元 .js drawItemBackground() L5941
     * コマンドなど色を持たない項目は、コアと同じ既定色になる。
     */
    drawItemBackground(index) {
      var _view$backColor;
      if (this.isContinuation(index)) {
        return;
      }
      const view = this._proxy.itemAt(index);
      const color =
        (_view$backColor =
          view === null || view === void 0 ? void 0 : view.backColor) !==
          null && _view$backColor !== void 0
          ? _view$backColor
          : ColorManager.itemBackColor1();
      drawItemBack(
        this,
        this.itemRect(index),
        color,
        ColorManager.itemBackColor2(),
      );
    }
    drawItem(index) {
      if (this.isContinuation(index)) {
        return;
      }
      const view = this._proxy.itemAt(index);
      if (!view) {
        return;
      }
      const padded = this.itemRectWithPadding(index);
      const tall = view.code === null || this._proxy.isTallAt(index);
      this.drawKeyText(
        view,
        tall ? lineRectOf(padded, this.lineHeight()) : padded,
      );
    }
    /**
     * 上段にキー名、下段にシンボル名。**どちらも中央揃え。** 元 .js drawKey() L6073
     * コマンドはシンボル名が空なので、上段だけが出る。
     */
    drawKeyText(view, rect) {
      const layout = keyTextLayout(rect, this.metrics());
      const fontSize = this.contents.fontSize;
      this.changePaintOpacity(view.enabled);
      this.contents.fontSize = layout.keyName.fontSize;
      this.drawText(
        view.name,
        layout.keyName.x,
        layout.keyName.y,
        layout.keyName.width,
        "center",
      );
      this.contents.fontSize = layout.symbolName.fontSize;
      this.drawText(
        view.symbolName,
        layout.symbolName.x,
        layout.symbolName.y,
        layout.symbolName.width,
        "center",
      );
      this.contents.fontSize = fontSize;
      this.changePaintOpacity(true);
    }
  };
  //#endregion
  //#region src/baseSystem/inputConfig/scene/windows/symbolList.ts
  /**
   * 割り当て先のシンボルを選ぶ一覧。元 .js Window_InputSymbolList L5194
   *
   * 中身は Proxy が持つ。`T` は選んだ結果を呼び出し側へ返すためだけの型で、
   * このクラスは名前と説明文しか見ない。
   */
  var Window_InputSymbolList_MA = class extends Window_Selectable {
    /**
     * **Proxy は constructor の引数で受け取る。**
     * コアの constructor は引数をそのまま initialize() へ渡すので
     * (rmmz_windows.js L10)、super より前に入れられる。
     * super.initialize() の中で寸法計算とビットマップ作成が走るため、
     * **そこより後に渡すと大きさが合わなくなる。**
     */
    initialize(rect, proxy) {
      this._proxy = proxy;
      super.initialize(rect);
      this.refresh();
    }
    maxItems() {
      return this._proxy.maxItems();
    }
    maxCols() {
      return 4;
    }
    /**
     * **押しっぱなしで連続発火しないようにする。** 元 .js L5032
     * コアの既定はキーリピートを拾う。
     */
    isOkTriggered() {
      return isOkTriggeredOnce(Input);
    }
    isCancelTriggered() {
      return isCancelTriggeredOnce(Input);
    }
    symbolAt(index) {
      return this._proxy.symbolAt(index);
    }
    currentSymbol() {
      return this.symbolAt(this.index());
    }
    selectSymbol(symbol) {
      this.select(this._proxy.indexOfSymbol(symbol));
    }
    /**
     * 選んでいるシンボルの説明。元 .js L5185
     * **コアの既定はヘルプ欄を消すだけ**なので (rmmz_windows.js L1345)、
     * 上書きしなければ何も出ない。
     */
    updateHelp() {
      const helpText = this._proxy.symbolHelpTextAt(this.index());
      setHelpText(this._helpWindow, helpText);
    }
    /**
     * 選べない項目は決定できない。コアの `processOk()` が音を鳴らして弾く。
     * 元 .js isItemEnabled() L5177
     */
    isItemEnabled(index) {
      return this._proxy.isEnabledAt(index);
    }
    isCurrentItemEnabled() {
      return this.isItemEnabled(this.index());
    }
    /** 選べない項目は薄く描く。元 .js drawSymbolObject() L5075 */
    drawItem(index) {
      const rect = this.itemRectWithPadding(index);
      this.changePaintOpacity(this.isItemEnabled(index));
      this.drawText(
        this._proxy.symbolNameAt(index),
        rect.x,
        rect.y,
        rect.width,
      );
      this.changePaintOpacity(true);
    }
  };
  //#endregion
  //#region src/baseSystem/inputConfig/scene/configScene.ts
  /**
   * 設定画面の土台。元 .js Scene_GamepadConfig_V8 (L5573) / Scene_KeyConfig_V10 (L6196)
   *
   * `TSymbol` は選んだシンボルの型で、この画面からは中身が見えない。
   * 文字列が要るときは Proxy の symbolStringOf() を通す。
   */
  var ConfigSceneBase = class extends Scene_MenuBase {
    /** 割り当て先を選ぶ一覧。端末によらず同じなのでここで作る */
    createSymbolWindow(proxy) {
      return new Window_InputSymbolList_MA(this.symbolRect(), proxy);
    }
    /** 端末ごとに増えるコマンド。既定では無い（キーボードの WASD だけが持つ） */
    extraHandlers() {
      return [];
    }
    /**
     * 背景画像。元 .js Scene_MenuBaseMVMZ.createBackground() L1070
     *
     * **`super.create()` の中から呼ばれる**（rmmz_scenes.js Scene_MenuBase.create）ので、
     * この時点で参照できるのは create() の先頭で作った Proxy だけである。
     */
    createBackground() {
      const fileName = this._proxy.backgroundImage();
      if (!fileName) {
        super.createBackground();
        return;
      }
      this.addChild(new Sprite(ImageManager.loadTitle1(fileName)));
    }
    create() {
      this._proxy = this.createSceneProxy();
      super.create();
      this.createHelpWindow();
      this.setupConfigWindow();
      this.setupSymbolWindow();
    }
    /**
     * 設定ウィンドウの矩形。**画面の上側だけを使う。**
     *
     * **シンボル一覧の場所を必ず残す。** 主区画を丸ごと取ると
     * 一覧の高さが 0 になり、**コアが中身のビットマップを作れずに落ちる。**
     * 画面が小さい・並べる行数が多い場合に起きうる。
     */
    configRect(height) {
      const y = this.mainAreaTop();
      const limit = this.mainAreaHeight() - this.calcWindowHeight(1, true);
      return new Rectangle(0, y, Graphics.boxWidth, Math.min(height, limit));
    }
    /**
     * シンボル一覧の矩形。**設定ウィンドウの下の残り全部。**
     *
     * **2 つを重ねてはいけない。** 重ねると、隠れている側の項目が
     * 見えないまま残り、どちらを操作しているのか分からなくなる。
     * 元 .js も上下に分けていた（symbolListRect() L6291）。
     */
    symbolRect() {
      const top = this._configWindow.y + this._configWindow.height;
      const bottom = this.mainAreaTop() + this.mainAreaHeight();
      return new Rectangle(0, top, Graphics.boxWidth, bottom - top);
    }
    setupConfigWindow() {
      const window = this.createConfigWindow(this._proxy.createConfigProxy());
      const handles = this._proxy.handles;
      window.setHelpWindow(this._helpWindow);
      window.setHandler(handles.item, this.onItemOk.bind(this));
      window.setHandler("cancel", this.onCancel.bind(this));
      window.setHandler(handles.save, this.onSave.bind(this));
      window.setHandler(handles.reset, this.onReset.bind(this));
      window.setHandler(handles.layout, this.onChangeLayout.bind(this));
      window.setHandler(handles.exit, this.onCancel.bind(this));
      for (const command of this.extraHandlers()) {
        window.setHandler(command.handle, command.method);
      }
      this.addWindow(window);
      window.activate();
      window.select(0);
      this._configWindow = window;
    }
    /**
     * **設定ウィンドウを作った後に呼ぶ。** 矩形がその下端から決まる。
     * 隠さずに置いたままにする。操作を受けるかどうかは active だけで決まり、
     * 見えていること自体は邪魔にならない。
     */
    setupSymbolWindow() {
      const window = this.createSymbolWindow(
        this._proxy.createSymbolListProxy(),
      );
      window.setHelpWindow(this._helpWindow);
      window.setHandler("ok", this.onSymbolOk.bind(this));
      window.setHandler("cancel", this.onSymbolCancel.bind(this));
      window.deactivate();
      window.deselect();
      this.addWindow(window);
      this._symbolWindow = window;
    }
    onItemOk() {
      const code = this._configWindow.currentCode();
      if (code === null) {
        this.activateConfigWindow();
        return;
      }
      this._symbolWindow.activate();
      this._symbolWindow.selectSymbol(this._configWindow.symbolStringAt(code));
    }
    onSymbolOk() {
      const code = this._configWindow.currentCode();
      const symbol = this._symbolWindow.currentSymbol();
      if (code !== null && symbol) {
        SoundManager.playEquip();
        this._configWindow.changeSymbol(
          code,
          this._proxy.symbolStringOf(symbol),
        );
      }
      this.closeSymbolWindow();
    }
    onSymbolCancel() {
      this.closeSymbolWindow();
    }
    /** 操作を設定ウィンドウへ戻す。**一覧は出したままで、選択だけ外す** */
    closeSymbolWindow() {
      this._symbolWindow.deactivate();
      this._symbolWindow.deselect();
      this.activateConfigWindow();
    }
    /** 設定画面へ操作を戻す。ヘルプは選び直さないと消えたままになる */
    activateConfigWindow() {
      this._configWindow.activate();
      this._configWindow.updateHelp();
    }
    onSave() {
      if (!this._configWindow.isMapperValid()) {
        this._configWindow.playBuzzerSound();
        this.activateConfigWindow();
        return;
      }
      this._configWindow.applyToInput();
      this._proxy.saveLayoutIndex(this._configWindow.layoutIndex());
      ConfigManager.save();
      this.popScene();
    }
    onReset() {
      this._configWindow.resetMapper(this._proxy.defaultMapper());
      this.activateConfigWindow();
    }
    onChangeLayout() {
      this._configWindow.changeNextLayout();
      this.activateConfigWindow();
    }
    /**
     * **キャンセルは二段階。** 元 .js onKeyboardCancel() L6367
     *
     * 1 回目は「やめる」へカーソルを移すだけで、画面は閉じない。
     * **保存していない変更を、押し間違いで捨てないため**である。
     * 既に「やめる」を選んでいれば閉じる（そこで決定を押した場合も同じ道を通る）。
     */
    onCancel() {
      const exit = this._proxy.handles.exit;
      if (this._configWindow.currentHandler() === exit) {
        this.popScene();
        return;
      }
      this._configWindow.selectHandler(exit);
      this.activateConfigWindow();
    }
  };
  //#endregion
  //#region src/baseSystem/inputConfig/scene/gamepad.ts
  /**
   * 元 .js Scene_GamepadConfig_V8 L5573
   * Proxy を作るのは連結層の具象クラスなので、ここは抽象のまま（createSceneProxy は未実装）。
   */
  var GamepadSceneBase = class extends ConfigSceneBase {
    /**
     * 並べる行数ぶんの高さで作る。**残りはシンボル一覧が使う。**
     * 項目の高さはコアの既定のままなので、calcWindowHeight() がそのまま使える。
     */
    createConfigWindow(proxy) {
      const height = this.calcWindowHeight(proxy.rowCount(), true);
      return new Window_GamepadConfig_MA(this.configRect(height), proxy);
    }
  };
  //#endregion
  //#region src/baseSystem/inputConfig/scene/key.ts
  /**
   * 元 .js Scene_KeyConfig_V10 L6196
   * Proxy を作るのは連結層の具象クラスなので、ここは抽象のまま（createSceneProxy は未実装）。
   */
  var KeySceneBase = class extends ConfigSceneBase {
    /**
     * 並べる行数ぶんの高さで作る。**残りはシンボル一覧が使う。** 計算は keyConfigWindowHeight()。
     * **行数 0 で呼ぶと上下の余白だけが返る**ので、それを余白として渡す。
     */
    createConfigWindow(proxy) {
      const height = keyConfigWindowHeight(
        Graphics.boxWidth,
        this.calcWindowHeight(0, true),
        proxy.maxCols(),
        proxy.rowCount(),
      );
      return new Window_KeyConfig_MA(this.configRect(height), proxy);
    }
    /** WASD はキーボードにしか無い。元 .js setupWASD() L5989 */
    extraHandlers() {
      return [
        {
          handle: this._proxy.wasdHandle,
          method: this.onWasd.bind(this),
        },
      ];
    }
    /** WASD の 6 キーだけを差し替える。他の割り当ては残す */
    onWasd() {
      this._configWindow.resetMapper(
        this._proxy.withWasd(this._configWindow.mapper()),
      );
      this.activateConfigWindow();
    }
  };
  //#endregion
  //#region src/baseSystem/inputConfig/symbolList.ts
  /**
   * 割り当て先として選べるシンボルの一覧。
   * ウィンドウは名前と説明しか見ないが、選んだ結果は項目のまま返す。
   *
   * **末尾に「設定を消去」が付く。** 選ぶと空シンボルが割り当てられ、
   * 書き戻しの `normalizeMapper()` がその割り当てを落とす。
   *
   * **不正なシンボルも並べる。** 選べない状態で出し、ヘルプへ理由を出す
   * （`logic/core/pure/symbolList.ts`）。消すと書き間違いに気付けない。
   */
  const createSymbolListProxy = (symbols, settings) => {
    const items = createSymbolListItems(
      symbols.map((symbol) => symbolListEntryOf(symbol, settings.symbolErrors)),
      settings.deleteSymbolName,
    );
    return {
      maxItems: () => items.length,
      indexOfSymbol: (symbol) => selectIndexOfSymbol(items, symbol),
      symbolAt: (index) => {
        var _items$index;
        return (_items$index = items[index]) !== null && _items$index !== void 0
          ? _items$index
          : null;
      },
      symbolNameAt: (index) => {
        var _items$index$name, _items$index2;
        return (_items$index$name =
          (_items$index2 = items[index]) === null || _items$index2 === void 0
            ? void 0
            : _items$index2.name) !== null && _items$index$name !== void 0
          ? _items$index$name
          : "";
      },
      symbolHelpTextAt: (index) => {
        var _items$index$helpText, _items$index3;
        return (_items$index$helpText =
          (_items$index3 = items[index]) === null || _items$index3 === void 0
            ? void 0
            : _items$index3.helpText) !== null &&
          _items$index$helpText !== void 0
          ? _items$index$helpText
          : "";
      },
      isEnabledAt: (index) => {
        var _items$index$enabled, _items$index4;
        return (_items$index$enabled =
          (_items$index4 = items[index]) === null || _items$index4 === void 0
            ? void 0
            : _items$index4.enabled) !== null && _items$index$enabled !== void 0
          ? _items$index$enabled
          : false;
      },
    };
  };
  //#endregion
  //#region src/baseSystem/inputConfig/sceneGamepadConfig.ts
  /**
   * 画面 1 回ぶんの配線を作る。呼ばれるのは画面の create() の中（ウィンドウを作る直前）。
   *
   * モデルは**画面を開いた時点の Input を写す**ので、ここで 1 回だけ組む。
   */
  const createGamepadSceneProxy = (store, input) => {
    const settings = store.settings();
    const model = createModel(
      {
        keyMapper: input.keyMapper,
        padMapper: input.gamepadMapper,
      },
      settings,
      store.extendsSymbols(),
    );
    return {
      createConfigProxy: () =>
        createGamepadConfigProxy(
          model,
          input.gamepadMapper,
          settings,
          store.layoutSelection().padLayoutIndex,
        ),
      createSymbolListProxy: () =>
        createSymbolListProxy(model.symbols, settings),
      symbolStringOf: (symbol) => symbol.symbol,
      defaultMapper: () => store.cloneDefaultGamepadMapper(),
      backgroundImage: () => settings.backgrounds.gamepad,
      saveLayoutIndex: (index) => {
        store.setPadLayoutIndex(index);
      },
      handles: {
        item: GAMEPAD_BUTTON_HANDLER,
        save: SAVE_HANDLE,
        reset: RESET_HANDLE,
        layout: LAYOUT_HANDLE,
        exit: EXIT_HANDLE,
      },
    };
  };
  /**
   * ゲームパッドのボタン割り当て画面。元 .js Scene_GamepadConfig_V8 L5573
   *
   * **constructor は書かない（引数を持てない）。**
   * ツクールは Scene を引数なしで作り、popScene() で戻るときも作り直す
   * (rmmz_managers.js L2203 / L2211)。配線は土台が create() から求める。
   */
  var Scene_GamepadConfig_MA = class extends GamepadSceneBase {
    createSceneProxy() {
      return createGamepadSceneProxy(inputConfigStore(), Input);
    }
  };
  //#endregion
  //#region src/baseSystem/inputConfig/keyConfig.ts
  /**
   * JIS の Enter が占める 4 マス。**どの添字も同じ矩形になる。**
   * 名前を出すのは `ENTER_JIS` の 1 マスだけで、残りは場所取りである。
   */
  const isEnterJis = (key) =>
    key === KEYS.ENTER_JIS || key === KEYS.ENTER_JIS_NULL;
  var KeyConfigSource = class {
    constructor(model, mapper, settings, layoutIndex) {
      this.model = model;
      this.settings = settings;
      this.tmpMapper = { ...mapper };
      this.layout = KEYBOARD_LAYOUTS[layoutIndex] ? layoutIndex : 0;
      this.items = [];
      this.enterJisIndex = -1;
      this.remakeItems();
    }
    remakeItems() {
      const layout = KEYBOARD_LAYOUTS[this.layout];
      this.items = createKeyConfigItems(layout.keys, this.settings.keyCommands);
      this.enterJisIndex = this.items.findIndex(
        (item) => item.kind === "key" && isEnterJis(item.key),
      );
    }
    maxItems() {
      return this.items.length;
    }
    itemAt(index) {
      const item = keyItemAt(this.items, index);
      if (!item) {
        return null;
      }
      if (item.kind !== "key") {
        return {
          name: item.command.name,
          symbolName: "",
          backColor: null,
          enabled: this.isEnabledAt(index),
          handler: item.command.handle,
          helpText:
            item.command.handle === "layout"
              ? this.layoutName()
              : item.command.helpText,
          code: null,
        };
      }
      const symbol = symbolAt(
        this.tmpMapper,
        this.model.dictionary,
        item.key.code,
      );
      const enabled = this.isEnabledAt(index);
      const settings = this.settings;
      return {
        name: item.key.char,
        symbolName: symbol ? symbol.name : "",
        backColor: symbol
          ? symbolBackColor(symbol, this.model.colors)
          : this.model.colors.normal,
        enabled,
        handler: "key",
        helpText: keyHelpText(
          {
            keyName: item.key.char,
            symbolName: symbol ? symbol.name : "",
            description: symbol ? symbol.helpText : "",
            editable: enabled,
          },
          {
            unassigned: settings.unassignedText,
            locked: settings.lockedKeyText,
          },
        ),
        code: item.key.code,
      };
    }
    /**
     * 保存コマンドだけはマッパーの妥当性で決まる。元 .js isCurrentItemEnabled() L6195
     * ゲームパッド側の isItemEnabledAt() と同じ扱いにしてある。
     */
    isEnabledAt(index) {
      if (keyHandlerAt(this.items, index) === "save") {
        return this.isMapperValid();
      }
      return isKeyItemEnabled(this.items, index);
    }
    symbolStringAt(code) {
      var _this$tmpMapper$code;
      return (_this$tmpMapper$code = this.tmpMapper[code]) !== null &&
        _this$tmpMapper$code !== void 0
        ? _this$tmpMapper$code
        : "";
    }
    changeSymbol(code, symbol) {
      this.tmpMapper[code] = symbol;
    }
    mapper() {
      return this.tmpMapper;
    }
    resetMapper(mapper) {
      this.tmpMapper = { ...mapper };
    }
    applyToInput() {
      Input.keyMapper = { ...normalizeMapper(this.tmpMapper) };
      Input.clear();
    }
    isMapperValid() {
      return isMapperValid(this.tmpMapper, this.model.mandatory);
    }
    layoutIndex() {
      return this.layout;
    }
    layoutName() {
      return KEYBOARD_LAYOUTS[this.layout].name;
    }
    changeNextLayout() {
      this.layout = (this.layout + 1) % KEYBOARD_LAYOUTS.length;
      this.remakeItems();
    }
    maxCols() {
      return 19;
    }
    rowCount() {
      return gridRowCount(this.maxItems(), this.maxCols());
    }
    spanAt(index) {
      return spanOf((i) => keyItemAt(this.items, i), index, this.maxItems());
    }
    /** 場所取りの升か。カーソルはここに止まらない */
    isSkippedAt(index) {
      const item = keyItemAt(this.items, index);
      return !!item && item.kind === "key" && item.key === KEYS.ENTER_JIS_NULL;
    }
    isTallAt(index) {
      const item = keyItemAt(this.items, index);
      return !!item && item.kind === "key" && isEnterJis(item.key);
    }
    tallHeadIndex() {
      return this.enterJisIndex;
    }
  };
  /**
   * settings は連結層が store から読んで渡す。起動後に変わらないので構築時に 1 回だけ。
   * layoutIndex は開いた直後の配置。保存済みの選択を渡す。
   * 元 .js は配置の選択を画面の外で持ち続けていた (L5991)ので、開き直しても戻らない。
   */
  const createKeyConfigProxy = (model, mapper, settings, layoutIndex = 0) =>
    new KeyConfigSource(model, mapper, settings, layoutIndex);
  //#endregion
  //#region src/baseSystem/inputConfig/sceneKeyConfig.ts
  /**
   * 画面 1 回ぶんの配線を作る。呼ばれるのは画面の create() の中（ウィンドウを作る直前）。
   *
   * モデルは**画面を開いた時点の Input を写す**ので、ここで 1 回だけ組む。
   */
  const createKeySceneProxy = (store, input) => {
    const settings = store.settings();
    const model = createModel(
      {
        keyMapper: input.keyMapper,
        padMapper: input.gamepadMapper,
      },
      settings,
      store.extendsSymbols(),
    );
    return {
      createConfigProxy: () =>
        createKeyConfigProxy(
          model,
          input.keyMapper,
          settings,
          store.layoutSelection().keyLayoutIndex,
        ),
      createSymbolListProxy: () =>
        createSymbolListProxy(model.symbols, settings),
      symbolStringOf: (symbol) => symbol.symbol,
      defaultMapper: () => store.cloneDefaultKeyMapper(),
      backgroundImage: () => settings.backgrounds.key,
      saveLayoutIndex: (index) => {
        store.setKeyLayoutIndex(index);
      },
      handles: {
        item: "key",
        save: SAVE_HANDLE,
        reset: RESET_HANDLE,
        layout: LAYOUT_HANDLE,
        exit: EXIT_HANDLE,
      },
      wasdHandle: WASD_HANDLE,
      withWasd: (mapper) => withWasd(mapper),
    };
  };
  /**
   * キーボードのキー割り当て画面。元 .js Scene_KeyConfig_V10 L6196
   *
   * **constructor は書かない（引数を持てない）。**
   * ツクールは Scene を引数なしで作り、popScene() で戻るときも作り直す
   * (rmmz_managers.js L2203 / L2211)。配線は土台が create() から求める。
   */
  var Scene_KeyConfig_MA = class extends KeySceneBase {
    createSceneProxy() {
      return createKeySceneProxy(inputConfigStore(), Input);
    }
  };
  //#endregion
  //#region src/baseSystem/inputConfig/globals.ts
  const publicApi = {
    Scene_KeyConfig: Scene_KeyConfig_MA,
    Scene_GamepadConfig: Scene_GamepadConfig_MA,
    gotoKey: () => {
      SceneManager.push(Scene_KeyConfig_MA);
    },
    gotoGamepad: () => {
      SceneManager.push(Scene_GamepadConfig_MA);
    },
  };
  /**
   * 読み込まれたことを示す旗。元 .js L966-970
   *
   * **他プラグインはこの旗で存在を確かめる。** 無いと連携側が黙って動かなくなる。
   * 元 .js と同じく**読み込み時に立てる**（パラメータを読む前。旗は設定に依存しない）。
   *
   * **二重に読み込まれたら止める。** フックが 2 重に張られ、割り当ての取り込みも 2 回走るため。
   */
  const installImportedFlag = () => {
    var _globalThis$Imported;
    globalThis.Imported =
      (_globalThis$Imported = globalThis.Imported) !== null &&
      _globalThis$Imported !== void 0
        ? _globalThis$Imported
        : {};
    if (globalThis.Imported.Mano_InputConfig) {
      throw new Error("Mano_InputConfig is Duplicate");
    }
    globalThis.Imported.Mano_InputConfig = true;
  };
  /** 公開する。セーブデータのロードより前に済ませる（entry.md の順序） */
  const installGlobals = () => {
    globalThis.Mano_InputConfig = publicApi;
  };
  //#endregion
  //#region src/baseSystem/inputConfig/touchButton.ts
  /**
   * タッチボタン 1 つ。
   * 元 .js Sprite_EX_Base (L2670) と Sprite_EX_ButtonMZ (L2713) を 1 つにまとめた。
   * **分かれていたが、派生は片方 1 つだけで、共通化の意味が無かった。**
   */
  var Sprite_TouchButton_MA = class extends Sprite_Clickable {
    constructor(button) {
      super();
      this._button = button;
      this._imageHeight = 0;
      this.bitmap = loadTouchButtonBitmap(button, (folder, fileName) =>
        ImageManager.loadBitmap(folder, fileName),
      );
      this.x = button.x;
      this.y = button.y;
      this.setupFrameOnLoad();
    }
    /** 読み込みが済むまで大きさが分からないので、済んでから切り出す */
    setupFrameOnLoad() {
      if (this.bitmap.isReady()) {
        this.onBitmapLoaded();
        return;
      }
      this.bitmap.addLoadListener(() => {
        this.onBitmapLoaded();
      });
    }
    onBitmapLoaded() {
      this._imageHeight = buttonImageHeight(this.bitmap);
      this.updateFrame();
    }
    updateFrame() {
      const frame = buttonFrame(
        {
          bitmap: this.bitmap,
          imageHeight: this._imageHeight,
        },
        this.isPressed(),
      );
      this.setFrame(frame.x, frame.y, frame.width, frame.height);
    }
    /** 押している間、対応するシンボルを押下状態にする。元 .js virtualPress() L1296 */
    onPress() {
      const symbol = this._button.symbol;
      Input._currentState[symbol] = nextPressState({
        pressed: !!Input._currentState[symbol],
        touched: TouchInput.isPressed(),
      });
    }
    /** 離した瞬間は、トリガー扱いの入力としてコアへ渡す。元 .js L2731 */
    onClick() {
      Input.virtualClick(this._button.symbol);
    }
    update() {
      super.update();
      if (!this.isPressed()) {
        Input._currentState[this._button.symbol] = false;
      }
      this.updateFrame();
    }
  };
  /**
   * タッチボタンをまとめた層。元 .js Spriteset_TouchButton L2741
   *
   * **コアの `Sprite` を土台にしている。** 元 .js は `PIXI.Container` を継いで
   * `update()` を自前で回していたが、`Sprite.prototype.update` が
   * 子の `update()` を呼ぶ（rmmz_core.js）ので、その分が要らなくなる。
   */
  var Spriteset_TouchButton_MA = class extends Sprite {
    constructor(buttons) {
      super();
      this._buttons = buttons.map(
        (button) => new Sprite_TouchButton_MA(button),
      );
      for (const sprite of this._buttons) {
        this.addChild(sprite);
      }
    }
    /** どれか 1 つでも押されているか。マップのタッチ移動を止めるのに使う */
    isAnyButtonPressed() {
      return this._buttons.some((button) => button.isPressed());
    }
  };
  //#endregion
  //#region src/baseSystem/inputConfig/hook.ts
  /**
   * オプション画面での識別子。元 .js MA_GAMEPAD_CONFIG / MA_KEYBOARD_CONFIG L4704
   *
   * 元 .js はアツマール環境で `location.pathname` を後ろへ足していた
   * （`makeCONFIG_KEY`）。**セーブに載る値ではない**（画面上のシンボルにすぎない）ので、
   * ここでは足さない。載る側のキーは logic/core/store.ts の CONFIG_KEY。
   */
  const GAMEPAD_CONFIG_SYMBOL = "GAMEPAD_CONFIG";
  const KEYBOARD_CONFIG_SYMBOL = "KEYBOARD_CONFIG";
  const isConfigSymbol = (symbol) =>
    symbol === GAMEPAD_CONFIG_SYMBOL || symbol === KEYBOARD_CONFIG_SYMBOL;
  /**
   * 起動時の初期化を差し込む。setup の中身はエントリポイントが渡す。
   *
   * **元の処理より前。** `Scene_Boot.onDatabaseLoaded` の中で `ConfigManager.load()` が呼ばれるので、
   * 先に差し込めば「保存された設定を取り込む前に初期マッパーを複製する」を満たす。
   * この位置を選んだ理由は rmmz.ts の setupInputConfig() にある。
   */
  const installBootHook = (setup) => {
    const Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function () {
      setup();
      Scene_Boot_onDatabaseLoaded.call(this);
    };
  };
  /**
   * config への保存と読み込み。元 .js ConfigManager.makeData / applyData のフック L4739 / L4753
   *
   * repair は読み込んだ割り当ての修復。旧バージョンで保存された設定が来る唯一の経路なので、
   * 読み込んだ直後に通す。中身はエントリポイントが渡す（起動時にも同じものを通すため）。
   */
  const installConfigHooks = (repair) => {
    const ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function () {
      const result = ConfigManager_makeData.call(this);
      result[CONFIG_KEY] = inputConfigStore().makeSaveData(
        Input.keyMapper,
        Input.gamepadMapper,
      );
      return result;
    };
    const ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
      ConfigManager_applyData.call(this, config);
      const store = inputConfigStore();
      if (!store.isCaptured()) {
        store.captureDefaults(Input.keyMapper, Input.gamepadMapper);
      }
      const applied = store.applySaveData(config[CONFIG_KEY]);
      Input.keyMapper = applied.keyMapper;
      Input.gamepadMapper = applied.gamepadMapper;
      repair();
      Input.clear();
    };
  };
  /**
   * オプション画面へ 2 項目を足す。エントリポイントから 1 回だけ呼ぶ。
   *
   * 差し込む先が `addVolumeOptions` なのは元 .js と同じ。
   * 音量設定の後ろ（一覧の末尾）へ並ぶ。
   */
  const installOptionCommands = () => {
    const Window_Options_addVolumeOptions =
      Window_Options.prototype.addVolumeOptions;
    Window_Options.prototype.addVolumeOptions = function () {
      Window_Options_addVolumeOptions.call(this);
      const names = inputConfigStore().settings().optionCommands;
      this.addCommand(names.gamepad, GAMEPAD_CONFIG_SYMBOL, true);
      this.addCommand(names.keyboard, KEYBOARD_CONFIG_SYMBOL, true);
    };
    const Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function (index) {
      return isConfigSymbol(this.commandSymbol(index))
        ? ""
        : Window_Options_statusText.call(this, index);
    };
    const Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function () {
      Window_Options_processOk.call(this);
      if (SceneManager.isSceneChanging()) {
        return;
      }
      const symbol = this.currentSymbol();
      if (symbol === GAMEPAD_CONFIG_SYMBOL) {
        this.playOkSound();
        SceneManager.push(Scene_GamepadConfig_MA);
        return;
      }
      if (symbol === KEYBOARD_CONFIG_SYMBOL) {
        this.playOkSound();
        SceneManager.push(Scene_KeyConfig_MA);
      }
    };
    const Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands = function () {
      return Scene_Options_maxCommands.call(this) + 2;
    };
  };
  /**
   * マップ上のタッチボタン。元 .js L2768〜L2786
   *
   * **張るかどうかはエントリポイントが決める**（ボタンが 1 つも無ければ呼ばない）。
   * ボタンはパラメータを読んだ後でなければ決まらないので、起動時の初期化の中で呼ばれる。
   */
  const installTouchButtons = (buttons) => {
    const Scene_Map_createButtons = Scene_Map.prototype.createButtons;
    Scene_Map.prototype.createButtons = function () {
      Scene_Map_createButtons.call(this);
      if (!ConfigManager.touchUI) {
        return;
      }
      const layer = new Spriteset_TouchButton_MA(buttons);
      this.addWindow(layer);
      this._touchButtonsMA = layer;
    };
    const Scene_Map_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function () {
      if (Scene_Map_isAnyButtonPressed.call(this)) {
        return true;
      }
      const layer = this._touchButtonsMA;
      return !!layer && layer.isAnyButtonPressed();
    };
  };
  /** 判定を Input へ委ねる。pure 側が Input を知らずに済むようにするための橋 */
  const INPUT_JUDGE = {
    isPressed: (symbol) => Input.isPressed(symbol),
    isTriggered: (symbol) => Input.isTriggered(symbol),
    isRepeated: (symbol) => Input.isRepeated(symbol),
  };
  /**
   * 押されているボタンに対応するコモンイベントを予約する。
   *
   * 既に何か予約されている場合は何もしない。**イベント実行中の割り込みを防ぐため**で、
   * 元 .js callButtonEvent() L2519 が予約済みなら走査を打ち切っていたのと同じ。
   */
  const reserveButtonEvent = () => {
    const symbols = inputConfigStore().extendsSymbols();
    if (symbols.length === 0) {
      return;
    }
    if ($gameTemp.isCommonEventReserved()) {
      return;
    }
    const eventId = eventIdToReserve(symbols, INPUT_JUDGE);
    if (eventId !== null) {
      $gameTemp.reserveCommonEvent(eventId);
    }
  };
  /**
   * ボタン押下によるコモンイベント呼び出し。元 .js のフック L6488 と同じ位置。
   *
   * **マップ上でだけ働く。** 予約したコモンイベントを実行するのは
   * Game_Map.setupStartingEvent() であり、戦闘やメニューでは走らない。
   *
   * 元の処理より**前**に予約する。予約したコモンイベントは
   * 同じ setupStartingEvent() の中の `setupReservedCommonEvent()` が拾うため、
   * 後に置くと 1 フレーム遅れる。
   */
  const installCommonEventCall = () => {
    const Game_Map_setupStartingEvent = Game_Map.prototype.setupStartingEvent;
    Game_Map.prototype.setupStartingEvent = function () {
      reserveButtonEvent();
      return Game_Map_setupStartingEvent.call(this);
    };
  };
  //#endregion
  //#region src/baseSystem/inputConfig/interop.ts
  /**
   * 連携を有効にする。エントリポイントから 1 回だけ呼ぶ。
   *
   * **相手が居るかを実行時に探さない。** プラグインの読み込み順は
   * 利用者が決めるので、自分が先に読まれると相手の旗はまだ立っていない。
   * 有効にするかどうかはプラグインパラメータで決める。
   */
  const installYepInterop = (settings) => {
    var _globalThis$Imported;
    if (!settings.gamepad && !settings.keyboard) {
      return;
    }
    globalThis.Imported =
      (_globalThis$Imported = globalThis.Imported) !== null &&
      _globalThis$Imported !== void 0
        ? _globalThis$Imported
        : {};
    if (settings.gamepad) {
      var _Input$isControllerCo;
      globalThis.Imported.GamepadConfig = true;
      window.Scene_GamepadConfig = Scene_GamepadConfig_MA;
      Input.isControllerConnected =
        (_Input$isControllerCo = Input.isControllerConnected) !== null &&
        _Input$isControllerCo !== void 0
          ? _Input$isControllerCo
          : () => true;
    }
    if (settings.keyboard) {
      globalThis.Imported.YEP_KeyboardConfig = true;
      window.Scene_KeyConfig = Scene_KeyConfig_MA;
    }
  };
  //#endregion
  //#region src/baseSystem/inputConfig/pluginCommand.ts
  const gamepadNamedButtons = (index) => {
    var _GAMEPAD_LAYOUTS$inde;
    return gamepadButtons(
      ((_GAMEPAD_LAYOUTS$inde = GAMEPAD_LAYOUTS[index]) !== null &&
      _GAMEPAD_LAYOUTS$inde !== void 0
        ? _GAMEPAD_LAYOUTS$inde
        : GAMEPAD_LAYOUTS[0]
      ).layout,
    ).map((button) => ({
      id: button.buttonId,
      name: button.name,
    }));
  };
  const keyboardNamedButtons = (index) => {
    var _KEYBOARD_LAYOUTS$ind;
    return (
      (_KEYBOARD_LAYOUTS$ind = KEYBOARD_LAYOUTS[index]) !== null &&
      _KEYBOARD_LAYOUTS$ind !== void 0
        ? _KEYBOARD_LAYOUTS$ind
        : KEYBOARD_LAYOUTS[0]
    ).keys.map((key) => ({
      id: key.code,
      name: key.char,
    }));
  };
  /**
   * いま名前を引くべきデバイス。パッドが繋がっていればパッド。
   * 元 .js getCurrentDevice() L5799 と同じ判定にする。
   */
  const currentDeviceButtons = (snapshot) =>
    snapshot.gamepadConnected
      ? {
          buttons: gamepadNamedButtons(snapshot.layout.padLayoutIndex),
          mapper: snapshot.gamepadMapper,
        }
      : {
          buttons: keyboardNamedButtons(snapshot.layout.keyLayoutIndex),
          mapper: snapshot.keyMapper,
        };
  /**
   * シンボルに割り当てられたボタンの名前。割り当てが無ければ空文字。
   *
   * **空文字を返すのは元 .js からの変更である。**
   * 元 .js は見つからないと変数へ何も書かなかった (L6528 の if)。
   * この値はメッセージ表示に使うものなので、
   * **書かないと前回の名前が残ったまま表示される。**
   * 「割り当てが無い」を空文字で表せるほうが事故が少ない。
   * 元 .js の GetButtonNameMV() L6513 も、同じ場合に "" を返している。
   */
  const getButtonName = (snapshot, symbol) => {
    var _buttonNameOfSymbol;
    const device = currentDeviceButtons(snapshot);
    return (_buttonNameOfSymbol = buttonNameOfSymbol(
      device.buttons,
      device.mapper,
      symbol,
    )) !== null && _buttonNameOfSymbol !== void 0
      ? _buttonNameOfSymbol
      : "";
  };
  //#endregion
  //#region src/baseSystem/inputConfig/registerCommands.ts
  /** 元 .js createPadState() L5206 → isConected() L4102 */
  const isGamepadConnected = () => {
    const pads = navigator.getGamepads ? navigator.getGamepads() : null;
    return !!pads && !!pads[0];
  };
  const readInput = () => ({
    gamepadConnected: isGamepadConnected(),
    keyMapper: Input.keyMapper,
    gamepadMapper: Input.gamepadMapper,
    layout: inputConfigStore().layoutSelection(),
  });
  /**
   * 元 .js は GetButtonName と GetButtonNameEX に**同じ関数**を登録している (L6568)。
   * 違うのは注釈側だけで、EX は `@type any` でシンボルを直接書ける。
   * 実装を分けると、片方だけ直る事故が起きる。
   */
  const getButtonNameCommand = (arg) => {
    const raw = arg;
    $gameVariables.setValue(
      Number(raw.nameVariable),
      getButtonName(readInput(), raw.symbol),
    );
  };
  const registerCommands = (pluginName) => {
    PluginManager.registerCommand(
      pluginName,
      "GetButtonName",
      getButtonNameCommand,
    );
    PluginManager.registerCommand(
      pluginName,
      "GetButtonNameEX",
      getButtonNameCommand,
    );
    PluginManager.registerCommand(pluginName, "GamepadScene", () => {
      SceneManager.push(Scene_GamepadConfig_MA);
    });
    PluginManager.registerCommand(pluginName, "KeyboardScene", () => {
      SceneManager.push(Scene_KeyConfig_MA);
    });
  };
  //#endregion
  //#region src/baseSystem/inputConfig/repairInput.ts
  /**
   * 必須シンボルの不足を、既定の配置を参考に静かに補う。
   * 起動時とセーブデータ読み込み時に通す。
   *
   * mandatory は**既定の配置から求めたもの**を渡す。
   * 読み込んだマッパーから求めると、欠けたシンボルはそもそも必須と判定されない
   * （`logic/core/pure/symbol/symbol.ts` createBasicSymbol は
   * 両方のマッパーに載っているものだけを必須にする）。
   * それでは「起動時の状態で必須だったものが、読み込んだ設定で欠けている」を
   * 検出できない。**基準は常に起動時に複製した既定の配置である。**
   */
  const repairInputMappers = (current, defaults, mandatory) => {
    const key = repairMapper(current.keyMapper, defaults.keyMapper, mandatory);
    const pad = repairMapper(
      current.gamepadMapper,
      defaults.gamepadMapper,
      mandatory,
    );
    return {
      keyMapper: key.mapper,
      gamepadMapper: pad.mapper,
      filled: [...key.filled, ...pad.filled],
      unresolved: [...key.unresolved, ...pad.unresolved],
    };
  };
  //#endregion
  //#region src/baseSystem/inputConfig/rmmz.ts
  const PLUGIN_NAME = "Mano_InputConfig";
  /**
   * 初期化。**満たすべき条件が 3 つあり、全部を満たす場所はここしかない。**
   *
   * 1. **他プラグインが `Input.*Mapper` を書き換えた後。**
   *    改変はプラグインのモジュール評価時に走るので、フックならどこでも満たす
   * 2. **`$dataSystem` が読み込まれた後。** パラメータの言語をここで解決するため。
   *    **`DataManager.loadDatabase` は読み込みを開始するだけ**で、
   *    その中では `$dataSystem` は null である (rmmz_managers.js L94/L108)。
   *    元 .js はここにフックしていたが、表示のたびに言語を判定していたので困らなかった
   * 3. **`ConfigManager.load()` より前。** 保存された設定を取り込む前に
   *    初期マッパーを複製しておく必要がある
   *
   * `Scene_Boot.prototype.onDatabaseLoaded` は 1 と 2 を満たし、
   * **その中で `ConfigManager.load()` を呼ぶ** (rmmz_scenes.js L305)。
   * **元の処理より先に差し込めば** 3 も満たす（`installBootHook`）。
   *
   * **パラメータで決まる機能（タッチボタン）は、ここで使うかどうかを判定して張る。**
   * 常に張るフックは main() が読み込み時に張る。
   */
  const setupInputConfig = () => {
    const raw = PluginManager.parameters(PLUGIN_NAME);
    const store = inputConfigStore();
    store.applySettings(readSettings(raw, { locale: $dataSystem.locale }));
    installGlobals();
    installYepInterop(store.settings().yep);
    const filled = store.setupExtendsSymbols({
      keyMapper: Input.keyMapper,
      padMapper: Input.gamepadMapper,
    });
    Input.keyMapper = filled.keyMapper;
    Input.gamepadMapper = filled.gamepadMapper;
    const buttons = collectTouchButtons(store.extendsSymbols());
    if (buttons.length > 0) {
      installTouchButtons(buttons);
    }
    store.captureDefaults(Input.keyMapper, Input.gamepadMapper);
    applyRepair();
  };
  /**
   * 必須シンボルの不足を静かに補う。元 .js に無い追加である。
   *
   * 元 .js は「新しいプラグインを入れたらコンフィグを『初期設定に戻す』でリセットして」と
   * @help で案内していた（プレイヤーの手作業）。ゲームを更新して必須シンボルが増えると、
   * 旧バージョンで保存された設定がそのまま適用されてしまうためである。
   * **その手作業をここで肩代わりする。** 既存の割り当ては壊さず、空きにだけ書く。
   */
  const applyRepair = () => {
    const store = inputConfigStore();
    const defaults = {
      keyMapper: store.cloneDefaultKeyMapper(),
      gamepadMapper: store.cloneDefaultGamepadMapper(),
    };
    const mandatory = createModel(
      {
        keyMapper: defaults.keyMapper,
        padMapper: defaults.gamepadMapper,
      },
      store.settings(),
      store.extendsSymbols(),
    ).mandatory;
    const repaired = repairInputMappers(
      {
        keyMapper: Input.keyMapper,
        gamepadMapper: Input.gamepadMapper,
      },
      defaults,
      mandatory,
    );
    Input.keyMapper = repaired.keyMapper;
    Input.gamepadMapper = repaired.gamepadMapper;
  };
  /**
   * 常に張るフックとコマンドの登録。読み込み時に 1 回だけ走る。
   *
   * オプション画面の項目名とコモンイベントの対象は、フックが呼ばれた時点で store から読む。
   * そのためパラメータを読む前（読み込み時）に張ってよい。
   */
  const main = () => {
    installImportedFlag();
    installBootHook(setupInputConfig);
    installConfigHooks(applyRepair);
    installOptionCommands();
    installCommonEventCall();
    registerCommands(PLUGIN_NAME);
  };
  main();
  //#endregion
})();
