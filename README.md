# SyncPad & Clipboard

![SyncPad Icon](icon128.png)

SyncPad, birden fazla cihazınız arasında (Windows, Mac, Linux) panonuzu (clipboard) ve notlarınızı güvenle senkronize etmenizi sağlayan bir Chrome eklentisidir.

Verileriniz cihazınızdan çıkmadan önce uçtan uca şifrelenir (End-to-End Encryption). Bu sayede notlarınıza ve kopyaladığınız metinlere sizin dışınızda kimse erişemez.

## Özellikler

- **Pano Senkronizasyonu:** Kopyaladığınız metinleri anında diğer cihazlarınıza gönderin.
- **Kişisel Not Defteri:** Kısa notlar oluşturun, düzenleyin ve cihazlarınız arasında eşitleyin.
- **Uçtan Uca Şifreleme:** Herhangi bir kullanıcı adı veya şifreye gerek kalmadan, size özel üretilen 25 kelimelik güvenlik kodu ile cihazlarınızı eşleştirin. Verileriniz bu kod kullanılarak sadece sizin cihazınızda çözülebilir.
- **Modern Tasarım:** Karanlık tema (dark mode) odaklı, göz yormayan şık bir arayüz.

## Kurulum ve Kullanım

SyncPad, arka planda ücretsiz bir **Supabase** veritabanı kullanacak şekilde tasarlanmıştır.

1. Bir [Supabase](https://supabase.com) hesabı açın ve yeni bir proje oluşturun.
2. Supabase SQL Editörüne girip `sync_data` adında, `id` (text), `clipboard` (text), `notepad` (text) sütunlarına sahip bir tablo oluşturun.
3. Eklenti dosyaları içindeki `config.js` dosyasını açarak kendi Supabase URL'nizi ve Anon Key'inizi yapıştırın.
4. Eklentiyi Chrome'a "Geliştirici Modu" üzerinden yükleyin.

### Cihazları Eşleştirme

* **Ana Cihazınızda:** Eklentiyi ilk açtığınızda **"Create New Account"** butonuna tıklayın. Size verilen 25 kelimelik güvenlik kodunu güvenli bir yere not edin.
* **Diğer Cihazlarınızda:** Eklentiyi açıp **"Link Existing Device"** seçeneğine tıklayın ve ana cihazınızdan aldığınız 25 kelimelik kodu girin.

Artık hazırsınız! Bir cihazdan "Push" dediğiniz her metin veya kaydettiğiniz her not anında diğer cihazlarınıza şifreli olarak senkronize edilecektir.
