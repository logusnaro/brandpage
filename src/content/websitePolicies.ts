import type { CompanyInfo } from "@/lib/companyInfo";
import { contactPrivacyNotice, CONTACT_NOTICE_VERSION } from "@/lib/contactPrivacy";

export function websitePolicy(kind: "privacy" | "terms", locale: "ko" | "en", company: CompanyInfo) {
  const ko = locale === "ko";
  const contact = `${company.name} · ${ko ? "대표자" : "Representative"}: ${company.representative}\n${ko ? "사업자등록번호" : "Business registration"}: ${company.registrationNumber}\n(${company.postalCode}) ${ko ? company.address : company.addressEn}\n${company.email} · ${company.phone}`;
  const notice = contactPrivacyNotice[locale];
  const privacy = ko ? [
    ["1. 적용 범위 및 개인정보처리자", `이 방침은 logUs Studio 홈페이지의 문의 접수와 방문 통계에 적용됩니다. 각 앱의 계정·기록·결제 등 개인정보 처리는 해당 앱의 개인정보 처리방침을 따릅니다.\n${contact}\n개인정보 보호책임자: ${company.privacyOfficer} (위 이메일·전화로 연락)`],
    ["2. 문의 정보의 수집·이용", `${notice.purpose}\n${notice.items}\n개인정보 수집·이용 동의를 받아 처리합니다. 문의 내용에 아기·가족의 건강정보, 주민등록번호, 비밀번호 등을 기재하지 마세요. 민감정보나 고유식별정보는 요청하지 않습니다.\n${notice.retention}\n${notice.refusal}`],
    ["3. 처리위탁 및 국외 이전", `${notice.overseas}\n국외 이전 동의는 개인정보 수집·이용 동의와 별도로 받습니다. Sanity는 문의 관리, Vercel은 홈페이지와 요청 처리 업무를 수행합니다. 회사는 문의 내용을 판매하거나 광고 목적으로 이용하지 않으며, 법령상 근거가 있거나 별도 동의를 받은 경우 외에는 독립적인 제3자에게 제공하지 않습니다.\n제공자 개인정보 안내: https://www.sanity.io/legal/privacy · https://vercel.com/legal/privacy-notice`],
    ["4. 방문 통계와 접속 정보", "홈페이지 개선을 위해 탭 단위 임의 식별값을 서버에서 해시 처리하고 열람한 페이지와 화면이 보이는 동안의 체류 시간을 집계합니다. 방문 통계에는 이름·이메일·문의 내용·IP 주소·검색어를 저장하지 않고 광고 추적 쿠키를 사용하지 않습니다. 탭을 닫으면 브라우저의 세션값이 사라지며 추적 금지 설정을 존중합니다. 통계는 Cloudflare R2 비공개 저장소에 운영 기간 동안 보관합니다. 홈페이지 전송·보안 과정에서 호스팅 제공자가 접속 IP 등 기술 정보를 처리할 수 있으며 제공자의 보안 로그 정책이 적용됩니다. 자세한 집계 방식은 /analytics-info에서 확인할 수 있습니다."],
    ["5. 파기 및 안전조치", "문의 답변과 관련 후속 요청 처리가 끝나면 관리자가 문의 문서를 삭제합니다. 열람·삭제 등 요청을 접수하면 본인 확인 후 관계 법령에 따라 처리합니다. 법령에 별도 보존 의무가 있는 자료는 해당 근거와 기간을 적용합니다. 전자 문서는 서비스의 삭제 기능으로 파기하며 제공자의 백업·로그 사본은 해당 보관·삭제 주기에 따라 정리됩니다. 문의 문서는 인증된 관리자에게만 제공하고 전송 구간 암호화와 서버 측 인증정보 관리를 적용합니다."],
    ["6. 정보주체의 권리", `개인정보 열람·정정·삭제·처리정지·동의 철회는 ${company.email} 또는 ${company.phone}으로 요청할 수 있습니다. 필요한 최소한의 본인 확인 후 처리하며 법령상 제한이 있으면 이유를 안내합니다. 만 14세 미만 아동의 개인정보를 이 문의 폼으로 수집하지 않습니다. 보호자에게 전화 문의를 요청할 수 있으며 아동 정보가 잘못 접수된 사실을 알게 되면 필요한 조치를 취합니다. 개인정보 침해 상담은 개인정보침해신고센터(privacy.kisa.or.kr), 분쟁 조정은 개인정보분쟁조정위원회(kopico.go.kr)를 이용할 수 있습니다.`],
    ["7. 방침 변경", `시행일: ${CONTACT_NOTICE_VERSION}. 처리 목적·항목·위탁처 등 중요한 사항이 변경되면 이 페이지에 변경 내용과 시행일을 게시하고, 새 동의가 필요한 경우 다시 동의를 받습니다.`],
  ] : [
    ["1. Scope and controller", `This policy covers website inquiries and visit statistics for logUs Studio. Each app's accounts, records and purchases are governed by its own privacy policy.\n${contact}\nPrivacy officer: ${company.privacyOfficer}, reachable at the email/telephone above.`],
    ["2. Inquiry information", `${notice.purpose}\n${notice.items}\nWe process this information with your consent. We do not request health information, identity numbers or passwords.\n${notice.retention}\n${notice.refusal}`],
    ["3. Processors and international transfers", `${notice.overseas}\nInternational transfer consent is obtained separately from collection/use consent. Sanity manages inquiry records and Vercel provides website/request processing. We do not sell inquiry information or use it for advertising. Independent third-party disclosure requires consent or a legal basis.\nProvider notices: https://www.sanity.io/legal/privacy · https://vercel.com/legal/privacy-notice`],
    ["4. Visit statistics and connection information", "We measure pages viewed and visible time using a server-hashed, random browser-tab identifier. Our statistics do not store names, email addresses, message content, IP addresses or search queries. We do not use advertising tracking cookies. The tab identifier disappears when the tab closes and Do Not Track is respected. Statistics are stored in private Cloudflare R2 storage during operation. Hosting providers may process IP addresses and technical connection information to deliver and secure the website under their logging policies. See /analytics-info for details."],
    ["5. Deletion and security", "The administrator deletes inquiry documents when the response and related follow-up requests are complete. Legal retention requirements, where applicable, take precedence for the relevant records. Electronic records are deleted using service deletion functions; provider backup/security-log copies follow provider retention/deletion cycles. Inquiry documents require authenticated administrative access; encrypted transport and server-side credential management are used."],
    ["6. Your rights", `Request access, correction, deletion, restriction or withdrawal of consent via ${company.email} or ${company.phone}. We verify identity only as necessary and explain applicable legal restrictions. This form is not intended to collect personal information from children under 14; a guardian may contact us by telephone. If child information is submitted in error, we take the necessary steps after learning of it. Korean privacy assistance is available at privacy.kisa.or.kr and kopico.go.kr.`],
    ["7. Changes", `Effective date: ${CONTACT_NOTICE_VERSION}. Material changes and their effective date will be posted here. New consent will be obtained where required.`],
  ];
  const terms = ko ? [
    ["1. 운영자와 적용 범위", `${contact}\n이 약관은 logUs Studio 홈페이지의 정보 열람·콘텐츠 이용·문의 기능에 적용됩니다. 소개된 앱을 설치하거나 이용할 때에는 각 앱의 이용약관과 개인정보 처리방침, 해당 스토어의 조건을 확인해 주세요.`],
    ["2. 홈페이지 이용", "홈페이지는 스튜디오와 앱에 관한 정보, 앱스토어 연결 및 문의 기능을 제공합니다. 홈페이지 문의 접수만으로 유료 계약이나 앱 구독이 성립하지 않습니다. 각 앱의 제공 기능·지원 플랫폼·가격은 실제 서비스와 스토어 안내를 확인해 주세요."],
    ["3. 콘텐츠와 금지행위", "홈페이지의 캐릭터·이미지·영상·문구 등은 회사 또는 정당한 권리자의 콘텐츠입니다. 법령이 허용하는 경우 외에 무단 복제·배포하거나 출처를 사칭해서는 안 됩니다. 악성코드 전송, 자동화된 스팸 문의, 타인의 개인정보 도용 등 정상 운영을 방해하는 행위를 금지합니다."],
    ["4. 외부 서비스와 운영 변경", "외부 앱스토어·SNS·서비스의 이용에는 해당 제공자의 약관과 정책이 적용됩니다. 유지보수·보안·장애 등으로 홈페이지 제공이 일시 중단되거나 안내 내용이 변경될 수 있습니다. 회사의 책임은 관계 법령에 따르며 법령상 소비자의 권리를 제한하지 않습니다."],
    ["5. 문의와 변경", `홈페이지 관련 문의는 ${company.email} 또는 ${company.phone}으로 접수합니다. 이 약관이 변경되면 내용과 시행일을 홈페이지에 게시합니다. 대한민국 법령이 적용됩니다.\n시행일: ${CONTACT_NOTICE_VERSION}`],
  ] : [
    ["1. Operator and scope", `${contact}\nThese terms cover browsing, content and inquiries on the logUs Studio website. Each app has its own terms and privacy policy, together with the applicable app-store conditions.`],
    ["2. Using the website", "The website introduces our studio/apps, links to app stores and accepts inquiries. Sending an inquiry does not itself create a paid contract or subscription. Refer to each service and store listing for actual features, availability and prices."],
    ["3. Content and prohibited conduct", "Characters, artwork, films and text belong to the company or their respective rights holders. Unauthorized copying/distribution and impersonation are prohibited except where law permits. Do not submit malware, automated spam or another person's information without authority, or interfere with operation."],
    ["4. External services and availability", "External stores, social networks and other services have their own terms/policies. Maintenance, security work or outages may interrupt availability or change published information. Responsibility is determined by applicable law; these terms do not limit statutory consumer rights."],
    ["5. Contact and changes", `Contact ${company.email} or ${company.phone}. Changes and their effective date will be published on this website. The laws of the Republic of Korea apply.\nEffective date: ${CONTACT_NOTICE_VERSION}`],
  ];
  return {
    title: kind === "privacy" ? (ko ? "홈페이지 개인정보 처리방침" : "Website Privacy Policy") : (ko ? "홈페이지 이용약관" : "Website Terms of Use"),
    version: CONTACT_NOTICE_VERSION,
    effectiveDate: CONTACT_NOTICE_VERSION,
    body: (kind === "privacy" ? privacy : terms).map(([title, body]) => `${title}\n${body}`).join("\n\n"),
  };
}
