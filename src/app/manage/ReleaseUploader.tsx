"use client";

import { useState } from "react";

type Service = { _id: string; name: string };

export function ReleaseUploader({ services }: { services: Service[] }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(formData: FormData) {
    const file = formData.get("file");
    if (!(file instanceof File) || !file.name.toLowerCase().endsWith(".apk")) {
      setMessage("APK 파일을 선택해주세요.");
      return;
    }
    setBusy(true);
    setMessage("업로드 준비 중…");
    try {
      const signed = await fetch("/api/manage/releases/upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, contentType: file.type, fileSize: file.size }),
      });
      const signedBody = await signed.json();
      if (!signed.ok) throw new Error(signedBody.error);
      setMessage("R2에 업로드 중…");
      const uploaded = await fetch(signedBody.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type || "application/vnd.android.package-archive" },
        body: file,
      });
      if (!uploaded.ok) throw new Error("R2 업로드에 실패했습니다.");
      setMessage("릴리스 정보를 저장 중…");
      const saved = await fetch("/api/manage/releases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: formData.get("serviceId"),
          platform: "Android APK",
          version: formData.get("version"),
          visibility: formData.get("visibility"),
          storageKey: signedBody.key,
        }),
      });
      const savedBody = await saved.json();
      if (!saved.ok) throw new Error(savedBody.error);
      setMessage("업로드와 최신 버전 등록이 완료되었습니다. 새로고침하면 목록에 표시됩니다.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "업로드에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="release-form" action={submit}>
      <select name="serviceId" required defaultValue="">
        <option value="" disabled>서비스 선택</option>
        {services.map((service) => <option key={service._id} value={service._id}>{service.name}</option>)}
      </select>
      <input name="version" required placeholder="버전 (예: 1.2.0)" />
      <select name="visibility" defaultValue="private">
        <option value="private">관리자만</option>
        <option value="shared">공유 링크</option>
        <option value="public">홈페이지 공개</option>
      </select>
      <input name="file" type="file" accept=".apk,application/vnd.android.package-archive" required />
      <button type="submit" disabled={busy}>{busy ? "처리 중…" : "APK 등록"}</button>
      {message ? <p className="release-message" role="status">{message}</p> : null}
    </form>
  );
}
