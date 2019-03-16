import { RiClient } from './utils/RiClient';
require('dotenv').config()

const client: RiClient = new RiClient();

client.app.listen(5000, () => {
    client.app.listen(3000, () => {
        console.log('App started')
    })
});