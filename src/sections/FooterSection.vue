<script setup lang="ts">
import { ref } from 'vue'

// 彩蛋:點擊 Footer 顯示隱藏台詞
const clickCount = ref(0)
const showQuote = ref(false)
// 台詞一律保留日文原文，不翻譯
const quotes = [
  { text: '弾幕はパワーだぜ', source: '東方Project' },
  { text: 'あたいったら最強ね！', source: '東方Project' },
  { text: 'そーなのかー', source: '東方Project' },
  { text: 'ゆっくりしていってね！！！', source: '東方Project' },
  { text: 'Welcome♥Hell', source: '東方紺珠伝' },
  { text: 'エル・プサイ・コングルゥ', source: 'STEINS;GATE' },
  { text: 'これが…シュタインズ・ゲートの選択だよ。', source: 'STEINS;GATE' },
  { text: '俺は狂気のマッドサイエンティスト、鳳凰院凶真だ！', source: 'STEINS;GATE' },
  { text: '僕と契約して、魔法少女になってよ！', source: '魔法少女まどか☆マギカ' },
  { text: 'もう何も恐くない', source: '魔法少女まどか☆マギカ' },
  { text: '奇跡も、魔法も、あるんだよ', source: '魔法少女まどか☆マギカ' },
  { text: '人間讃歌は「勇気」の讃歌ッ！！', source: 'ジョジョの奇妙な冒険' },
  { text: 'だが断る', source: 'ジョジョの奇妙な冒険' },
  { text: 'お前の次のセリフは「〇〇」という！', source: 'ジョジョの奇妙な冒険' },
  { text: '人は何かの犠牲なしに何も得ることはできない', source: '鋼の錬金術師' },
  { text: '立って歩け　前へ進め', source: '鋼の錬金術師' },
  { text: '問おう。貴方が私のマスターか', source: 'Fate/stay night' },
  { text: '子供の頃、僕は正義の味方に憧れてた', source: 'Fate/stay night' },
  { text: '不幸だーっ！', source: 'とある魔術の禁書目録' },
  { text: '異世界行ったら本気だす', source: '無職転生' },
  { text: 'お可愛いこと', source: 'かぐや様は告らせたい' },
  { text: '恋愛は告白した方が負けなのである！', source: 'かぐや様は告らせたい' },
  { text: 'ぶっちゃけありえない！', source: 'ふたりはプリキュア' },
  { text: '月に代わっておしおきよ！', source: '美少女戦士セーラームーン' },
  { text: '燃えろ！俺の小宇宙（コスモ）！', source: '聖闘士星矢' },
  { text: 'キラキラドキドキ！', source: 'BanG Dream!' },
  { text: '一生、バンドしてくれる？', source: 'BanG Dream! It\'s MyGO!!!!!' },
  { text: 'μ\'s ミュージック、スタート！', source: 'ラブライブ！' },
  { text: '止まるんじゃねぇぞ…', source: '機動戦士ガンダム 鉄血のオルフェンズ' },
  { text: 'お前を信じる俺を信じろ！', source: '天元突破グレンラガン' },
  { text: 'それがオレの忍道だ', source: 'NARUTO' },
]
const currentQuote = ref(quotes[0])

const handleFooterClick = () => {
  clickCount.value++
  
  if (clickCount.value >= 3) {
    currentQuote.value = quotes[Math.floor(Math.random() * quotes.length)]
    showQuote.value = true
    
    setTimeout(() => {
      showQuote.value = false
      clickCount.value = 0
    }, 4000)
  }
}
</script>

<template>
  <footer 
    class="py-8 text-sm text-[var(--muted)] relative cursor-pointer"
    @click="handleFooterClick"
  >
    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
      <p>Built by Miyago9267 © 2026</p>
      <p>Designing resilient systems & memorable stories.</p>
    </div>
    
    <!-- 彩蛋:隱藏台詞 -->
    <Transition name="quote-fade">
      <div
        v-if="showQuote"
        class="quote-display"
      >
        「{{ currentQuote.text }}」
        <span class="quote-source">— {{ currentQuote.source }}</span>
      </div>
    </Transition>
  </footer>
</template>

<style scoped>
footer {
  transition: opacity 0.3s ease;
}

footer:hover {
  opacity: 0.8;
}

/* 彩蛋:台詞顯示 */
.quote-display {
  position: absolute;
  bottom: calc(100% - 1rem);
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(
    135deg,
    rgba(186, 142, 166, 0.95),
    rgba(142, 166, 186, 0.95)
  );
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  width: max-content;
  max-width: min(90vw, 36rem);
  text-align: center;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: quote-bounce 0.6s ease-out;
}

.quote-source {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  opacity: 0.8;
}

@keyframes quote-bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

.quote-fade-enter-active,
.quote-fade-leave-active {
  transition: opacity 0.3s ease;
}

.quote-fade-enter-from,
.quote-fade-leave-to {
  opacity: 0;
}
</style>
