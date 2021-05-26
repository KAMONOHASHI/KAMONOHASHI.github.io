---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: single
classes: wide
title: "KAMONOHASHI 2.xから3.xへの移行"
permalink: /docs/install-and-update/migrate2xto3x
sidebar:
  nav: "docs"
---

## 事前準備

- KAMONOHASHI のバックアップが取れていることを確認します
- KAMONOHASHI の Admin アカウントでログインできることを確認します

## KAMONOHASHI 2.x のアンインストール

rootユーザーで次のコマンドを実行します

```
cd /var/lib/kamonohashi/deploy-tools/
./deploy-kamonohashi.sh clean all
```

* 既知のバグによりエラーが出ますが、後の手順で再度アンインストールコマンドを実行するので無視して構いません

## 3.x 構築ツールのセットアップ

* KAMONOHASHIバージョン3.0.0用の構築ツールを入手します

```
cd /var/lib/kamonohashi/deploy-tools/
git fetch --tags
git checkout 3.0.0.1
(cd deepops; git stash save "backup berfore verup KAMONOHASHI 3")
git submodule update --init --recursive
```

* 構築ツールが正常に取得できているか次のコマンドで確認します
```
echo $(cd deepops; git tag --points-at HEAD)
```
  * 21.03と表示されれば正常です。
  * 正常でない場合、`git submodule update --init --recursive`でエラーが出ていないかを確認してください

* プロキシ環境の場合は、`deepops/scripts/deepops/proxy.sh`にプロキシ設定を記載します

* 次のコマンドを実行し、構築に必要なパッケージを入手します
```
./deploy-kamonohashi.sh prepare
```

* 次のコマンドを実行し、設定ファイルの生成を行います
`./deploy-kamonohashi.sh configure verup`
  * 補足事項 
    * k8s構築に利用するツールであるdeepopsの設定ファイルには互換性がないことの対応を行います。deepopsの設定ファイルの変更を抽出してdeepops既定外の独自の設定ファイル`deepops/config/settings.yml`に書き移します
    * deepopsの設定ファイルは21.03のデフォルトに書き換えます
    * デプロイコマンド実行時には、デフォルト設定に`deepops/config/settings.yml`の内容を上書き上書き追加して適用します
    * このコマンドは現在のdeepops設定ファイルと20.02.1のdeepops設定ファイルの差分を見るため、2回実行すると21.03のデフォルトに書き換え後に20.02.1のdeepops設定との比較が行われ、settings.ymlが意図しない内容となります。
    * 過去の設定ファイルは`deepops/old_config`配下にコピーされます

* 設定ファイルが正常に生成され、過去に編集した内容が書き込まれているか確認します
```
cat deepops/conf/settings.yml
```

* 再度アンインストールコマンドを実行します
```
./deploy-kamonohashi.sh clean all
```
  * deepopsのGPUドライバパッケージが`cuda-drivers`から`nvidia-headless-450-server`に変更になりました。これらに互換性がないため、古いgpuドライバと依存パッケージを含め、全てのnvidiaパッケージのアンインストールを実施します
  * このコマンド実行後、GPUサーバーは再起動します
  
* コマンド実行後にk8s masterサーバーを手動で再起動します
```
reboot
```

* 再起動完了後にrootユーザーで次の構築コマンドを実行します
```
cd /var/lib/kamonohashi/deploy-tools
./deploy-kamonohashi.sh deploy all
```
　　
  * シングルノード構成の場合はドライバインストールの再にk8s masterサーバーが再起動されるため、 
  再起動後に再度`./deploy-kamonohashi.sh deploy all`を実行してください

* 以上で構築は完了します
  * 必要に応じ、GPUサーバーのドライバパッケージ`nvidia-headless-450-server`,ドライバ管理ツールパッケージ`nvidia-utils-450-server`をaptでバージョンアップしてください