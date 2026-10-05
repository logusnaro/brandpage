import {redirect} from "next/navigation";
import {requireAdmin} from "@/lib/admin";
import {AdminStudio} from "@/sanity/AdminStudio";
export const dynamic="force-dynamic";
export default async function AdminPage() {
  if (!(await requireAdmin())) redirect("/manage/login");
  return <AdminStudio/>;
}
