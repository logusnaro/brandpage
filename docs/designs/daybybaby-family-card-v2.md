# DayByBaby · 함께 남기는 기록 이미지 교체

- 도구: 내장 imagegen, 기존 이미지 편집. 별도 유료 API 호출 없음.
- 원본: `public/apps-art/daybybaby-memories-v1.webp` 보존.
- 적용: `public/apps-art/daybybaby-family-v2.webp`, 1200×800 WebP.
- 범위: 함께 남기는 기록 카드의 기본 이미지만 교체. 사진 기능으로 오해할 앨범·사진·프레임을 제거하고 엄마·아빠 logU와 잠든 푸리를 표현. 카드 문구·레이아웃·다른 이미지·CMS 데이터는 변경하지 않음.

## 생성 프롬프트

Use case: precise-object-edit. Asset type: DayByBaby website feature-card illustration, landscape 3:2. Input image 1 is the edit target and character/material/style reference. Replace the photo album scene with a tender family moment: exactly three logU pebble characters, a mother logU, an equally beautiful cute father logU, and a much smaller baby logU (Ppuri). Preserve the cream-colored soft rounded pebble bodies, tiny glossy black bead eyes, gentle curved smiles, tactile fine stone texture, tiny mitten-like hands, cozy handcrafted pastel textile clothing, warm honey-colored wooden nursery, flowers and arched window overlooking the logU village. Keep the mother's pretty cream floral garment and soft coral accents. Create a father of similar adult scale and equally round, kind, soft and adorable design, dressed in an understated pastel sage/cream textile vest with delicate tiny botanical embroidery; NO moustache, no beard, no exaggerated masculine caricature. Both parents lovingly look downward toward their baby, not toward camera. The baby is peacefully sleeping comfortably between them on a little cream padded nest/cradle, with tiny relaxed closed eyes and a soft peach bib; adult hands rest gently near the baby. Balanced intimate three-character composition filling the image, clear parents-and-child relationship even at small card thumbnail size; retain breathable margins so none of the characters is cropped. Preserve warm premium 3D storybook miniature render quality, natural soft sunshine and beautiful detailed materials. Remove the album entirely and replace its footprint with the baby's cozy nest. No photo albums, photographs, photo frames, cameras, phones, screen UI, letters, captions, logos, watermarks or scrapbook objects anywhere. In background replace framed teddy illustration with a small simple unframed textile/flower decoration if needed to avoid photo association. Final deliverable is ONLY the illustration, no webpage, no text or buttons.

## 검증

생성 이미지 직접 확인: 세 캐릭터, 앨범·사진 없음, 아빠 스타일 일치. 기존 CSS·문구 보존. 관련 SSR 테스트·빌드·로컬 HTTP 확인 실행. 웹 화면 캡처는 요청하지 않아 생략.
