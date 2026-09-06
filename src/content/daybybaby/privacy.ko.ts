export type PrivacyBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; marker: "decimal" | "parenthesized" | "dash"; items: string[] };

export type PrivacyArticle = {
  id: string;
  title: string;
  blocks: PrivacyBlock[];
};

type PrivacyDocument = {
  product: string;
  documentTitle: string;
  effectiveDate: string;
  introduction: string[];
  articles: PrivacyArticle[];
  addendum: string;
};

export const dayByBabyPrivacy: PrivacyDocument = {
  product: "Day By Baby",
  documentTitle: "개인정보 처리방침",
  effectiveDate: "2026년 9월 6일",
  introduction: [
    "logUs Studio(이하 “회사”)는 육아 기록 서비스 Day By Baby(이하 “서비스”)를 제공하면서 이용자의 개인정보와 아기·가족 관련 정보를 중요하게 보호합니다.",
    "회사는 「개인정보 보호법」 등 관계 법령을 준수하며, 개인정보의 처리 목적, 처리 항목, 보유기간 및 이용자의 권리 등에 관한 사항을 다음과 같이 안내합니다.",
  ],
  articles: [
    {
      id: "article-1",
      title: "제1조 개인정보처리자 및 개인정보 보호책임자",
      blocks: [
        { type: "paragraph", text: "회사의 개인정보처리자 및 개인정보 보호책임자는 다음과 같습니다." },
        { type: "list", marker: "dash", items: ["상호: logUs Studio", "대표자: 홍중기", "서비스명: Day By Baby", "개인정보 보호책임자: 홍중기", "문의 이메일: logus.naro@gmail.com"] },
        { type: "paragraph", text: "개인정보의 열람, 정정, 삭제, 처리정지, 동의 철회, 불만처리 및 피해구제 등에 관한 문의는 위 이메일로 접수할 수 있습니다." },
      ],
    },
    {
      id: "article-2",
      title: "제2조 처리하는 개인정보의 항목",
      blocks: [
        { type: "paragraph", text: "회사는 서비스 제공에 필요한 최소한의 개인정보를 처리합니다." },
        { type: "paragraph", text: "1. 계정 및 인증 정보" },
        { type: "list", marker: "parenthesized", items: ["Firebase 사용자 식별자(UID)", "Google 계정 이메일", "Google 계정에서 제공되는 표시 이름", "로그인 상태 및 인증 과정에서 생성되는 보안 관련 기술정보"] },
        { type: "paragraph", text: "2. 이용자 및 가족 정보" },
        { type: "list", marker: "parenthesized", items: ["이용자 닉네임", "가족 관계", "아기와의 관계", "이용자가 직접 입력한 전화번호", "가족 권한", "초대 상태", "가족 연결정보", "응급 연락처 설정"] },
        { type: "paragraph", text: "3. 아기 정보" },
        { type: "list", marker: "parenthesized", items: ["이름", "생년월일", "출생 시각", "출생 순서", "성별"] },
        { type: "paragraph", text: "4. 육아 기록" },
        { type: "list", marker: "parenthesized", items: ["수유 및 이유식 기록", "기저귀 기록", "수면 기록", "목욕 기록", "추억 기록", "메모", "일정", "이용자가 직접 입력하는 기타 육아 관련 내용"] },
        { type: "paragraph", text: "5. 건강 관련 정보" },
        { type: "paragraph", text: "이용자가 선택하여 입력하는 경우 다음과 같은 건강 관련 정보를 처리합니다." },
        { type: "list", marker: "parenthesized", items: ["복약 및 영양제 기록", "체온", "키·몸무게 등 성장정보", "병원 관련 기록", "기타 이용자가 직접 입력하는 건강 관련 내용"] },
        { type: "paragraph", text: "건강 관련 정보는 이용자가 보호자 또는 정당한 권한을 가진 사람으로서 직접 입력합니다. 현재 코드상 건강 관련 정보에 대한 별도 동의 UI는 확인되지 않았습니다. 관계 법령상 별도 동의가 필요한 경우 회사는 해당 기능을 제공하기 전에 별도 동의 절차를 마련합니다." },
        { type: "paragraph", text: "6. 가족 공유 정보" },
        { type: "list", marker: "parenthesized", items: ["가족 ID", "구성원 UID", "닉네임", "가족 내 권한", "초대코드", "초대 상태", "공유되는 육아 기록", "가족별 알림 설정"] },
        { type: "paragraph", text: "7. 서비스 및 오류 정보" },
        { type: "list", marker: "parenthesized", items: ["피드백 메시지", "앱 버전", "서비스 이용 중 발생한 오류정보 및 오류 발생 시각"] },
        { type: "paragraph", text: "8. 알림 및 설정 정보" },
        { type: "list", marker: "parenthesized", items: ["생활 알람 설정", "알림 시간", "반복 설정", "방해금지 설정", "가족별 알림 설정"] },
        { type: "paragraph", text: "9. 주소록 이용" },
        { type: "paragraph", text: "이용자가 휴대폰 주소록 기능을 직접 사용하는 경우 이용자가 선택한 연락처의 이름과 전화번호를 불러올 수 있습니다." },
        { type: "paragraph", text: "회사는 이용자의 전체 주소록을 일괄 저장하거나 서버에 업로드하지 않습니다." },
      ],
    },
    {
      id: "article-3",
      title: "제3조 개인정보의 처리 목적",
      blocks: [
        { type: "paragraph", text: "회사는 다음의 목적으로 개인정보를 처리합니다." },
        { type: "list", marker: "decimal", items: ["회원 식별 및 계정 인증", "육아 기록의 저장, 조회, 수정 및 삭제", "아기 및 가족 프로필 관리", "가족 구성원 연결 및 기록 공유", "가족별 접근권한 관리", "이용자가 설정한 응급 연락 기능 제공", "알림 기능 제공", "회원탈퇴 및 데이터 삭제", "문의 및 피드백 처리", "오류 대응 및 서비스 안정성 개선", "보안 유지 및 부정 이용 방지"] },
        { type: "paragraph", text: "회사는 개인정보를 위 목적 외의 용도로 이용하지 않습니다." },
        { type: "paragraph", text: "개인정보의 처리 목적이 변경되는 경우 관계 법령에 따라 필요한 조치를 취합니다." },
      ],
    },
    {
      id: "article-4",
      title: "제4조 아기 등 만 14세 미만 아동의 개인정보",
      blocks: [
        { type: "list", marker: "decimal", items: ["Day By Baby는 아기가 직접 회원가입하거나 개인정보를 입력하는 서비스가 아닙니다.", "아기 정보와 육아 기록은 보호자 또는 해당 정보를 입력할 정당한 권한을 가진 이용자가 직접 입력합니다.", "회사는 아기에게 직접 회원가입을 요구하거나 아기로부터 직접 개인정보를 수집하지 않습니다.", "이용자는 자신이 입력하는 아기 정보에 대해 적법한 권한을 보유하여야 합니다.", "보호자 또는 정당한 권한을 가진 이용자는 자신이 관리하는 아기 정보를 서비스에서 열람, 수정 또는 삭제할 수 있습니다."] },
      ],
    },
    {
      id: "article-5",
      title: "제5조 건강 등 민감정보의 처리",
      blocks: [
        { type: "paragraph", text: "서비스에서는 이용자의 선택에 따라 아기의 복약, 체온, 성장, 병원 관련 정보 등 건강 관련 정보가 입력될 수 있습니다." },
        { type: "paragraph", text: "회사는 이러한 정보를 다음의 목적으로 처리합니다." },
        { type: "list", marker: "decimal", items: ["이용자가 입력한 건강 기록의 저장 및 조회", "가족 구성원과의 기록 공유", "육아 기록 관리 기능 제공"] },
        { type: "paragraph", text: "회사는 건강 관련 정보를 광고 또는 마케팅 목적으로 이용하지 않습니다." },
        { type: "paragraph", text: "현재 코드상 건강 관련 정보에 대한 별도 동의 UI는 확인되지 않았습니다. 관계 법령상 별도 동의가 필요한 경우 회사는 해당 기능을 제공하기 전에 일반 개인정보 처리 동의와 구분되는 별도 동의 절차를 마련합니다." },
        { type: "paragraph", text: "이용자는 서비스 제공에 필요하지 않은 주민등록번호, 금융정보, 계정 비밀번호 등의 정보를 자유 입력란에 입력하지 않아야 합니다." },
      ],
    },
    {
      id: "article-6",
      title: "제6조 가족 공유 및 개인정보 제공",
      blocks: [
        { type: "paragraph", text: "이용자가 가족 공유 기능을 사용하는 경우 이용자가 직접 초대한 가족 구성원에게 서비스 제공에 필요한 범위에서 개인정보가 공유될 수 있습니다." },
        { type: "paragraph", text: "공유될 수 있는 정보는 다음과 같습니다." },
        { type: "list", marker: "decimal", items: ["아기 정보", "공유 육아 기록", "기록 작성 및 수정 관련 정보", "가족 구성원 닉네임 및 권한", "가족 내 알림 및 공유 설정"] },
        { type: "paragraph", text: "가족 생성자는 초대코드를 발급할 수 있습니다." },
        { type: "paragraph", text: "가족 구성원은 부여된 권한 범위에서 공유 기록을 열람하거나 작성·수정할 수 있습니다." },
        { type: "paragraph", text: "개인 메모 등 비공개로 관리되는 정보는 가족 공유 정보와 구분하여 처리합니다." },
        { type: "paragraph", text: "회사는 이용자의 동의 없이 개인정보를 제3자에게 판매하거나 임의로 제공하지 않습니다." },
        { type: "paragraph", text: "다만 관계 법령에 특별한 규정이 있거나 이용자가 직접 가족 공유 기능을 이용하는 경우에는 해당 범위에서 처리할 수 있습니다." },
      ],
    },
    {
      id: "article-7",
      title: "제7조 개인정보 처리업무의 위탁",
      blocks: [
        { type: "paragraph", text: "회사는 서비스 제공을 위해 다음과 같이 개인정보 처리업무의 일부를 외부 사업자에게 위탁합니다." },
        { type: "paragraph", text: "1. Google LLC" },
        { type: "list", marker: "parenthesized", items: ["Google 계정 로그인 및 인증 관련 서비스"] },
        { type: "paragraph", text: "2. Google LLC(Firebase)" },
        { type: "list", marker: "parenthesized", items: ["Firebase Authentication을 이용한 회원 인증", "Cloud Firestore를 이용한 개인정보, 육아 기록 및 설정정보 저장", "Cloud Functions for Firebase를 이용한 계정 삭제, 가족관리, 초대 및 서버 기능", "Firebase Hosting을 이용한 서비스 관련 웹페이지 제공"] },
        { type: "paragraph", text: "회사는 위탁계약 및 서비스 이용 과정에서 관계 법령에 따라 개인정보가 안전하게 처리될 수 있도록 필요한 사항을 관리합니다." },
        { type: "paragraph", text: "현재 서비스에서는 AdMob 광고 및 RevenueCat, Google Play Billing 등을 이용한 유료결제 기능을 제공하지 않습니다." },
        { type: "paragraph", text: "향후 광고, 유료결제 또는 새로운 외부 서비스가 도입되어 개인정보 처리방식이 변경되는 경우 개인정보 처리방침을 변경하여 안내합니다." },
      ],
    },
    {
      id: "article-8",
      title: "제8조 개인정보의 국외 이전",
      blocks: [
        { type: "paragraph", text: "회사가 이용하는 Firebase 서비스 이용 과정에서 개인정보가 국외에서 처리될 수 있습니다. Firebase 공식 안내상 Firebase Authentication은 미국 데이터센터에서 운영됩니다. 그 밖의 Firebase 서비스는 서비스 제공자의 글로벌 인프라 및 관련 정책에 따라 처리될 수 있습니다." },
        { type: "paragraph", text: "국외 이전에 관한 사항은 다음과 같습니다." },
        { type: "list", marker: "dash", items: ["이전받는 자: Google LLC 및 Firebase 서비스 제공자", "이전 국가: 미국 및 서비스 제공자의 글로벌 처리지역", "이전되는 개인정보: 계정·가족·아기·육아기록·설정 및 오류정보", "이전 시기: 회원가입, 로그인, 데이터 저장, 서버 기능 및 알림 기능 이용 시", "이전 방법: 암호화된 네트워크 통신을 통한 전송", "이용 목적: 회원 식별, 로그인, 데이터 저장, 서비스 제공 및 계정·데이터 관리", "보유 및 이용기간: 제9조에 따른 기간. 서비스 제공자의 보안·운영 로그와 백업은 해당 서비스 정책에 따릅니다.", "이전을 거부하는 방법: 회원가입 또는 해당 외부 서비스 이용을 중단하고 회원탈퇴를 진행할 수 있습니다.", "이전 거부에 따른 효과: 회원 인증, 데이터 저장, 가족공유 또는 해당 외부 서비스에 의존하는 기능을 이용할 수 없습니다."] },
        { type: "paragraph", text: "향후 개인정보가 다른 국가 또는 다른 외부 서비스로 추가 이전되는 경우 회사는 해당 내용을 개인정보 처리방침에 반영하여 안내합니다." },
      ],
    },
    {
      id: "article-9",
      title: "제9조 개인정보의 보유 및 이용기간",
      blocks: [
        { type: "list", marker: "decimal", items: ["회사는 원칙적으로 개인정보를 이용자가 직접 삭제하거나 회원탈퇴를 완료할 때까지 보유합니다.", "계정·프로필·아기정보·육아기록·가족 연결정보·설정정보는 이용자가 삭제하거나 회원탈퇴할 때까지 보관합니다. 아기정보를 영구 삭제하면 해당 아기와 연결된 기록을 삭제합니다.", "피드백은 회원탈퇴 시 UID와 닉네임을 익명화합니다. 오류정보는 서비스 안정성 개선을 위해 보관될 수 있으며, 회원탈퇴 과정에서 식별정보를 삭제하거나 익명화합니다. 탈퇴 과정에서 익명화된 오류로그에는 최대 90일 후 삭제를 위한 만료정보가 설정됩니다. 외부 서비스의 로그·백업 보관기간은 해당 서비스 정책에 따릅니다.", "관계 법령에 따라 일정 기간 개인정보를 보존하여야 하는 경우에는 해당 법령에서 정한 기간 동안 별도로 보관합니다."] },
      ],
    },
    {
      id: "article-10",
      title: "제10조 회원탈퇴 및 가족 공유 데이터의 처리",
      blocks: [{ type: "list", marker: "decimal", items: ["이용자가 회원탈퇴를 하면 회사는 이용자의 개인 계정 및 개인정보를 삭제합니다.", "삭제 대상에는 Firebase Authentication 계정, 이용자 개인 기록·설정, 개인과 연결된 인덱스·식별정보 및 가족 연결정보가 포함됩니다.", "가족이 공동으로 관리하는 기록의 경우 다른 가족 구성원이 남아 있으면 해당 구성원의 서비스 이용을 위해 공유 기록이 유지될 수 있습니다.", "이 경우 탈퇴한 이용자를 식별하기 위한 개인 계정 및 연결정보는 삭제하거나 분리합니다.", "마지막 가족 구성원이 탈퇴하면 해당 가족의 기록, 설정 및 연결정보를 삭제합니다."] }],
    },
    {
      id: "article-11",
      title: "제11조 개인정보의 파기 절차 및 방법",
      blocks: [{ type: "list", marker: "decimal", items: ["회사는 보유기간이 지나거나 처리 목적이 달성된 개인정보를 파기합니다. 다만 외부 서비스의 로그·백업은 해당 서비스의 삭제 절차와 보관정책에 따릅니다.", "전자적 형태의 개인정보는 복구 또는 재생이 어렵도록 삭제합니다."] }],
    },
    {
      id: "article-12",
      title: "제12조 이용자 및 법정대리인의 권리와 행사방법",
      blocks: [
        { type: "paragraph", text: "이용자는 자신의 개인정보에 대해 다음과 같은 권리를 행사할 수 있습니다." },
        { type: "list", marker: "decimal", items: ["개인정보 열람", "개인정보 정정", "개인정보 삭제", "개인정보 처리정지", "동의 철회", "회원탈퇴"] },
        { type: "paragraph", text: "서비스에서 직접 수정하거나 삭제할 수 있는 정보는 앱에서 직접 관리할 수 있습니다." },
        { type: "paragraph", text: "그 밖의 개인정보 관련 권리행사는 다음 이메일로 요청할 수 있습니다." },
        { type: "paragraph", text: "문의 이메일: logus.naro@gmail.com" },
        { type: "paragraph", text: "회사는 관계 법령에 따라 요청자의 본인 여부 또는 정당한 대리인 여부를 확인할 수 있습니다." },
        { type: "paragraph", text: "회원탈퇴 및 계정 삭제는 앱 설정에서 직접 진행할 수 있습니다." },
        { type: "paragraph", text: "앱을 이용할 수 없는 경우 다음 계정 삭제 페이지를 이용할 수 있습니다." },
        { type: "paragraph", text: "https://logus-bebe-2026-jk.web.app/account-deletion.html" },
      ],
    },
    {
      id: "article-13",
      title: "제13조 개인정보의 안전성 확보조치",
      blocks: [{ type: "paragraph", text: "회사는 Firebase 인증, 데이터 접근권한 관리, 가족별 권한관리, HTTPS 통신, 오류로그·피드백 접근 제한 및 Android 자동 백업 비활성화 등 확인된 범위의 안전성 확보조치를 적용합니다." }],
    },
    {
      id: "article-14",
      title: "제14조 개인정보 침해에 대한 구제방법",
      blocks: [
        { type: "paragraph", text: "이용자는 개인정보 침해로 인한 상담이나 피해구제가 필요한 경우 개인정보보호위원회 또는 관계 법령에 따른 개인정보 보호 관련 기관의 상담, 분쟁조정 및 신고 절차를 이용할 수 있습니다." },
        { type: "paragraph", text: "관련 기관의 최신 연락처 및 이용방법은 개인정보보호위원회 또는 개인정보 포털을 통해 확인할 수 있습니다." },
      ],
    },
    {
      id: "article-15",
      title: "제15조 개인정보 처리방침의 변경",
      blocks: [{ type: "list", marker: "decimal", items: ["회사는 서비스 또는 개인정보 처리방식이 변경되는 경우 개인정보 처리방침을 변경할 수 있습니다.", "개인정보 처리방침이 변경되는 경우 변경된 내용과 시행일을 서비스 화면 또는 개인정보 처리방침 페이지를 통해 안내합니다.", "처리하는 개인정보의 항목이나 처리 목적 등 이용자의 권리에 중요한 영향을 미치는 사항이 변경되는 경우에는 이용자가 변경 내용을 쉽게 확인할 수 있도록 안내합니다.", "이전 개인정보 처리방침은 적용기간과 함께 확인할 수 있도록 보관합니다."] }],
    },
  ],
  addendum: "이 개인정보 처리방침은 2026년 9월 6일부터 시행합니다.",
};
