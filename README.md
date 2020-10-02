# Boncuk Video Oynatıcı (BETA)
Tamamen sıfırdan kodlanmış bir sistem. Tarayıcı tarafından kullanılmak üzere tasarlanmıştır.

## Boncuk Video Oynatıcı için gereken eklentiler;
* **[FontAwesome](https://fontawesome.com/)**

## Nasıl Kullanılır?
`boncuk-player.js` dosyasını projenize dahil edin. Ardından `<script>` etiketleri arasına `BoncukVideoPlayer(video, options);` komutunu ekleyin. dilerseniz ikinci parametreyi de verebilirsiniz. İkinci parametre `JSON` formatında olmalıdır.

### Parametreler
`video (String)*`: Videonun dosya yolunu burada belirtin. Video uzantısına göre işlem yapacaktır. Bu parametre boş bırakılamaz.
`options (Object)`: Video ile alakalı gerekli ayarları bulundurur. Bu ayarlar JSON formatında belirtilmelidir. Desteklenen parametreler **Options Parametreleri** bölümünde belirtilmiştir.

> ### Desteklenen Formatlar
> Videolar aşağıda yer alan uzantılarda test edilmiş ve sorunsuz çalıştığı gözlemlenmiştir. Bunlar;
> - `*.mp4`
> - `*.webm`
> - `*.mov`
> - `*.mkv`

> ### Hatırlatma
> `boncuk-player.js` dosyasını `BoncukVideoPlayer();` komutunun üstünde olmasına özen gösteriniz. Mümkünse `<head>` etiketi arasına yerleştiriniz.

> ### Chrome'da Hata Alabilirsiniz...
> Chrome'da **autoplay** politikası gereği otomatik oynatma özelliği devredışıdır. `Unmuting failed and the element was paused instead because the user didn't interact with the document before. https://goo.gl/xX8pDD` hatası ile karşılaşabilirsiniz. Bu hatanın önüne geçebilmek için site ayarlarında `Ses` özelliğini `İzin Ver` olarak işaretlemeniz gerekmektedir.

## Options Parametreleri
`autoplay (Boolean)`: Videonun otomatik oynatmasını sağlar. Varsayılan değeri `false`'dır.
`muted (Boolean)`: Video sesi kapatıp açmasını sağlar. Varsayılan değeri `false`'dır.
`videoId (String)`: Video'ya ID etiketi vermenizi sağlar. `boncuk-video` verdiğinizi varsayarsak, `div.boncuk-video-player` etiketinin ID değeri `boncuk-video-panel` olarak belirtilecektir. `-panel` eki sonuna ekleniyor. `video.boncuk-video-player` etiketinin ID değeri ise, `boncuk-video` olarak ayarlanmıştır. Ek almamıştır.

## Dilediğim Yerde Kullanabilir Miyim?
Evet, dilediğiniz yerde, özgürce kullanabilirsiniz. Ancak kullanacağınız projede emeği geçenler bölümüne **Boncuk**'u da eklerseniz, biz geliştiriciler olarak çok memnun kalırız.

## Örnek Kullanımı Mevcut Mu?
`index.html` sizler için özel tasarlanmıştır. Projeyi bir klasöre çıkartın. Ardından `index.html` dosyasını çalıştırın.