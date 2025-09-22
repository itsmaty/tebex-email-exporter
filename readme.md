## TEBEX EMAIL EXPORTER
This fetches all payments from a tebex store trough the api and exports unique customers and their email adresses into a csv file.


### Usage
1. Clone the repo
2. Retrive your Tebex Secret
    - Go to https://creator.tebex.io/game-servers
    - Klick "Edit" on your Game Server
    - Klick "Copy" next to "Secret Key"
3. Open the `main.mjs` script
4. Insert the Secret Key for the `TEBEX_SECRET` varaible
5. Run the mjs script with for example node `node main.mjs`
6. A csv file will be created in the same directory as the script