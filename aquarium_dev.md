---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: single
classes: wide
title: アクアリウムAI開発者ガイド
permalink: /docs/how-to/aquarium_dev
sidebar:
  nav: "docs"
---

本書はAI開発者を対象としてアクアリウムの機能や手順を説明する事を目的としています。

## 前提
読者がLinux、Git、Dockerの基本的な知識を持つことを前提としています。

* Dockerが初めての方はリンク先を選択してください。以下のリソースは、Dockerについて学ぶのに役立ちます。
    - [Dockerとはなにか](https://www.docker.com/why-docker)<i class="material-icons" class="material-icons blue">launch</i>
    - [コンテナとはなにか](https://www.docker.com/resources/what-container)<i class="material-icons" class="material-icons blue">launch</i>
    - [Docker公式チュートリアル](https://docs.docker.com/get-started/)<i class="material-icons" class="material-icons blue">launch</i>

## 概要

AI開発者は以下の操作を行えます。

* ログイン
* ユーザ情報設定
* [ダッシュボード](/docs/how-to/aquarium_dev#アクアリウムダッシュボード)
* [テンプレートを管理する](/docs/how-to/aquarium_dev#テンプレート管理)
* データセットを管理する
* 実験を実行する
* 実験を管理する

本ドキュメント内に説明のない項目は、データ保持者向けガイドを参照してください。

## アクアリウムダッシュボード

ダッシュボードからは、アクアリウムの各機能を実行することができます。

![ダッシュボード](/assets/images/aquarium/dashboard.png)

## テンプレート管理

テンプレート管理画面では、アクアリウムの実験で使用するテンプレートの作成、表示、更新を行います。

|種類　|説明　|
|---|---|
|ファイル一覧|データセットに追加するファイルの一覧。画像ファイルの場合、ファイルを選択するとプレビューが表示される。|
|アップロードメモ|データセットの説明など補足情報。|


### テンプレート一覧

テンプレート一覧を表示するには、ダッシュボードまたはメニューから、テンプレートを選択します。
選択すると、作成済みテンプレートの一覧が表示されます。

![テンプレート一覧](/assets/images/aquarium/template-list.png)

### テンプレート登録

テンプレートを登録するには、テンプレート一覧画面からモデルテンプレート登録を選択します。

![テンプレート登録1](/assets/images/aquarium/template-create1.png)

テンプレートの基本設定を登録します。

|種類　|説明　|
|---|---|
|テンプレート名|テンプレートの名前。|
|説明文|テンプレートの説明など補足情報。|
|公開設定|テンプレートを公開するテナント。現在のテナント:テンプレート登録者のカレントテナント。全テナントに公開:全てのテナント|

![テンプレート登録2](/assets/images/aquarium/template-create2.png)

前処理を登録します。前処理のないテンプレートでは空にします。

|種類|説明|
|---|---|
|前処理コンテナイメージ|前処理で利用するDockerレジストリ、コンテナ、タグ、アクセストークンを指定する。|
|スクリプト|前処理で利用するソースコードを格納しているGitサーバ、リポジトリ、ブランチ、コミットID、アクセストークンを指定する。コミットIDを指定した場合はブランチの入力値は無視される。コミットIDが未指定の場合はブランチのHEADが選択される。ブランチもコミットIDも未指定の場合は、masterブランチのHEADが選択される。|
|実行コマンド|前処理で実行するコマンドを指定する。コンテナイメージに設定されたcommand, entrypointは無効になり、このコマンドのみが実行される|
|CPU・メモリ・GPU|前処理で利用するコンテナに割り当てるリソース量を指定する。|

![テンプレート登録3](/assets/images/aquarium/template-create3.png)

学習を登録します。

|種類|説明|
|---|---|
|学習コンテナイメージ|学習で利用するDockerレジストリ、コンテナ、タグ、アクセストークンを指定する。|
|スクリプト|学習で利用するソースコードを格納しているGitサーバ、リポジトリ、ブランチ、コミットID、アクセストークンを指定する。コミットIDを指定した場合はブランチの入力値は無視される。コミットIDが未指定の場合はブランチのHEADが選択される。ブランチもコミットIDも未指定の場合は、masterブランチのHEADが選択される。|
|実行コマンド|学習で実行するコマンドを指定する。コンテナイメージに設定されたcommand, entrypointは無効になり、このコマンドのみが実行される|
|CPU・メモリ・GPU|学習で利用するコンテナに割り当てるリソース量を指定する。|

### テンプレート更新

テンプレートを更新するには、テンプレート一覧画面から更新するテンプレート登録を選択します。

![テンプレート更新1](/assets/images/aquarium/template-edit1.png)
![テンプレート更新2](/assets/images/aquarium/template-edit2.png)
![テンプレート更新3](/assets/images/aquarium/template-edit3.png)

入力内容はテンプレート登録と同じです。