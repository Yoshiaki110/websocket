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
//    ws.send(msg);
    ws.send(makeSmapleMsg());
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

var msg = makeSmapleMsg();
console.log("<<" + msg + ">>");
var data = JSON.parse(msg);
showSmapleMsg(data);

function makeSmapleMsg() {
  var msg = {
    type: "channels",
    datetime: "2017-04-06T07:46:36.005341001Z",
    module: "XXXX",
    payload: {
      channels: [
        {
          channel: 0,
          datetime: "2016-12-24T09:53:03.429432065Z",
          type: "f",
          value: 29.07059
        },
        {
          channel: 1,
          datetime: "2016-12-24T09:53:03.443432065Z",
          type: "f",
          value: 0.10620117
        },
        {
          channel: 2,
          datetime: "2016-12-24T09:53:03.454432065Z",
          type: "f",
          value: -0.032958984
        },
        {
          channel: 3,
          datetime: "2016-12-24T09:53:03.466432065Z",
          type: "f",
          value: 0.96362305
        },
        {
          channel: 4,
          datetime: "2016-12-24T09:53:03.480432065Z",
          type: "f",
          value: -2.908397
        },
        {
          channel: 5,
          datetime: "2016-12-24T09:53:03.492432065Z",
          type: "f",
          value: -0.90076333
        },
        {
          channel: 6,
          datetime: "2016-12-24T09:53:03.504432065Z",
          type: "f",
          value: -0.47328246
        }
      ]
    },
  }
  return JSON.stringify(msg);
}

function showSmapleMsg(data) {
  console.log(data.payload.channels.length);
  data.payload.channels.forEach(channel => {
    console.log(channel.channel);
    console.log(channel.datetime);
    console.log(channel.type);
    console.log(channel.value);
  });
}
