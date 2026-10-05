import {NextRequest,NextResponse} from "next/server";
import {requireAdmin} from "@/lib/admin";
import {readVisitStats,statsEnvironment} from "@/lib/visit-stats";
export async function GET(request:NextRequest) {
  if (!(await requireAdmin())) return NextResponse.json({error:"Unauthorized"},{status:401});
  try { return NextResponse.json(await readVisitStats(statsEnvironment(request.nextUrl.hostname)||"test"),{headers:{"Cache-Control":"private, no-store"}}); }
  catch {return NextResponse.json({error:"방문 통계를 불러오지 못했습니다. R2 연결을 확인하세요."},{status:503});}
}
