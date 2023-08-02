import { NextRequest, NextResponse } from "next/server";

// GET JOB INFO BY ID

const ENDPOINT = "https://api.simplify.jobs/v2/job-posting/:id/"

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const params = searchParams.get("job-id");

    const response = await fetch(`${ENDPOINT}${params}/company`)
    
    const data = await response.json();

    return NextResponse.json({
        company_id: params,
        job_data: data
    })
}