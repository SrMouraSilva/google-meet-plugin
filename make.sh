./node_modules/.bin/webpack --mode=production

mkdir -p google-meet-plugin
mkdir -p google-meet-plugin/webapp

cp -r dist/main.js google-meet-plugin/webapp/
cp plugin.json google-meet-plugin/

tar -czvf google-meet-plugin.tar.gz google-meet-plugin/
