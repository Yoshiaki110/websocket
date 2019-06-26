const server = require("ws").Server;
const s = new server({ port: 5001 });

s.on("connection", ws => {
  ws.on("message", message => {
    console.log("Received: " + message);
    var data = JSON.parse(message);
    console.log("[" + data.msg + "][" + data.data + "]");
    var msg = JSON.stringify({
      msg: '送信してきたクライアントのみに返す',
      data: 123
    });
    ws.send(msg);
    s.clients.forEach(client => {
      var msgAll = JSON.stringify({
        msg: '接続しているクライアント全てに送信',
        data: 456
      });
      client.send(msgAll);
    });
    s.clients.forEach(client => {
      var msgOther = JSON.stringify({
        msg: '接続している自分以外のクライアント全てに送信',
        data: 789
      });
      if (client !== ws) {
        client.send(msgOther);
      }
    });
  });
  // 接続が切れた場合
  ws.on('close', () => {
      console.log('I lost a client');
  });
});
