Package.describe({
    name: 'chat',
    summary: 'Friends In Space - Chat package ',
    version: '0.1.0'
});

Package.onUse(function (api) {
    api.versionsFrom('0.9.4');
     api.use(['http', 'mongo']);

    api.addFiles('chat.js', ['server']);
    api.export('CHAT');
});