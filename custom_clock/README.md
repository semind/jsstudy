clock_node.jsをカスタマイズ
インターフェイスをこちらを参考に使いました。
http://tutorialzine.com/2013/06/digital-clock/

nodeでbuild/js/node.jsを実行し、index.htmlを開きます。

## 必要なライブラリ
```
npm install cron
npm install moment
npm install socket.io
```

## CoffeeScriptとSass
今回はCoffeeScriptとSassを使うために、
Gruntを利用しています。
 - http://gruntjs.com

### 使用したGruntモジュール
```
grunt-contrib-coffee
grunt-contrib-compass
grunt-contrib-cssmin
grunt-contrib-jshint
grunt-contrib-uglify
grunt-contrib-watch
```

### コンパイル
コンパイルの設定はGruntfile.jsに記載。
```
grunt watch
```
### ミニファイ

```
grunt release
```
