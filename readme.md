# SET UP ENVIRONMENT

1. open file .env in root/api

# PROCESS FOR MIGRATION UP


1. open terminal > git bash
2. run command in choice 3 change USERNAME,PASSWORD,PORT,DATABASE_NAME to your environment for mac cmd exclude password
3. DATABASE_URL=postgres://USERNAME:PASSWORD@localhost:PORT/DATABASE_NAME npm run migrate up

# SEED DATA

1. npm run seed

# START Serv dev
 npm run dev

# START test
 npm run test