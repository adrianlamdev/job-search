import { NextRequest, NextResponse } from "next/server";

// THE HEADERS/BODY COMMENTED OUT MEAN THAT THEY'RE NOT NEEDED FOR API TO WORK

// SIMPLIFY API KEY
const SIMPLIFY_API_KEY = process.env.SIMPLIFY_API_KEY;

// EXPERIENCE LEVELS:
const TYPE = "[\`Entry Level/New Grad\`,\`Expert or higher\`,\`Internship\`,\`Junior\`,\`Mid Level\`,\`Senior\`]" // change this to whatever you want

// FACET BY:
// ALL: countries,degrees,experience_level,functions,locations
// if you want to query by a specific facet, you can do so by specifying which one
const FACET_BY = "experience_level"

// dynamic fetching body
let page = 1
let notFound = false

const body = `{
    "searches": [
      {
        "query_by": "title,company_name,locations",
        "per_page": 250,
        "sort_by": "_text_match:desc,posting_id:desc",
        "highlight_full_fields": "title,company_name,locations",
        "collection": "jobs",
        "q": "*",
        "facet_by": "${FACET_BY}",
        "filter_by": "experience_level:=${TYPE}",
        "max_facet_values": 50,
        "page": 1
      }
    ]
  }`;

export async function GET() {
    const response = await fetch(`https://xv95tgzrem61cja4p.a1.typesense.net/multi_search?x-typesense-api-key=${SIMPLIFY_API_KEY}`, {
        "headers": {
        // headers copied from browser
        //   "accept": "application/json, text/plain, */*",
        //   "accept-language": "en-US,en;q=0.9,mt;q=0.8",
        //   "content-type": "text/plain",
        //   "sec-ch-ua": "\"Not/A)Brand\";v=\"99\", \"Microsoft Edge\";v=\"115\", \"Chromium\";v=\"115\"",
        //   "sec-ch-ua-mobile": "?0",
        //   "sec-ch-ua-platform": "\"Windows\"",
        //   "sec-fetch-dest": "empty",
        //   "sec-fetch-mode": "cors",
        //   "sec-fetch-site": "cross-site"
        },
        // "referrer": "https://simplify.jobs/",
        // "referrerPolicy": "strict-origin-when-cross-origin",
        // "mode": "cors",
        // "credentials": "omit"
        "body": body,
        "method": "POST",
      });

        const data = await response.json();
        const company_ids = data.results[0].hits.map(
            (hit) => hit.document.company_id
          );

        return NextResponse.json({
        // "data": data,
        "company_ids": company_ids
    })
}