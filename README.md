# HUSTLE Browser

TV uzaktan kumandası ve dokunmatik telefonlarda çalışan açık kaynaklı web tarayıcısı.
Yalın bir tasarımla, Android TV'lerde D-pad (yön tuşları) ve sanal imleç ile, telefonlarda ise modern bir dokunmatik arayüzle kullanılmak üzere tasarlanmıştır.

> **Not:** Bu uygulama, [TV Bro](https://github.com/truefedex/tv-bro) projesinin bağımsız bir çatalıdır (fork). TV deneyimini koruyarak Hustle Browser olarak yeniden markalanmış ve aktif olarak geliştirilmektedir. Paket adı geriye dönük güncelleme uyumluluğu için `com.phlox.tvwebbrowser` olarak korunmuştur.

---

## Özellikler

- **TV optimizasyonu** — D-pad (yön tuşları) ile gezinme, sanal imleç, uzaktan kumanda kısayolları
- **Telefon desteği** — dokunmatik modern arayüz, telefon için özel gezinme deneyimi
- **İki motor seçeneği** — cihazdaki WebView motoru **(~3.5 MB)** veya uygulamaya gömülü GeckoView (Firefox motoru, ~150–200 MB)
- **Sekmeler ve yer imleri** — klasör desteği, ana sayfa kısa yolları, dışa/içe aktarma (HTML)
- **Yerleşik reklam engelleyici** — EasyList ve benzeri filtre listeleriyle sitelerde reklamları ve izleyicileri engeller
- **Sesli arama** — adres çubuğuna ve menüye entegre
- **İndirme yöneticisi** — yerleşik, duraklatılabilir indirmeler, özel indirme klasörü seçimi
- **Geçmiş ve sık kullanılanlar** — geçmiş görüntüleme, favori siteler
- **Yerleşik medya oynatıcı** — HLS/DASH destekli videoları tam ekranda oynatır; ses/altyazı/kalite ayarları
- **HTTP/SOCKS5 proxy desteği**
- **Telefon ↔ TV senkronizasyonu** — aynı ağdaki cihazlarda sekmeleri, yer imlerini ve dosyaları kablosuz aktarma
- **HTTPS güvenliği** — sertifika uyarısı, güvenli bağlantı göstergesi
- **Gizli mod** — oturumlarınızı kaydetmeden gezinin
- **Türkçe ve çok dil desteği** — arayüz Türkçe dahil 17+ dilde
- **GitHub üzerinden otomatik güncelleme** — uygulama içi güncelleme özelliği sayesinde her zaman güncel

## Uygulama varyantları

| Varyant | Motor | Açıklama | Yaklaşık boyut |
|---|---|---|---|
| `genericGeckoExcluded` | Android System WebView (Blink/Chromium) | En küçük sürüm; motor cihazda zaten kurulu | ~3.5 MB |
| `genericGeckoIncluded` | Gömülü GeckoView (Firefox) | Motor uygulamaya gömülüdür; eski/ zayıf WebView'ler için önerilir | ~150–200 MB |

İki varyant **ayrı uygulamalardır** (farklı `applicationId`'ler), aynı anda kurulu olabilirler.
Güncellemeler **`generic`** flavour'ında dahili olarak dağıtılır; her varyant yalnız kendi APK'sını görür.

## İndirme ve kurulum

En güncel sürümü [GitHub Releases](https://github.com/justemir84/hustle-browser/releases) sayfasından indirebilirsiniz:

- `hustle-browser-<sürüm>-generic-geckoExcluded.apk` — WebView motorlu (küçük)
- `hustle-browser-<sürüm>-generic-geckoIncluded-<mimari>.apk` — GeckoView motorlu (arm64-v8a, armeabi-v7a, x86_64)

Otomatik güncelleme açıksa (varsayılan), yeni sürüm çıktığında uygulama sizi bilgilendirir.

## Kaynaktan derleme

Gereksinimler:

- **JDK 21**
- **Android SDK** (compileSdk: [libs.versions.toml](gradle/libs.versions.toml) içinden)
- Gradle wrapper kullanılır (ek kurulum gerekmez)

```bash
# WebView motorlu sürüm
./gradlew assembleGenericGeckoExcludedRelease

# GeckoView motorlu sürüm (ABI başına ayrı APK)
./gradlew assembleGenericGeckoIncludedRelease -PenableAbiSplits

# Unit testler
./gradlew testGenericGeckoIncludedDebugUnitTest
```

Release imzalama `KEYSTORE_PATH`, `KEYSTORE_PASSWORD`, `KEY_ALIAS` ve `KEY_PASSWORD` ortam değişkenleriyle yapılır.

## Modüller

- `:app` — ana uygulama (TV ve telefon arayüzleri, WebView motoru, Room veritabanı)
- `:app:common` — ortak kütüphane (motor arayüzü, Config, model sınıfları)
- `:app:gecko` — GeckoView motorunu bağlayan kütüphane
- `:adblock` — yerleşik reklam engelleme motoru
- `:buildSrc` — convention plugin'ler (`hustlebrowser.android.application`, `hustlebrowser.android.library`)

## Sürüm yayınlama

`main` dalına push edildikten sonra `.github/workflows/release.yml` workflow'u **Manuel (workflow_dispatch)** tetiklenerek çalıştırılır:

- Sürüm numarası input'u ile tag (`v<sürüm>`) ve GitHub Release oluşturulur
- ABI başına ayrı GeckoView APK'ları + WebView APK'sı üretilir
- `RELEASE_NOTES.md` dosyası release notu olarak eklenir

Ayrıca sürümden önce `versionCode`/`versionName` (`app/build.gradle.kts`), `latest_version.json` ve `metadata/en-US/changelogs/<versionCode>.txt` güncellenir.

## Lisans ve atıf

Bu proje **MIT Lisansı** ile sunulur; kaynak kodu ve LICENSE dosyası serbesttir.

- **Upstream:** [TV Bro](https://github.com/truefedex/tv-bro) — © Fedir Tsapana ve katkıda bulunanlar
- **Bu fork:** [justemir84/hustle-browser](https://github.com/justemir84/hustle-browser)
- Paket adı ve upstream'e ait telif/referanslar uyumluluk ve atıf gereği korunmuştur
- Reklam engelleyici listeleri EasyList vb. üçüncü taraflara aittir; yasal notlar için [LICENSE.md](LICENSE.md) ve [PRIVACY.md](PRIVACY.md) dosyalarına bakın

## Gizlilik

Uygulama kişisel veri **toplamaz** ve **iletmez** (analitik veya kullanım verisi göndermez). Konuya ilişkin ayrıntılar için [PRIVACY.md](PRIVACY.md) dosyasını okuyun.
