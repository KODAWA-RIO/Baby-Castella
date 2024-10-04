#!/bin/bash

# ディレクトリの定義
PACKAGE_DIR=${PWD}/src/package.json
DOCKER_PACKAGE_DIR=${PWD}/Docker/npm/package.json
LOCK_DIR=${PWD}/src/package-lock.json
DOCKER_LOCK_DIR=${PWD}/Docker/npm/package-lock.json

# ファイルの有無の確認
if [ ! -f "$PACKAGE_DIR" ]; then
    # echo "Error: Source package.json not found at $SOURCE_PACKAGE"
    echo "Error: 比較元のpackage.jsonが見つかりませんでした。 $PACKAGE_DIR"
    exit 1
fi

if [ ! -f "$DOCKER_PACKAGE_DIR" ]; then
    # echo "Error: Source package.json not found at $SOURCE_PACKAGE"
    echo "Error: ビルド用のpackage.jsonが見つかりませんでした。 $SOURCE_PACKAGE"
    exit 1
fi

if [ ! -f "$LOCK_DIR" ]; then
    # echo "Error: Source package.json not found at $SOURCE_PACKAGE"
    echo "Error: 比較元のpackage-lock.jsonが見つかりませんでした。 $SOURCE_PACKAGE"
    exit 1
fi

if [ ! -f "$DOCKER_LOCK_DIR" ]; then
    # echo "Error: Source package.json not found at $SOURCE_PACKAGE"
    echo "Error: ビルド用のpackage-lock.jsonが見つかりませんでした。 $SOURCE_PACKAGE"
    exit 1
fi

# ファイルの比較
if cmp -s "$PACKAGE_DIR" "$DOCKER_PACKAGE_DIR"; then
    echo "package.jsonの内容は一致しています。"
else
    echo "package.jsonの内容が一致していません。ビルド用のpackage.jsonを更新します。"
    cp $PACKAGE_DIR $DOCKER_PACKAGE_DIR
fi

# ファイルの比較(package-lock.json)
if cmp -s "$LOCK_DIR" "$DOCKER_LOCK_DIR"; then
    echo "package-lock.jsonの内容は一致しています。"
    exit 0
else
    echo "package-lock.jsonの内容が一致していません。ビルド用のpackage-lock.jsonを更新します。"
    cp $LOCK_DIR $DOCKER_LOCK_DIR
fi