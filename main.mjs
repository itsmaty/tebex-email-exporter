import { appendFileSync } from "fs";

const TEBEX_SECRET = ''; /* <-- put your tebex secret here (https://docs.tebex.io/plugin/authentication) */
const FILE_NAME = './tebex-customer-emails.csv'

// https://docs.tebex.io/plugin/endpoints/payments#get-all-payments-paginated
const tebex_endpoint = 'https://plugin.tebex.io/payments?paged=1';

let occured_emails = new Set();
async function fetch_page_and_write_to_csv(url)
{
    /* fetch the current page async */
    let page = await fetch(url, {
    method: 'GET',
    headers: {
        'X-Tebex-Secret': TEBEX_SECRET
    }
    })
    .then((res) => res.json())
    .catch((error) => console.error(error))

    /* get payments for current page */
    const payments = page.data;

    /* loop trough payments of current page*/
    payments.forEach(payment => {

        /* check if email is set & and customer is no duplicate with a se*/
        if (payment.email != "" && !occured_emails.has(payment.email)) {

            /* add emails to already occured ones so remove duplicate emails if customer bought more than once */
            occured_emails.add(payment.email)

            /* write customer name and email to csv */
            appendFileSync(FILE_NAME, payment.player.name+","+payment.email+"\n", 'utf8')
        }
    });


    /* return if the last page was reached */
    if(!page.next_page_url) {
        return;
    }

    /* fetch the next page `*/
    fetch_page_and_write_to_csv(page.next_page_url);

}

fetch_page_and_write_to_csv(tebex_endpoint);