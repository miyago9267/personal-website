<script setup lang="ts">
import { ref } from 'vue'

// 彩蛋:點擊 Footer 顯示隱藏台詞
const clickCount = ref(0)
const showQuote = ref(false)
const quotes = [
  // 命運石之門
  '「無論在哪個世界線,我都會找到你。」',
  '「El Psy Kongroo」',
  '「這就是命運石之門的選擇。」',
  '「我是狂氣的瘋狂科學家!」',
  '「改變過去,就能改變未來。」',
  
  // 魔法少女小圓
  '「成為魔法少女,簽訂契約吧!」',
  '「已經沒有什麼好害怕的了。」',
  '「奇蹟和魔法都是存在的!」',
  '「不要放棄希望。」',
  '「我會一直守護著你。」',
  
  // JOJO
  '「人類的讚歌是勇氣的讚歌!」',
  '「你的下一句話是...」',
  '「但是我拒絕！」',
  '「這是我最後的波紋了!」',
  
  // 鋼之鍊金術師
  '「等價交換,這是鍊金術的原則。」',
  '「站起來,向前走!」',
  '「即使如此,我也要前進。」',
  '「一個無法保護任何人。」',
  
  // 鏈鋸人
  '「好耶!」',
  '「我就是鍊鋸人!」',
  '「我心已被蕾塞奪走，此生或許再無悲喜。」',
  
  // Fate系列
  '「你就是我的Master嗎?」',
  '「人被殺，就會死。」',
  '「正義的夥伴。」',
  
  // 超砲
  '「你指尖躍動的電光，是我此生不變的信仰!」',
  '「不幸啊!」',
  
  // 無職轉生
  '「這次一定要認真活下去。」',
  
  // 輝夜姬想讓人告白
  '「可愛即是正義!」',
  '「愛就是戰爭!」',
  
  // 光之美少女系列
  '「絕不放棄!」',
  '「大家的力量!」',
  
  // 美少女戰士
  '「我要代替月亮懲罰你!」',
  '「相信愛與正義!」',
  
  // 聖鬥士星矢
  '「燃燒吧!我的小宇宙!」',
  
  // BanG Dream
  '「Kirakira Doki Doki!」',
  '「一起創造最棒的音樂!」',
  '「這就是我們的羈絆!」',
  '「一輩子跟我一起MyGO嗎!」',
  
  // LoveLive
  '「大家一起實現夢想!」',
  '「µ,s Music Start!」',
  '「我們的歌聲能傳達給大家!」',
  
  // 通用
  '「不要停下來啊!」',
  '「相信那個相信你的我。」',
  '「這就是我的道路!」'
]
const currentQuote = ref('')

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
        {{ currentQuote }}
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
  top: -60px;
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
  white-space: nowrap;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  animation: quote-bounce 0.6s ease-out;
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
