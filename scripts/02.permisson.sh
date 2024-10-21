# パスワードをイコール以降に記述する
PASS="Haru-516"

# Sudoで権限を付与する
echo $PASS | sudo -S chmod -R o+w ./src > /dev/null