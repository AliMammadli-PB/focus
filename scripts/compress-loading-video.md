# Loading videosunu kiçiltmək

`public/videos/321222.mp4` faylını kiçiltmək üçün ffmpeg quraşdırıb aşağıdakı əmri işə salın:

```bash
ffmpeg -i public/videos/321222.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k public/videos/321222-compressed.mp4
```

Sonra `components/cinematic-loading.tsx` və `components/site-background.tsx` (əgər istifadə olunursa) daxilində yolu `321222-compressed.mp4` olaraq dəyişin.

Windows-da ffmpeg: https://ffmpeg.org/download.html
