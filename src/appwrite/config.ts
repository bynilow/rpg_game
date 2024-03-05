import { Account, Client } from "appwrite";

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65e669d32f76ee087300');

export const account = new Account(client);