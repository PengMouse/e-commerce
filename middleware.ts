/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest): NextResponse | void {
	const token = req.cookies.get("authToken");
	const verify = !!token;
	const { url } = req;

	if (verify && url.includes("/login")) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	return NextResponse.next();
}
