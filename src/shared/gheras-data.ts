import { Injectable, signal, computed, effect } from '@angular/core';
import confetti from 'canvas-confetti';

export type Lang = 'ar' | 'en';

@Injectable({
  providedIn: 'root',
})
export class GherasData {
  private readonly STORAGE_KEY = 'gheras_data';
  // Azkar
  private readonly AZKAR_AR = [
    "سبحان الله وبحمده", "سبحان الله العظيم", "لا إله إلا الله وحده لا شريك له", "الحمد لله حمداً كثيراً",
    "الله أكبر كبيراً", "لا حول ولا قوة إلا بالله", "أستغفر الله وأتوب إليه", "اللهم صلِّ وسلم على نبينا محمد",
    "سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر", "لا إله إلا أنت سبحانك إني كنت من الظالمين",
    "حسبي الله ونعم الوكيل", "رضيت بالله رباً، وبالإسلام ديناً", "يا حي يا قيوم برحمتك أستغيث",
    "اللهم إنك عفو كريم تحب العفو فاعفُ عنا", "اللهم آتنا في الدنيا حسنة وفي الآخرة حسنة",
    "سبحان الله وبحمده، عدد خلقه ورضا نفسه", "سبحان الله وبحمده، زنة عرشه ومداد كلماته",
    "لا إله إلا الله الملك الحق المبين", "اللهم إني أسألك الهدى والتقى والعفاف والغنى",
    "استغفر الله الذي لا إله إلا هو الحي القيوم", "اللهم أعنا على ذكرك وشكرك وحسن عبادتك",
    "لا إله إلا الله العظيم الحليم", "يا مقلب القلوب ثبت قلبي على دينك", "سبحان ربك رب العزة عما يصفون"
  ];

  private readonly AZKAR_EN = [
  "Glory is to Allah and praise is to Him", // سبحان الله وبحمده
  "Glory is to Allah the Magnificent", // سبحان الله العظيم
  "None has the right to be worshipped but Allah alone", // لا إله إلا الله وحده لا شريك له
  "Praise be to Allah, much good and blessed praise", // الحمد لله حمداً كثيراً
  "Allah is the Most Great", // الله أكبر كبيراً
  "There is no might nor power except with Allah", // لا حول ولا قوة إلا بالله
  "I seek Allah's forgiveness and I turn in repentance to Him", // أستغفر الله وأتوب إليه
  "O Allah, send prayers and peace upon our Prophet Muhammad", // اللهم صلِّ وسلم على نبينا محمد
  "Glory is to Allah, praise is to Allah, there is no god but Allah, and Allah is the Most Great", // سبحان الله والحمد لله ولا إله إلا الله والله أكبر
  "There is no god but You, Glory to You, surely I was of the wrongdoers", // لا إله إلا أنت سبحانك إني كنت من الظالمين
  "Allah is sufficient for us and He is the best Disposer of affairs", // حسبي الله ونعم الوكيل
  "I am pleased with Allah as my Lord, with Islam as my religion", // رضيت بالله رباً وبالإسلام ديناً
  "O Ever Living, O Self-Subsisting, by Your mercy I seek help", // يا حي يا قيوم برحمتك أستغيث
  "O Allah, You are Forgiving and love to forgive, so forgive us", // اللهم إنك عفو كريم تحب العفو فاعفُ عنا
  "Our Lord, give us in this world that which is good and in the Hereafter that which is good", // اللهم آتنا في الدنيا حسنة وفي الآخرة حسنة
  "Glory is to Allah and praise is to Him, by the multitude of His creation", // سبحان الله وبحمده عدد خلقه ورضا نفسه
  "Glory is to Allah and praise is to Him, by the weight of His Throne", // سبحان الله وبحمده زنة عرشه ومداد كلماته
  "None has the right to be worshipped but Allah, the Sovereign, the Truth, the Manifest", // لا إله إلا الله الملك الحق المبين
  "O Allah, I ask You for guidance, piety, chastity and self-sufficiency", // اللهم إني أسألك الهدى والتقى والعفاف والغنى
  "I seek forgiveness from Allah, the Living, the Subsisting, and I repent to Him", // استغفر الله الذي لا إله إلا هو الحي القيوم وأتوب إليه
  "O Allah, help us to remember You, to thank You, and to worship You well", // اللهم أعنا على ذكرك وشكرك وحسن عبادتك
  "There is no god but Allah, the Magnificent, the Forbearing", // لا إله إلا الله العظيم الحليم
  "O Turner of the hearts, keep my heart steadfast upon Your religion", // يا مقلب القلوب ثبت قلبي على دينك
  "Glory to your Lord, the Lord of Might, above what they describe", // سبحان ربك رب العزة عما يصفون
];

  // Signals
  lang = signal<Lang>(this.getStoredData().lang || 'ar');
  count = signal<number>(this.getStoredData().count || 0);
  isFinished = signal<boolean>(this.getStoredData().count >= 24);

  // Computed Values
  currentContent = computed(() => ({
    title: this.lang() === 'ar' ? 'غِراس' : 'Gheras',
    subtitle: this.lang() === 'ar' ? '24 ذكراً لبداية عام جديد' : '24 Remembrances for a New Year',
    footer: this.lang() === 'ar' ? 'صدقة جارية.. لعلها تكون المنجية' : 'A continuous charity for a new start',
    done: this.lang() === 'ar' ? 'تقبل الله منا ومنكم ' : 'May Allah accept from us all ',
    reset: this.lang() === 'ar' ? 'ابدأ من جديد' : 'Start Over',
    currentZekr: this.lang() === 'ar' ? this.AZKAR_AR[this.count() % 24] : this.AZKAR_EN[this.count() % 24]
  }));

  progressOffset = computed(() => 283 - (this.count() / 24) * 283);

  constructor() {
    // Effect 1: Handle Document Direction & Language
    effect(() => {
      const currentLang = this.lang();
      document.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = currentLang;
    });

    // Effect 2: Sync State to LocalStorage automatically whenever any signal changes
    effect(() => {
      const data = {
        lang: this.lang(),
        count: this.count()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    });
  }

  private getStoredData() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  }

  toggleLang() {
    this.lang.update(l => l === 'ar' ? 'en' : 'ar');
  }

  increment() {
    if (this.count() < 24) {
      this.count.update(v => v + 1);
      if (this.count() === 24) {
        this.isFinished.set(true);
        this.triggerConfetti();
      }
    }
  }

  reset() {
    this.count.set(0);
    this.isFinished.set(false);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private triggerConfetti() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7e22ce', '#FFFFFF', '#0F172A']
    });
  }
}

