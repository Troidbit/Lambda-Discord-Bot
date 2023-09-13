
const TWITCH_MESSAGE_ID = 'Twitch-Eventsub-Message-Id'.toLowerCase();
const TWITCH_MESSAGE_TIMESTAMP = 'Twitch-Eventsub-Message-Timestamp'.toLowerCase();
const TWITCH_MESSAGE_SIGNATURE = 'Twitch-Eventsub-Message-Signature'.toLowerCase();
const MESSAGE_TYPE = 'Twitch-Eventsub-Message-Type'.toLowerCase();

export function getHmacMessage(request) {
    return (request.headers[TWITCH_MESSAGE_ID] + 
        request.headers[TWITCH_MESSAGE_TIMESTAMP] + 
        request.body);
}

export function getHmac(secret, message) {
    return crypto.createHmac('sha256', secret)
    .update(message)
    .digest('hex');
}

export function verifyMessage(hmac, verifySignature) {
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(verifySignature));
}