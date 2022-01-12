# three-vrm-1-sandbox-mixamo

[Mixamo](https://www.mixamo.com/) のモーションを読み込み、VRMモデルを動かすexampleです。

## Reference

Originally hosted at https://glitch.com/edit/#!/three-vrm-1-sandbox-mixamo

## ファイル構成

- `README.md` - 説明書。このファイル
- `index.html` - HTMLファイル。外部スクリプトの読み込みと最小限のスタイル
- `loadMixamoAnimation.js` - mixamoのアニメーションを読み込み、VRM向けに調整したものを返す関数です
- `loadVRM.js` - VRMを読み込む関数 `loadVRM` が定義されています
- `main.js` - メインの手続きが記述されています
- `mixamoVRMRigMap.js` - mixamoのリグ名とVRMのHumanoidボーン名をマッピングするオブジェクトです

## License

MIT
