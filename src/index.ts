import app from './app';
import { connections } from './database'

async function main() {
    connections();
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();