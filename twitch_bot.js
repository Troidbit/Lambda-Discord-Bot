import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import crypto from 'crypto';
import { getHmacMessage, getHmac, verifyMessage} from './twitch_util';

const TWITCH_MESSAGE_SIGNATURE = 'Twitch-Eventsub-Message-Signature'.toLowerCase();

const MESSAGE_TYPE_VERIFICATION = 'webhook_callback_verification';
const MESSAGE_TYPE_NOTIFICATION = 'notification';
const MESSAGE_TYPE_REVOCATION = 'revocation';
const MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type'.toLowerCase();

const HMAC_PREFIX = 'sha256=';

const app = express();
const PORT = process.env.PORT;

app.use(express.raw({
    type: 'application/json'
}))
d
app.post('/eventsub',(req,res)=>{
    let secret = process.env.SECRET;
    let message = getHmacMessage(req);
    let hmac = HMAC_PREFIX + getHmac(secret,message);

    if (true === verifyMessage(hmac,req.headers[TWITCH_MESSAGE_SIGNATURE])){
        let notification = JSON.parse(req.body);

        if (MESSAGE_TYPE_NOTIFICATION === req.headers[MESSAGE_TY]) {
            console.log(`Event type: ${notification.subscription.type}`);
            console.log(JSON.stringify(notification.event, null, 4));
            
            res.sendStatus(204);
        } 
        else if (MESSAGE_TYPE_VERIFICATION === req.headers[MESSAGE_TYPE]) {
            res.status(200).send(notification.challenge);
        } 
        else if (MESSAGE_TYPE_REVOCATION === req.headers[MESSAGE_TYPE]) {
            res.sendStatus(204);

            console.log(`${notification.subscription.type} notifications revoked!`);
            console.log(`reason: ${notification.subscription.status}`);
            console.log(`condition: ${JSON.stringify(notification.subscription.condition, null, 4)}`);
        }
        else {
            res.sendStatus(204);
            console.log(`Unknown message type: ${req.headers[MESSAGE_TYPE]}`);
        }
    }
})

app.listen(PORT,()=>{
    console.log(`Listening for twitch on port: ${PORT}`)
})