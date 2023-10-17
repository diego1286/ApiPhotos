import { connect } from 'mongoose'

export async function connections() {
    const db = await connect('mongodb://localhost/app-photo',{
        useNewUrlParser: true,
        useFindAndModify: false 
    });
    console.log('Database  connecteda');
}
