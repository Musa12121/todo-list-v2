# To Do List App
 
## Layihə haqqında
 
Bu, sadə bir ToDo (tapşırıq) tətbiqidir. İstifadəçi tapşırıq əlavə edə bilir, hər tapşırığa son icra tarixi (**deadline**) qoyulur, tapşırıq tamamlanmış kimi işarələnə bilir, redaktə edilə bilir və silinə bilər. Bütün məlumatlar brauzerin **LocalStorage**-ində saxlanılır, ona görə səhifəni yeniləsən belə tapşırıqlar itmir.
 
Tətbiq həmçinin tapşırıqları rəngə görə fərqləndirir:
- 🔴 **Gecikmiş** — vaxtı keçib və hələ bitməyib
- 🟡 **Yaxınlaşan** — 24 saatdan az vaxt qalıb
- 🟢 **Normal** — hələ vaxt var
- Boz/tünd — tamamlanmış tapşırıqlar
## İstifadə olunan texnologiyalar
 
- **HTML** — səhifənin quruluşu
- **CSS** — dizayn və rənglər
- **JavaScript** — bütün məntiq (tapşırıq əlavə etmə, silmə, filtr, axtarış)
- **LocalStorage** — məlumatların yadda saxlanması
- **Font Awesome** — silmə düyməsi üçün ikon
## Necə açmaq olar
 
1. Bütün faylları (`index.html`, `style.css`, `script.js`) eyni qovluğa yerləşdirin.
2. `index.html` faylını brauzerdə (Chrome, Firefox və s.) açın.
3. Başqa heç bir quraşdırma lazım deyil — hər şey birbaşa brauzerdə işləyir.
## Əsas imkanlar
 
- ✅ Yeni tapşırıq əlavə etmək (mətn + tarix/saat)
- ✅ Tapşırığı tamamlanmış kimi işarələmək (checkbox)
- ✅ Tapşırığı redaktə etmək (həm mətni, həm tarixini)
- ✅ Tapşırığı silmək
- ✅ Boş mətn və ya keçmiş tarix daxil edərkən xəbərdarlıq göstərmək
- ✅ Tapşırıqları axtarmaq (real-vaxt axtarış)
- ✅ Filtr düymələri: Hamısı / Aktiv / Tamamlanmış / Gecikənlər
- ✅ Tarixə görə çeşidləmə (yaxından-uzağa, uzaqdan-yaxına, ən yeni)
- ✅ Gecikmiş və yaxınlaşan tapşırıqların rəngli nişanlarla göstərilməsi
- ✅ Bütün məlumatların LocalStorage-də saxlanması (səhifə yenilənəndə itmir)
## Komanda üzvləri
 
| Ad | İşlədiyi modul | Branch |
|---|---|---|
| Musa | Task yaradılması, redaktə və deadline idarəolunması | `feature/task-crud-and-deadline` |
| Musa | LocalStorage servisi və UI/UX | `feature/localstorage-and-ui` |
| Kamran | Deadline nişanları, filtrləmə və axtarış | `feature/filter-and-deadline-ui` |
