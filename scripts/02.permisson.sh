# パスワードをイコール以降に記述する
PASS = "password"

# Sudoで権限を付与する
echo $PASS | sudo -S chmod -R o+w ./src