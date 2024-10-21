#!/bin/bash

# Build the project
echo "Imageをビルドします"
docker build --target web-dev -t castella:web --no-cache ./Docker && docker build --target app-dev -t castella:front --no-cache ./Docker && mkdir -p src/node_modules

if [ $? -eq 0 ]; then
    echo "ビルドが完了しました"
else
    echo "ビルドに失敗しました"
fi