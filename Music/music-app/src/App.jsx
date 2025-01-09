import React, { useEffect, useState } from "react";
import "./App.css";

// 노래 가사 및 애니메이션 효과 설정
const lyrics = [
  { time: 0, text: "믿을 수가 없어 난생처음인 걸", effect: "fade-in" },
  { time: 3, text: "이만큼 쏟아부었던 적", effect: "slide-up" },
  { time: 6, text: "퉁명스러운 말투 숨겨놓은 그 마음을", effect: "zoom-in" },
  { time: 9, text: "입맞춤으로 눈치챘어", effect: "rotate" },
  { time: 12, text: "특별해 좀 인정해", effect: "fade-in" },
  { time: 15, text: "온갖 참견이 너만 지목해", effect: "slide-left" },
  { time: 18, text: "It's okay 내가 이제", effect: "slide-right" },
  { time: 21, text: "하루 종일 돌봐줄게", effect: "zoom-in" },
  { time: 24, text: "She's a baby 알고 보면 애기", effect: "fade-in" },
  { time: 27, text: "혼자 두면 큰일 나요 all day", effect: "slide-left" },
  { time: 30, text: "때찌때찌 털끝 하나 건드렸담 봐", effect: "slide-right" },
  { time: 33, text: "Let her sleep well, yeah", effect: "zoom-in" },
  { time: 36, text: "Datatata, datatata", effect: "fade-in" },
  { time: 39, text: "Datatata, datatata", effect: "slide-up" },
  { time: 42, text: "Datata ta, tatatata", effect: "rotate" },
  { time: 45, text: "잘 들어 손 안 쓰고 간지럼 태울게", effect: "fade-in" },
  { time: 48, text: "좋아해란 말은 그만 관둘래", effect: "slide-left" },
  { time: 51, text: "얼마 못 가서 넌 날 엄청나게", effect: "zoom-in" },
  { time: 54, text: "사랑하게 될 거야", effect: "rotate" },
  { time: 57, text: "이렇게 행복할 땐", effect: "slide-up" },
  { time: 60, text: "뒤도는 거 아니야 ah, ah", effect: "fade-in" },
  { time: 63, text: "How ya feel? 기분 어때", effect: "slide-right" },
  { time: 66, text: "고개 까딱까딱해줘", effect: "zoom-in" },
  { time: 69, text: "She's a baby 알고 보면 애기", effect: "fade-in" },
  { time: 72, text: "혼자 두면 큰일 나요 all day", effect: "slide-left" },
  { time: 75, text: "때찌때찌 털끝 하나 건드렸담 봐", effect: "slide-right" },
  { time: 78, text: "Let her sleep well, yeah", effect: "zoom-in" },
  { time: 81, text: "Datatata, datatata", effect: "fade-in" },
  { time: 84, text: "Datatata, datatata", effect: "slide-up" },
  { time: 87, text: "Datata ta, tatatata", effect: "rotate" },
  { time: 90, text: "내 검지를 움켜진", effect: "fade-in" },
  { time: 93, text: "작은 손엔 복숭아 향이 나", effect: "slide-left" },
  { time: 96, text: "얼마나 멋져져야 그 눈동자에", effect: "zoom-in" },
  { time: 99, text: "나만 담길까 남김없이 다", effect: "rotate" },
  { time: 102, text: "퍼다 줄래 개털 돼도", effect: "slide-up" },
  { time: 105, text: "뭐랬어 중간 없대도", effect: "fade-in" },
  { time: 108, text: "Not enough 심장에 무리 갈 만큼 해야지", effect: "slide-right" },
  { time: 111, text: "가끔 힘들면 그 시간 나한테 맡겨", effect: "zoom-in" },
  { time: 114, text: "깨끗이 해결 짓고 올게", effect: "fade-in" },
  { time: 117, text: "그땐 말없이 안겨", effect: "slide-left" },
  { time: 120, text: "혼란만 부추겼던 등장인물이었지만", effect: "zoom-in" },
  { time: 123, text: "지나보면 못 잊을 줄거리야", effect: "rotate" },
  { time: 126, text: "네 얘기야", effect: "fade-in" },
  { time: 129, text: "She's a baby 알고 보면 애기", effect: "slide-up" },
  { time: 132, text: "혼자 두지 않을 거야 절대", effect: "slide-right" },
  { time: 135, text: "Help me Help me 네 남자친구 부럽다 정말", effect: "zoom-in" },
];

function App() {
  const [currentLyric, setCurrentLyric] = useState("");
  const [effect, setEffect] = useState("");

  useEffect(() => {
    let timeouts = [];
    lyrics.forEach((lyric) => {
      const timeout = setTimeout(() => {
        setCurrentLyric(lyric.text);
        setEffect(lyric.effect);
      }, lyric.time * 1000); // 초 단위로 시간 변환
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout); // 타이머 정리
  }, []);

  return (
    <div className="App">
      <div className={`lyrics ${effect}`}>
        <p>{currentLyric}</p>
      </div>
    </div>
  );
}

export default App;
