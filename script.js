//const io = require("socket.io-client");
//const express = require('express');
const { Telegraf} = require('telegraf')
const WebSocket = require('ws');
require('dotenv').config();

//const socket2 = io("wss://ws.postman-echo.com/socketio");


const WEBSOCKETLINK = process.env.WEBSOCKETLINK;
const TELEGRAMTOKEN = process.env.TELEGRAMTOKEN;
const CHANNELID = process.env.CHANNELID;


        const ws = new WebSocket(WEBSOCKETLINK, {
            // perMessageDeflate: false
        });
        const bot = new Telegraf(TELEGRAMTOKEN, { handlerTimeout: 12000 })
        bot.start(async (ctx) => {})

async function test() {

    ws.on('error', console.error);

    ws.on("close", () => {
        console.log("close");
        bot.telegram.sendMessage(CHANNELID, "Connection closed :( smth went wrong  😭")
    })

    ws.on('connection', function open() {
      console.log("connectiom")
    });
    
    ws.on('message', function message(data) {

        if(data.toString().slice(0,1) === "0") {
            console.log(data.toString().slice(0,1));
            const res = JSON.stringify(40);
            console.log(res);
            ws.send(res);  
        }

        if(data.toString().slice(0,21) ===  '42["newPendingTicket"') {
            bot.telegram.sendMessage(CHANNELID, "New ticket on VillageDAO 🚀")
            console.log("NEW TICKET")
        }

        if(data.toString() === "2") {
            console.log(data);
            const res = JSON.stringify(3);
            console.log(res);
            ws.send(res);  
        }

        console.log('received: %s', data);

    });

 }


test();






// 40

// 42["me"]

// 42["rooms"]